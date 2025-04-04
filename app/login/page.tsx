"use client";

import React, { useState } from "react";
import { auth } from "@/lib/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Successful login: redirect to the dashboard.
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <div className="mb-4">
        <label className="block mb-1">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter your email"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
          placeholder="Enter your password"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Login
      </button>
    </form>
  );
}
