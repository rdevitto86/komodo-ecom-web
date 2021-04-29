import { APIResponse } from './generic-api-responses';

/**
 * @interface
 * @extends {APIResponse}
 * @description defines a login response
 */
 export interface LoginResponse extends APIResponse {
    idToken?: string;
    accessToken?: string;
    refreshToken?: string;
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
