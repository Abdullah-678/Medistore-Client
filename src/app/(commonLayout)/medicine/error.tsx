"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MedicineError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
      <h1 className="text-xl font-semibold text-red-600">
        Something went wrong
      </h1>

      <div className="flex gap-3">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Retry
        </button>

        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}