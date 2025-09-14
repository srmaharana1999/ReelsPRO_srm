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
      callbackUrl: "/",
    });
    if (result?.error) {
      setError(result.error);
    } else {
      setStatus("Login Success");
      router.push("/");
    }
  };

  return (
    <div className=" max-w-sm  w-11/12 md:w-full card drop-shadow-md shadow-md shadow-white/10 drop-shadow-white/10 mx-auto p-5">
      <h1 className="text-2xl text-center">Sign In</h1>
      <form className="card-body space-y-5" onSubmit={handleSubmit}>
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
        <button className="btn btn-soft btn-success w-1/2 mx-auto ">
          Sign In
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
