/**
 * defines a new Promotion abstract class
 */
 export interface PromotionJSON {
    id: string;
    title?: string;
    description?: string;
    dollarsOff: number;
    percentOff: number;
    hasFreeShipping: boolean;
    hasBOGO: boolean;
}

/**
 * Checks if an item is an Promotion type object
 * @param {any} obj object to reference
 * @returns {boolean} true/false
 */
 export function isPromotion(obj: any): obj is PromotionJSON {
    return 'id' in obj && 'dollarsOff' in obj && 'percentOff' in obj
        && 'hasFreeShipping' in obj && 'hasBOGO' in obj;
}
