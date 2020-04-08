import { UserResponse } from './user-response';

/**
 * @interface
 * @description - abstract class for an login response object
 */
export interface LoginResponse {
    sessionToken: string;
    data: UserResponse;
}

/**
 * @interface
 * @description - abstract class for an session validation object
 */
export interface SessionValidResponse {
    valid: boolean;
}
