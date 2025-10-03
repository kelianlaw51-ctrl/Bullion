"use client";

import { useTransition } from 'react';
import { deleteShipment } from './actions';

export default function DeleteButton({ shipmentId }: { shipmentId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (confirm('Are you sure you want to delete this shipment?')) {
      startTransition(async () => {
        const result = await deleteShipment(shipmentId);
        if (result?.error) {
          alert(result.error);
        }
      });
    }
  };

  return (
    <button 
      onClick={handleClick}
      disabled={isPending}
      className="text-red-500 hover:text-red-700 disabled:opacity-50"
      suppressHydrationWarning
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}
