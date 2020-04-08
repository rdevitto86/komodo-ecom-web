import { ContractedService } from './contracted-service';
import { Product } from './product';

type Merchandise = Product | ContractedService;

/**
 * @class
 * @description - defines a new Invoice model
 */
export default class Invoice {
    private _totalCost = 0.00;
    private _lineItems: Merchandise[] = [];

    public totalItems = 0;
    public meta: object = {};

    /**
     * @public
     * @function Invoice#addLineItem
     * @description - adds a new line item to the order
     * @param {Object} lineItem - line item to add
     */
    addLineItem(lineItem: Merchandise): void {
        if (lineItem && 'cost' in lineItem) {
            this.updateTotalCost(lineItem.cost);
            this._lineItems.push(lineItem);
        }
    }

    /**
     * @public
     * @function Invoice#addLineItems
     * @description - adds an array of line items
     * @param {Array} items - array of line items to add
     */
    addLineItems(items: Merchandise[] = []): void {
        if (items && items instanceof Array) {
            for (let i = 0, len = items.length; i < len; i++) {
                try {
                    this.addLineItem(items[i]);
                } catch (e) {
                    //TODO - warning item(s) were not added to the invoice
                }
            }
        }
    }

    /**
     * @public
     * @function Invoice#clearInvoice
     * @description - resets the current invoice to an empty state
     */
    clearInvoice(): void {
        this._totalCost = 0.00;
        this._lineItems = [];
        this.totalItems = 0;
        this.meta = {};
    }

    /**
     * @public
     * @function Invoice#getCost
     * @description - gets invoice total cost
     * @returns {Number}
     */
    get getCost(): number {
        return this._totalCost;
    }

    /**
     * @public
     * @function Invoice#getLineItems
     * @description - gets invoice line items
     * @returns {Array}
     */
    get getLineItems(): Merchandise[] {
        return this._lineItems;
    }

    /**
     * @private
     * @function Invoice~updateTotalCost
     * @description - accepts a value and recalculates the invoice total cost
     * @param {Number} value - merchandise value to add
     */
    private updateTotalCost(value: number | string = 0): void {
        this._totalCost += Number.parseFloat((Number(value)).toFixed(2));
    }
}
