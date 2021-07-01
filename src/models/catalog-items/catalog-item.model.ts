import { CatalogItemJSON, isCatalogItem } from '../../npm/kfs-api/src/catalog-api/types/catalog-item';
import Promotion from '../promotions/promotion.model';

/**
 * Defines a new Catalog Item model
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
     * Cost of item
     */
    price: number | null = null;

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
    constructor(props?: CatalogItemJSON | CatalogItem | null) {
        if (isCatalogItem(props)) {
            const {
                catalogID,
                categoryID,
                classifcation,
                price,
                tags,
                title,
                description,
                enablePromotions,
                promotion,
            } = props;

            // set catalog items
            this.catalogID = catalogID;
            this.price = price;

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
