import { OrderLineItemJSON } from '../order-line-item';
import { PromotionJSON } from '../../../promotion-api/schemas/promotion';

/**
 * mapping of invoice status/progress
 * @readonly
 */
export const InvoiceStates: {[key:number]: string} = Object.freeze({
    1: 'OPEN',
    2: 'PARTIAL_PAYMENT',
    3: 'PAID',
    4: 'SCHEDULED',
    5: 'FUFILLED',
});

/**
 * Key is tracking number/service date. Value is an array of attached line items.
 */
export type TrackingInfo = {
    [key: string]: string[];
}

/**
 * Defines an abstract Order object
 */
export interface OrderJSON {
    id: string;
    status?: number;
    lineItems: OrderLineItemJSON[];
    total: number;
    subTotal: number;
    salesTax: number;
    salesTaxRate: number;
    shippingCost: number;
    shippingRate: number;
    fees: number;
    trackingNumbers?: TrackingInfo;
    serviceDates?: TrackingInfo;
    promotion?: PromotionJSON;
    enablePromotions?: boolean;
}

/**
 * Checks if an item is an OrderInvoice type object
 * @param {any} obj object to reference
 * @returns {boolean} true/false
 */
 export function isOrder(obj: any): obj is OrderJSON {
    return 'id' in obj && 'lineItems' in obj && 'subTotal' in obj;
}
