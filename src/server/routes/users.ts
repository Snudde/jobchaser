
import { db } from "../db/index.js";
import express from "express";
import { eq, desc } from "drizzle-orm";
import { users } from "../db/schema.js";

const router = express.Router();


// ─── USERS ───────────────────────────────────────────────

router.get("/users", async (_req, res) => {
  try {
    const userList = await db.select().from(users).orderBy(desc(users.createdAt));
    res.json(userList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.get("/users/:id", async (req, res) => {
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

router.post("/users", async (req, res) => {
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

router.put("/users/:id", async (req, res) => {
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

router.delete("/users/:id", async (req, res) => {
  try {
    await db.delete(users).where(eq(users.id, parseInt(req.params.id)));
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// ─────────────────────────────────────────────────────────

export default router;
