/**
 * @interface
 * @description - abstract class for an Error Response object
 */
export interface ErrorResponse {
    http: number;
    message: string;
    service: string;
}
