import { APIResponse } from '../../common/responses';
import { OrderJSON } from '../schemas/order';

/**
 * Defines a getOrder response
 * @extends APIResponse
 */
export interface GetOrderResponse extends APIResponse {
    order: OrderJSON
}

/**
 * Defines a getOrders response
 * @extends APIResponse
 */
export interface GetOrdersResponse extends APIResponse {
    orders: OrderJSON[]
}
