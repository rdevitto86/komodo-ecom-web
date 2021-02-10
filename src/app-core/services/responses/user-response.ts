import { ServiceResponse } from './service-response';

/**
 * @interface
 * @extends ServiceResponse
 * @description defines an account details (fetch) response
 */
export interface UserDetailsResponse extends ServiceResponse {

}

/**
 * @interface
 * @extends ServiceResponse
 * @description defines an account update response
 */
export interface UserUpdateResponse extends ServiceResponse {

}

/**
 * @interface
 * @extends ServiceResponse
 * @description defines an account deletion response
 */
export interface UserDeleteResponse extends ServiceResponse {

}
