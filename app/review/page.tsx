"use client";

import { useEffect, useState } from "react";

const API = "https://college-backend-ruwx.onrender.com";

type Review = {
  id: number;
  email: string;
  college_name: string;
  review: string;
  rating: number;
};

export default function ReviewPage() {
  const [college, setCollege] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {};

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API}/reviews`);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async () => {
    if (!user.email) {
      alert("Please login first");
      return;
    }

    if (!college.trim() || !review.trim()) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API}/add-review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          college_name: college,
          review,
          rating,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Review submitted successfully ✅");

        setCollege("");
        setReview("");
        setRating(5);

        fetchReviews();
      } else {
        alert("Failed to submit review");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Write a Review
      </h1>

      {user.email && (
        <p className="text-center text-sm text-gray-600 mb-4">
          Logged in as: <span className="font-semibold">{user.email}</span>
        </p>
      )}

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

        <input
          type="text"
          placeholder="College Name"
          value={college}
          onChange={(e) => setCollege(e.target.value)}
          className="border p-3 w-full mb-4 rounded-lg"
        />

        <textarea
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="border p-3 w-full mb-4 rounded-lg"
        />

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="border p-3 w-full mb-4 rounded-lg"
        >
          <option value={5}>⭐ 5 - Excellent</option>
          <option value={4}>⭐ 4 - Good</option>
          <option value={3}>⭐ 3 - Average</option>
          <option value={2}>⭐ 2 - Poor</option>
          <option value={1}>⭐ 1 - Bad</option>
        </select>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg w-full"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>

      <div className="max-w-3xl mx-auto mt-10">

        <h2 className="text-2xl font-bold mb-4">
          All Reviews
        </h2>

        {reviews.length === 0 ? (
          <p className="text-gray-500 italic">
            No reviews yet. Be the first to share your experience!
          </p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="bg-white p-4 mb-4 rounded-xl shadow">
              <h3 className="font-semibold text-lg">
                {r.college_name}
              </h3>

              <p className="text-sm text-gray-500">
                {r.email}
              </p>

              <p className="mt-2">{r.review}</p>

              <p className="mt-1 text-yellow-600 font-semibold">
                ⭐ {r.rating}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}