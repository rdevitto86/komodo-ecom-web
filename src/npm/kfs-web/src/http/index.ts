import { isValidURL } from '../../kfs-util/validations/properties/urls';

/**
 * Implements HTTP REST operations
 */
export default class HTTP {
    /**
     * Executes a generic HTTP request
     * @async
     * @param {Request} request http request
     * @returns {Promise<Response>} response
     * @throws {ServiceException} 400 Bad Request
     */
    async send(request: Request): Promise<Response> {
        const { method, url } = request;

        if ((
            method !== 'GET' 
            && method !== 'POST' 
            && method !== 'PUT' 
            && method !== 'DELETE' 
            && method !== 'HEAD')
            || !isValidURL(url)
        ) {
            // throw;
        }

        return fetch(request);
        // .catch((error: Response) => {
        //     // throw;
        // });
    }

    /**
     * Executes a HEAD request
     * @async
     * @param {string} url request url
     * @param {Params} body request body
     * @param {Params} [queryParams] request query params
     * @param {Headers} [headers] request headers
     * @returns {Promise<Response>} response
     * @throws {ServiceException} 400 Bad Request
     */
    async HEAD(request: Request): Promise<Response> {
        if (request.method !== 'HEAD' || !isValidURL(request.url)) {
            // throw;
        }

        return fetch(request);
        // .catch((error: Response) => {
        //     // throw;
        // });
    }

    /**
     * Executes a GET request
     * @async
     * @param {Request} request http request
     * @returns {Promise<Response>} response
     * @throws {ServiceException} 400 Bad Request
     */
    async GET(request: Request): Promise<Response> {
        if (request.method !== 'GET' || !isValidURL(request.url)) {
            // throw;
        }

        return fetch(request);
        // .catch((error: Response) => {
        //     // throw;
        // });
    }

    /**
     * Executes a POST request
     * @async
     * @param {Request} request http request
     * @returns {Promise<Response>} response
     * @throws {ServiceException} 400 Bad Request
     */
    async POST(request: Request): Promise<Response> {
        if (request.method !== 'POST' || !isValidURL(request.url)) {
            // throw;
        }

        return fetch(request);
        // .catch((error: Response) => {
        //     // throw;
        // });
    }

    /**
     * Executes a PUT request
     * @async
     * @param {Request} request http request
     * @returns {Promise<Response>} response
     * @throws {ServiceException} 400 Bad Request
     */
    async PUT(request: Request): Promise<Response> {
        if (request.method !== 'PUT' || !isValidURL(request.url)) {
            // throw;
        }

        return fetch(request);
        // .catch((error: Response) => {
        //     // throw;
        // });
    }

    /**
     * Executes a DELETE request
     * @async
     * @param {string} url request url
     * @param {Params} body request body
     * @param {Params} [queryParams] request query params
     * @param {Headers} [headers] request headers
     * @returns {Promise<Response>} response
     * @throws {ServiceException} 400 Bad Request
     */
    async DELETE(request: Request): Promise<Response> {
        if (request.method !== 'DELETE' || !isValidURL(request.url)) {
            // throw;
        }

        return fetch(request);
        // .catch((error: Response) => {
        //     // throw;
        // });
    }
}
