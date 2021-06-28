import { RequestHeaders } from '../headers/request';

/**
 * Required fields in a GET Request
 */
 export interface GETRequest {
    url: URL | string;
    headers: RequestHeaders | {};
}
