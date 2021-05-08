import { CatalogItemJSON, isCatalogItem } from '../npm-libs/ts/types/catalog-item-type';
import { isPromotion } from '../npm-libs/ts/types/promotion-types';
import Promotion from './promotion';
import UserReview from './user-review';

/**
 * Defines a new Catalog Item model
 * @version 1.0.0
 */
export default class CatalogItem {
    /**
     * Item's unique catalog identifier
     */
    id: string | null = null;

    /**
     * Item's category identifier
     */
    catID: string | null = null;

    /**
     * Item title
     */
    title: string | null = null;

    /**
     * Item description
     */
    description: string | null = null;

    /**
     * Item price
     */
    price: number | null = null;

    /**
     * Item SKU number
     */
    sku: string | null = null;

    /**
     * Item quantity
     */
    quantity: number | null = null;

    /**
     * Item stock level
     */
    stock: number | null = null;

    /**
     * Item-level promotion
     */
    promotion: Promotion | null = null;

    /**
     * Aggregated user rating
     */
    itemRating: number | null = null;

    /**
     * User rating history
     */
    reviews: UserReview[] = [];

    /**
     * User's personal review
     */
    userReview: UserReview | null = null;

    /**
     * Enables user ratings
     */
    enableRatings: boolean = false;

    /**
     * Enables user reviews
     */
    enableReviews: boolean = false;

    /**
     * Enables item-level promotions
     */
    enablePromotions: boolean = false;

    /**
     * @param {CatalogItemJSON | CatalogItem} [props] item details object
     */
    constructor(props?: CatalogItemJSON | CatalogItem) {
        if (isCatalogItem(props)) {
            const {
                id,
                catID,
                title,
                description,
                price,
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
            this.title = title;
            this.description = description;
            this.price = price;

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
