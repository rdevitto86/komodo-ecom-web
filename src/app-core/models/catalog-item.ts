import { isPromotion, Promotion, PromotionJSON } from './promotion';
import { UserReview, UserReviewJSON } from './user-review';

/**
 * @type {CatalogItemDetails}
 * @description defines textual details of a catalog item
 */
type CatalogItemDetails = string | null;

/**
 * @type {CatalogItemQuantity}
 * @description defines numeric quantity of a catalog item
 */
type CatalogItemQuantity = number | null;

/**
 * @interface
 * @description defines an abstract Catalog Item object
 */
export interface CatalogItemJSON {
    id: CatalogItemDetails;
    description: CatalogItemDetails;
    price: CatalogItemQuantity;
    totalRating?: number;
    personalRating?: CatalogItemQuantity;
    reviews?: UserReviewJSON[];
    sku?: CatalogItemDetails;
    quantity?: CatalogItemQuantity;
    stock?: CatalogItemQuantity;
    promotion?: PromotionJSON;
}

/**
 * @class
 * @version 1.0
 * @description defines a new Catalog Item model
 */
export class CatalogItem {
    /**
     * @public
     * @property {CatalogItemDetails} id
     * @description catalog item id
     */
    public id: CatalogItemDetails = null;

    /**
     * @public
     * @property {CatalogItemQuantity} price
     * @description item price
     */
    public price: CatalogItemQuantity = null;

    /**
     * @public
     * @property {CatalogItemDetails} description
     * @description item description
     */
    public description: CatalogItemDetails = null;

    /**
     * @public
     * @property {Number} totalRating
     * @description aggregate user rating
     */
    public totalRating: number = 0;

    /**
     * @public
     * @property {CatalogItemQuantity} personalRating
     * @description user's personal rating
     */
    public personalRating: CatalogItemQuantity = null;

    /**
     * @public
     * @property {UserReview[]} ratings
     * @description item user rating
     */
     public reviews: UserReview[] = [];

    /**
     * @public
     * @property {CatalogItemDetails} sku
     * @description item SKU number
     */
    public sku?: CatalogItemDetails;

    /**
     * @public
     * @property {CatalogItemQuantity} quantity
     * @description item quantity
     */
    public quantity?: CatalogItemQuantity;

    /**
     * @public
     * @property {CatalogItemQuantity} stock
     * @description item stock level
     */
    public stock?: CatalogItemQuantity;

    /**
     * @public
     * @property {Promotion | PromotionJSON | Null} promotion
     * @description item-level promotion
     */
    public promotion: Promotion | null = null;

    /**
     * @constructor
     * @param {CatalogItemJSON} [props] item details object
     */
    constructor(props?: CatalogItemJSON) {
        if (isCatalogItem(props)) {
            const {
                id,
                price,
                description,
                totalRating,
                personalRating,
                reviews,
                sku,
                quantity,
                stock,
                promotion
            } = props;

            // --- universal properties ---
            this.id = id;
            this.price = price;
            this.description = description;

            if (typeof totalRating === 'number') {
                this.totalRating = totalRating;
            }
            if (reviews instanceof Array && reviews.length) {
                const reviewList = [];

                // loop through reviews and map
                for (const review of reviews) {
                    if (review) {
                        reviewList.push(new UserReview(review));
                    }
                }

                this.reviews = reviewList;
            }

            // --- optional properties ---
            if (typeof personalRating === 'number') {
                this.personalRating = personalRating;
            }
            if (isPromotion(promotion)) {
                this.promotion = new Promotion(promotion);
            }

            // --- product-only properties ---
            this.sku = sku;
            this.quantity = quantity;
            this.stock = stock;
        }
    }
}

/**
 * @constant
 * @function isCatalogItem
 * @description checks if an item is an CatalogItem type object
 * @param {Any} obj object to reference
 * @returns {Boolean} true/false
 */
export const isCatalogItem = (obj: any): obj is CatalogItemJSON => (
    'id' in obj && 'price' in obj
);
