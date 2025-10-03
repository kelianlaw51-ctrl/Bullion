import { prisma } from "@/lib/prisma";
import SummaryTabs from "./SummaryTabs";
import PrintButton from "./PrintButton";

async function getShipmentByCode(code: string) {
  const shipment = await prisma.shipment.findUnique({
    where: { trackingCode: code.toUpperCase() },
    include: {
      fromAddress: true,
      toAddress: true,
      statusUpdates: {
        orderBy: { timestamp: 'asc' },
      },
    },
  });
  return shipment;
}

const statusOrder: string[] = [
  'PENDING',
  'PICKED_UP',
  'IN_TRANSIT',
  'OUT_FOR_DELIVERY',
  'DELIVERED',
];

// ON_HOLD is handled separately - only shown if admin has activated it

export default async function TrackDetailsPage({ params }: { params: { code: string } }) {
  const shipment = await getShipmentByCode(params.code);

  if (!shipment) {
    return (
      <div className="bg-neutral-900 text-white min-h-screen">
        <div className="mx-auto max-w-3xl px-4 py-10 text-center">
          <h1 className="text-2xl font-bold mb-4">Shipment Not Found</h1>
          <p className="text-gray-400">We couldn’t find that tracking number. Please check the code and try again.</p>
        </div>
      </div>
    );
  }

  // Check if shipment is on hold (by checking latest status update notes for HOLD marker)
  const latestUpdate = shipment.statusUpdates?.[shipment.statusUpdates.length - 1];
  const isOnHold = latestUpdate?.notes?.includes('⚠️ HOLD:') || false;
  let currentStatusIndex = statusOrder.indexOf(shipment.status);
  let progressPercentage = 0;
  
  if (isOnHold) {
    // For ON_HOLD, find the last normal status before hold
    const lastNormalStatus = shipment.statusUpdates
      ?.filter((update: any) => statusOrder.includes(update.status))
      ?.slice(-1)[0]?.status;
    currentStatusIndex = lastNormalStatus ? statusOrder.indexOf(lastNormalStatus) : 0;
    progressPercentage = (currentStatusIndex / (statusOrder.length - 1)) * 100;
  } else {
    progressPercentage = currentStatusIndex >= 0 ? (currentStatusIndex / (statusOrder.length - 1)) * 100 : 0;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold">Tracking Details</h1>
        <PrintButton />
      </div>
      <p className="text-lg font-mono text-gray-400 mb-8">{shipment.trackingCode}</p>

      {/* Shipment Summary Tabs */}
      <SummaryTabs
        originCity={shipment.fromAddress.city}
        originCountry={shipment.fromAddress.country}
        originName={shipment.senderContactName}
        destinationCity={shipment.toAddress.city}
        destinationCountry={shipment.toAddress.country}
        destinationName={shipment.recipientContactName}
        status={shipment.status.replace(/_/g, ' ')}
      />

      {/* Sender and Recipient Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {/* Sender Information */}
        <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">Sender Information</h3>
          <div className="space-y-2">
            {shipment.senderContactName && (
              <div>
                <p className="text-xs text-gray-500">Contact Name</p>
                <p className="text-white font-medium">{shipment.senderContactName}</p>
              </div>
            )}
            {shipment.senderPhone && (
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-white">{shipment.senderPhone}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-gray-500">Address</p>
              <p className="text-white">{shipment.fromAddress.line1}</p>
              <p className="text-white">{shipment.fromAddress.city}, {shipment.fromAddress.postcode}</p>
              <p className="text-white">{shipment.fromAddress.country}</p>
            </div>
            {shipment.shipperCompany && (
              <div>
                <p className="text-xs text-gray-500">Company</p>
                <p className="text-white">{shipment.shipperCompany}</p>
              </div>
            )}
          </div>
        </div>

        {/* Recipient Information */}
        <div className="bg-neutral-800 rounded-lg p-4 border border-neutral-700">
          <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">Recipient Information</h3>
          <div className="space-y-2">
            {shipment.recipientContactName && (
              <div>
                <p className="text-xs text-gray-500">Contact Name</p>
                <p className="text-white font-medium">{shipment.recipientContactName}</p>
              </div>
            )}
            {shipment.recipientPhone && (
              <div>
                <p className="text-xs text-gray-500">Phone</p>
                <p className="text-white">{shipment.recipientPhone}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-gray-500">Address</p>
              <p className="text-white">{shipment.toAddress.line1}</p>
              <p className="text-white">{shipment.toAddress.city}, {shipment.toAddress.postcode}</p>
              <p className="text-white">{shipment.toAddress.country}</p>
            </div>
            {shipment.consigneeCompany && (
              <div>
                <p className="text-xs text-gray-500">Company</p>
                <p className="text-white">{shipment.consigneeCompany}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full mb-6">
        <div className="relative h-1.5 bg-neutral-700 rounded-full shadow-inner">
          <div 
            className={`absolute top-0 left-0 h-1.5 rounded-full transition-all duration-500 shadow-lg ${
              isOnHold 
                ? 'bg-gradient-to-r from-orange-500 to-orange-400' 
                : 'bg-gradient-to-r from-brand-teal to-green-400'
            }`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
          <div 
            className="absolute -top-1.5 w-4 h-4 bg-white rounded-full transition-all duration-500 shadow-lg flex items-center justify-center"
            style={{ left: `calc(${progressPercentage}% - 8px)` }}
          >
            <div className={`w-2.5 h-2.5 rounded-full ${isOnHold ? 'bg-orange-500' : 'bg-brand-teal'}`}></div>
          </div>
        </div>
        <div className="flex justify-between text-xs mt-2 text-gray-500">
          {statusOrder.map((status, index) => (
            <div key={status} className={`flex-1 text-center text-xs ${index <= currentStatusIndex ? 'font-medium text-white' : ''}`}>
              {status.replace(/_/g, ' ')}
            </div>
          ))}
        </div>
        
        {/* HOLD Warning - Only shown when admin activates it */}
        {isOnHold && (
          <div className="mt-4 p-4 bg-orange-500/20 border border-orange-500/30 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-orange-400 font-bold text-lg">⚠️ Shipment on Hold</h3>
                <p className="text-orange-300 font-medium">Requires Customs Clearance</p>
                <p className="text-orange-200 text-sm mt-1">Your shipment is temporarily on hold for customs processing. We'll update you once clearance is complete.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6">History</h2>
        <div className="border-l-2 border-neutral-700 ml-3">
          {shipment.statusUpdates.map((update: any, index: number) => (
            <div key={index} className="mb-8 ml-8 relative">
              <div className="absolute -left-[2.8rem] top-1 w-6 h-6 bg-neutral-600 rounded-full flex items-center justify-center ring-2 ring-neutral-800 z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--brand-accent)] ring-2 ring-white/40"></div>
              </div>
              <h3 className="text-lg font-semibold text-white">{update.status.replace(/_/g, ' ')}</h3>
              <time className="text-sm text-gray-500">{new Date(update.timestamp).toLocaleString()}</time>
              {update.location && <p className="mt-1 text-gray-300 font-medium">📍 {update.location}</p>}
              {update.notes && <p className="mt-1 text-gray-400">{update.notes}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
