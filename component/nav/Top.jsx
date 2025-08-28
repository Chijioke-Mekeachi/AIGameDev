'use client';

import Image from "next/image";
import { useUser } from "../context/UserContext"; // adjust the path if needed

export default function Top() {
  const { profile } = useUser();

  return (
    <section className="w-full flex justify-between items-center px-4 py-5 bg-gradient-to-r from-gray-600 to-gray-800">
      {/* Left - Brand Name */}
      <div>
        <code className="text-3xl font-bold text-white">GameDevAI</code>
      </div>

      {/* Right - Profile Section */}
      <div className="flex items-center gap-3">
        <Image
          src={profile?.avatar_url || "/profile.png"} // fallback if no avatar
          alt="Profile picture"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
        <code className="text-white text-sm">
          {profile?.username || "Guest"}
        </code>
      </div>
    </section>
  );
}