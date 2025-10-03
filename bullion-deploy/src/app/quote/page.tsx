"use client";

import { useMemo, useState } from "react";
import { SERVICES, CONSTRAINTS } from "@/config/services";
import { formatMoney } from "@/lib/money";
import SteppedSlider, { SliderOption } from "@/components/SteppedSlider";

export default function QuotePage() {
  const [service, setService] = useState<string>("same_day");

  const serviceOptions: SliderOption[] = [
    { label: "Same-day (within city)", value: "same_day" },
    { label: "Next-day (in-country)", value: "next_day" },
    { label: "International (3–7 days)", value: "international" },
  ];
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [weightKg, setWeightKg] = useState<string>("");
  const [dimsCm, setDimsCm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [estimate, setEstimate] = useState<{ amount_minor: number; currency: string; notes?: string } | null>(null);

  const dimSumM = useMemo(() => {
    const parts = dimsCm.split(/\s*x\s*|\s*,\s*|\s+/i).filter(Boolean).map(Number);
    const [l = 0, w = 0, h = 0] = parts;
    return (l + w + h) / 100; // cm -> m
  }, [dimsCm]);

  function validate(): boolean {
    setError(null);
    const weight = Number(weightKg);
    if (!pickup || !dropoff) {
      setError("Enter pickup and drop-off postcodes.");
      return false;
    }
    if (!Number.isFinite(weight) || weight <= 0) {
      setError("Enter a valid weight in kg.");
      return false;
    }
    if (weight > CONSTRAINTS.MAX_WEIGHT_KG) {
      setError(`Max weight is ${CONSTRAINTS.MAX_WEIGHT_KG} kg.`);
      return false;
    }
    if (dimSumM > CONSTRAINTS.MAX_DIM_SUM_M) {
      setError(`Max L+W+H is ${CONSTRAINTS.MAX_DIM_SUM_M} m.`);
      return false;
    }
    return true;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEstimate(null);
    if (!validate()) return;
    setIsLoading(true);
    fetch("/api/quote/estimate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ service, weightKg: Number(weightKg) }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to estimate quote.");
        setEstimate(data.price);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Get a quote</h1>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
        Quick estimate based on distance and weight.
      </p>
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SteppedSlider
          name="service"
          options={serviceOptions}
          value={service}
          onChange={setService}
        />
        <div className="text-xs text-gray-500 dark:text-gray-400 md:self-center">
          {SERVICES[service as keyof typeof SERVICES].description}
        </div>
        <input className="rounded-md ring-1 ring-black/10 dark:ring-white/10 px-4 py-3 bg-white dark:bg-black/20" placeholder="Pickup postcode" value={pickup} onChange={(e)=>setPickup(e.target.value)} />
        <input className="rounded-md ring-1 ring-black/10 dark:ring-white/10 px-4 py-3 bg-white dark:bg-black/20" placeholder="Drop-off postcode" value={dropoff} onChange={(e)=>setDropoff(e.target.value)} />
        <input className="rounded-md ring-1 ring-black/10 dark:ring-white/10 px-4 py-3 bg-white dark:bg-black/20" placeholder={`Weight (kg, ≤ ${CONSTRAINTS.MAX_WEIGHT_KG})`} value={weightKg} onChange={(e)=>setWeightKg(e.target.value)} />
        <input className="rounded-md ring-1 ring-black/10 dark:ring-white/10 px-4 py-3 bg-white dark:bg-black/20" placeholder={`Dimensions LxWxH (cm), sum ≤ ${CONSTRAINTS.MAX_DIM_SUM_M}m`} value={dimsCm} onChange={(e)=>setDimsCm(e.target.value)} />
        {error && (
          <div className="md:col-span-2 text-sm text-red-600 dark:text-red-400">{error}</div>
        )}
        <div className="md:col-span-2 flex gap-3">
          <button type="submit" disabled={isLoading} className="rounded-md bg-[var(--brand-accent)] text-black font-medium px-5 py-3 hover:opacity-90 transition disabled:opacity-50">{isLoading ? 'Calculating…' : 'Calculate'}</button>
          <span className="self-center text-sm text-gray-500 dark:text-gray-400">Demo only. Pricing engine coming soon.</span>
        </div>
      </form>
      {estimate && (
        <div className="mt-6 p-4 border rounded-md">
          <div className="font-semibold">Estimated price</div>
          <div className="text-lg">{formatMoney(estimate, 'en-DE')}</div>
          {estimate.notes && (
            <div className="mt-1 text-xs text-gray-500">{estimate.notes}</div>
          )}
        </div>
      )}
    </div>
  );
}
