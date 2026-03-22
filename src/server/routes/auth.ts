import { Router } from "express";
import { db } from "./../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const router = Router();

dotenv.config();

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET!;

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const [user] = await db
      .insert(users)
      .values({ email: email, password: hashedPassword })
      .returning({ id: users.id, email: users.email });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ token, user });
  } catch (error: unknown) {
    console.log(error);
    res.status(500).json({ error: "Server error during registration" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ error: "Incorrect password" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error: unknown) {
    console.log(error);
    res.status(500).json({ error: "Server error during login" });
  }
});

export default router;
