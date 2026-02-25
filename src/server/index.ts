
import { db } from "./db/index.js";
import express from "express";
import { eq, desc } from "drizzle-orm";
import { users, jobs } from "./db/schema.js";

const app = express();
const port = 3000;

app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// ─── USERS ───────────────────────────────────────────────

app.get("/users", async (_req, res) => {
  try {
    const userList = await db.select().from(users).orderBy(desc(users.createdAt));
    res.json(userList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const userList = await db.select().from(users).where(eq(users.id, parseInt(req.params.id)));
    if (userList.length === 0)
      return res.status(404).json({ message: "Användare hittades inte" });
    res.json(userList[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }
    const result = await db.insert(users).values({ name, email, password }).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await db.update(users).set({ name, email }).where(eq(users.id, parseInt(req.params.id))).returning();
    if (result.length === 0)
      return res.status(404).json({ message: "Användare hittades inte" });
    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    await db.delete(users).where(eq(users.id, parseInt(req.params.id)));
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// ─── JOBS ────────────────────────────────────────────────

app.get("/jobs", async (_req, res) => {
  try {
    const jobsList = await db.select().from(jobs).orderBy(desc(jobs.id));
    res.json(jobsList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

app.get("/jobs/:id", async (req, res) => {
  try {
    const jobsList = await db.select().from(jobs).where(eq(jobs.id, parseInt(req.params.id)));
    if (jobsList.length === 0)
      return res.status(404).json({ message: "Jobb hittades inte" });
    res.json(jobsList[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch job" });
  }
});

app.post("/jobs", async (req, res) => {
  try {
    const { user_id, company, position, status, email } = req.body;
    const result = await db.insert(jobs).values({
      userId: user_id,
      company,
      position,
      status: status ?? "applied",
      email,
    }).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create job" });
  }
});

app.put("/jobs/:id", async (req, res) => {
  try {
    const { company, position, status } = req.body;
    const result = await db.update(jobs).set({ company, position, status }).where(eq(jobs.id, parseInt(req.params.id))).returning();
    if (result.length === 0)
      return res.status(404).json({ message: "Jobb hittades inte" });
    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update job" });
  }
});

app.delete("/jobs/:id", async (req, res) => {
  try {
    await db.delete(jobs).where(eq(jobs.id, parseInt(req.params.id)));
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete job" });
  }
});

// ─────────────────────────────────────────────────────────

app.listen(port, () => {
  console.log(`Server körs på http://localhost:${port}`);
});
