"use client";
import { useState } from "react";
import { Button } from "../../../pages/components/Button";

export default function Login() {
  const [show, setShow] = useState("text");
  const [data, setData] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const handleShow = () => {
    console.log("hey");
  };
  function handleConfirm() {
    password;
  }
  return (
    <div className="md:flex flex-col grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-20">
      <div className="md:flex flex-col gap-6 font-[arial]">
        <h1 className="text-white text-6xl text-center">GameDevAI</h1>
        <div className=" md:flex flex-col w-100 gap-10  h-140 rounded-lg p-6 text-center bg-black border-2 border-yellow-400">
          <h1 className="text-yellow-400 text-4xl font-weight-black ">
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
                className="text-yellow-300 border-2 border-yellow-300 w-full h-12 p-2"
              />
            </div>
            <div>
              <input
                onChange={setEmail}
                type={show}
                name="Email"
                id="email"
                placeholder="Email"
                className="text-yellow-300 border-2 border-yellow-300 w-full h-12 p-2"
              />
            </div>
            <div className="md:flex gap-2 w-full ">
              <input
                onChange={setPassword}
                type={show}
                name="password"
                id="password"
                placeholder="Password"
                className="text-yellow-300 border-2 border-yellow-300  h-12 w-full md:w-3/4 p-2"
              />
              <button
                onClick={() => {
                  if (show == "text") {
                    setShow("password");
                  } else {
                    setShow("text");
                  }
                }}
                className="text-black w-20 p-3  bg-yellow-300 hover:bg-red-300 w-full md:w-1/5 "
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
                className="text-yellow-300 border-2 border-yellow-300  h-12 w-full p-2"
              />
            </div>
          </div>
          <div className="md:flex flex-col gap-3">
            <Button Text="Signup" onClick={handleShow} />
            <p className="text-left p-2"> Already have an Account <a href="/Login" className="text-yellow-300">Signup</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
