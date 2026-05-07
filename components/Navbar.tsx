"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-black/70 backdrop-blur-md text-white fixed w-full z-50">

      {/* Logo */}
      <h1
        onClick={() => router.push("/")}
        className="text-xl font-bold cursor-pointer"
      >
        CollegeHub
      </h1>

      {/* Right side */}
      <div className="flex items-center gap-6">

        <Link href="/colleges" className="hover:text-orange-400">
          Explore
        </Link>

        <Link href="/review" className="hover:text-orange-400">
          Write a Review
        </Link>

        {!user ? (
          <button
            onClick={() => router.push("/login")}
            className="bg-orange-500 px-4 py-1 rounded hover:bg-orange-600"
          >
            Login
          </button>
        ) : (
          <div className="relative">

            {/* Avatar */}
            <div
              onClick={() => setOpen(!open)}
              className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center cursor-pointer font-bold"
            >
              {user.email?.charAt(0).toUpperCase()}
            </div>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg overflow-hidden">

                <div className="px-4 py-2 border-b text-sm">
                  {user.email}
                </div>

                <Link
                  href="/saved"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Saved Colleges
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>

              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}