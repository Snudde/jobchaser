import { eq, and } from "drizzle-orm";
import { Router } from "express";
import { db } from "../db";
import { jobs } from "../db/schema";
import type { AuthRequest } from "../middleware/auth";
import { authenticate } from "../middleware/auth";

const router = Router();

router.get("/", async (req, res) => {
  const { source } = req.query;
  const allJobs = source
    ? await db.select().from(jobs).where(eq(jobs.source, source as string))
    : await db.select().from(jobs);
  res.json(allJobs);
});

router.get("/mine", authenticate, async (req: AuthRequest, res) => {
  const { source } = req.query;
  const conditions = [eq(jobs.userId, req.userId!)];
  if (source) conditions.push(eq(jobs.source, source as string));
  const myJobs = await db.select().from(jobs).where(and(...conditions));
  res.json(myJobs);
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id as string);
  const [job] = await db.select().from(jobs).where(eq(jobs.id, id));

  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }

  res.json(job);
});

router.post("/", authenticate, async (req: AuthRequest, res) => {
  const { company, headline, location, deadline, url, status, source } = req.body;

  if (!company || !headline) {
    res.status(400).json({ error: "company and headline are required" });
    return;
  }

  const [job] = await db
    .insert(jobs)
    .values({ company, headline, location, deadline, url, status, source: source ?? "manual", userId: req.userId! })
    .returning();

  res.status(201).json(job);
});

router.put("/:id", authenticate, async (req: AuthRequest, res) => {
  const id = parseInt(req.params.id as string);
  const { company, headline, location, deadline, url, status } = req.body;

  const [existing] = await db.select().from(jobs).where(eq(jobs.id, id));

  if (!existing) {
    res.status(404).json({ error: "Job not found" });
    return;
  }

  if (existing.userId !== req.userId) {
    res.status(403).json({ error: "You can only edit your own jobs" });
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

router.delete("/:id", authenticate, async (req: AuthRequest, res) => {
  const id = parseInt(req.params.id as string);

  const [existing] = await db.select().from(jobs).where(eq(jobs.id, id));

  if (!existing) {
    res.status(404).json({ error: "Job not found" });
    return;
  }

  if (existing.userId !== req.userId) {
    res.status(403).json({ error: "You can only delete your own jobs" });
    return;
  }

  await db.delete(jobs).where(eq(jobs.id, id));
  res.status(204).send();
});

export default router;
