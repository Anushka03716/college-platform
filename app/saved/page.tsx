"use client";

import { useEffect, useState } from "react";

type College = {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
};

export default function SavedPage() {
  const [savedColleges, setSavedColleges] = useState<College[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/saved")
      .then((res) => res.json())
      .then((data) => setSavedColleges(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Saved Colleges ❤️</h1>

      {savedColleges.length === 0 ? (
        <p>No saved colleges yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {savedColleges.map((college) => (
            <div
              key={college.id}
              className="border p-4 rounded-xl shadow"
            >
              <h2 className="text-xl font-bold">{college.name}</h2>
              <p>{college.location}</p>
              <p>Fees: ₹{college.fees}</p>
              <p>{college.rating}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}