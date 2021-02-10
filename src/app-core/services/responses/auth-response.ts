import { ServiceResponse } from './service-response';

/**
 * @interface
 * @extends {ServiceResponse}
 * @description defines a login response
 */
export interface LoginResponse extends ServiceResponse {
    session: string; // user session token
}

/**
 * @interface
 * @extends {ServiceResponse}
 * @description defines a logoff response
 */
export interface LogoffResponse extends ServiceResponse {

}

/**
 * @interface
 * @extends {ServiceResponse}
 * @description defines a token validation response
 */
export interface TokenAuthResponse extends ServiceResponse {

}
