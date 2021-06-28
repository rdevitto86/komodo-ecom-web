import { RequestHeaders } from '../headers/request';

/**
 * Requried fields in a PUT Request
 */
 export interface PUTRequest<T> {
    url: URL | string;
    headers: RequestHeaders | {};
    body: T;
}
