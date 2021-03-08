import ValidationUtil from '../../app-auxiliary/util/validation-util';

/**
 * @class
 * @version 1.0.0
 * @description handles requests/responses for the Finance service
 */
export default class OrderService {
    /**
     * @private
     * @static
     * @readonly
     * @property {String} _SERVICE_URL
     * @description url for the Order service
     */
    private static readonly _SERVICE_URL = 'https://www.todo.com';

    /**
     * @public
     * @static
     * @async
     * @function OrderService.getOrder
     * @description fetches information for a specified order
     * @param {String} id order ID
     * @returns {Promise<Object | Undefined>} order details
     */
    static async getOrder(id: string): Promise<Object | undefined> {
        if (!ValidationUtil.isString(id)) {
            return undefined;
        }

        const response = await fetch(this._SERVICE_URL, {
            method: 'POST',
            body: JSON.stringify({ id })
        });

        return (response.ok) ? response.json() : undefined;
    }
}
