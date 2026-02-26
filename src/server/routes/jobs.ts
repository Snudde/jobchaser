
import { db } from "../db/index.js";
import express from "express";
import { eq, desc } from "drizzle-orm";
import { jobs } from "../db/schema.js";

const router = express.Router();


// ─── JOBS ────────────────────────────────────────────────

router.get("/jobs", async (_req, res) => {
  try {
    const jobsList = await db.select().from(jobs).orderBy(desc(jobs.id));
    res.json(jobsList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

router.get("/jobs/:id", async (req, res) => {
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

router.post("/jobs", async (req, res) => {
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

router.put("/jobs/:id", async (req, res) => {
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

router.delete("/jobs/:id", async (req, res) => {
  try {
    await db.delete(jobs).where(eq(jobs.id, parseInt(req.params.id)));
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete job" });
  }
});

// ─────────────────────────────────────────────────────────

export default router;
