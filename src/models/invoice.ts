import { CatalogItem } from './catalog-item';
import { Promotion } from './promotion';

/**
 * @private
 * @typedef {LineItemData}
 * @description defines the data structure for an invoice line item
 */
type LineItemData = {
    [key: string]: CatalogItem
};

/**
 * @interface
 * @description defines an abstract Invoice object
 */
export interface InvoiceAbstract {
    invoiceID?: string;
    isSubmitted: boolean;

    lineItems: LineItemData;

    total?: number;
    subTotal?: number;
    salesTax?: number;
    salesTaxRate?: number;
    shippingCost?: number;
    fees?: number;
    promotion?: Promotion

    trackingID?: string;
    serviceDates?: string;
}

/**
 * @class
 * @implements {Invoice}
 * @description defines a new Invoice model
 */
export class Invoice implements InvoiceAbstract {
    // business information
    private _invoiceID?: string;
    private _isSubmitted: boolean = false;

    // invoice data
    private _lineItems: LineItemData = {};
    private _total: number = 0;
    private _subTotal: number = 0;
    private _salesTax: number = 0;
    private _salesTaxRate?: number;
    private _shippingCost: number = 0;
    private _fees: number = 0;

    private _promotion?: Promotion;

    // delivery/service information
    private _trackingID?: string;
    private _serviceDates?: string;

    /**
     * @private
     * @function Invoice.updateTotals
     * @description updates invoice totals after update(s)
     * @param {Number} updatedPrice updated line item price
     * @returns {Boolean} success/failure
     */
    private updateTotals = (updatedPrice: number | undefined): boolean => {
        if (typeof updatedPrice !== 'number' || Number.isNaN(updatedPrice)) {
            return false;
        }

        this._total += updatedPrice;

        const { total, salesTaxRate } = this;

        if (total > 0) {
            if (salesTaxRate) {
                this._salesTax = total * salesTaxRate;
            }
        } else {
            // TODO handle zeroing out logic
        }

        return true;
    };

    /**
     * @constructor
     * @description creates a new Invoice object
     * @param {Object<InvoiceAbstract>} [props] invoice details object
     */
    constructor(props?: InvoiceAbstract) {
        if (props && typeof props === 'object') {
            const {
                invoiceID,
                isSubmitted,
                lineItems,
                total,
                subTotal,
                salesTax,
                salesTaxRate,
                shippingCost,
                fees,
                promotion,
                trackingID,
                serviceDates,
            } = props;

            this.invoiceID = invoiceID;
            this.isSubmitted = isSubmitted;
            this.salesTaxRate = salesTaxRate;
            this.trackingID = trackingID;
            this.serviceDates = serviceDates;

            if (total) {
                this.total = total;
            }
            if (subTotal) {
                this.subTotal = subTotal;
            }
            if (salesTax) {
                this.salesTax = salesTax;
            }
            if (shippingCost) {
                this.shippingCost = shippingCost;
            }
            if (fees) {
                this.fees = fees;
            }
            if (lineItems) {
                this._lineItems = lineItems;
            }
            if (promotion) {
                this._promotion = promotion;
            }
        }
    }

    /**
     * @public
     * @function Invoice.addLineItem
     * @description adds a new line item to the invoice
     * @param {CatalogItem} item new invoice line item
     */
    addLineItem(item: CatalogItem) {
        if (item instanceof CatalogItem) {
            const { id, price } = item;

            if (!this._lineItems[id] && this.updateTotals(price)) {
                this._lineItems[id] = item;
            }
        }
    }

    /**
     * @public
     * @function Invoice.removeLineItem
     * @description removes a line item from the invoice
     * @param {String} id identifier for item to remove
     */
    removeLineItem(id: string) {
        const item = this._lineItems[id];

        if (item && this.updateTotals(item.price)) {
            delete this._lineItems[id];
        }
    }

    /**
     * @public
     * @function Invoice.clear
     * @description clears line items and resets invoice values
     */
    clearInvoice() {
        this._lineItems = {};
        this._total = 0;
        this._subTotal = 0;
        this._salesTax = 0;
        this._shippingCost = 0;
        this._fees = 0;
        this._promotion = undefined;
        this._serviceDates = undefined;
    }

    /**
     * @public
     * @property {String | Undefined} invoiceID
     * @description invoice number (ID)
     */
    get invoiceID() {
        return this._invoiceID;
    }
    set invoiceID(id: string | undefined) {
        if (typeof id === 'string') {
            this._invoiceID = id;
        }
    }

    /**
     * @public
     * @property {Boolean} isSubmitted
     * @description invoice submission status
     */
    get isSubmitted() {
        return this._isSubmitted;
    }
    set isSubmitted(status: boolean) {
        if (typeof status === 'boolean') {
            this._isSubmitted = status;
        }
    }

    /**
     * @public
     * @readonly
     * @property {LineItemData} invoiceID
     * @description invoice line items
     */
    get lineItems(): LineItemData {
        return this._lineItems;
    }

    /**
     * @public
     * @property {Number} total
     * @description invoice total
     */
    get total() {
        return this._total;
    }
    set total(value: number) {
        if (typeof value === 'number') {
            this._total = value;
        }
    }

    /**
     * @public
     * @property {Number} subTotal
     * @description invoice sub-total
     */
    get subTotal() {
        return this._subTotal;
    }
    set subTotal(value: number) {
        if (typeof value === 'number') {
            this._subTotal = value;
        }
    }

    /**
     * @public
     * @property {Number} salesTax
     * @description applied sales tax
     */
    get salesTax() {
        return this._salesTax;
    }
    set salesTax(value: number) {
        if (typeof value === 'number') {
            this._salesTax = value;
        }
    }

    /**
     * @public
     * @property {Number | Undefined} salesTaxRate
     * @description local sales tax rate
     */
    get salesTaxRate() {
        return this._salesTaxRate;
    }
    set salesTaxRate(value: number | undefined) {
        if (typeof value === 'number') {
            this._salesTaxRate = value;
        }
    }

    /**
     * @public
     * @property {Number} shippingCost
     * @description total shipping cost
     */
    get shippingCost() {
        return this._shippingCost;
    }
    set shippingCost(value: number) {
        if (typeof value === 'number') {
            this._shippingCost = value;
        }
    }

    /**
     * @public
     * @property {Number} fees
     * @description invoice fees (ex. processing, expedited, etc)
     */
    get fees() {
        return this._fees;
    }
    set fees(value: number) {
        if (typeof value === 'number') {
            this._fees = value;
        }
    }

    /**
     * @public
     * @property {Promotion} promotion
     * @description invoice promotion
     */
    get promotion() {
        return this._promotion;
    }
    set promotion(promo: Promotion | undefined) {
        if (promo instanceof Promotion || promo === undefined) {
            this._promotion = promo;
        }
    }

    /**
     * @public
     * @property {String | Undefined} trackingID
     * @description product(s) tracking ID
     */
    get trackingID() {
        return this._trackingID;
    }
    set trackingID(id: string | undefined) {
        if (typeof id === 'string') {
            this._trackingID = id;
        }
    }

    /**
     * @public
     * @property {String | Undefined} serviceDates
     * @description scheduled service date(s)
     */
    get serviceDates() {
        return this._serviceDates;
    }
    set serviceDates(date: string | undefined) {
        if (typeof date === 'string') {
            this._serviceDates = date;
        }
    }
}
