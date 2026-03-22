import React, { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

function SignUpPage() {
  const API = "http://localhost:3000";
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await fetch(`${API}/auth/signup`, {
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

  function handleEmail(emailChange: any) {
    setEmail(emailChange.target.value);
  }

  function handlePassword(passwordChange: any) {
    setPassword(passwordChange.target.value);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" onChange={handleEmail} />
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handlePassword}
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default SignUpPage;
