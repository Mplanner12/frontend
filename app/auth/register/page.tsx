"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import axios from "axios";
import axiosInstance from "../../../lib/utils";
import { useStateContext } from "../../../context/useStateContext";

export default function Register() {
  const { setUser, setToken } = useStateContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        { name, email, password, password_confirmation: confirmation }
      );

      if (response.status === 201) {
        console.log("Registration successful!");
        console.log(response.data);
        setUser(response.data.user);
        setToken(response.data.access_token);
        window.location.href = "/dashboard";
      } else {
        const data = await response.data;
        console.error("Registration failed:", data.message);
        // Handle registration error (e.g., display error message)
      }
    } catch (error) {
      console.error("Registration error:", error);
      // Handle network or other errors
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
          Create Account
        </h2>

        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm">
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full mt-1 p-3 rounded-lg bg-gray-700 placeholder-gray-500"
            />
          </div>

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

          <div>
            <label htmlFor="confirmPassword" className="text-sm">
              Confirm Password
            </label>
            <input
              onChange={(e) => setConfirmation(e.target.value)}
              type="password"
              id="confirmPassword"
              placeholder="••••••••"
              className="w-full mt-1 p-3 rounded-lg bg-gray-700 placeholder-gray-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full py-3 mt-6 rounded-lg bg-gradient-to-r from-orange-400 to-pink-500 text-white text-lg"
          >
            Create Account
          </button>
        </form>
        <div className="w-full flex justify-start mt-4">
          Already have an account?{"  "}
          <Link href="/auth/login" className="text-orange-400 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
