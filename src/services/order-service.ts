import HTTPS from '../npm-libs/typescript/web/network/https';
import { Order, OrderJSON } from '../models/order';
import Validations from '../npm-libs/typescript/util/validation/validations';
import ServiceException from '../npm-libs/typescript/exceptions/service-exception';

// /**
//  * @private
//  * @constant {String} BASE_URL
//  * @description Order API endpoint
//  */
// const API_URL = `${process.env.ORDER_API_URL || ''}/${process.env.ORDER_API_VER || ''}`;

const API_URL = '';

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
 * @interface
 * @description defines response for getOrder request
 */
export interface GetOrderResponse {
    status?: number;
    message?: string;
    order?: OrderJSON
}

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
     * @throws {ServiceException} service exception
     * @see HTTPS
     */
    async getOrder(id: string): Promise<Order> {
        if (!Validations.isString(id)) {
            throw new ServiceException(400, "failed to get order info - invalid 'id' param");
        }

        const response = await this.POST(
            new Request(API_URL, {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify({
                    id
                })
            })
        );
        const body = response.json() as unknown as GetOrderResponse;

        if (response.ok) {
            return new Order(body.order);
        }
        throw new ServiceException(response.status, body.message);
    }
}
