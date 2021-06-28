import { RequestHeaders } from '../headers/request';

/**
 * Requried fields in a HEAD Request
 */
 export interface HEADRequest {
    url: URL | string;
    headers: RequestHeaders | {};
}
