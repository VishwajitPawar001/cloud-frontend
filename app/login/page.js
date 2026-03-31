"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "../../services/auth";

export default function Login() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = await loginUser(email, password);

      if (data?.token) {
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Login error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl md:text-2xl font-semibold text-center mb-6">
          Welcome Back
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-3 rounded-lg"
        >
          Login
        </button>

        {/* 🔁 Go to Signup */}
        <p className="text-sm text-center mt-4">
          create account{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>

      </div>

    </div>
  );
}