"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Typewriter from "./typewriter";
import Footer from "../../component/components/ FooterSect";


export default function Home() {
  const router = useRouter();

  // Example list of games for the "PlayStore" section
  const games = [
    { name: "Space Invaders", img: "/icon.png" },
    { name: "Pixel Racer", img: "/icon.png" },
    { name: "Puzzle Mania", img: "/icon.png" },
    { name: "Block Builder", img: "/icon.png" },
    { name: "Maze Runner", img: "/icon.png" },
  ];

  return (
    <div className="font-sans min-h-screen flex flex-col justify-between bg-black text-white p-8 sm:p-20">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="font-bold text-6xl bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent font-mono drop-shadow-lg animate-gradient animate-typewriter inline-block">
          GameDevAI
        </h1>
        <p
          id="typewriter"
          className="mt-4 text-blue-400 font-mono text-lg min-h-[1.5rem]"
        ></p> 
        <Typewriter/>
      </header>

      {/* Main Content */}
      <main className="flex flex-col gap-16">
        {/* Featured Section */}
        <section className="grid sm:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-mono font-bold text-blue-500 mb-4">
              Build & Play
            </h2>
            <p className="text-white font-mono text-lg">
              Learn to create games with HTML, CSS, and JavaScript. Explore
              projects made by developers just like you. Start coding today and
              see your ideas come to life!
            </p>
            <button
              onClick={() => router.push("/Login")}
              className="mt-6 bg-gradient-to-r from-blue-600 to-purple-500 hover:from-purple-600 hover:to-blue-500 text-white font-bold p-3 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            >
              Start Building
            </button>
          </div>
          <div className="flex justify-center">
            <Image
              src="/logo.png"
              alt="GameDevAI Banner"
              width={400}
              height={400}
            />
          </div>
        </section>

        {/* PlayStore Section */}
        {/* PlayStore Section */}
        <section className="mt-20">
          <h2 className="text-4xl font-bold text-blue-500 mb-6 font-mono">
            Game Library
          </h2>
          <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {games.map((game, index) => (
              <div
                key={index}
                className="bg-gradient-to-tr from-gray-800 to-black rounded-lg p-4 hover:scale-105 transform transition duration-300 ease-in-out shadow-lg"
              >
                <Image
                  src={game.img}
                  alt={game.name}
                  width={200}
                  height={200}
                  className="rounded-md"
                />
                <p className="mt-2 text-center font-mono text-blue-300 font-bold">
                  {game.name}
                </p>

                {/* Download / Play button */}
                <div className="mt-4 flex justify-center">
                  <a
                    href={`/games/${game.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}.html`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                  >
                    Play / Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
