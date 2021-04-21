import HTTPS from '../../auxiliary/util/web/network/https';
import { Order } from '../models/order';
import ExceptionFactory from './exceptions/ExceptionFactory';
import Validations from '../../auxiliary/util/validation/validations';

/**
 * @private
 * @constant {String} SERVICE_URL
 * @description url for the Order service
 */
const SERVICE_URL = 'https://www.todo.com';

/**
 * @private
 * @constant {Object<String, String>} HEADERS
 * @description default headers for the API
 */
 const HEADERS = {
    'accept': 'application/json',
    'content-type': 'application/json',
};

/**
 * @class
 * @version 1.0
 * @extends {HTTPS}
 * @description handles requests/responses for the Order service
 */
export default class OrderService extends HTTPS {
    /**
     * @public
     * @async
     * @function OrderService.getOrder
     * @description fetches information for a specified order
     * @param {String} id order ID
     * @returns {Promise<Order>} order details
     * @throws {Error} service exception
     * @see HTTPS
     * @see ExceptionFactory
     */
    async getOrder(id: string): Promise<Order> {
        if (!Validations.isString(id)) {
            throw ExceptionFactory.build(400, "failed to get order info - invalid 'id' param");
        }

        const response = await this.POST(
            new Request(SERVICE_URL, {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify({
                    id
                })
            })
        );
        const body = response.json();

        if (response.ok) {
            return new Order(body);
        }
        throw ExceptionFactory.build(response.status, body.message);
    }
}
