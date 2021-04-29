/**
 * @private
 * @constant {Object<Number, String>} ENABLED_EXCEPTIONS
 * @description a map of enabled service exceptions
 */
 const ENABLED_EXCEPTIONS: {[key: number]: string} = Object.freeze({
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden Access',
    404: 'Not Found',
    405: 'Method Not Allowed',
    408: 'Request Timeout',
    413: 'Payload Too Large',
    415: 'Unsupported Media Type',
    500: 'Internal Server Error',
    501: 'Request Not Implemented',
    502: 'Bad Gateway',
    503: 'Request Not Completed',
    504: 'Gateway Timed Out',
});

/**
 * @class
 * @version 1.0
 * @extends {Error}
 * @description defines a generic client/server service exception
 */
 export default class ServiceException extends Error {
    /**
     * @public
     * @property {Number | Null} code
     * @description http status code
     */
    public code: number | null = null;

    /**
     * @public
     * @override
     * @property {String | Null} type
     * @description http status code type (ex. client or server)
     */
    public type: string | null = null;

    /**
     * @constructor
     * @param {Number} code http status code
     * @param {String} message exception message
     */
    constructor(code: number, message?: string) {
        super(message);

        if (typeof message !== 'string') {
            this.message = 'a web service exception occured';
        }

        // set http status code related properties
        if (typeof code === 'number') {
            this.code = code;
            this.name = ENABLED_EXCEPTIONS[code] || 'Service Exception';

            if (code >= 400) {
                this.type = (code < 500) ? 'client' : 'server';
            }
        }
    }

    /**
     * @public
     * @function ServiceException.print
     * @description prints exception to console
     */
    print() {
        if (console && console.error) {
            console.error(`[ERROR][${this.code}] ${this.message}\n.....\n${this.stack}`);
        }
    }
}
