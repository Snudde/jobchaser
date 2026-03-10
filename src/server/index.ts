
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import jobsRouter from "./routes/jobs.js";
import authRouter from "./routes/auth.js";

const app = express();
const port = 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/jobs", jobsRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server körs på http://localhost:${port}`);
});
