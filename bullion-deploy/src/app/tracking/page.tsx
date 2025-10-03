"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode) return;

    setIsLoading(true);
    setError(null);

    // First, check if the shipment exists via the API
    const res = await fetch(`/api/track/${trackingCode}`);
    if (res.ok) {
      router.push(`/track/${trackingCode}`);
    } else {
      const data = await res.json();
      setError(data.error || "Shipment not found.");
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Track your parcel</h1>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
        Enter your tracking number to see live status.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          name="tracking"
          placeholder="e.g. BC-123456"
          value={trackingCode}
          onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
          className="flex-1 rounded-md ring-1 ring-black/10 dark:ring-white/10 px-4 py-3 bg-white dark:bg-black/20"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md bg-[var(--brand-accent)] text-black font-medium px-5 py-3 hover:opacity-90 transition disabled:opacity-50"
        >
          {isLoading ? "Tracking..." : "Track"}
        </button>
      </form>

      {error && (
        <div className="mt-8 p-4 text-sm text-red-800 bg-red-50 border border-red-200 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}

