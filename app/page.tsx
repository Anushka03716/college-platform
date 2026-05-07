"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    const q = search.trim();
    router.push(q ? `/colleges?search=${encodeURIComponent(q)}` : "/colleges");
  };

  return (
    <div className="h-screen w-full relative">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/hero.jpg')", // keep your image in /public
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">

        {/* Heading */}
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-8 leading-tight">
          Find Colleges Across India
        </h1>

        {/* Search Bar */}
        <div className="flex w-full max-w-3xl bg-white rounded-lg overflow-hidden shadow-lg">

          <input
            type="text"
            placeholder="Search for colleges in India..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-4 text-black outline-none"
          />

          <button
            onClick={handleSearch}
            className="bg-orange-500 px-6 text-white font-semibold hover:bg-orange-600 transition"
          >
            Search
          </button>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => router.push("/colleges")}
          className="mt-8 bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition shadow-md"
        >
          Explore
        </button>

      </div>
    </div>
  );
}