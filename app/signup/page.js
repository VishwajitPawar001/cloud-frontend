"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupUser } from "../../services/auth";

export default function Signup() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {

    try {

      const data = await signupUser(email, password);

      if (data) {
        alert("Signup successful");
        router.push("/login");
      } else {
        alert("Signup failed");
      }

    } catch (error) {
      console.error(error);
      alert("Error during signup");
    }

  };

  return (

    <div className="flex items-center justify-center min-h-screen px-4">

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl md:text-2xl font-semibold text-center mb-6">
          Create Account
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
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white p-3 rounded-lg"
        >
          Sign Up
        </button>

        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>

      </div>

    </div>

  );

}