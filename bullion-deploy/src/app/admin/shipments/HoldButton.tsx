"use client";

import { useState, useTransition, useEffect } from 'react';
import { putShipmentOnHold } from './actions';

export default function HoldButton({ shipmentId, isOnHold }: { shipmentId: string; isOnHold: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleToggleHold = () => {
    setError(null);

    const action = isOnHold ? 'remove' : 'add';
    const confirmMessage = isOnHold 
      ? 'Remove hold status from this shipment?' 
      : 'Put this shipment on hold for customs clearance?';

    if (confirm(confirmMessage)) {
      startTransition(async () => {
        const result = await putShipmentOnHold(shipmentId, action);
        if (result?.error) {
          setError(result.error);
        }
      });
    }
  };

  // Prevent hydration mismatch by only rendering after mount
  if (!hasMounted) {
    return (
      <div className="flex flex-col gap-1">
        <button 
          disabled
          className="px-4 py-2 rounded-md font-medium bg-gray-400 text-white opacity-50"
        >
          Loading...
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <button 
        onClick={handleToggleHold}
        disabled={isPending}
        className={`px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 ${
          isOnHold 
            ? 'bg-green-600 hover:bg-green-700 text-white' 
            : 'bg-orange-500 hover:bg-orange-600 text-white'
        }`}
        suppressHydrationWarning
      >
        {isPending ? 'Processing...' : isOnHold ? 'Remove Hold' : 'Put on Hold'}
      </button>
      {error && <div className="text-red-500 text-xs">{error}</div>}
    </div>
  );
}
