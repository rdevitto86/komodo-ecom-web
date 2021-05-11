import { AddressJSON } from '../address';

/**
 * Defines an abstract Business object
 */
 export interface CompanyJSON {
    name: string;
    contactName: string;
    contactEmail: string;
    contactPhone?: string;
    address: AddressJSON;
}

/**
 * Checks if an item is a Company type object
 * @param {any} obj object to reference
 * @returns {boolean} true/false
 */
 export function isCompany(obj: any): obj is CompanyJSON {
    return 'name' in obj && 'contactName' in obj && 'contactEmail' in obj;
}
