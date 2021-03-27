import { CatalogItem, CatalogItemJSON, isCatalogItem } from './catalog-item';
import { isPromotion, Promotion, PromotionJSON } from './promotion';

/**
 * @interface
 * @description defines an abstract OrderLineItem object
 */
export interface OrderLineItemJSON {
    id: string;
    details: CatalogItemJSON | CatalogItem;
    basePrice?: number;
    quantity: number;
    netCost?: number;
    promotion?: PromotionJSON | Promotion | null;
    trackingNumbers?: string[];
    serviceDates?: string[];
}

/**
 * @class
 * @version 1.0
 * @description defines a new OrderLineItem model
 */
export class OrderLineItem {
    /**
     * @public
     * @property {String | Null} id
     * @description line-item identifier
     */
    public id: string | null = null;

    /**
     * @public
     * @property {CatalogItem | null} details
     * @description product/service details
     */
    public details: CatalogItem | null = null;

    /**
     * @public
     * @property {Number | Null} basePrice
     * @description price/cost of item
     */
    public basePrice: number | null = null;

    /**
     * @public
     * @property {Number | Null} quantity
     * @description quantity of item ordered
     */
    public quantity: number | null = null;

    /**
     * @public
     * @property {Number | Null} netCost
     * @description total cost of line item (price * quantity)
     */
    public netCost: number | null = null;

    /**
     * @public
     * @property {String[] | Null} trackingNumbers
     * @description tracking number(s) for products
     */
    public trackingNumbers: string[] | null = null;

    /**
     * @public
     * @property {String[] | Null} serviceDates
     * @description service date(s) for services
     */
    public serviceDates: string[] | null = null;

    /**
     * @public
     * @property {Promotion | null} promotion
     * @description item-level promotion
     */
    public promotion: Promotion | null = null;

    /**
     * @constructor
     * @param {OrderLineItemJSON} props line-item details object
     */
    constructor(props?: OrderLineItemJSON) {
        if (isOrderLineItem(props)) {
            const {
                id,
                details,
                quantity,
                basePrice,
                netCost,
                promotion,
                trackingNumbers,
                serviceDates
            } = props;

            this.id = id;

            // set item details
            if (isCatalogItem(details)) {
                this.details = (details instanceof CatalogItem)
                    ? details : new CatalogItem(details);
            }
            // set item quantity
            if (typeof quantity === 'number') {
                this.quantity = quantity;
            } else if (details.quantity) {
                this.quantity = details.quantity;
            }
            // set item price
            if (typeof basePrice === 'number') {
                this.basePrice = basePrice;
            } else if (details.price) {
                this.basePrice = details.price;
            }
            // set net-cost
            if (typeof netCost === 'number') {
                this.netCost = netCost;
            } else if (this.quantity && this.basePrice) {
                this.netCost = this.quantity * this.basePrice;
            }
            // set item-level promotion
            if (isPromotion(promotion)) {
                this.promotion = (promotion instanceof Promotion)
                    ? promotion : new Promotion(promotion);
            }
            // set item tracking number(s)
            if (trackingNumbers instanceof Array) {
                this.trackingNumbers = trackingNumbers;
            }
            // set item service date(s)
            if (serviceDates instanceof Array) {
                this.serviceDates = serviceDates;
            }
        }
    }
}

/**
 * @constant
 * @function isOrderLineItem
 * @description checks if an item is an OrderLineItem type object
 * @param {Any} obj object to reference
 * @returns {Boolean} true/false
 */
export const isOrderLineItem = (obj: any): obj is OrderLineItemJSON => (
    'id' in obj && 'quantity' in obj && 'details' in obj
);
