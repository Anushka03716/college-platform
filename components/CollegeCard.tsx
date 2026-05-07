"use client";

import Link from "next/link";

type College = {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
};

export default function CollegeCard({
  college,
  isSelected,
  onSelect,
  onSave,
  isSaved,
}: {
  college: College;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onSave: (id: number) => void;
  isSaved: boolean;
}) {
  return (
    <Link href={`/colleges/${college.id}`}>
      <div className="card relative cursor-pointer">

        {/*Select Checkbox */}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => {
            e.preventDefault();
            onSelect(college.id);
          }}
          className="absolute top-3 right-3"
        />

        {/*Title */}
        <h2 className="text-xl font-bold">{college.name}</h2>
        <p className="text-gray-300">{college.location}</p>

        {/*Info */}
        <div className="mt-3">
          <p>💰 ₹{college.fees}</p>
          <p>⭐ {college.rating}</p>
        </div>

        {/*Tags */}
        <div className="flex gap-2 mt-3">
          {college.rating >= 4.7 && (
            <span className="bg-green-500 px-2 py-1 text-xs rounded">
              Top Rated
            </span>
          )}
          {college.fees <= 100000 && (
            <span className="bg-blue-500 px-2 py-1 text-xs rounded">
              Budget
            </span>
          )}
        </div>

        {/*Save Button */}
        <button
          onClick={(e) => {
            e.preventDefault(); // prevents navigation
            onSave(college.id);
          }}
          className={`mt-4 w-full py-2 rounded text-white ${
            isSaved ? "bg-green-600" : "bg-red-500"
          }`}
        >
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>
    </Link>
  );
}