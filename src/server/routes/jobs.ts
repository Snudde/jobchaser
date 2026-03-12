import { eq, and } from "drizzle-orm";
import { Router } from "express";
import { db } from "../db";
import { jobs } from "../db/schema";
import type { AuthRequest } from "../middleware/auth";
import { authenticate } from "../middleware/auth";

const router = Router();

// GET /jobs — publik, filtrera med ?source=manual|api
router.get("/", async (req, res) => {
  const { source } = req.query;
  const allJobs = source
    ? await db.select().from(jobs).where(eq(jobs.source, source as string))
    : await db.select().from(jobs);
  res.json(allJobs);
});

// GET /jobs/mine — skyddad, hämtar bara inloggad användares jobb
router.get("/mine", authenticate, async (req: AuthRequest, res) => {
  const { source } = req.query;
  const conditions = [eq(jobs.userId, req.userId!)];
  if (source) conditions.push(eq(jobs.source, source as string));
  const myJobs = await db.select().from(jobs).where(and(...conditions));
  res.json(myJobs);
});

// GET /jobs/:id — publik, hämta ett specifikt jobb
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id as string);
  const [job] = await db.select().from(jobs).where(eq(jobs.id, id));

  if (!job) {
    res.status(404).json({ error: "Jobb hittades inte" });
    return;
  }

  res.json(job);
});

// POST /jobs — skyddad, måste vara inloggad
router.post("/", authenticate, async (req: AuthRequest, res) => {
  const { company, headline, location, deadline, url, status, source } = req.body;

  if (!company || !headline) {
    res.status(400).json({ error: "company och headline krävs" });
    return;
  }

  const [job] = await db
    .insert(jobs)
    .values({ company, headline, location, deadline, url, status, source: source ?? "manual", userId: req.userId! })
    .returning();

  res.status(201).json(job);
});

// PUT /jobs/:id — skyddad, bara ägaren kan redigera
router.put("/:id", authenticate, async (req: AuthRequest, res) => {
  const id = parseInt(req.params.id as string);
  const { company, headline, location, deadline, url, status } = req.body;

  const [existing] = await db.select().from(jobs).where(eq(jobs.id, id));

  if (!existing) {
    res.status(404).json({ error: "Jobb hittades inte" });
    return;
  }

  if (existing.userId !== req.userId) {
    res.status(403).json({ error: "Du kan bara redigera dina egna jobb" });
    return;
  }

  const [updated] = await db
    .update(jobs)
    .set({
      company: company ?? existing.company,
      headline: headline ?? existing.headline,
      location: location ?? existing.location,
      deadline: deadline ?? existing.deadline,
      url: url ?? existing.url,
      status: status ?? existing.status,
    })
    .where(eq(jobs.id, id))
    .returning();

  res.json(updated);
});

// DELETE /jobs/:id — skyddad, bara ägaren kan ta bort
router.delete("/:id", authenticate, async (req: AuthRequest, res) => {
  const id = parseInt(req.params.id as string);

  const [existing] = await db.select().from(jobs).where(eq(jobs.id, id));

  if (!existing) {
    res.status(404).json({ error: "Jobb hittades inte" });
    return;
  }

  if (existing.userId !== req.userId) {
    res.status(403).json({ error: "Du kan bara ta bort dina egna jobb" });
    return;
  }

  await db.delete(jobs).where(eq(jobs.id, id));
  res.status(204).send();
});

export default router;
