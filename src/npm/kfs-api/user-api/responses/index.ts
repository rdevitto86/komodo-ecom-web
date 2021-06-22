import { APIResponse } from '../../generics/responses';
import { UserJSON } from '../schemas/user';

/**
 * Defines a user details response
 * @extends APIResponse
 */
export interface GetAccountInfoResponse extends APIResponse {
    user?: UserJSON;
}
