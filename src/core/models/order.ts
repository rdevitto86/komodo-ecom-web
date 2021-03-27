import { CatalogItem, CatalogItemJSON } from './catalog-item';
import { OrderLineItem, OrderLineItemJSON } from './order-line-item';
import { isPromotion, Promotion, PromotionJSON } from './promotion';

/**
 * @readonly
 * @constant {Object<Number, String>} INVOICE_STATE
 * @description mapping of invoice status/progress
 */
export const INVOICE_STATE: {[key:number]: string} = Object.freeze({
    1: 'OPEN',
    2: 'PARTIAL_PAYMENT',
    3: 'PAID',
    4: 'SCHEDULED',
    5: 'FUFILLED'
});

/**
 * @interface
 * @description defines an abstract Order object
 */
export interface OrderJSON {
    id: string;
    status?: number;
    lineItems: OrderLineItemJSON[];
    total: number;
    subTotal: number;
    salesTax: number;
    salesTaxRate: number;
    shippingCost: number;
    shippingRate: number;
    fees: number;
    promotion?: PromotionJSON;
}

/**
 * @class
 * @version 1.0
 * @description defines a new Order model
 */
export class Order {
    /**
     * @public
     * @property {String} id
     * @description invoice number (ID). Invoice IDs will be generated on submission.
     */
    public id: string = '*';

    // /**
    //  * @public
    //  * @property {Boolean} hasEdits
    //  * @description determines if the invoice model has invoice changes
    //  */
    // public hasEdits: boolean = false;

    /**
     * @public
     * @property {Number} total
     * @description invoice total
     */
    public total: number = 0;

    /**
     * @public
     * @property {Number} subTotal
     * @description invoice sub-total
     */
    public subTotal: number = 0;

    /**
     * @public
     * @property {Number} salesTax
     * @description applied sales tax
     */
    public salesTax: number = 0;

    /**
     * @public
     * @property {Number} salesTaxRate
     * @description local sales tax rate
     */
    public salesTaxRate: number = 1;

    /**
     * @public
     * @property {Number} shippingCost
     * @description total shipping cost
     */
    public shippingCost: number = 0;

    /**
     * @public
     * @property {Number} shippingRate
     * @description shipping rate for an order
     */
    public shippingRate: number = 0;

    /**
     * @public
     * @property {Number} fees
     * @description invoice fees (ex. processing, expedited, etc)
     */
    public fees: number = 0;

    /**
     * @public
     * @property {Promotion | Null} promotion
     * @description order-level promotion
     */
    public promotion: Promotion | null = null;

    /**
     * @public
     * @property {Number} _status
     * @description invoice status indicator
     */
     private _status: number = 1;

    /**
     * @public
     * @property {Map<String, LineItem>} _lineItems
     * @description invoice line items
     */
    private _lineItems: Map<String, OrderLineItem> = new Map();

    /**
     * @constructor
     * @param {OrderJSON} [props] invoice details object
     */
    constructor(props?: OrderJSON) {
        if (isOrder(props)) {
            const {
                id,
                status,
                lineItems,
                total,
                subTotal,
                salesTax,
                salesTaxRate,
                shippingCost,
                shippingRate,
                fees,
                promotion
            } = props;

            this.id = id;
            this.total = total;
            this.subTotal = subTotal;
            this.salesTax = salesTax;
            this.salesTaxRate = salesTaxRate;
            this.shippingCost = shippingCost;
            this.shippingRate = shippingRate;
            this.fees = fees;

            if (typeof status === 'number' && INVOICE_STATE[status]) {
                this._status = status;
            }
            if (lineItems instanceof Array) {
                for (const item of lineItems) {
                    if (item) {
                        this._lineItems.set(item.id, new OrderLineItem(item));
                    }
                }
            }
            if (promotion && typeof promotion === 'object') {
                this.promotion = new Promotion(promotion);
            }
        }
    }

