"use client";
import { useState } from "react";
import { Button } from "../../../component/components/Button";
import { useRouter } from "next/navigation";

export default function Login() {
  const [show, setShow] = useState("text");
  const [data, setData] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();
  const handleShow = () => {
    // console.log("hey
    router.push("/dashboard");
  };
  function handleConfirm() {
    password;
  }
  return (
    <div className="md:flex flex-col grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-20">
      <div className="md:flex flex-col gap-6 font-[arial]">
        <h1 className="font-bold text-6xl text-center bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent font-mono drop-shadow-lg">GameDevAI</h1>
        <div className=" md:flex flex-col w-100 gap-10  h-140 rounded-lg p-6 text-center bg-black border-2 border-blue-400">
          <h1 className="text-blue-800 text-4xl font-weight-black font-bold font-mono">
            SignUp
          </h1>
          <div className="md:flex  flex-col gap-6 align-center">
            <div>
              <input
                onChange={setUsername}
                type={show}
                name="Username"
                id="username"
                placeholder="username"
                className="rounded-lg outline-none text-white border-2 border-blue-400 w-full h-12 p-2 font-[mono]"
              />
            </div>
            <div>
              <input
                onChange={setEmail}
                type={show}
                name="Email"
                id="email"
                placeholder="Email"
                className="rounded-lg outline-none text-white border-2 border-blue-400 w-full h-12 p-2 font-[mono]"
              />
            </div>
            <div className="md:flex gap-2 w-full ">
              <input
                onChange={setPassword}
                type={show}
                name="password"
                id="password"
                placeholder="Password"
                className="rounded-lg outline-none text-white border-2 border-blue-400 w-full h-12 p-2 font-[mono] w-full md:w-3/4 p-2"
              />
              <button
                onClick={() => {
                  if (show == "text") {
                    setShow("password");
                  } else {
                    setShow("text");
                  }
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-500 hover:from-purple-600 hover:to-blue-500 text-white font-bold p-2 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out w-full md:w-1/5"
              >
                show
              </button>
            </div>
            <div className="md:flex gap-2 w-full ">
              <input
                type={show}
                name="password"
                id="password"
                placeholder="Confirm"
                className="rounded-lg outline-none text-white border-2 border-blue-400 w-full h-12 p-2 font-[mono]"
              />
            </div>
          </div>
          <div className="md:flex flex-col gap-3">
            <Button Text="Signup" onClick={handleShow} />
            <p className="text-left p-2"> Already have an Account <a href="/Login" className="text-blue-400">Signup</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
