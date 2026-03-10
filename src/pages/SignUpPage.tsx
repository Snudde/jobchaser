import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function SignUpPage() {
  const API = "http://localhost:3000";
  const {
    register,
    setError,
    formState: { errors },
  } = useForm();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    // setError("",{});
    console.log(typeof password);
    const res = await fetch(`${API}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError("name", data.error ?? "Något gick fel");

      return;
    }

    login(data.token, data.user);
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
