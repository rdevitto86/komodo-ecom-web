import ServiceException from './ServiceException';

/**
 * @private
 * @constant {Object<Number, String>} ENABLED_EXCEPTIONS
 * @description contains a map of enabled service exceptions
 */
const EXCEPTION_TYPES: {[key:number]:string} = Object.freeze({
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
 * @description helper class that manages service exception creation
 */
export default class ExceptionFactory {
    /**
     * @public
     * @static
     * @function ExceptionFactory.build
     * @description fetches and builds a service exception object
     * @param {Number} code http status code
     * @param {String} message error message
     * @returns {ServiceException | Error} exception model
     */
    static build(code: number, message: string) {
        const name = EXCEPTION_TYPES[code];
        const isMessage = typeof message === 'string';

        return (name && isMessage)
            ? new ServiceException(name, code, message)
            : new Error(
                (isMessage) ? message : 'service exception occured w/ no status code'
            );
    }
}
