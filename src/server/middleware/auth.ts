import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: number;
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const JWT_SECRET = process.env.JWT_SECRET!;
  const bearerToken = req.headers.authorization;

  if (!bearerToken?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Ingen token angiven" });
    return;
  }

  const token = bearerToken.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: number };

    req.userId = payload.userId;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ eroro: "Ogiltig eller utgången token" });
  }
}
