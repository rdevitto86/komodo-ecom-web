import { RequestHeaders } from '../../src/common/headers/request';
import { GETRequest } from '../../src/common/requests/get';

/**
 * HTTP request for getCategoryItems operation
 */
export class GetCategoryItemsRequest implements GETRequest {
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
