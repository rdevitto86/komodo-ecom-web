import { PromotionJSON } from './promotion-types';
import { UserReviewJSON } from './user-review-types';

/**
 * Defines an abstract Catalog Item object
 */
 export interface CatalogItemJSON {
    // universal item properties
    id: string;
    catID?: string;
    title: string;
    description: string;
    price: number;

    // item rating properties
    itemRating?: number;
    enableRatings?: boolean;

    // item review properties
    reviews?: UserReviewJSON[];
    userReview?: UserReviewJSON;
    enableReviews?: boolean;

    // additional product properties
    sku?: string;
    quantity?: number;
    stock?: number;

    // promotions properties
    promotion?: PromotionJSON;
    enablePromotions?: boolean;
}

/**
 * Checks if an item is an CatalogItem type object
 * @param {any} obj object to reference
 * @returns {boolean} true/false
 */
export function isCatalogItem(obj: any): obj is CatalogItemJSON {
    return 'id' in obj && 'price' in obj && 'title' in obj && 'description' in obj;
}
