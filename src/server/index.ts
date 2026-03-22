import "dotenv/config";

import express from "express";
import cors from "cors";
import jobsRouter from "./routes/jobs.js";
import authRouter from "./routes/auth.js";

const app = express();
const port = 3000;

app.use(cors({ origin: /^http:\/\/localhost:\d+$/ }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/jobs", jobsRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
