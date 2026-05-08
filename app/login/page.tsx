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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">

      <div className="bg-white border border-gray-200 p-8 rounded-2xl w-full max-w-sm shadow-xl">

        <h1 className="text-2xl font-bold mb-2 text-center text-black">
          Welcome 
        </h1>

        <p className="text-sm text-gray-500 text-center mb-6">
          Login or create an account
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 bg-white text-black p-3 w-full mb-4 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 bg-white text-black p-3 w-full mb-5 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg w-full"
          >
            Login
          </button>

          <button
            onClick={handleRegister}
            className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-lg w-full"
          >
            Register
          </button>
        </div>

        {/* Back */}
        <button
          onClick={() => router.push("/")}
          className="mt-5 text-sm text-gray-600 hover:text-black underline w-full"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}