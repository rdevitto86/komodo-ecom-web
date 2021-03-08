/**
 * @class
 * @version 1.0.0
 * @description service wrapper for REST HTTP operations
 */
export default class HTTP {
    /**
     * @public
     * @static
     * @async
     * @function HTTP.GET
     * @description executes a GET request
     * @param {String} url service URL
     * @returns {Promise<any>} response
     * @throws {Error}
     */
    static async GET(url: string): Promise<any> {
        if (typeof url !== 'string') {
            throw Error('failed to execute GET request - invalid URL');
        }

        return fetch(url, { method: 'GET' });
    }

    /**
     * @public
     * @static
     * @async
     * @function HTTP.POST
     * @description executes a POST request
     * @param {String} url service URL
     * @param {Any} params request parameters
     * @returns {Promise<any>} response
     */
    static async POST(url: string, params: any): Promise<any> {
        if (typeof url !== 'string') {
            throw Error('failed to execute POST request - invalid URL');
        }
        if (!params || typeof url !== 'object') {
            throw Error('failed to execute POST request - invalid params');
        }

        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(params)
        });
    }

    /**
     * @public
     * @static
     * @async
     * @function HTTP.PUT
     * @description executes a PUT request
     * @param {String} url service URL
     * @param {Any} params request parameters
     * @returns {Promise<any>} response
     * @throws {Error}
     */
    static async PUT(url: string, params: any): Promise<any> {
        if (typeof url !== 'string') {
            throw Error('failed to execute PUT request - invalid URL');
        }
        if (!params || typeof url !== 'object') {
            throw Error('failed to execute PUT request - invalid params');
        }

        return fetch(url, {
            method: 'PUT',
            body: JSON.stringify(params)
        });
    }

    /**
     * @public
     * @static
     * @async
     * @function HTTP.DELETE
     * @description executes a DELETE request
     * @param {String} url service URL
     * @param {Any} params request parameters
     * @returns {Promise<any>} response
     * @throws {Error}
     */
    static async DELETE(url: string, params: any): Promise<any> {
        if (typeof url !== 'string') {
            throw Error('failed to execute DELETE request - invalid URL');
        }
        if (!params || typeof url !== 'object') {
            throw Error('failed to execute DELETE request - invalid params');
        }

        return fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(params)
        });
    }

    /**
     * @public
     * @static
     * @async
     * @function HTTP.HEAD
     * @description executes a HEAD request
     * @param {String} url service URL
     * @returns {Promise<any>} response
     * @throws {Error}
     */
    static async HEAD(url: string): Promise<any> {
        if (typeof url !== 'string') {
            throw Error('failed to execute HEAD request - invalid URL');
        }

        return fetch(url, { method: 'HEAD' });
    }
}
