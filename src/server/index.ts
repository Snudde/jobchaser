
import express from "express";
import jobsRouter from "./routes/jobs.js";
import usersRouter from "./routes/users.js";

const app = express();
const port = 3000;

app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use(jobsRouter);
app.use(usersRouter);

app.listen(port, () => {
  console.log(`Server körs på http://localhost:${port}`);
});
