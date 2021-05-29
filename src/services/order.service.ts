import HTTP from '../npm/kfs-ts/web/network/http/rest';
import Order from '../models/orders/order.model';
import OrderAPIHeaders from '../npm/ec-shared/api/headers/order-api-headers';
import { GetOrderResponse } from '../npm/ec-shared/api/responses/order-api-responses';
import ServiceException from '../npm/kfs-ts/exceptions/service-exception';
import { KEY_SESH_ACCESS_TOKEN } from '../config/session-storage-config';
import { isString } from '../npm/kfs-ts/validations/primitives/strings';

// /**
//  * @private
//  * @constant {string} BASE_URL
//  * @description Order API endpoint
//  */
// const API_URL = `${process.env.ORDER_API_URL || ''}/${process.env.ORDER_API_VER || ''}`;

const API_URL = '';

/**
 * Handles requests/responses for the Order service
 * @version 1.0.0
 * @extends HTTP
 */
export default class OrderService extends HTTP {
    /**
     * Fetches information for a specified order
     * @async
     * @param {string} id order ID
     * @returns {Promise<Order>} order details
     * @throws {ServiceException} service exception
     */
    async getOrder(id: string): Promise<Order> {
        if (!isString(id)) {
            throw new ServiceException(400, "failed to get order info - invalid 'id' param");
        }

        const response = await this.POST(
            new Request(API_URL, {
                method: 'POST',
                headers: new OrderAPIHeaders(
                    sessionStorage.getItem(KEY_SESH_ACCESS_TOKEN),
                    null // TODO
                ),
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
