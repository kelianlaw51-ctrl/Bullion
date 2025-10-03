"use client";

import { useState, useTransition } from 'react';
import { updateShipmentStatus } from './actions';
import SegmentedControl, { SegmentedControlOption } from "@/components/SegmentedControl";

// Define the type locally to avoid import issues
const shipmentStatuses = ['PENDING', 'PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'] as const;
type ShipmentStatus = typeof shipmentStatuses[number];

export default function StatusUpdater({ shipmentId, currentStatus }: { shipmentId: string; currentStatus: ShipmentStatus }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = (newStatus: string) => {
    setError(null);

    startTransition(async () => {
      const result = await updateShipmentStatus(shipmentId, newStatus);
      if (result?.error) {
        alert(result.error);
      }
    });
  };

  // Use the locally defined statuses
  const statuses = shipmentStatuses;
  const statusOptions: SegmentedControlOption[] = statuses.map(status => ({
    label: status.replace(/_/g, ' '),
    value: status,
  }));

  return (
    <div>
      <SegmentedControl
        name={`status-${shipmentId}`}
        options={statusOptions}
        value={currentStatus}
        onChange={handleStatusChange}
      />
      {isPending && <span className="ml-2 text-sm">Saving...</span>}
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
}
