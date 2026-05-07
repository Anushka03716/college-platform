"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

  // Fetch college
  useEffect(() => {
    fetch("http://localhost:5000/colleges")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((c: College) => c.id === Number(id));
        setCollege(found);
      });
  }, [id]);

  // 📥 Fetch reviews for this college
  useEffect(() => {
    fetch(`http://localhost:5000/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [id]);

  // ⭐ Average rating
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "No ratings";

  // ❤️ Save college
  const saveCollege = async () => {
    await fetch("http://localhost:5000/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ college_id: id }),
    });

    alert("Saved!");
  };

  // ➕ Add review
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

    await fetch("http://localhost:5000/add-review", {
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

    // refresh reviews
    const res = await fetch(`http://localhost:5000/reviews/${id}`);
    const data = await res.json();
    setReviews(data);
  };

  if (!college) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white text-black min-h-screen">

      {/* Back */}
      <button
        onClick={() => router.push("/colleges")}
        className="mb-4 text-blue-400 underline"
      >
        ← Back to Colleges
      </button>

      {/* College Info */}
      <h1 className="text-3xl font-bold mb-2">{college.name}</h1>
      <p className="text-black-300">{college.location}</p>

      <p className="mt-3">Fees: ₹{college.fees}</p>
      <p>Rating: {college.rating}</p>
      <p className="mb-4">Avg Rating: {avgRating}</p>

      <button
        onClick={saveCollege}
        className="bg-red-500 px-4 py-2 rounded mb-6"
      >
        Save College
      </button>

      {/* Static Section (optional) */}
      <h2 className="text-2xl font-bold mt-6 mb-2">Courses Offered</h2>
      <ul className="list-disc ml-6 text-black">
        <li>B.Tech (Computer Science)</li>
        <li>B.Tech (Mechanical)</li>
        <li>M.Tech</li>
        <li>MBA</li>
      </ul>

      <h2 className="text-2xl font-bold mt-6 mb-2">Placements</h2>
      <p>Average Package: ₹10–20 LPA</p>
      <p>Placement Rate: 85%</p>

      {/* Reviews Section */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((r, i) => (
          <div key={i} className="bg-white text-black p-3 rounded mb-2">
            <p>{r.review}</p>
            <p className="text-sm text-gray-600">⭐ {r.rating}</p>
          </div>
        ))
      )}

      {/* ➕ Add Review */}
      <div className="mt-6">
        <textarea
          placeholder="Write your review..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-3 text-black bg-white"
        />

        <input
          type="number"
          min="1"
          max="5"
          value={newRating}
          onChange={(e) => setNewRating(Number(e.target.value))}
          className="p-2 text-black rounded mb-2"
        />

        <br />

        <button
          onClick={addReview}
          className="bg-green-500 px-4 py-2 rounded"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}