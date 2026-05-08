"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const API = "https://college-backend-ruwx.onrender.com";

type College = {
  id: number;
  name: string;
  location: string;
  fees: number;
  rating: number;
};

type Review = {
  email: string;
  review: string;
  rating: number;
};

export default function CollegeDetail() {
  const { id } = useParams();
  const router = useRouter();

  const [college, setCollege] = useState<College | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5);

  useEffect(() => {
    fetch(`${API}/colleges`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((c: College) => c.id === Number(id));
        setCollege(found);
      });
  }, [id]);

  useEffect(() => {
    fetch(`${API}/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [id]);

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "No ratings";

  const saveCollege = async () => {
    await fetch(`${API}/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ college_id: id }),
    });

    alert("Saved!");
  };

  const addReview = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user.email) {
      alert("Please login first");
      return;
    }

    if (!newReview.trim()) {
      alert("Enter review");
      return;
    }

    await fetch(`${API}/add-review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        college_id: id,
        review: newReview,
        rating: newRating,
      }),
    });

    setNewReview("");

    const res = await fetch(`${API}/reviews/${id}`);
    const data = await res.json();
    setReviews(data);
  };

  if (!college) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white text-black min-h-screen">

      <button
        onClick={() => router.push("/colleges")}
        className="mb-4 text-blue-500 underline"
      >
        ← Back to Colleges
      </button>

      <h1 className="text-3xl font-bold mb-2">{college.name}</h1>
      <p>{college.location}</p>

      <p className="mt-3">Fees: ₹{college.fees}</p>
      <p>Rating: {college.rating}</p>
      <p className="mb-4">Avg Rating: {avgRating}</p>

      <button
        onClick={saveCollege}
        className="bg-red-500 text-white px-4 py-2 rounded mb-6"
      >
        Save College
      </button>

      <h2 className="text-2xl font-bold mt-6 mb-2">Courses Offered</h2>
      <ul className="list-disc ml-6">
        <li>B.Tech (Computer Science)</li>
        <li>B.Tech (Mechanical)</li>
        <li>M.Tech</li>
        <li>MBA</li>
      </ul>

      <h2 className="text-2xl font-bold mt-6 mb-2">Placements</h2>
      <p>Average Package: ₹10–20 LPA</p>
      <p>Placement Rate: 85%</p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((r, i) => (
          <div key={i} className="bg-gray-100 p-3 rounded mb-2">
            <p>{r.review}</p>
            <p className="text-sm text-gray-600">⭐ {r.rating}</p>
          </div>
        ))
      )}

      <div className="mt-6">
        <textarea
          placeholder="Write your review..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          className="w-full p-3 border rounded mb-3"
        />

        <input
          type="number"
          min="1"
          max="5"
          value={newRating}
          onChange={(e) => setNewRating(Number(e.target.value))}
          className="p-2 rounded mb-2"
        />

        <br />

        <button
          onClick={addReview}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}