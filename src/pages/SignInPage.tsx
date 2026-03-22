import React, { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

export default function SignInPage() {
  const API = "http://localhost:3000";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch(`${API}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.error ?? "Something went wrong");
      return;
    }

    login(data.user, data.token);
    navigate("/");
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="test@test.se"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </>
  );
}
