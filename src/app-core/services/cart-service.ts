import HTTPClient from './http-client';

/**
 * @class
 * @extends HTTPClient
 * @description collection of operations used in the shopping cart service
 */
export default class CartService extends HTTPClient {
    /**
     * @public
     * @function CartService#addItem
     * @description adds a new product/service to the user's shopping cart
     * @see HTTPClient#POST
     */
    addItem(): void {
        //TODO
    }

    /**
     * @public
     * @function CartService#updateItem
     * @description updates a product/service in the user's shopping cart
     * @see HTTPClient#PUT
     */
    updateItem(): void {
        //TODO
    }

    /**
     * @public
     * @function CartService#removeItem
     * @description removes a product/service from the user's shopping cart
     * @see HTTPClient#DELETE
     */
    removeItem(): void {
        //TODO
    }
}
