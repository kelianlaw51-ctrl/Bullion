import { getShipment } from "@/app/admin/shipments/queries";
import { updateShipment } from "@/app/admin/shipments/actions";
import { SERVICES, CONSTRAINTS } from "@/config/services";

export default async function EditShipmentPage({ params, searchParams }: { params: { id: string }; searchParams?: { error?: string } }) {
  const { id } = params;
  const { shipment, error: fetchError } = await getShipment(id);
  const error = searchParams?.error;

  if (fetchError) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Edit Shipment</h1>
        <div className="rounded-md bg-red-50 text-red-800 border border-red-200 px-4 py-3 text-sm">{fetchError}</div>
      </div>
    );
  }
  if (!shipment) return null;

  // Helper to format date yyyy-mm-dd
  const fmtDate = (d?: string | Date | null) => {
    if (!d) return "";
    const dt = new Date(d);
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    const day = String(dt.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  // Convert crates JSON back to textarea
  const cratesText = Array.isArray(shipment.crates)
    ? (shipment.crates as any[])
        .map((c) => `${c.l ?? c.L ?? ""}x${c.w ?? c.W ?? ""}x${c.h ?? c.H ?? ""}`)
        .join("\n")
    : "";

  // Calculate dimensions from dimSumM (stored in meters, display in cm)
  const totalDimCm = shipment.dimSumM * 100; // Convert meters to cm
  // For editing, we'll assume equal dimensions (L=W=H) for simplicity
  const assumedDimension = Math.round(totalDimCm / 3);
  
  // If we have crates data, use the first crate dimensions
  let defaultL = assumedDimension;
  let defaultW = assumedDimension; 
  let defaultH = assumedDimension;
  
  if (Array.isArray(shipment.crates) && shipment.crates.length > 0) {
    const firstCrate = shipment.crates[0] as any;
    defaultL = firstCrate.l ?? firstCrate.L ?? assumedDimension;
    defaultW = firstCrate.w ?? firstCrate.W ?? assumedDimension;
    defaultH = firstCrate.h ?? firstCrate.H ?? assumedDimension;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Shipment</h1>
      {error && (
        <div className="mb-4 rounded-md bg-red-50 text-red-800 border border-red-200 px-4 py-3 text-sm">
          {decodeURIComponent(error)}
        </div>
      )}

      <form action={updateShipment} className="space-y-6">
        <input type="hidden" name="id" value={shipment.id} />

        {/* Sender Address */}
        <div className="p-4 border rounded-md">
          <h2 className="text-lg font-semibold mb-2">Sender</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="fromLine1" placeholder="Address Line 1" required defaultValue={shipment.fromAddress.line1 ?? ""} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="fromCity" placeholder="City" required defaultValue={shipment.fromAddress.city ?? ""} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="fromPostcode" placeholder="Postcode" required defaultValue={shipment.fromAddress.postcode ?? ""} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="fromCountry" placeholder="Country (e.g., DE)" required defaultValue={shipment.fromAddress.country ?? ""} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
          </div>
        </div>

        {/* Recipient Address */}
        <div className="p-4 border rounded-md">
          <h2 className="text-lg font-semibold mb-2">Recipient</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="toLine1" placeholder="Address Line 1" required defaultValue={shipment.toAddress.line1 ?? ""} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="toCity" placeholder="City" required defaultValue={shipment.toAddress.city ?? ""} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="toPostcode" placeholder="Postcode" required defaultValue={shipment.toAddress.postcode ?? ""} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="toCountry" placeholder="Country (e.g., US)" required defaultValue={shipment.toAddress.country ?? ""} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
          </div>
        </div>

        {/* Parcel Details */}
        <div className="p-4 border rounded-md">
          <h2 className="text-lg font-semibold mb-2">Parcel</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input name="weightKg" type="number" step="0.1" min="0" max={CONSTRAINTS.MAX_WEIGHT_KG} placeholder={`Weight (kg, ≤ ${CONSTRAINTS.MAX_WEIGHT_KG.toLocaleString()})`} required defaultValue={shipment.weightKg} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="dimL" type="number" min="0" placeholder="Length (cm)" defaultValue={defaultL} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="dimW" type="number" min="0" placeholder="Width (cm)" defaultValue={defaultW} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="dimH" type="number" min="0" placeholder="Height (cm)" defaultValue={defaultH} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
          </div>
        </div>

        {/* Shipment Details */}
        <div className="p-4 border rounded-md">
          <h2 className="text-lg font-semibold mb-2">Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select name="service" defaultValue={shipment.service} required className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900">
              <option value="same_day">{SERVICES.same_day.label}</option>
              <option value="next_day">{SERVICES.next_day.label}</option>
              <option value="international">International (3–7 working days)</option>
            </select>
            <input name="amount" type="number" step="0.01" placeholder="Price (e.g., 12.99)" required defaultValue={(shipment.amountMinor / 100).toFixed(2)} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <select name="currency" defaultValue={shipment.currency} required className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900">
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>

        {/* Contacts */}
        <div className="p-4 border rounded-md">
          <h2 className="text-lg font-semibold mb-2">Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="senderContactName" placeholder="Sender contact name" defaultValue={shipment.senderContactName ?? ""} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="senderPhone" placeholder="Sender phone" defaultValue={shipment.senderPhone ?? ""} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="shipperEmail" type="email" placeholder="Sender email" defaultValue={shipment.shipperEmail ?? ""} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="recipientContactName" placeholder="Recipient contact name" defaultValue={shipment.recipientContactName ?? ""} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="recipientPhone" placeholder="Recipient phone" defaultValue={shipment.recipientPhone ?? ""} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="consigneeEmail" type="email" placeholder="Recipient email" defaultValue={shipment.consigneeEmail ?? ""} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
          </div>
        </div>

        {/* Business Details */}
        <div className="p-4 border rounded-md">
          <h2 className="text-lg font-semibold mb-2">Business Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="shipperCompany" placeholder="Shipper company name" defaultValue={shipment.shipperCompany ?? ""} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="shipperEori" placeholder="Shipper EORI number" defaultValue={shipment.shipperEori ?? ""} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="consigneeCompany" placeholder="Consignee company name" defaultValue={shipment.consigneeCompany ?? ""} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="consigneeEinTaxId" placeholder="Consignee EIN/Tax ID" defaultValue={shipment.consigneeEinTaxId ?? ""} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
          </div>
        </div>

        {/* Scheduling & Packaging */}
        <div className="p-4 border rounded-md">
          <h2 className="text-lg font-semibold mb-2">Scheduling & Packaging</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="pickupDate" type="date" placeholder="Pickup date" defaultValue={fmtDate(shipment.pickupDate)} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="expectedDeliveryDate" type="date" placeholder="Expected delivery date" defaultValue={fmtDate(shipment.expectedDeliveryDate)} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="numberOfPieces" type="number" min="1" step="1" placeholder="Number of pieces/crates" defaultValue={shipment.numberOfPieces ?? ""} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <select name="packagingType" defaultValue={shipment.packagingType ?? ""} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900">
              <option value="">Select packaging type</option>
              <option value="CRATE">Crate</option>
              <option value="PALLET">Pallet</option>
              <option value="BOX">Box</option>
              <option value="OTHER">Other</option>
            </select>
            <input name="countryOfOrigin" placeholder="Country of origin (ISO-2 e.g., DE)" defaultValue={shipment.countryOfOrigin ?? ""} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
          </div>
        </div>

        {/* Status Updates - Tracking History */}
        <div className="p-4 border rounded-md">
          <h2 className="text-lg font-semibold mb-2">Tracking History</h2>
          <p className="text-xs text-gray-500 mb-4">Edit the shipping status updates, dates, and locations</p>
          <div className="space-y-4">
            {(shipment.statusUpdates || []).map((update: any, index: number) => (
              <div key={update.id} className="p-3 bg-gray-50 dark:bg-neutral-800 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <input type="hidden" name={`updates[${index}][id]`} value={update.id} />
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select name={`updates[${index}][status]`} defaultValue={update.status} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900">
                      <option value="PENDING">Pending</option>
                      <option value="PICKED_UP">Picked Up</option>
                      <option value="IN_TRANSIT">In Transit</option>
                      <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input name={`updates[${index}][location]`} placeholder="Current location" defaultValue={update.location ?? ''} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Date & Time</label>
                    <input name={`updates[${index}][timestamp]`} type="datetime-local" defaultValue={new Date(update.timestamp).toISOString().slice(0, 16)} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Notes</label>
                    <textarea name={`updates[${index}][notes]`} placeholder="Additional notes" rows={2} defaultValue={update.notes ?? ''} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Crate Dimensions */}
        <div className="p-4 border rounded-md">
          <h2 className="text-lg font-semibold mb-2">Crate Dimensions</h2>
          <p className="text-xs text-gray-500 mb-2">Enter one crate per line as LxWxH in cm, e.g., 120x80x100</p>
          <textarea name="crates" rows={4} placeholder={`e.g.\n120x80x100\n60x40x40`} defaultValue={cratesText} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
        </div>

        {/* International / Customs (optional) */}
        <div className="p-4 border rounded-md">
          <h2 className="text-lg font-semibold mb-2">International / Customs (optional)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="declaredValue" type="number" step="0.01" placeholder="Declared value (e.g., 249.99)" defaultValue={shipment.declaredValueMinor ? (shipment.declaredValueMinor / 100).toFixed(2) : ""} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <select name="declaredCurrency" defaultValue={shipment.declaredCurrency ?? "EUR"} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900">
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
            <input name="incoterm" placeholder="Incoterm (e.g., DAP, DDP)" defaultValue={shipment.incoterm ?? ""} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="hsCode" placeholder="HS Code (e.g., 851762)" defaultValue={shipment.hsCode ?? ""} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="contentsDescription" placeholder="Contents description" defaultValue={shipment.contentsDescription ?? ""} className="md:col-span-2 block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
          </div>
          <p className="mt-2 text-xs text-gray-500">International deliveries typically take 3–7 working days depending on route and customs clearance.</p>
        </div>

        <button type="submit" className="rounded-md bg-brand-accent text-black font-medium px-5 py-3 hover:opacity-90 transition">
          Save Changes
        </button>
      </form>
    </div>
  );
}
