"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import axiosInstance from "../../../lib/utils";
import { useStateContext } from "../../../context/useStateContext";

export default function Login() {
  const { setUser, setToken } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        { email, password }
      );
      console.log(response);
      if (response.status === 200) {
        console.log("Login Successful");
        console.log(response.data);
        setUser(response.data.user);
        setToken(response.data.access_token);
        // localStorage.setItem("Access_token", response.data.access_token);
        console.log(response.data.access_token);
        window.location.href = "/dashboard";
      } else {
        console.log("Login Failed");
      }
    } catch (error) {
      if (error instanceof TypeError) {
        console.error("Type Error:", error.message);
        // Handle type errors (e.g., accessing properties of undefined)
      } else if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.message);
        // Handle Axios-specific errors
      } else {
        console.error("Unexpected Error:", error);
        // Handle other unexpected errors
      }
    }
  };
  return (
    <div className="flex min-h-screen items-start md:items-center justify-center bg-gray-900 text-white">
      {/* App Header */}
      <header className="absolute top-0 left-0 w-full bg-gray-800 py-4 px-6">
        <h1 className="text-2xl font-semibold text-center text-white">
          <span className="text-orange-400">Fin</span>Track
        </h1>
      </header>
      <div className="w-80 p-6 rounded-lg mt-[5rem] md:mt-[3rem] bg-gray-800 shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Login to Your Account
        </h2>

        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="jane@domain.com"
              className="w-full mt-1 p-3 rounded-lg bg-gray-700 placeholder-gray-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full mt-1 p-3 rounded-lg bg-gray-700 placeholder-gray-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full py-3 mt-6 rounded-lg bg-gradient-to-r from-orange-400 to-pink-500 text-white text-lg"
          >
            Login
          </button>
        </form>
        <div className="w-full flex justify-start mt-4">
          Don't have an account?
          <Link
            href="/auth/register"
            className="text-orange-400 hover:underline"
          >
            {" "}
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
