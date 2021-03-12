/**
 * @private
 * @constant LOG_PRIORITIES
 * @type {{ [key: String]: Number }}
 * @description contains priorities of log levels
 */
const LOG_PRIORITIES: {[key: string]: number} = Object.freeze({
    ALL: 6,
    FATAL: 5,
    ERROR: 4,
    WARN: 3,
    INFO: 2,
    DEBUG: 1,
    OFF: 0
});

/**
 * @private
 * @interface
 * @description defines a log message
 */
interface LogMessage {
    level: string,
    code?: string,
    message: string,
    trace?: any,
    http?: number,
    useTrace?: boolean
}

/**
 * @private
 * @interface
 * @description defines an exception object
 */
interface Exception {
    message: string,
    code?: string,
    trace?: any,
    http?: number
}

/**
 * @class
 * @singleton
 * @version 1.0
 * @description clientside logger that records runtime messages
 * @see process.env
 */
class Logger {
    /**
     * @public
     * @function Logger.fatal
     * @description records a fatal log message
     * @param {Exception | String} log error information
     */
    public fatal: Function = () => {};

    /**
     * @public
     * @function Logger.error
     * @description records an error log message
     * @param {Exception | String} log error information
     */
    public error: Function = () => {};

    /**
     * @public
     * @function Logger.warn
     * @description records a warn log message
     * @param {Exception | String} log error information
     */
    public warn: Function = () => {};

    /**
     * @public
     * @function Logger.info
     * @description records an info log message
     * @param {String} message info message
     */
    public info: Function = () => {};

    /**
     * @public
     * @function Logger.debug
     * @description records a debug log message
     * @param {String} message info message
     * @param {Boolean} [useTrace] enables trace logging for the message
     */
    public debug: Function = () => {};

    /**
     * @public
     * @function Logger.clear
     * @description clears console of previous logs
     */
    public clear: Function = () => {};

    /**
     * @constructor
     * @description builds and assigns singleton runtime properties
     */
    constructor() {
        // environment variables
        const {
            LOGGING_MODE, ENABLE_CONSOLE, // ENABLE_LOGGING_SERVICE
        } = process.env;

        // validate logger properties before building singleton
        if (typeof LOGGING_MODE === 'string' && (LOG_PRIORITIES[LOGGING_MODE] || -1) > LOG_PRIORITIES.OFF) {
            // determine output stream eligibility
            const defaultPriority = LOG_PRIORITIES[LOGGING_MODE];
            const enableConsole = (console && console.log) && ENABLE_CONSOLE === 'TRUE';
            // const enableRemote = ENABLE_LOGGING_SERVICE === 'TRUE';

            /**
             * @private
             * @constant {Function | Undefined} logConsole
             * @description logs a clientside message to the console
             * @param {String} level log level
             * @param {String} message log message
             * @param {String} code custom error code
             * @param {String} trace stack trace
             * @param {Number} http HTTP service code
             * @param {Boolean} useTrace enables console strack trace
             */
            const logConsole = (enableConsole) ? (
                level: string,
                message: string,
                code?: string,
                trace?: string,
                http?: number,
                useTrace?: boolean
            ) => {
                const logHTTP = (http) ? `[${http}]` : '';
                const logCode = (code) ? ` ${code} |` : '';
                const logStack = (trace) ? `\n.....\n${JSON.stringify(trace)}` : '';

                /**
                 * @example [INFO] creating new order
                 * @example [ERROR][404] LC-001 | failed to login - invalid credentials
                 * .....
                 * [stack trace here]
                 */
                const formatted = `[${level}]${logHTTP}${logCode} ${message}${logStack}`;

                // use level-approriate console function
                switch (level) {
                    case 'FATAL':
                    case 'ERROR':
                        console.error(formatted);
                        break;
                    case 'WARN':
                        console.warn(formatted);
                        break;
                    case 'INFO':
                        console.info(formatted);
                        break;
                    case 'DEBUG':
                        console.debug(formatted);
                        break;
                    default:
                        console.log(formatted);
                }

                // log stack trace (optional)
                if (!trace && useTrace === true) {
                    console.trace();
                }
            } : undefined;

            /**
             * @private
             * @constant {Function | Undefined} logRemote
             * @description sends local log to logging service
             * @param {String} level log level
             * @param {String} message log message
             * @param {String} code custom error code
             * @param {String} trace stack trace
             * @param {Number} http HTTP service code
             */
            // const logRemote = (enableRemote) ? (
            //     level: string,
            //     message: string,
            //     code?: string,
            //     trace?: any,
            //     http?: number,
            // ) => {
            //     // TODO - build batch handler
            //     // TODO - remote service
            //     const timestamp = (new Date()).toString();
            // } : undefined;

            /**
             * @private
             * @function logHandler
             * @description processes incoming log messages
             * @param {LogMessage} log log message object
             */
            const logHandler = (log: LogMessage) => {
                // log message properties
                const {
                    level, code, message, trace, http, useTrace
                } = log;

                // reject logs lower than logging mode
                if (LOG_PRIORITIES[level] < defaultPriority) {
                    return;
                }

                // log console message
                if (logConsole) {
                    logConsole(level, message, code, trace, http, useTrace);
                }

                // log remote
                // if (logRemote) {
                //     logRemote(level, message, code, trace, http);
                // }
            };

            /**
             * @private
             * @function methodWrapper
             * @description dynamically builds error logging methods
             * @param {String} level log level
             * @returns {Function} error logging function
             */
            const methodWrapper = (level: string) => (log: Exception | string) => {
                let code;
                let message;
                let trace;
                let http;

                switch (typeof log) {
                    case 'object':
                        code = log.code;
                        message = log.message;
                        trace = log.trace;
                        http = log.http;
                        break;
                    case 'string':
                        message = log;
                        break;
                    default:
                        return;
                }

                logHandler({
                    level, code, message, trace, http
                });
            };

            // bind fatal method
            this.fatal = methodWrapper('FATAL');

            // bind error method
            this.error = methodWrapper('ERROR');

            // bind warn method
            this.warn = methodWrapper('WARN');

            // enable console clearing
            if (enableConsole) {
                // bind clear method
                this.clear = () => console.clear();
            }

            // disable info and debug for production
            if (LOGGING_MODE === 'PROD') {
                // bind info method
                this.info = (message: string) => logHandler({
                    level: 'INFO', message
                });

                // bind debug method
                this.debug = (message: string, useTrace?: boolean) => logHandler({
                    level: 'DEBUG', message, useTrace
                });
            }
        }
    }
}

const singleton = Object.freeze(new Logger());
export default singleton;
