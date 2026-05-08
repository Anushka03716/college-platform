"use client";

export const dynamic = "force-dynamic";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const API = "https://college-backend-ruwx.onrender.com";

type College = {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
};

function CompareContent() {
  const searchParams = useSearchParams();

  const id1 = searchParams.get("id1");
  const id2 = searchParams.get("id2");

  const [c1, setC1] = useState<College | null>(null);
  const [c2, setC2] = useState<College | null>(null);

  useEffect(() => {
    fetch(`${API}/colleges`)
      .then((res) => res.json())
      .then((data) => {
        setC1(data.find((c: College) => c.id === Number(id1)));
        setC2(data.find((c: College) => c.id === Number(id2)));
      });
  }, [id1, id2]);

  if (!c1 || !c2) return <p className="p-6">Loading...</p>;

  const better =
    c1.rating > c2.rating
      ? "c1"
      : c2.rating > c1.rating
      ? "c2"
      : "tie";

  return (
    <div className="p-8 bg-white text-black min-h-screen">

      <h1 className="text-3xl font-bold text-center mb-8">
        Compare Colleges
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* COLLEGE 1 */}
        <div
          className={`p-6 rounded-xl shadow-md border ${
            better === "c1" ? "border-green-500" : "border-gray-200"
          }`}
        >
          {better === "c1" && (
            <p className="text-green-600 font-semibold mb-2">
              🏆 Better Choice
            </p>
          )}

          <h2 className="text-2xl font-bold mb-3">{c1.name}</h2>

          <p><b>📍 Location:</b> {c1.location}</p>
          <p><b>💰 Fees:</b> ₹{c1.fees}</p>
          <p><b>⭐ Rating:</b> {c1.rating}</p>

          <p className="mt-2"><b>🎓 Courses:</b> B.Tech, MBA</p>
          <p><b>📊 Placement:</b> 85%</p>
        </div>

        {/* COLLEGE 2 */}
        <div
          className={`p-6 rounded-xl shadow-md border ${
            better === "c2" ? "border-green-500" : "border-gray-200"
          }`}
        >
          {better === "c2" && (
            <p className="text-green-600 font-semibold mb-2">
              🏆 Better Choice
            </p>
          )}

          <h2 className="text-2xl font-bold mb-3">{c2.name}</h2>

          <p><b>📍 Location:</b> {c2.location}</p>
          <p><b>💰 Fees:</b> ₹{c2.fees}</p>
          <p><b>⭐ Rating:</b> {c2.rating}</p>

          <p className="mt-2"><b>🎓 Courses:</b> B.Tech, MBA</p>
          <p><b>📊 Placement:</b> 85%</p>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-10 text-center text-lg font-semibold">
        {better === "tie"
          ? "🤝 Both colleges are equally good!"
          : better === "c1"
          ? `${c1.name} is better based on rating`
          : `${c2.name} is better based on rating`}
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CompareContent />
    </Suspense>
  );
}