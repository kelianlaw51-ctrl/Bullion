export type RegionKey = 'DE' | 'EU' | 'US';

export const SUPPORTED_REGIONS: Record<RegionKey, { name: string; currency: string; notes?: string }> = {
  DE: { name: 'Germany', currency: 'EUR', notes: 'Primary operating region (MVP).' },
  EU: { name: 'Europe (selected countries)', currency: 'EUR', notes: 'Coverage expanding.' },
  US: { name: 'United States', currency: 'USD', notes: 'America coverage.' },
};

export const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE || 'en';
export const DEFAULT_CURRENCY = process.env.DEFAULT_CURRENCY || 'EUR';
