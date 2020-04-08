/**
 * @interface
 * @description - defines a new Product abstract class
 */
export interface Product {
    id: string;
    cost: number;
}

/**
 * @class
 * @description - defines a new Product model
 */
export class Product {
    /**
     * @constructor
     * @description - creates a new Product object
     * @param {Product} details - object containing product details
     */
    constructor(details?: Product) {
        if (!details || details.constructor !== Object) {
            return;
        }

        const { id, cost } = details;

        this.id = id;
        this.cost = cost;
    }
}
