import { CatalogItemJSON, isCatalogItem } from '../../types/catalog-item';

/**
 * Defines an abstract Catalog Product object
 */
export interface ProductJSON extends CatalogItemJSON {
    sku: string;
    quantity?: number;
    stock?: number;
    features?: string | null
    specifications: null;
    enableRatings?: boolean;
    rating?: number;
    enableReviews?: boolean;
    reviews?: UserReviewJSON[];
    userReview?: UserReviewJSON;
    documentsURL?: string;
}

/**
 * Checks if an item is an Catalog Product type object
 * @param {any} obj object to reference
 * @returns {boolean} true/false
 */
export function isProduct(obj: any): obj is ProductJSON {
    return isCatalogItem(obj) && 'sku' in obj && 'price' in obj;
}
