import { createShipment } from "../actions";
import { SERVICES, CONSTRAINTS } from "@/config/services";

export default function NewShipmentPage({ searchParams }: { searchParams?: { error?: string } }) {
  const error = searchParams?.error;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create New Shipment</h1>
      {error && (
        <div className="mb-4 rounded-md bg-red-50 text-red-800 border border-red-200 px-4 py-3 text-sm">
          {decodeURIComponent(error)}
        </div>
      )}
      <form action={createShipment} className="space-y-6">
        
        {/* Sender Address */}
        <div className="p-4 border rounded-md">
          <h2 className="text-lg font-semibold mb-2">Sender</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="fromLine1" placeholder="Address Line 1" required className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="fromCity" placeholder="City" required className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="fromPostcode" placeholder="Postcode" required className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="fromCountry" placeholder="Country (e.g., DE)" required className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
          </div>
        </div>

        {/* Recipient Address */}
        <div className="p-4 border rounded-md">
          <h2 className="text-lg font-semibold mb-2">Recipient</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="toLine1" placeholder="Address Line 1" required className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="toCity" placeholder="City" required className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="toPostcode" placeholder="Postcode" required className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="toCountry" placeholder="Country (e.g., US)" required className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
          </div>
        </div>

        {/* Parcel Details */}
        <div className="p-4 border rounded-md">
          <h2 className="text-lg font-semibold mb-2">Parcel</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="weightKg" type="number" step="0.1" placeholder={`Weight (kg, ≤ ${CONSTRAINTS.MAX_WEIGHT_KG})`} required className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="dimL" type="number" placeholder="Length (cm)" className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="dimW" type="number" placeholder="Width (cm)" className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="dimH" type="number" placeholder="Height (cm)" className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
          </div>
        </div>

        {/* Shipment Details */}
        <div className="p-4 border rounded-md">
          <h2 className="text-lg font-semibold mb-2">Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select name="service" defaultValue="next_day" required className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900">
              <option value="same_day">{SERVICES.same_day.label}</option>
              <option value="next_day">{SERVICES.next_day.label}</option>
              <option value="international">International (3–7 working days)</option>
            </select>
            <input name="amount" type="number" step="0.01" placeholder="Price (e.g., 12.99)" required className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <select name="currency" defaultValue="EUR" required className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900">
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>

        {/* Contacts */}
        <div className="p-4 border rounded-md">
          <h2 className="text-lg font-semibold mb-2">Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="senderContactName" placeholder="Sender contact name" className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="senderPhone" placeholder="Sender phone" className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="shipperEmail" type="email" placeholder="Sender email" className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="recipientContactName" placeholder="Recipient contact name" className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="recipientPhone" placeholder="Recipient phone" className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="consigneeEmail" type="email" placeholder="Recipient email" className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
          </div>
        </div>

        {/* Business Details */}
        <div className="p-4 border rounded-md">
          <h2 className="text-lg font-semibold mb-2">Business Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="shipperCompany" placeholder="Shipper company name" className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="shipperEori" placeholder="Shipper EORI number" className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="consigneeCompany" placeholder="Consignee company name" className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="consigneeEinTaxId" placeholder="Consignee EIN/Tax ID" className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
          </div>
        </div>

        {/* Scheduling & Packaging */}
        <div className="p-4 border rounded-md">
          <h2 className="text-lg font-semibold mb-2">Scheduling & Packaging</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="pickupDate" type="date" placeholder="Pickup date" className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="expectedDeliveryDate" type="date" placeholder="Expected delivery date" className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="numberOfPieces" type="number" min="1" step="1" placeholder="Number of pieces/crates" className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <select name="packagingType" className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900">
              <option value="">Select packaging type</option>
              <option value="CRATE">Crate</option>
              <option value="PALLET">Pallet</option>
              <option value="BOX">Box</option>
              <option value="OTHER">Other</option>
            </select>
            <input name="countryOfOrigin" placeholder="Country of origin (ISO-2 e.g., DE)" className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
          </div>
        </div>

        {/* Crate Dimensions */}
        <div className="p-4 border rounded-md">
          <h2 className="text-lg font-semibold mb-2">Crate Dimensions</h2>
          <p className="text-xs text-gray-500 mb-2">Enter one crate per line as LxWxH in cm, e.g., 120x80x100</p>
          <textarea name="crates" rows={4} placeholder={`e.g.\n120x80x100\n60x40x40`} className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
        </div>

        {/* International / Customs (optional) */}
        <div className="p-4 border rounded-md">
          <h2 className="text-lg font-semibold mb-2">International / Customs (optional)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="declaredValue" type="number" step="0.01" placeholder="Declared value (e.g., 249.99)" className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <select name="declaredCurrency" defaultValue="EUR" className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900">
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
            </select>
            <input name="incoterm" placeholder="Incoterm (e.g., DAP, DDP)" className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="hsCode" placeholder="HS Code (e.g., 851762)" className="block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
            <input name="contentsDescription" placeholder="Contents description" className="md:col-span-2 block w-full px-3 py-2 rounded-md border border-black/20 dark:border-white/20 bg-white dark:bg-neutral-900" />
          </div>
          <p className="mt-2 text-xs text-gray-500">International deliveries typically take 3–7 working days depending on route and customs clearance.</p>
        </div>

        <button type="submit" className="rounded-md bg-brand-accent text-black font-medium px-5 py-3 hover:opacity-90 transition">
          Create Shipment
        </button>
      </form>
    </div>
  );
}
