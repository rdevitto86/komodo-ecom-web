/**
 * @class ServiceError
 * @description - custom error object for service-related exceptions
 */
export default class ServiceError extends Error {
    /**
     * @constructor
     * @description - builds a new service error object
     * @param {Object} response - service response
     * @returns {Object}
     */
    constructor(response = undefined) {
        if (!response || typeof response !== 'object') {
            return {
                code: '',
                stack: '',
                http: '',
                service: ''
            };
        }

        super(response);

        this.code = response.code || '';
        this.http = response.http || '';
        this.service = response.service || '';
    }
}
