import express from "express";
import cors from "cors";
import { query } from "./db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

function generateOTP(): string {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

async function getUserByToken(token: string) {
  const result = await query<{ user_id: number }>(
    "SELECT user_id FROM sessions WHERE token = $1",
    [token]
  );
  return result[0] ?? null;
}

// 1. Skapa en användare - POST /users
app.post("/users", async (request, response) => {
  const { username, password } = request.body;

  const users = await query<{ id: number; username: string; password: string }>(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, password",
    [username, password]
  );

  const user = users[0];

  const accounts = await query<{ id: number; user_id: number; amount: number }>(
    "INSERT INTO accounts (user_id, amount) VALUES ($1, 0) RETURNING id, user_id, amount",
    [user.id]
  );

  response.json({ user, account: accounts[0] });
});

// 2. Logga in - POST /sessions
/* app.post("/sessions", async (request, response) => {
  const { username, password } = request.body;

  const users = await query<{ id: number }>(
    "SELECT * FROM users WHERE username = $1 AND password = $2",
    [username, password]
  );

  if (users.length === 0) {
    return response.status(401).json({ message: "Fel användarnamn eller lösenord" });
  }

  const user = users[0];
  const token = generateOTP();

  await query(
    "INSERT INTO sessions (user_id, token) VALUES ($1, $2)",
    [user.id, token]
  );

  await query(
    "INSERT INTO accounts (user_id, amount) SELECT $1, 0 WHERE NOT EXISTS (SELECT 1 FROM accounts WHERE user_id = $1)",
    [user.id]
  );

  response.json({ token });
});

// 3. Kolla saldo - POST /me/accounts
app.post("/me/accounts", async (request, response) => {
  const { token } = request.body;

  const session = await getUserByToken(token as string);
  if (!session) return response.status(401).json({ message: "Ogiltig token" });

  const accounts = await query<{ id: number; user_id: number; amount: number }>(
    "SELECT id, user_id, amount FROM accounts WHERE user_id = $1",
    [session.user_id]
  );

  response.json({ account: accounts[0] });
});

// 4. Sätt in pengar - POST /me/accounts/transactions
app.post("/me/accounts/transactions", async (request, response) => {
  const { token, amount } = request.body;

  const session = await getUserByToken(token as string);
  if (!session) return response.status(401).json({ message: "Ogiltig token" });

  const accounts = await query<{ id: number; user_id: number; amount: number }>(
    "UPDATE accounts SET amount = amount + $1 WHERE user_id = $2 RETURNING id, user_id, amount",
    [amount, session.user_id]
  );

  response.json({ account: accounts[0] });
}); */

app.listen(port, () => {
  console.log(`Bankens backend körs på http://localhost:${port}`);
});