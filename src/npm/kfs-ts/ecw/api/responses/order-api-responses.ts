import { OrderJSON } from '../../types/order';
import { APIResponse } from './generic-api-responses';

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
