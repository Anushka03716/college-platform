"use client";

import { useSearchParams } from "next/navigation";

const colleges = [
  { id: 1, name: "IIT Delhi", location: "Delhi", fees: 200000, rating: 4.8 },
  { id: 2, name: "IIT Bombay", location: "Mumbai", fees: 210000, rating: 4.7 },
  { id: 3, name: "NIT Trichy", location: "Tamil Nadu", fees: 180000, rating: 4.6 },
  { id: 4, name: "BITS Pilani", location: "Rajasthan", fees: 300000, rating: 4.5 },
];

export default function ComparePage() {
  const params = useSearchParams();
  const ids = params.get("ids")?.split(",").map(Number) || [];

  const selectedColleges = colleges.filter((c) => ids.includes(c.id));

  if (selectedColleges.length < 2) {
    return <p className="p-6">Select at least 2 colleges</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Comparison</h1>

      <button className="mb-4 bg-blue-600 text-white px-4 py-2 rounded">
        Save Comparison
      </button>

      <table className="table-auto border w-full">
        <thead>
          <tr className="border">
            <th>Feature</th>
            {selectedColleges.map((c) => (
              <th key={c.id}>{c.name}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr className="border">
            <td>Location</td>
            {selectedColleges.map((c) => (
              <td key={c.id}>{c.location}</td>
            ))}
          </tr>

          <tr className="border">
            <td>Fees</td>
            {selectedColleges.map((c) => (
              <td key={c.id}>₹{c.fees}</td>
            ))}
          </tr>

          <tr className="border">
            <td>Rating</td>
            {selectedColleges.map((c) => (
              <td key={c.id}> {c.rating}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}