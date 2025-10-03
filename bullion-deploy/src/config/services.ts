export type ServiceKey = 'same_day' | 'next_day' | 'scheduled' | 'international' | 'bulk';

export const SERVICES: Record<ServiceKey, { label: string; description: string; phase: 'mvp' | 'phase2' }> = {
  same_day: {
    label: 'Same-day (within city)',
    description: 'Fast delivery within the same city, delivered today.',
    phase: 'mvp',
  },
  next_day: {
    label: 'Next-day (in-country)',
    description: 'Reliable next business day delivery within the country.',
    phase: 'mvp',
  },
  scheduled: {
    label: 'Scheduled delivery',
    description: 'Pick an exact future date/time for collection and delivery.',
    phase: 'phase2',
  },
  international: {
    label: 'International shipping',
    description: 'Cross-border delivery with customs support.',
    phase: 'phase2',
  },
  bulk: {
    label: 'Bulk logistics',
    description: 'High-volume or palletized shipping solutions.',
    phase: 'phase2',
  },
};

// Parcel constraints (MVP), with environment overrides
export const CONSTRAINTS = {
  MAX_WEIGHT_KG: Number(process.env.MAX_WEIGHT_KG ?? 100000), // per parcel - increased for heavy cargo
  MAX_DIM_SUM_M: Number(process.env.MAX_DIM_SUM_M ?? 1000), // L+W+H in meters
} as const;
