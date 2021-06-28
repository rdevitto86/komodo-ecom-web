import { RequestHeaders } from '../../src/common/headers/request';
import { GETRequest } from '../../src/common/requests/get';

/**
 * HTTP request for getItem operation
 */
export class GetItemRequest implements GETRequest {
    url: URL | string = '';
    headers: RequestHeaders | {} = {};

    constructor(
        url: URL | string, 
        headers: RequestHeaders | {},
    ) {
        this.url = url;
        this.headers = headers;
    }
}
