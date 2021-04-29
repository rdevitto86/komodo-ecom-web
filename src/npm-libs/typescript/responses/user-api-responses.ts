import { UserJSON } from '../../../models/user';
import { APIResponse } from './generic-api-responses';

/**
 * @interface
 * @extends APIResponse
 * @description defines a user details response
 */
export interface GetAccountInfoResponse extends APIResponse {
    user?: UserJSON;
}
