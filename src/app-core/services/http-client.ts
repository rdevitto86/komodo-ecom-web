/**
 * @class
 * @description sends and receives HTTP requests from back-end services
 */
export default class HTTPClient {
    /**
     * @public
     * @async
     * @static
     * @function HTTPClient#GET
     * @description sends a GET request
     * @param {String} url service endpoint
     * @returns {Promise} Promise
     */
    async GET(url = ''): Promise<any> {
        return fetch(url);
    }

    /**
     * @public
     * @async
     * @static
     * @function HTTPClient#POST
     * @description sends a POST request
     * @param {String} url service endpoint
     * @param {Object} body http parameters
     * @returns {Promise} Promise
     */
    async POST(url = '', body = {}): Promise<any> {
        return fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }

    /**
     * @public
     * @async
     * @static
     * @function HTTPClient#PUT
     * @description sends a POST request
     * @param {String} url service endpoint
     * @param {Object} body http parameters
     * @returns {Promise} Promise
     */
    async PUT(url = '', body = {}): Promise<any> {
        return fetch(url, {
            method: 'PUT',
            mode: 'no-cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }

    /**
     * @public
     * @async
     * @static
     * @function HTTPClient#DELETE
     * @description sends a DELETE request
     * @param {String} url service endpoint
     * @param {Object} body http parameters
     * @returns {Promise} Promise
     */
    async DELETE(url = '', body = {}): Promise<any> {
        return fetch(url, {
            method: 'DELETE',
            mode: 'no-cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    }
}
