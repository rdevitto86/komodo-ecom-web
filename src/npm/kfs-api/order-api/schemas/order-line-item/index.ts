import { CatalogItemJSON } from '../../../catalog-api/schemas/catalog-item';
import { PromotionJSON } from '../../../promotion-api/schemas/promotion';

/**
 * Defines an abstract OrderLineItem object
 */
 export interface OrderLineItemJSON {
    id: string;
    details: CatalogItemJSON;
    basePrice: number;
    quantity: number;
    netCost: number;
    promotion?: PromotionJSON;
}

/**
 * Checks if an item is an OrderLineItem type object
 * @param {any} obj object to reference
 * @returns {boolean} true/false
 */
export function isOrderLineItem(obj: any): obj is OrderLineItemJSON {
    return 'id' in obj && 'quantity' in obj && 'details' in obj;
}
