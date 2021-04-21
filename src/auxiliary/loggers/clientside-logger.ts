/**
 * @private
 * @constant LOG_PRIORITIES
 * @type {Object<String, Number>}
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
interface Log {
    level: string,
    message: string,
    code?: string,
    http?: number,
    trace?: any,
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
    http?: number,
}

// flags that enable functionality
const ENABLE_CONSOLE = console && process.env.ENABLE_LOG_CONSOLE === 'TRUE';
const ENABLE_REMOTE = process.env.ENABLE_LOG_REMOTE === 'TRUE';
const ENABLE_LOGGER = ENABLE_CONSOLE || ENABLE_REMOTE;
const ENABLE_TIMESTAMPS = ENABLE_LOGGER && process.env.ENABLE_LOG_TIMESTAMP;

// flags that control log processing
const DEFAULT_LEVEL = (ENABLE_LOGGER) ? 4 : 0;
const LOG_LEVEL = LOG_PRIORITIES[process.env.LOGGING_MODE || ''] || DEFAULT_LEVEL;

/**
 * @private
 * @constant {Function | Null} _getTimestamp
 * @description fetches the current timestamp
 * @returns {String} timestamp, minus time zone string
 */
const _getTimestamp = (ENABLE_TIMESTAMPS) ? () => {
    const curr = (new Date()).toString();
    return curr.slice(0, curr.indexOf('(') - 1);
} : null;

/**
 * @private
 * @constant {Function | Null} _logConsole
 * @description logs a clientside message to the console
 * @param {String} level log level
 * @param {String} message log message
 * @param {String} [code] custom error code
 * @param {String} [trace] stack trace
 * @param {Number} [http] HTTP service code
 */
const _logConsole = (ENABLE_CONSOLE) ? (
    level: string,
    message: string,
    code?: string,
    trace?: string,
    http?: number
) => {
    const logHTTP = (http) ? `[${http}]` : '';
    const logCode = (code) ? ` ${code} |` : '';
    const logStack = (trace) ? `\n.....\n${trace}` : '';
    const timestamp = (_getTimestamp) ? ` ${_getTimestamp()} |` : '';

    /**
     * @example [INFO] creating new order
     * @example [ERROR][404] Fri Apr 01 2021 00:00:00 GMT-0500 | LC-001 | failed to login
     * .....
     * [stack trace here]
     */
    const formatted = `[${level}]${logHTTP}${timestamp}${logCode} ${message}${logStack}`;

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
} : null;

// /**
//  * @private
//  * @constant {Function | Null} _logRemote
//  * @description sends a log message to a remote service
//  * @param {LogMessage} log log message properties
//  */
// const _logRemote = (ENABLE_REMOTE) ? (log: LogMessage) => {

// } : null;

/**
 * @private
 * @constant {Function} _processLog
 * @description processes incoming log messages
 * @param {Log} log log message properties
 */
const _processLog = (ENABLE_LOGGER) ? (log: Log) => {
    try {
        const {
            level, message, code, http, trace
        } = log;

        // reject logs lower than logging mode
        if (LOG_PRIORITIES[level] < LOG_LEVEL) {
            return;
        }

        // log console message
        if (_logConsole) {
            _logConsole(level, message, code, trace, http);
        }

        // log remote message
        // if (logRemote) {
        //     logRemote(log);
        // }
    } catch (e) {
        if (console && e instanceof Error) {
            console.error(e.message);
        }
    }
} : () => {};

/**
 * @class
 * @singleton
 * @version 1.0
 * @description clientside logger that records runtime messages
 */
class Logger {
    /**
     * @public
     * @static
     * @function Logger.fatal
     * @description records a fatal log message
     * @param {Exception | String} log error information
     */
    public static fatal(log: Exception | string) {
        switch (typeof log) {
            case 'string':
                _processLog({
                    level: 'FATAL',
                    message: log
                });
                break;
            case 'object':
                _processLog({
                    level: 'FATAL',
                    ...log
                });
                break;
            default:
        }
    }

    /**
     * @public
     * @static
     * @function Logger.error
     * @description records an error log message
     * @param {Exception | String} log error information
     */
    public static error(log: Exception | string) {
        switch (typeof log) {
            case 'string':
                _processLog({
                    level: 'ERROR',
                    message: log
                });
                break;
            case 'object':
                _processLog({
                    level: 'ERROR',
                    ...log
                });
                break;
            default:
        }
    }

    /**
     * @public
     * @static
     * @function Logger.warn
     * @description records a warn log message
     * @param {Exception | String} log error information
     */
    public static warn(log: Exception | string) {
        switch (typeof log) {
            case 'string':
                _processLog({
                    level: 'WARN',
                    message: log
                });
                break;
            case 'object':
                _processLog({
                    level: 'WARN',
                    ...log
                });
                break;
            default:
        }
    }

    /**
     * @public
     * @static
     * @function Logger.info
     * @description records an info log message
     * @param {String} message info message
     */
    public static info(message: string) {
        _processLog({
            level: 'INFO',
            message
        });
    }

    /**
     * @public
     * @static
     * @function Logger.debug
     * @description records a debug log message
     * @param {String} message info message
     * @param {Boolean} [logTrace] optionally logs stack trace
     */
    public static debug(message: any, logTrace = false) {
        _processLog({
            level: 'DEBUG',
            message
        });

        if (ENABLE_CONSOLE && logTrace === true) {
            console.trace();
        }
    }

    /**
     * @public
     * @static
     * @function Logger.clear
     * @description clears console of previous logs
     */
    public static clear() {
        if (ENABLE_CONSOLE) {
            console.clear();
        }
    }
}

const singleton = new Logger();
export default singleton;
