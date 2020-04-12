/**
 * @interface
 * @description defines an abstract Service Error object
 */
export interface ServiceError {
    http: number;
    message: string;
    service: string;
}

/**
 * @class
 * @description defines a new Service Error object
 */
export class ServiceError {
    public http = -1;
    public message = '';
    public service = '';

    /**
     * @constructor
     * @description builds a new Service Error object
     * @param {Object} details service response
     */
    constructor(details: ServiceError) {
        const {
            http, message, service
        } = details;

        this.http = http;
        this.message = message;
        this.service = service;
    }
}
