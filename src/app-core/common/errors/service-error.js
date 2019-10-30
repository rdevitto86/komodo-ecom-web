/**
 * @class
 * @description - custom error object for service-related exceptions
 */
export class ServiceError extends Error {
    /**
     * @constructor
     * @description - builds a new service error object
     * @param {number} httpStatus - http status code (ex. 404, 500, etc.)
     * @param {string} message - error message/details
     * @param {string} serviceName - name of service that failed
     */
    constructor(httpStatus = -1, message = '', serviceName = '') {
        if(typeof message !== 'string') {
            message = '';
        }

        super(message);
        this.name = this.constructor.name;
        this.stack = (new Error(message)).stack;
        this.httpStatus = (typeof httpStatus === 'number') ? httpStatus : -1;
        this.serviceName = (typeof serviceName === 'string') ? serviceName : 'undefined';
    }
}