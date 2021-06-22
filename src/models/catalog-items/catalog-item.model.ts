import { CatalogItemJSON, isCatalogItem } from '../../npm/kfs-api/catalog-api/schemas/catalog-item';
import { isPromotion } from '../../npm/kfs-api/promotion-api/schemas/promotion';
import Promotion from '../promotions/promotion.model';

/**
 * Defines a new Catalog Item model
 * @version 1.0.0
 */
export default class CatalogItem {
    /**
     * Item's unique catalog identifier
     */
    catalogID: string | null = null;

    /**
     * Item's unique category identifier
     */
    categoryID: string | null = null;

    /**
     * Type of item
     */
    classifcation: string | null = null;

    /**
     * Quick-access tags
     */
    tags: string[] = [];

    /**
     * Item title
     */
    title: string | null = null;

    /**
     * Item description
     */
    description: string | null = null;

    /**
     * Enables item-level promotions
     */
    enablePromotions: boolean = false;

    /**
     * Item-level promotion
     */
    promotion: Promotion | null = null;

    /**
     * @param {CatalogItemJSON | CatalogItem} [props] item details object
     */
    constructor(props?: CatalogItemJSON | CatalogItem) {
        if (isCatalogItem(props)) {
            const {
                catalogID,
                categoryID,
                classifcation,
                tags,
                title,
                description,
                enablePromotions,
                promotion,
            } = props;

            // set catalog items
            this.catalogID = catalogID;

            if (categoryID) {
                this.categoryID = categoryID;
            }
            if (classifcation) {
                this.classifcation = classifcation;
            }
            if (tags instanceof Array) {
                this.tags = tags;
            }

            // set item descriptions
            this.title = title;
            this.description = description;

            // set promotion data
            if (enablePromotions === true && isPromotion(promotion)) {
                this.promotion = new Promotion(promotion);
            }
        }
    }
}
