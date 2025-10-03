import { CONSTRAINTS } from "@/config/services";

export type ParcelInput = {
  weightKg: number;
  dimSumM: number; // L + W + H in meters
};

export type AddressInput = {
  pickup?: string; // postcode or address
  dropoff?: string; // postcode or address
  sender?: string; // address string
  recipient?: string; // address string
};

export function validateParcel({ weightKg, dimSumM }: ParcelInput): string[] {
  const errors: string[] = [];
  if (!Number.isFinite(weightKg) || weightKg <= 0) {
    errors.push("Enter a valid weight in kg.");
  }
  if (weightKg > CONSTRAINTS.MAX_WEIGHT_KG) {
    errors.push(`Max weight is ${CONSTRAINTS.MAX_WEIGHT_KG} kg.`);
  }
  if (!Number.isFinite(dimSumM) || dimSumM <= 0) {
    errors.push("Enter valid dimensions.");
  }
  if (dimSumM > CONSTRAINTS.MAX_DIM_SUM_M) {
    errors.push(`Max L+W+H is ${CONSTRAINTS.MAX_DIM_SUM_M} m.`);
  }
  return errors;
}

export function validateLocations(addr: AddressInput): string[] {
  const errors: string[] = [];
  if ((addr.pickup === undefined || addr.dropoff === undefined) && (addr.sender === undefined || addr.recipient === undefined)) {
    errors.push("Provide pickup/drop-off or sender/recipient addresses.");
    return errors;
  }
  if (addr.pickup !== undefined && !addr.pickup) errors.push("Enter pickup postcode.");
  if (addr.dropoff !== undefined && !addr.dropoff) errors.push("Enter drop-off postcode.");
  if (addr.sender !== undefined && !addr.sender) errors.push("Enter sender address.");
  if (addr.recipient !== undefined && !addr.recipient) errors.push("Enter recipient address.");
  return errors;
}
