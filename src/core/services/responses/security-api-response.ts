import { APIResponse } from './generic-api-response';

/**
 * @interface
 * @extends {APIResponse}
 * @description defines a login response
 */
export interface LoginResponse extends APIResponse {
    session: string; // user session token
}

/**
 * @interface
 * @extends {APIResponse}
 * @description defines a logoff response
 */
export interface LogoffResponse extends APIResponse {

}

/**
 * @interface
 * @extends {APIResponse}
 * @description defines a token validation response
 */
export interface TokenAuthResponse extends APIResponse {

}
