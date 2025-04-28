"use client";

import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Your password doesn't match!");
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      //   const data = await res.json();

      if (!res.ok) {
        setError("Registration Failed.");
      }
      router.push("/login");
    } catch (error) {
      console.log(error);
      setError("Failed to fetch");
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-sm mx-auto p-5 shadow-neutral-500">
      <form className="card-body space-y-3" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Type your email here"
            className="input"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password here"
            className="input"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm password"
            className="input"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
          Register
        </button>
      </form>
      {error && (
        <div className="toast">
          <div className="alert alert-info">
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
