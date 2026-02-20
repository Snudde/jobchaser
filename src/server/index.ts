import express from "express";
import { query } from "./db";

const app = express();
const port = 3000;

app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// ─── USERS ───────────────────────────────────────────────

app.get("/users", async (_req, res) => {
  const users = await query("SELECT * FROM users ORDER BY created_at DESC");
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const users = await query("SELECT * FROM users WHERE id = $1", [
    req.params.id,
  ]);
  if (users.length === 0)
    return res.status(404).json({ message: "Användare hittades inte" });
  res.json(users[0]);
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const users = await query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email],
  );
  res.status(201).json(users[0]);
});

app.put("/users/:id", async (req, res) => {
  const { name, email } = req.body;
  const users = await query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [name, email, req.params.id],
  );
  if (users.length === 0)
    return res.status(404).json({ message: "Användare hittades inte" });
  res.json(users[0]);
});

app.delete("/users/:id", async (req, res) => {
  await query("DELETE FROM users WHERE id = $1", [req.params.id]);
  res.status(204).send();
});

// ─── JOBS ────────────────────────────────────────────────

app.get("/jobs", async (_req, res) => {
  const jobs = await query("SELECT * FROM jobs ORDER BY created_at DESC");
  res.json(jobs);
});

app.get("/jobs/:id", async (req, res) => {
  const jobs = await query("SELECT * FROM jobs WHERE id = $1", [req.params.id]);
  if (jobs.length === 0)
    return res.status(404).json({ message: "Jobb hittades inte" });
  res.json(jobs[0]);
});

app.post("/jobs", async (req, res) => {
  const { user_id, company, position, status } = req.body;
  const jobs = await query(
    "INSERT INTO jobs (user_id, company, position, status) VALUES ($1, $2, $3, $4) RETURNING *",
    [user_id, company, position, status ?? "applied"],
  );
  res.status(201).json(jobs[0]);
});

app.put("/jobs/:id", async (req, res) => {
  const { company, position, status } = req.body;
  const jobs = await query(
    "UPDATE jobs SET company = $1, position = $2, status = $3 WHERE id = $4 RETURNING *",
    [company, position, status, req.params.id],
  );
  if (jobs.length === 0)
    return res.status(404).json({ message: "Jobb hittades inte" });
  res.json(jobs[0]);
});

app.delete("/jobs/:id", async (req, res) => {
  await query("DELETE FROM jobs WHERE id = $1", [req.params.id]);
  res.status(204).send();
});

// ─────────────────────────────────────────────────────────

app.listen(port, () => {
  console.log(`Server körs på http://localhost:${port}`);
});
