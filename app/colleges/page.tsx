"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const API = "https://college-backend-ruwx.onrender.com";

type College = {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
};

export default function CollegesPage() {
  const router = useRouter();

  const [colleges, setColleges] = useState<College[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [maxFees, setMaxFees] = useState("");
  const [sort, setSort] = useState("");
  const [saved, setSaved] = useState<number[]>([]);

  // ⭐ NEW: compare selection
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) router.push("/login");
  }, [router]);

  useEffect(() => {
    fetch(`${API}/colleges`)
      .then((res) => res.json())
      .then((data) => setColleges(data))
      .catch((err) => console.error(err));
  }, []);

  const locations = useMemo(
    () => Array.from(new Set(colleges.map((c) => c.location))),
    [colleges]
  );

  const handleSave = async (id: number) => {
    await fetch(`${API}/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ college_id: id }),
    });

    setSaved((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  let filtered = colleges.filter((c) => {
    return (
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      (location === "" || c.location === location) &&
      (maxFees === "" || c.fees <= Number(maxFees))
    );
  });

  if (sort === "fees_low") {
    filtered = [...filtered].sort((a, b) => a.fees - b.fees);
  } else if (sort === "rating") {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="flex min-h-screen bg-gray-100 text-black">

      {/* LEFT FILTER PANEL */}
      <div className="w-1/4 bg-white p-5 border-r">
        <h2 className="text-lg font-bold mb-4">Filters</h2>

        <input
          type="text"
          placeholder="Search college..."
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc}>{loc}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Max Fees"
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setMaxFees(e.target.value)}
        />

        <select
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort</option>
          <option value="fees_low">Fees Low</option>
          <option value="rating">Top Rated</option>
        </select>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            router.push("/");
          }}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
        >
          Logout
        </button>
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-3/4 p-6">
        <h1 className="text-2xl font-bold mb-4">Find Colleges</h1>

        {/* ⭐ NEW COMPARE BUTTON */}
        <button
          onClick={() => {
            if (selected.length !== 2) {
              alert("Select exactly 2 colleges");
              return;
            }
            router.push(`/compare?id1=${selected[0]}&id2=${selected[1]}`);
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded mb-4"
        >
          Compare
        </button>

        <table className="w-full bg-white rounded-lg overflow-hidden shadow">
          <thead>
            <tr className="bg-gray-200 text-left">
              {/* ⭐ NEW COLUMN */}
              <th className="p-3">Select</th>
              <th className="p-3">Name</th>
              <th className="p-3">Location</th>
              <th className="p-3">Fees</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((college) => (
              <tr
                key={college.id}
                onClick={() => router.push(`/colleges/${college.id}`)}
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                {/* ⭐ CHECKBOX */}
                <td
                  className="p-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(college.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelected([...selected, college.id]);
                      } else {
                        setSelected(
                          selected.filter((id) => id !== college.id)
                        );
                      }
                    }}
                  />
                </td>

                <td className="p-3 text-blue-600 hover:underline">
                  {college.name}
                </td>

                <td className="p-3">{college.location}</td>
                <td className="p-3">₹{college.fees}</td>
                <td className="p-3">⭐ {college.rating}</td>

                <td
                  className="p-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <select
                    onChange={() => handleSave(college.id)}
                    className="border p-1 rounded"
                  >
                    <option>Save</option>
                    <option>Considering</option>
                    <option>Applied</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="mt-4 text-red-500">No colleges found</p>
        )}
      </div>
    </div>
  );
}