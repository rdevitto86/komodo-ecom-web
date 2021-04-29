import { isPromotion, Promotion, PromotionJSON } from './promotion';
import { UserReview, UserReviewJSON } from './user-review';

/**
 * @type {ItemText}
 * @description defines textual details of a catalog item
 */
type ItemText = string | null;

/**
 * @type {ItemQuantity}
 * @description defines numeric quantity of a catalog item
 */
type ItemQuantity = number | null;

/**
 * @interface
 * @description defines an abstract Catalog Item object
 */
export interface CatalogItemJSON {
    // universal item properties
    id: string;
    catID?: string;
    price: ItemQuantity;
    description: ItemText;
    overview: ItemText;

    // item rating properties
    itemRating?: ItemQuantity;
    enableRatings?: boolean;

    // item review properties
    reviews?: UserReviewJSON[];
    userReview?: UserReview;
    enableReviews?: boolean;

    // additional product properties
    sku?: ItemText;
    quantity?: ItemQuantity;
    stock?: ItemQuantity;
    promotion?: PromotionJSON;
    enablePromotions?: boolean;
}

/**
 * @class
 * @version 1.0
 * @description defines a new Catalog Item model
 */
export class CatalogItem {
    /**
     * @public
     * @property {ItemText} id
     * @description catalog item id
     */
    public id: ItemText = null;

    /**
     * @public
     * @property {ItemText} catID
     * @description catalog item id
     */
    public catID: ItemText = null;

    /**
     * @public
     * @property {ItemQuantity} price
     * @description item price
     */
    public price: ItemQuantity = null;

    /**
     * @public
     * @property {ItemText} description
     * @description item description
     */
    public description: ItemText = null;

    /**
     * @public
     * @property {ItemQuantity} itemRating
     * @description aggregate user rating
     */
    public itemRating: ItemQuantity = null;

    /**
     * @public
     * @property {Boolean} enableRatings
     * @description enables user ratings functionality
     */
    public enableRatings: boolean = false;

    /**
     * @public
     * @property {UserReview[]} ratings
     * @description user rating history
     */
    public reviews: UserReview[] = [];

    /**
     * @public
     * @property {UserReview | Null} userReview
     * @description user's personal review
     */
    public userReview: UserReview | null = null;

    /**
     * @public
     * @property {Boolean} enableReviews
     * @description enables user reviews functionality
     */
    public enableReviews: boolean = false;

    /**
     * @public
     * @property {ItemText} sku
     * @description item SKU number
     */
    public sku: ItemText = null;

    /**
     * @public
     * @property {ItemQuantity} quantity
     * @description item quantity
     */
    public quantity: ItemQuantity = null;

    /**
     * @public
     * @property {ItemQuantity} stock
     * @description item stock level
     */
    public stock: ItemQuantity = null;

    /**
     * @public
     * @property {Promotion | PromotionJSON | Null} promotion
     * @description item-level promotion
     */
    public promotion: Promotion | null = null;

    /**
     * @public
     * @property {Boolean} enablePromotions
     * @description enables item-level promotions
     */
    public enablePromotions: boolean = false;

    /**
     * @constructor
     * @param {CatalogItemJSON} [props] item details object
     */
    constructor(props?: CatalogItemJSON) {
        if (isCatalogItem(props)) {
            const {
                id,
                catID,
                price,
                description,
                itemRating,
                reviews,
                enableRatings,
                enableReviews,
                sku,
                quantity,
                stock,
                promotion,
                enablePromotions,
            } = props;

            this.id = id;
            this.price = price;
            this.description = description;

            if (catID) {
                this.catID = catID;
            }

            // set ratings data (if enabled)
            if (enableRatings === true) {
                this.enableRatings = true;

                if (typeof itemRating === 'number') {
                    this.itemRating = itemRating;
                }
            }

            // set review data (if enabled)
            if (enableReviews === true) {
                this.enableReviews = true;

                // iterate through reviews and populate history
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
            }

            // bind product-only properties
            if (sku) {
                this.sku = sku;
            }
            if (quantity) {
                this.quantity = quantity;
            }
            if (stock) {
                this.stock = stock;
            }
            if (enablePromotions === true && isPromotion(promotion)) {
                this.promotion = new Promotion(promotion);
            }
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
