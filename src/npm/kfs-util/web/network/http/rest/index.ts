/* eslint-disable no-throw-literal */

// TODO - throw ServiceException instead of object-literal

import { isValidURL } from '../../../../validations/properties/urls';

/**
 * Implements HTTP REST operations
 * @version 1.0.0
 */
export default class HTTP {
    /**
     * Executes a GET request
     * @async
     * @param {string} url service URL
     * @returns {Promise<any>} response
     * @throws {ServiceException} 400 Bad Request
     */
    async GET(url: string) {
        if (!isValidURL(url)) {
            throw {
                code: 400,
                message: 'invalid request URL',
            };
        }
        return fetch(url, { method: 'GET' });
    }

    /**
     * Executes a POST request
     * @async
     * @param {Request} request HTTP request
     * @returns {Promise<any>} response
     * @throws {ServiceException} 400 Bad Request
     */
    async POST(request: Request) {
        if (!(request instanceof Request) || request.method !== 'POST') {
            throw {
                code: 400,
                message: 'invalid http request',
            };
        }
        if (!isValidURL(request.url)) {
            throw {
                code: 400,
                message: 'invalid request URL',
            };
        }
        return fetch(request);
    }

    /**
     * Executes a PUT request
     * @async
     * @param {Request} request HTTP request
     * @returns {Promise<any>} response
     * @throws {ServiceException} 400 Bad Request
     */
    async PUT(request: Request) {
        if (!(request instanceof Request) || request.method !== 'PUT') {
            throw {
                code: 400,
                message: 'invalid http request',
            };
        }
        if (!isValidURL(request.url)) {
            throw {
                code: 400,
                message: 'invalid request URL',
            };
        }
        return fetch(request);
    }

    /**
     * Executes a DELETE request
     * @async
     * @param {Request} request HTTP request
     * @returns {Promise<any>} response
     * @throws {ServiceException} 400 Bad Request
     */
    async DELETE(request: Request) {
        if (!(request instanceof Request) || request.method !== 'DELETE') {
            throw {
                code: 400,
                message: 'invalid http request',
            };
        }
        if (!isValidURL(request.url)) {
            throw {
                code: 400,
                message: 'invalid request URL',
            };
        }
        return fetch(request);
    }

    /**
     * Executes a HEAD request
     * @async
     * @param {string} url service URL
     * @returns {Promise<any>} response
     * @throws {ServiceException} 400 Bad Request
     */
    async HEAD(url: string) {
        if (!isValidURL(url)) {
            throw {
                code: 400,
                message: 'invalid request URL',
            };
        }
        return fetch(url, { method: 'HEAD' });
    }
}
