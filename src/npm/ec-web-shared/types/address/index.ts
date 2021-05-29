/**
 * Defines an abstract Address object
 */
 export interface AddressJSON {
    line1: string;
    line2?: string;
    city: string;
    region: string;
    subRegion?: string;
    mailingCode: string;
    country: string;
}

/**
 * Checks if an item is an Address type object
 * @param {any} obj object to reference
 * @returns {boolean} true/false
 */
 export function isAddress(obj: any): obj is AddressJSON {
    return 'line1' in obj && 'city' in obj && 'region' in obj
        && 'mailingCode' in obj && 'country' in obj;
}