    /**
     * @public
     * @function Order.addLineItem
     * @description adds a new line item to the invoice
     * @param {CatalogItemJSON | CatalogItem} item new invoice line item
     * @param {Number} quantity total quantity added
     */
    addLineItem(item: CatalogItemJSON | CatalogItem, quantity: number) {
        if (item && typeof item === 'object' && item.id && typeof quantity === 'number') {
            const { id, price, promotion } = item;
            const basePrice = price || 0;

            let itemPromotion = null;
            if (isPromotion(promotion)) {
                itemPromotion = (promotion instanceof Promotion)
                    ? promotion : new Promotion(promotion);
            }

            // build and set new line item
            this._lineItems.set(id, new OrderLineItem({
                id,
                details: item,
                quantity,
                basePrice,
                netCost: basePrice * quantity,
                promotion: itemPromotion,
                trackingNumbers: [],
                serviceDates: []
            }));

            // TODO adjust invoice totals
        }
    }

    /**
     * @public
     * @function Order.incramentLineItem
     * @description increases line item quantity by 1
     * @param {String} id line-item identifier
     */
    incramentLineItem(id: string) {
        const item = this._lineItems.get(id);
        if (item && item.quantity) {
            item.quantity++;
            // TODO adjust invoice totals
        }
    }

    /**
     * @public
     * @function Order.decramentLineItem
     * @description decreases line item quantity by 1
     * @param {String} id line-item identifier
     */
    decramentLineItem(id: string) {
        const item = this._lineItems.get(id);
        if (item && item.quantity && item.quantity < 0) {
            item.quantity--;
            // TODO adjust invoice totals
        }
    }

    /**
     * @public
     * @function Order.removeLineItem
     * @description removes a line item from the invoice
     * @param {String} id line item identifier
     */
    removeLineItem(id: string) {
        const item = this._lineItems.get(id);
        if (item) {
            // TODO adjust invoice totals
            this._lineItems.delete(id);
        }
    }

    /**
     * @public
     * @function Order.addPromotion
     * @description adds a promotion to the order or an order line-item
     * @param {Promotion | PromotionJSON} promo promotion details
     * @param {String} [id] line item identifier
     */
     addPromotion(promo: Promotion | PromotionJSON, id?: string) {
        if (promo && typeof promo === 'object') {
            // set param as Promotions model
            if (!(promo instanceof Promotion)) {
                promo = new Promotion(promo);
            }
            // add line-item promotion
            if (typeof id === 'string') {
                const item = this._lineItems.get(id);
                if (!item) {
                    return;
                }
                item.promotion = promo;
            } else {
                // add order promotion
                this.promotion = promo;
            }

            // TODO adjust invoice totals
        }
    }

    /**
     * @public
     * @function Order.addTrackingNumber
     * @description adds a tracking number to a line item
     * @param {String} id line item identifier
     * @param {String} trackingNumber tracking number to add
     */
    addTrackingNumber(id: string, trackingNumber: string) {
        const item = this._lineItems.get(id);

        if (item && typeof trackingNumber === 'string' && item.trackingNumbers) {
            if (item.trackingNumbers.indexOf(trackingNumber) === -1) {
                item.trackingNumbers.push(trackingNumber);
            }
        }
    }

    /**
     * @public
     * @function Order.addTrackingNumber
     * @description adds a service date to a line item
     * @param {String} id line item identifier
     * @param {String} serviceDate service date to add
     */
     addServiceDate(id: string, serviceDate: string) {
        const item = this._lineItems.get(id);

        if (item && typeof serviceDate === 'string' && item.serviceDates) {
            if (item.serviceDates.indexOf(serviceDate) === -1) {
                item.serviceDates.push(serviceDate);
            }
        }
    }

    /**
     * @public
     * @function Order.clearLineItems
     * @description clears line items and resets invoice values
     */
     clearLineItems() {
        this._lineItems.clear();
        this.total = 0;
        this.subTotal = 0;
        this.salesTax = 0;
        this.shippingCost = 0;
        this.fees = 0;
        this.promotion = null;
    }

    /**
     * @public
     * @readonly
     * @property {String} status
     * @description invoice status indicator
     */
    get status() {
        return INVOICE_STATE[this._status] || 'N/A';
    }
}

/**
 * @constant
 * @function isOrder
 * @description checks if an item is an OrderInvoice type object
 * @param {Any} obj object to reference
 * @returns {Boolean} true/false
 */
export const isOrder = (obj: any): obj is OrderJSON => (
    'id' in obj && 'lineItems' in obj && 'subTotal' in obj
);
