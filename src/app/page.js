"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Typewriter from "./typewriter";

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
              Go to Login
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
      <footer className="mt-20 flex flex-col sm:flex-row justify-between items-center text-gray-400 text-sm font-mono pt-10 border-t border-gray-700">
  <p>&copy; 2025 by JUD-ex `Just Us Developers Extension`</p>

  <div className="flex gap-4 mt-4 sm:mt-0">
    {[
      { name: "GitHub", icon: "/github.png", link: "#" },
      { name: "LinkedIn", icon: "/linkedin.png", link: "#" },
      { name: "Twitter", icon: "/twitter.png", link: "#" },
      { name: "Website", icon: "/globe.svg", link: "#" },
    ].map((item, index) => (
      <a
        key={index}
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group border-1 border-purple-500 w-20 h-20 bg-gray-800 flex flex-col justify-center items-center rounded-lg shadow-lg transform transition-transform duration-300 hover:-translate-y-3 hover:shadow-2xl"
      >
        {/* Icon floats up on hover */}
        <div className="absolute  top-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Image src={item.icon} width={30} height={30} alt={item.name} />
        </div>

        {/* Label visible normally */}
        <span className="text-gray-300 font-mono font-bold">{item.name}</span>
      </a>
    ))}
  </div>
</footer>

    </div>
  );
}
