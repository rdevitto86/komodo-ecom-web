export * from './us-regions';
export * from './can-regions';
export * from './mex-regions';

export type AddressType = {
    id?: string;
    alias?: string;
    line1: string;
    line2?: string;
    line3?: string;
    company?: string;
    city: string;
    region: string; // states, provinces, etc.
    postalCode: string; // zip, etc.
    countryCode: string;
    isResidential?: boolean;
    isDefaultBilling?: boolean;
    isNew?: boolean;
    hasEdits?: boolean;
    geo?: [number, number]; // geo coordinates
}
