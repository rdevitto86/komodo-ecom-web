import { PaymentMethodJSON } from './payment-method-types';

/**
 * Defines an abstract Billing object
 */
 export interface BillingJSON {
    defaultMethod: PaymentMethodJSON | null
    paymentMethods: PaymentMethodJSON[];
}

/**
 * Checks if an item is a Billing type object
 * @param {any} obj object to reference
 * @returns {boolean} true/false
 */
 export function isBilling(obj: any): obj is BillingJSON {
    return 'defaultMethod' in obj && 'paymentMethods' in obj;
}
