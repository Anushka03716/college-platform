"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const API = "https://college-backend-ruwx.onrender.com";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password");
      return;
    }

    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/colleges");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  const handleRegister = async () => {
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password");
      return;
    }

    try {
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setError("Registered successfully. Now login.");
      } else {
        setError(data.message || "User already exists");
      }
    } catch (err) {
      console.error(err);
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white border p-8 rounded-2xl w-full max-w-sm shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login / Register
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <input
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 w-full mb-4 rounded-lg"
        />

        <input
          type="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 w-full mb-5 rounded-lg"
        />

        <div className="flex gap-3">
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Login
          </button>

          <button
            onClick={handleRegister}
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Register
          </button>
        </div>

        <button
          onClick={() => router.push("/")}
          className="mt-5 text-sm underline w-full"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}