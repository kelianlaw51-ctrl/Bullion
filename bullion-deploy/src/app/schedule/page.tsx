"use client";

import { useMemo, useState } from "react";
import { SERVICES, CONSTRAINTS } from "@/config/services";
import SteppedSlider, { SliderOption } from "@/components/SteppedSlider";

export default function SchedulePage() {
  const [service, setService] = useState<string>("same_day");

  const serviceOptions: SliderOption[] = [
    { label: "Same-day (within city)", value: "same_day" },
    { label: "Next-day (in-country)", value: "next_day" },
    { label: "International (3–7 days)", value: "international" },
  ];
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [weightKg, setWeightKg] = useState<string>("");
  const [dimsCm, setDimsCm] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dimSumM = useMemo(() => {
    const parts = dimsCm.split(/\s*x\s*|\s*,\s*|\s+/i).filter(Boolean).map(Number);
    const [l = 0, w = 0, h = 0] = parts;
    return (l + w + h) / 100; // cm -> m
  }, [dimsCm]);

  function validate(): boolean {
    setError(null);
    setSuccess(null);
    const weight = Number(weightKg);
    if (!sender || !recipient) {
      setError("Enter both sender and recipient addresses.");
      return false;
    }
    if (!date || !time) {
      setError("Select a pickup date and time.");
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
    if (!validate()) return;
    setIsSubmitting(true);
    fetch("/api/pickups/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service,
        sender,
        recipient,
        pickupDate: date,
        pickupTime: time,
        weightKg: Number(weightKg),
        dimSumM,
        notes: notes || undefined,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to submit pickup request.");
        setSuccess("Pickup request submitted. We will confirm your slot soon.");
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsSubmitting(false));
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Schedule a pickup</h1>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
        Tell us when and where to collect your parcel.
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
        <input className="rounded-md ring-1 ring-black/10 dark:ring-white/10 px-4 py-3 bg-white dark:bg-black/20" placeholder="Sender address" value={sender} onChange={(e)=>setSender(e.target.value)} />
        <input className="rounded-md ring-1 ring-black/10 dark:ring-white/10 px-4 py-3 bg-white dark:bg-black/20" placeholder="Recipient address" value={recipient} onChange={(e)=>setRecipient(e.target.value)} />
        <input type="date" className="rounded-md ring-1 ring-black/10 dark:ring-white/10 px-4 py-3 bg-white dark:bg-black/20" value={date} onChange={(e)=>setDate(e.target.value)} />
        <input type="time" className="rounded-md ring-1 ring-black/10 dark:ring-white/10 px-4 py-3 bg-white dark:bg-black/20" value={time} onChange={(e)=>setTime(e.target.value)} />
        <input className="rounded-md ring-1 ring-black/10 dark:ring-white/10 px-4 py-3 bg-white dark:bg-black/20" placeholder={`Weight (kg, ≤ ${CONSTRAINTS.MAX_WEIGHT_KG})`} value={weightKg} onChange={(e)=>setWeightKg(e.target.value)} />
        <input className="rounded-md ring-1 ring-black/10 dark:ring-white/10 px-4 py-3 bg-white dark:bg-black/20" placeholder={`Dimensions LxWxH (cm), sum ≤ ${CONSTRAINTS.MAX_DIM_SUM_M}m`} value={dimsCm} onChange={(e)=>setDimsCm(e.target.value)} />
        <textarea className="md:col-span-2 rounded-md ring-1 ring-black/10 dark:ring-white/10 px-4 py-3 bg-white dark:bg-black/20" placeholder="Notes (optional)" value={notes} onChange={(e)=>setNotes(e.target.value)} />
        {error && (
          <div className="md:col-span-2 text-sm text-red-600 dark:text-red-400">{error}</div>
        )}
        {success && (
          <div className="md:col-span-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2">{success}</div>
        )}
        <div className="md:col-span-2">
          <button type="submit" disabled={isSubmitting} className="rounded-md bg-[var(--brand-accent)] text-black font-medium px-5 py-3 hover:opacity-90 transition disabled:opacity-50">{isSubmitting ? 'Submitting…' : 'Request pickup'}</button>
        </div>
      </form>
      <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">Demo only. Scheduling backend coming soon.</div>
    </div>
  );
}
