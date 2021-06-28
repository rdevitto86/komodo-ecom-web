import Promotion from '../promotions/promotion.model';
import OrderLineItem from '../order-line-item/order-line-item.model';
import { InvoiceStates, isOrder, OrderJSON } from '../../npm/kfs-api/src/order-api/schemas/order';
// import { CatalogItem } from '../../npm/kfs-api/catalog-api/types/catalog-item';

/**
 * Defines a new Order model
 */
export default class Order {
    /**
     * Unique invoice indentifier.
     * In-progress orders will be dentoed by the * character.
     * Orders upon submission will have an auto-generated ID assigned to it.
     */
    id: string = '*';

    /**
     * Invoice line items
     */
    lineItems: Map<string, OrderLineItem> = new Map();

    /**
     * Invoice status indicator
     */
    status: number = 1;

    /**
     * Invoice total
     */
    total: number = 0;

    /**
     * Invoice sub-total
     */
    subTotal: number = 0;

    /**
     * Applied sales tax
     */
    salesTax: number = 0;

    /**
     * Local sales tax rate
     */
    salesTaxRate: number = 1;

    /**
     * Total shipping cost
     */
    shippingCost: number = 0;

    /**
     * Shipping rate for an order
     */
    shippingRate: number = 0;

    /**
     * Invoice fees (ex. processing, expedited, etc)
     */
    fees: number = 0;

    /**
     * Tracking number(s) for ordered products
     */
    trackingNumbers: Map<string, string[]> = new Map();

    /**
     * Date(s) for scheduled service(s)
     */
    serviceDates: Map<string, string[]> = new Map();

    /**
     * Order-level promotion
     */
    promotion: Promotion | null = null;

    /**
     * Enables order-level promotions
     */
    enablePromotions: boolean = false;

    // /**
    //  * Determines if the invoice model has changes
    //  */
    // hasEdits: boolean = false;

    /**
     * Total number of order line items added
     */
    get totalLineItems() {
        return this.lineItems.size;
    }

    /**
     * @param {OrderJSON | Order} [props] invoice details object
     */
    constructor(props?: OrderJSON | Order) {
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
                trackingNumbers,
                serviceDates,
                promotion,
                enablePromotions,
            } = props;

            this.id = id;
            this.total = total;
            this.subTotal = subTotal;
            this.salesTax = salesTax;
            this.salesTaxRate = salesTaxRate;
            this.shippingCost = shippingCost;
            this.shippingRate = shippingRate;
            this.fees = fees;

            // set order status
            if (typeof status === 'number' && InvoiceStates[status]) {
                this.status = status;
            }
            // set order line items
            if (lineItems instanceof Array) {
                for (const item of lineItems) {
                    if (item) {
                        this.lineItems.set(item.id, new OrderLineItem(item));
                    }
                }
            }
            // set order promotions
            if (promotion && typeof promotion === 'object') {
                this.promotion = new Promotion(promotion);
            }
            if (enablePromotions) {
                this.enablePromotions = true;
            }
            // set item tracking number(s)
            if (trackingNumbers && typeof trackingNumbers === 'object') {
                const keys = Object.keys(trackingNumbers);
                for (let i = 0, len = keys.length; i < len; i++) {
                    const key = keys[i];
                    this.trackingNumbers.set(key, trackingNumbers[key]);
                }
            }
            // set item service date(s)
            if (serviceDates && typeof serviceDates === 'object') {
                const keys = Object.keys(serviceDates);
                for (let i = 0, len = keys.length; i < len; i++) {
                    const key = keys[i];
                    this.serviceDates.set(key, serviceDates[key]);
                }
            }
        }
    }

    // /**
    //  * Adds a new line item to the invoice
    //  * @param {CatalogItem} item new invoice line item
    //  * @param {number} quantity total quantity added
    //  */
    // addLineItem(item: CatalogItem, quantity: number) {
    //     // TODO
    // }

    // /**
    //  * Increases line item quantity by 1
    //  * @param {string} id line-item identifier
    //  */
    // incramentLineItem(id: string) {
    //     // TODO
    // }

    // /**
    //  * Decreases line item quantity by 1
    //  * @param {string} id line-item identifier
    //  */
    // decramentLineItem(id: string) {
    //     // TODO
    // }

    /**
     * Removes a line item from the invoice
     * @param {string} id line item identifier
     */
    removeLineItem(id: string) {
        const item = this.lineItems.get(id);
        if (item) {
            this.lineItems.delete(id);
            this._rebalance(item);
            // this.hasEdits = true;
        } else {
            // TODO - logger
        }
    }

    /**
     * Checks if the order has a given line item
     * @param {string} id line item identifier
     */
    hasLineItem(id: string) {
        return this.lineItems.has(id);
    }

    // /**
    //  * Adds a promotion to the order or an order line-item
    //  * @param {Promotion | PromotionJSON} promo promotion details
    //  * @param {string} [id] line item identifier
    //  */
    // addPromotion(promo: Promotion | PromotionJSON, id?: string) {
    //     if (isPromotion(promo)) {
    //         if (!(promo instanceof Promotion)) {
    //             promo = new Promotion(promo);
    //         }
    //         // add line-item promotion
    //         if (typeof id === 'string') {
    //             const item = this.lineItems.get(id);
    //             if (!item) {
    //                 return;
    //             }
    //             item.promotion = promo;
    //         } else {
    //             // add order promotion
    //             this.promotion = promo;
    //         }

    //         this._rebalance(promo);
    //         // this.hasEdits = true;
    //     } else {
    //         // TODO - logger
    //     }
    // }

    /**
     * Adds a tracking number to a line item
     * @param {string} trackingNumber tracking number to add
     * @param {string[]} lineItemIDs IDs for associated line items
     */
    addTrackingNumber(trackingNumber: string, lineItemIDs: string[]) {
        this.trackingNumbers.set(trackingNumber, lineItemIDs);
        // this.hasEdits = true;
    }

    /**
     * Adds a service date to a line item
     * @param {string} serviceDate service date to add
     * @param {string[]} lineItemIDs IDs for associated line items
     */
    addServiceDate(serviceDate: string, lineItemIDs: string[]) {
        this.serviceDates.set(serviceDate, lineItemIDs);
        // this.hasEdits = true;
    }

    /**
     * Clears line items and resets invoice values
     */
    clearLineItems() {
        this.total = 0;
        this.subTotal = 0;
        this.salesTax = 0;
        this.shippingCost = 0;
        this.fees = 0;
        this.lineItems.clear();
        this.trackingNumbers.clear();
        this.serviceDates.clear();
        // this.hasEdits = true;
    }

    /**
     * Clears order promotion
     */
    clearPromotion() {
        this.promotion = null;
        // this.hasEdits = true;
    }

    /**
     * Adjusts order pricing when items are added/removed
     * @private
     * @param {OrderLineItem | Promotion} item updated item
     */
    private _rebalance(item: OrderLineItem | Promotion) {
        if (item instanceof OrderLineItem) {
            //
        } else if (item instanceof Promotion) {
            //
        } else {
            // TODO - logger
        }
    }
}
