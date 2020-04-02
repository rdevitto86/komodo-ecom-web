/**
 * @interface
 * @description - defines a new Product abstract class
 */
export interface Product {
    getID(): string;
    getCost(): number;
}

/**
 * @class
 * @description - defines a new Product model
 */
export class Product implements Product {
    private id = '';
    private cost = 0;

    constructor(details = undefined) {
        const { id, cost } = details;

        this.id = id;
        this.cost = cost;
    }

    /**
     * @public
     * @function Product#getID
     * @description - gets the product ID
     * @returns {String}
     */
    public getID(): string {
        return this.id || '';
    }

    /**
     * @public
     * @function Product#getCost
     * @description - gets the product cost
     * @returns {Number}
     */
    public getCost(): number {
        return this.cost || 0;
    }
}
