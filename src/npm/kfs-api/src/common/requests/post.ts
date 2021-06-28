import { RequestHeaders } from '../headers/request';

/**
 * Requried fields in a POST Request
 */
 export interface POSTRequest<T> {
    url: URL | string;
    headers: RequestHeaders | {};
    body: T;
}
