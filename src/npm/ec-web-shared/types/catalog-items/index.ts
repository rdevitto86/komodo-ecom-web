import { PromotionJSON } from '../promotion';

/**
 * Defines an abstract Catalog Item object
 */
 export interface CatalogItemJSON {
    catalogID: string;
    categoryID?: string;
    classifcation: string;
    tags?: string[];
    title: string;
    description: string;
    enablePromotions?: boolean;
    promotion?: PromotionJSON;
}

/**
 * Checks if an item is an CatalogItem type object
 * @param {any} obj object to reference
 * @returns {boolean} true/false
 */
export function isCatalogItem(obj: any): obj is CatalogItemJSON {
    return 'catalogID' in obj && 'classifcation' in obj && 'title' in obj
        && 'description' in obj && 'enablePromotions' in obj;
}
