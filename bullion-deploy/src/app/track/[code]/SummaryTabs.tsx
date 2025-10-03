"use client";

import CollapsibleCard from "./CollapsibleCard";
import StaticCard from "./StaticCard";

export default function SummaryTabs({
  originCity,
  originCountry,
  originName,
  destinationCity,
  destinationCountry,
  destinationName,
  status,
}: {
  originCity: string;
  originCountry: string;
  originName?: string | null;
  destinationCity: string;
  destinationCountry: string;
  destinationName?: string | null;
  status: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
      <div key="origin-card">
        <CollapsibleCard
          frameClass="card-frame-simple"
          title="Origin"
          subtitle={`${originCity}, ${originCountry}`}
          detailLabel="Sender"
          detailValue={originName}
        />
      </div>

      <div key="destination-card">
        <CollapsibleCard
          frameClass="card-frame-simple"
          title="Destination"
          subtitle={`${destinationCity}, ${destinationCountry}`}
          detailLabel="Receiver"
          detailValue={destinationName}
        />
      </div>

      <StaticCard frameClass="card-frame-simple" title="Current Status">
        <div className="mt-1 text-sm font-bold text-white">{status}</div>
      </StaticCard>
    </div>
  );
}
