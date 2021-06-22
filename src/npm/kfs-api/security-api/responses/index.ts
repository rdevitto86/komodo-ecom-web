import { APIResponse } from '../../generics/responses';

/**
 * Defines a login response
 * @extends APIResponse
 */
 export interface LoginResponse extends APIResponse {
    idToken?: string;
    accessToken?: string;
    refreshToken?: string;
}

/**
 * Defines a logoff response
 * @extends APIResponse
 */
export interface LogoffResponse extends APIResponse {

}

/**
 * Defines a token validation response
 * @extends APIResponse
 */
export interface TokenAuthResponse extends APIResponse {

}
