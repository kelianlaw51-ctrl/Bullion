import { getRates } from "./actions";
import RateEditor from "./RateEditor";
import { ServiceType } from "@prisma/client";

export default async function AdminRatesPage() {
  const { rates, error } = await getRates();

  // Ensure all services have a rate object, even if it's a default one
  const allServices = Object.values(ServiceType);
  const rateMap = new Map(rates?.map(rate => [rate.service, rate]));

  const fullRates = allServices.map(service => {
    return rateMap.get(service) || {
      id: `new-${service}`,
      service: service,
      rateMinor: 0,
      currency: 'EUR',
    };
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Flat Rates</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        {fullRates.map(rate => (
          <RateEditor key={rate.service} rate={rate} />
        ))}
      </div>
    </div>
  );
}

