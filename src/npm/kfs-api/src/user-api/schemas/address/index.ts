/**
 * Defines an abstract Address object
 */
export interface AddressJSON {
    line1: string;
    line2?: string;
    // line3?: string;
    city: string;
    state: string;
    county?: string;
    zipcode: string;
    country: string;
}

/**
 * Checks if an item is an Address type object
 * @param {any} obj object to reference
 * @returns {boolean} true/false
 */
export function isAddress(obj: any): obj is AddressJSON {
    return 'line1' in obj && 'city' in obj && 'state' in obj
        && 'zipcode' in obj && 'country' in obj;
}
