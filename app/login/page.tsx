"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      setStatus("Login Success");
      router.push("/");
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-sm mx-auto p-5 shadow-neutral-500">
      <form className="card-body space-y-3" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Your email here"
            className="input"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Your password here"
            className="input"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl">
          Login
        </button>
      </form>
      {error && (
        <div className="toast">
          <div className="alert alert-info">
            <span>{error}</span>
          </div>
        </div>
      )}
      {status && (
        <div className="toast">
          <div className="alert alert-info">
            <span>{status}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
