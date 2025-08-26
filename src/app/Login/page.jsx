"use client";
import { useState } from "react";
import { Button } from "../../../pages/components/Button";

export default function Login() {
  const [showPassword, setShowPassword] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handle_show = () => {
    setShowPassword((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div className="md:flex flex-col grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-20">
      <div className="md:flex flex-col gap-6 font-[arial]">
        <h1 className="text-white text-6xl text-center">GameDevAI</h1>
        <div className="md:flex flex-col w-100 gap-10 h-100 rounded-lg p-6 text-center bg-black border-2 border-blue-400">
          <h1 className="text-yellow-400 text-4xl font-weight-black">Login</h1>
          <div className="md:flex flex-col gap-6 align-center">
            {/* Email */}
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="Email"
                id="email"
                placeholder="Email"
                className="text-yellow-300 border-2 border-yellow-300 w-full h-12 p-2"
              />
            </div>

            {/* Password */}
            <div className="md:flex gap-2 w-full">
              <input
                type={showPassword}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                id="password"
                placeholder="Password"
                className="text-yellow-300 border-2 border-yellow-300 h-12 w-full md:w-3/4 p-2"
              />
              <button
                onClick={handle_show}
                className="text-black p-3 bg-yellow-300 hover:bg-red-300 w-full md:w-1/5"
              >
                {showPassword === "password" ? "Show" : "Hide"}
              </button>
            </div>
          </div>

          {/* Login + Link */}
          <div className="md:flex flex-col gap-3">
            <Button Text="Login" onClick={() => console.log(email, password)} />
            <p className="text-left p-2">
              I don't have an Account{" "}
              <a href="/Signup" className="text-blue-500">
                Signup
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
