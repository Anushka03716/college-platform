"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function CompareContent() {
  const searchParams = useSearchParams();

  const id1 = searchParams.get("id1");
  const id2 = searchParams.get("id2");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Compare Colleges</h1>
      <p>{id1} vs {id2}</p>
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