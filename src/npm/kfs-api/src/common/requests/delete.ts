import { RequestHeaders } from '../headers/request';

/**
 * Requried fields in a DELETE Request
 */
 export interface DELETERequest<T> {
    url: URL | string;
    headers: RequestHeaders | {};
    body: T;
}
