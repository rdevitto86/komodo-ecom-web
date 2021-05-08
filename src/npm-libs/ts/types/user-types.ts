import { AddressJSON } from './address-type';
import { BillingJSON } from './billing-type';
import { CompanyJSON } from './company-type';
import { OrderJSON } from './order-types';

/**
 * Mapping of account type priorities
 * @readonly
 */
 export const UserTypes: {[key:number]: string} = Object.freeze({
    1: 'GUEST',
    2: 'PERSONAL',
    3: 'BUSINESS',
});

/**
 * Defines an abstract Billing object
 */
export interface UserJSON {
    // account indentifiers
    id: string;
    type?: number;

    // user name information
    firstName: string;
    lastName: string;
    suffix?: string;

    // contact information
    email: string;
    phone?: string;

    // address details
    address?: AddressJSON;

    // business details
    company?: CompanyJSON;

    // billing details
    billing?: BillingJSON;

    // current/previous invoice(s)
    invoices?: {
        priority: number;
        lineItem: OrderJSON;
    }[];
}

/**
 * Checks if an item is a User type object
 * @param {any} obj object to reference
 * @returns {boolean} true/false
 */
 export function isUser(obj: any): obj is UserJSON {
    return 'id' in obj && 'type' in obj && 'email' in obj;
}
