import Link from "next/link";
import { getShipments } from "./queries";
import StatusUpdater from "./StatusUpdater";
import DeleteButton from "./DeleteButton";
import HoldButton from "./HoldButton";

// Simple money formatter
function formatMoney({ amount_minor, currency }: { amount_minor: number; currency: string }) {
  const amount = amount_minor / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

export default async function AdminShipmentsPage() {
  const { shipments, error } = await getShipments();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Manage Shipments</h1>
        <Link href="/admin/shipments/new" className="rounded-md bg-brand-accent text-black font-medium px-4 py-2 hover:opacity-90 transition">
          Create Shipment
        </Link>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-neutral-800">
            <tr>
              <th className="p-3">Tracking Code</th>
              <th className="p-3">From</th>
              <th className="p-3">To</th>
              <th className="p-3">Service</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shipments?.map((shipment: any) => (
              <tr key={shipment.id} className="border-b border-gray-200 dark:border-neutral-700">
                <td className="p-3 font-mono">{shipment.trackingCode}</td>
                <td className="p-3">{shipment.fromAddress.city}, {shipment.fromAddress.country}</td>
                <td className="p-3">{shipment.toAddress.city}, {shipment.toAddress.country}</td>
                <td className="p-3">{shipment.service}</td>
                <td className="p-3">{formatMoney({ amount_minor: shipment.amountMinor, currency: shipment.currency })}</td>
                <td className="p-3"><StatusUpdater shipmentId={shipment.id} currentStatus={shipment.status} /></td>
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/shipments/${shipment.id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
                    <HoldButton shipmentId={shipment.id} isOnHold={shipment.statusUpdates?.[0]?.notes?.includes('⚠️ HOLD:') || false} />
                    <DeleteButton shipmentId={shipment.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

