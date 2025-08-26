"use client";

export default function RightScreen() {
  const recentChat = [
    {
      title: "Bird Game",
      description: "Flapping bird game...",
      id: "uuid-bird",
    },
    {
      title: "Car Game",
      description: "Race car game...",
      id: "uuid-car",
    },
    {
      title: "3D Race",
      description: "3D racer game...",
      id: "uuid-3d",
    },
  ];

  return (
    <section className="bg-black w-full md:w-1/5 border-r border-gray-700 flex flex-col justify-between py-6 px-4">
      {/* Header */}
      <div>
        <h2 className="text-center font-bold text-2xl text-gray-300 mb-4">
          Recent Chats
        </h2>

        {/* Chat List */}
        <div className="flex flex-col gap-2 overflow-y-auto max-h-[60vh]">
          {recentChat.map((item) => (
            <button
              key={item.id}
              className="w-full text-left bg-gray-800 hover:bg-gray-700 text-gray-200 p-3 rounded-lg transition-colors"
            >
              <p className="text-base font-semibold">{item.title}</p>
              <p className="text-sm text-gray-400">{item.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Footer / Actions */}
      <div className="flex justify-around text-gray-400 text-sm pt-6 border-t border-gray-700 mt-4">
        <button className="hover:text-white transition">Settings</button>
        <button className="hover:text-white transition">Profile</button>
        <button className="hover:text-white transition">Zip</button>
      </div>
    </section>
  );
}
