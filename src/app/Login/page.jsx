"use client";

import { useState } from "react";
import { Button } from "../../../component/components/Button";
import { useRouter } from "next/navigation";
import { supabase } from "../../../component/lib/supabase";
import { useUser } from "../../../component/context/UserContext"; // ✅ import UserContext

export default function Login() {
  const [showPassword, setShowPassword] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { setUser, setProfile } = useUser(); // ✅ get setters from context

  const handle_show = () => {
    setShowPassword((prev) => (prev === "password" ? "text" : "password"));
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    // Supabase login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login failed: " + error.message);
      return;
    }

    if (data?.user) {
      // ✅ store user in context
      setUser(data.user);

      // fetch profile from Supabase
      const { data: profile, error: profileError } = await supabase
        .from("profile")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (!profileError) {
        setProfile(profile);
      }
    }

    // redirect after login
    router.push("/dashboard");
  };

  return (
    <div className="md:flex flex-col grid-rows-[20px_1fr_20px] items-center justify-between min-h-screen p-20">
      <div className="md:flex flex-col gap-6 font-[arial]">
        <h1 className="font-bold text-6xl text-center bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent font-mono drop-shadow-lg animate-gradient animate-typewriter inline-block">
          GameDevAI
        </h1>
        <div className="md:flex flex-col w-100 gap-10 h-100 rounded-lg p-6 text-center bg-black border-2 border-blue-400">
          <h1 className="font-mono text-blue-800 text-4xl font-bold">
            Login
          </h1>
          <div className="md:flex flex-col gap-6 align-center">
            {/* Email */}
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Password"
                className="rounded-lg outline-none text-white border-2 border-blue-400 w-full h-12 p-2 font-[mono] md:w-3/4"
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
            <Button Text="Login" onClick={handleLogin} />
            <p className="text-left p-2">
              I don't have an Account{" "}
              <a href="/Signup" className="text-blue-500">
                Signup
              </a>
            </p>
          </div>

          {/* Google login placeholder */}
          <div className="flex flex-row gap-2 py-2">
            <p className="text-1xl font-bold font-mono py-1">login with Google</p>
            <img
              src="/google1.png"
              alt="google"
              width={40}
              height={20}
              className="border-1 p-1 border-grey rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div id="footer" className="flex flex-row w-full justify-between">
        <p>&copy; 2025 by JUD-ex `Just Us Developers Extention `</p>
        <div>x, github, linked,email, website</div>
      </div>
    </div>
  );
}
