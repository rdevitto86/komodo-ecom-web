/**
 * Map of service exceptions
 * @readonly
 */
export const Exceptions: {[key: number]: string} = Object.freeze({
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
 * Defines a generic client/server service exception
 * @version 1.0.0
 * @extends Error
 */
 export default class ServiceException extends Error {
    /**
     * HTTP status code
     */
    code: number | null = null;

    /**
     * HTTP status code type (ex. client or server)
     * @override
     */
    type: string | null = null;

    /**
     * @param {number} code http status code
     * @param {string} message exception message
     */
    constructor(code: number, message?: string) {
        super(message);

        if (typeof message !== 'string') {
            this.message = 'a web service exception occured';
        }

        // set http status code related properties
        if (typeof code === 'number') {
            this.code = code;
            this.name = Exceptions[code] || 'Service Exception';

            if (code >= 400) {
                this.type = (code < 500) ? 'client' : 'server';
            }
        }
    }

    /**
     * Prints exception to console
     */
    print() {
        if (console && console.error) {
            console.error(`[ERROR][${this.code}] ${this.message}\n.....\n${this.stack}`);
        }
    }
}
