/* eslint-disable no-throw-literal */
/* eslint-disable class-methods-use-this */

/**
 * @private
 * @readonly
 * @description regex that checks URL validity
 * @example
 * 'https://www.sample.com'
 * 'https://www.west-sample.com:443/xyz'
 * 'https://www.test.sample.io/xyz?abc=dkd&p=q&c=2'
 */
// const URL_REGEX = Object.freeze(new RegExp());

/**
 * @private
 * @description validates a HTTPS URL string
 * @param {string} url URL to validate
 * @returns {boolean} true/false
 */
const isValidURL = (url: string) => (typeof url === 'string'); // TODO - add Regex

/**
 * @version 1.0.0
 * @description service wrapper for REST HTTPS operations
 */
export default class HTTPS {
    /**
     * @async
     * @description executes a GET request
     * @param {string} url service URL
     * @returns {Promise<any>} response
     * @throws {ServiceException} 400 Bad Request
     */
    async GET(url: string) {
        if (!isValidURL(url)) {
            throw {
                code: 400,
                message: 'invalid request URL'
            };
        }
        return fetch(url, { method: 'GET' });
    }

    /**
     * @async
     * @description executes a POST request
     * @param {Request} request HTTPS request
     * @returns {Promise<any>} response
     * @throws {ServiceException} 400 Bad Request
     */
    async POST(request: Request) {
        if (!(request instanceof Request) || request.method !== 'POST') {
            throw {
                code: 400,
                message: 'invalid http request'
            };
        }
        if (!isValidURL(request.url)) {
            throw {
                code: 400,
                message: 'invalid request URL'
            };
        }
        return fetch(request);
    }

    /**
     * @async
     * @description executes a PUT request
     * @param {Request} request HTTPS request
     * @returns {Promise<any>} response
     * @throws {ServiceException} 400 Bad Request
     */
    async PUT(request: Request) {
        if (!(request instanceof Request) || request.method !== 'PUT') {
            throw {
                code: 400,
                message: 'invalid http request'
            };
        }
        if (!isValidURL(request.url)) {
            throw {
                code: 400,
                message: 'invalid request URL'
            };
        }
        return fetch(request);
    }

    /**
     * @async
     * @description executes a DELETE request
     * @param {Request} request HTTPS request
     * @returns {Promise<any>} response
     * @throws {ServiceException} 400 Bad Request
     */
    async DELETE(request: Request) {
        if (!(request instanceof Request) || request.method !== 'DELETE') {
            throw {
                code: 400,
                message: 'invalid http request'
            };
        }
        if (!isValidURL(request.url)) {
            throw {
                code: 400,
                message: 'invalid request URL'
            };
        }
        return fetch(request);
    }

    /**
     * @async
     * @description executes a HEAD request
     * @param {string} url service URL
     * @returns {Promise<any>} response
     * @throws {ServiceException} 400 Bad Request
     */
    async HEAD(url: string) {
        if (!isValidURL(url)) {
            throw {
                code: 400,
                message: 'invalid request URL'
            };
        }
        return fetch(url, { method: 'HEAD' });
    }
}
