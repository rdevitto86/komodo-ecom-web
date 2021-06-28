import HTTP from '../npm/kfs-web/http';
// import Order from '../models/orders/order.model';
// import HttpException from '../npm/kfs-web/http-exceptions';
// import { GetOrderResponse } from '../npm/kfs-api/order-api/responses';
// import { OrderAPIHeaders } from '../npm/kfs-api/order-api/headers';
// import { KEY_SESH_ACCESS_TOKEN } from '../config/session-storage.config';
// import { isString } from '../npm/kfs-util/validations/primitives/strings';

/**
 * Handles requests/responses for the Order service
 * @extends HTTP
 */
export default class OrderService extends HTTP {
    readonly URL = process.env.ORDER_API_URL || '';

    /**
     * Fetches information for a specified order
     * @async
     * @param {string} id order ID
     * @returns {Promise<Order>} order details
     * @throws {ServiceException} service exception
     */
    // async getOrder(id: string): Promise<Order> {
    //     if (!isString(id)) {
    //         throw new HttpException(400, "failed to get order info - invalid 'id' param");
    //     }

    //     const request = new Request(this.URL, {
    //         method: 'POST',
    //         headers: new OrderAPIHeaders(
    //             sessionStorage.getItem(KEY_SESH_ACCESS_TOKEN),
    //             null, // TODO
    //         ),
    //         body: JSON.stringify({
    //             id,
    //         }),
    //     });

    //     const response = await this.POST(request);
    //     const body = response.json() as unknown as GetOrderResponse;

    //     if (response.ok) {
    //         return new Order(body.order);
    //     }
    //     throw new HttpException(response.status, body.message);
    // }
}
