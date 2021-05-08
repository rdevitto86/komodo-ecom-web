import { UserJSON } from '../../types/user-types';
import { APIResponse } from './generic-api-responses';

/**
 * Defines a user details response
 * @extends APIResponse
 */
export interface GetAccountInfoResponse extends APIResponse {
    user?: UserJSON;
}
