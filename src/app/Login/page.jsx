"use client";
import { useState } from "react";
import { Button } from "../../../pages/components/Button";
import { useRouter } from "next/navigation";

export default function Login() {
  const [showPassword, setShowPassword] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handle_show = () => {
    setShowPassword((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <div className="md:flex flex-col grid-rows-[20px_1fr_20px] items-center justify-between min-h-screen p-20">
      <div className="md:flex flex-col gap-6 font-[arial]">
        <h1 className="font-bold text-6xl text-center bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent font-mono drop-shadow-lg animate-gradient animate-typewriter inline-block">
          GameDevAI
        </h1>
        <div className="md:flex flex-col w-100 gap-10 h-100 rounded-lg p-6 text-center bg-black border-2 border-blue-400">
          <h1 className="font-mono text-blue-800 text-4xl font-weight-black font-bold">
            Login
          </h1>
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
                className="rounded-lg outline-none text-white border-2 border-blue-400 w-full h-12 p-2 font-[mono]"
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
                className="rounded-lg outline-none text-white border-2 border-blue-400 w-full h-12 p-2 font-[mono] w-full md:w-3/4 p-2"
              />
              <button
                onClick={handle_show}
                className="bg-gradient-to-r from-blue-600 to-purple-500 hover:from-purple-600 hover:to-blue-500 text-white font-bold p-2 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out w-full md:w-1/5"
              >
                {showPassword === "password" ? "Show" : "Hide"}
              </button>
            </div>
          </div>

          {/* Login + Link */}
          <div className="md:flex flex-col gap-3">
            <Button
              Text="Login"
              onClick={() => {
                router.push("/dashboard");
              }}
            />
            <p className="text-left p-2">
              I don't have an Account{" "}
              <a href="/Signup" className="text-blue-500">
                Signup
              </a>
            </p>
          </div>
          <div className="flex flex-row gap-2 py-2">
            <p className="text-1xl font-bold font-mono py-1 ">login with Google </p>
            <img src="/google1.png" alt="google" width={40} height={20} className="border-1 p-1 border-grey rounded-lg"/>
          </div>
        </div>
      </div>
      <div id="footer" className="flex flex-row w-full justify-between">
        <p>&copy; 2025 by JUD-ex `Just Us Developers Extention `</p>
        <div>
          x, github, linked,email, website
        </div>
      </div>
    </div>
  );
}
