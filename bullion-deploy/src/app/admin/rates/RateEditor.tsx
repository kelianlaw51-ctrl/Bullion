"use client";

import { useTransition } from 'react';
import { upsertRate } from './actions';
import type { Rate } from '@prisma/client';

export default function RateEditor({ rate }: { rate: Rate | { id: string; service: any; rateMinor: number; currency: any; } }) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await upsertRate(formData);
      if (result?.error) {
        alert(result.error);
      }
    });
  };

  return (
    <form action={handleSubmit} className="p-4 border rounded-md grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
      <input type="hidden" name="service" value={rate.service} />
      <div className="font-semibold">{rate.service}</div>
      <input
        name="rate"
        type="number"
        step="0.01"
        defaultValue={(rate.rateMinor / 100).toFixed(2)}
        className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900"
      />
      <select
        name="currency"
        defaultValue={rate.currency}
        className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900"
      >
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
      </select>
      <button type="submit" disabled={isPending} className="rounded-md bg-brand-accent text-black font-medium px-4 py-2 hover:opacity-90 transition disabled:opacity-50">
        {isPending ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}
