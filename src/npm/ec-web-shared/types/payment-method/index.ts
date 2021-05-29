import { AddressJSON } from '../address';

/**
 * Defines an abstract Payment Method object
 */
 export interface PaymentMethodJSON {
    name: string | null;
    cardNumber?: string;
    cardType?: string;
    cardNetwork?: string;
    securityCode?: string;
    isPaymentProcessor?: boolean;
    isDefault?: boolean;
    billingAddress: AddressJSON;
}

/**
 * checks if an item is an Promotion type object
 * @param {any} obj object to reference
 * @returns {boolean} true/false
 */
 export function isPaymentMethod(obj: any): obj is PaymentMethodJSON {
    return 'name' in obj && 'billingAddress' in obj;
}
