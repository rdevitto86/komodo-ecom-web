import { LogLevels, LogPriorities } from '../log-levels';
import { LogData, RuntimeException } from './log-schemas';

// TODO - move this schema along with other client schemas to seperate file

// flags that enable functionality
const ENABLE_CONSOLE = console && process.env.ENABLE_LOG_CONSOLE === 'TRUE';
const ENABLE_REMOTE = process.env.ENABLE_LOG_REMOTE === 'TRUE';
const ENABLE_LOGGER = ENABLE_CONSOLE || ENABLE_REMOTE;
const ENABLE_TIMESTAMPS = ENABLE_LOGGER && process.env.ENABLE_LOG_TIMESTAMP === 'TRUE';

// flags that control log processing
const DEFAULT_LEVEL = (ENABLE_LOGGER) ? 4 : 0;
const LOG_LEVEL = LogPriorities[process.env.LOGGING_MODE || ''] || DEFAULT_LEVEL;

// TODO - streamline logging flow such that limited scopes/function calls are required
// logger needs to be as fast as possible on the frontend

/**
 * Logger that records client-side runtime messages
 * @version 1.0.0
 */
export default class Logger {
    /**
     * Records a fatal log message
     * @param {RuntimeException | string} log error information
     */
    static fatal(log: RuntimeException | string) {
        _recordException('FATAL', log);
    }

    /**
     * Records an error log message
     * @param {RuntimeException | string} log error information
     */
    static error(log: RuntimeException | string) {
        _recordException('ERROR', log);
    }

    /**
     * Records a warn log message
     * @param {RuntimeException | string} log error information
     */
    static warn(log: RuntimeException | string) {
        _recordException('WARN', log);
    }

    /**
     * Records an info log message
     * @param {string} message info message
     */
    static info(message: string) {
        _processLog({
            level: 'INFO',
            message
        });
    }

    /**
     * Records a debug log message
     * @param {string} message info message
     * @param {boolean} [logTrace] optionally logs stack trace
     */
    static debug(message: string, logTrace = false) {
        _processLog({
            level: 'DEBUG',
            message
        });

        if (ENABLE_CONSOLE && logTrace === true) {
            console.trace();
        }
    }

    /**
     * Clears console of previous logs
     */
    static clear() {
        if (ENABLE_CONSOLE) {
            console.clear();
        }
    }
}

/**
 * Fetches the current timestamp
 * @private
 * @returns {string} timestamp, minus time zone string
 */
 const _getTimestamp = (ENABLE_TIMESTAMPS) ? () => {
    const curr = (new Date()).toString();
    return curr.slice(0, curr.indexOf('(') - 1);
} : null;

/**
 * Logs a clientside message to the console
 * @private
 * @param {string} level log level
 * @param {string} message log message
 * @param {string} [code] custom error code
 * @param {string} [trace] stack trace
 * @param {number} [httpStatus] HTTP status code
 */
const _logConsole = (ENABLE_CONSOLE) ? (
    level: string,
    message: string,
    code?: string,
    httpStatus?: number,
    trace?: string
) => {
    const logHTTPStatus = (httpStatus) ? `[${httpStatus}]` : '';
    const logCode = (code) ? ` ${code} |` : '';
    const logStack = (trace) ? `\n.....\n${trace}` : '';
    const timestamp = (_getTimestamp) ? ` ${_getTimestamp()} |` : '';

    /**
     * @example [INFO] creating new order
     * @example [ERROR][404] Fri Apr 01 2021 00:00:00 GMT-0500 | LC-001 | failed to login
     * .....
     * [stack trace here]
     */
    const formatted = `[${level}]${logHTTPStatus}${timestamp}${logCode} ${message}${logStack}`;

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
//  * @constant {Function | null} _logRemote
//  * @description sends a log message to a remote service
//  * @param {LogMessage} log log message properties
//  */
// const _logRemote = (ENABLE_REMOTE) ? (log: LogMessage) => {

// } : null;

/**
 * Processes incoming log messages
 * @private
 * @param {LogData} log log message properties
 */
const _processLog = (ENABLE_LOGGER) ? (log: LogData) => {
    try {
        const {
            level,
            message,
            code,
            httpStatus,
            trace
        } = log;

        // reject logs lower than logging mode
        if (LogPriorities[level] < LOG_LEVEL) {
            return;
        }

        // log console message
        if (_logConsole) {
            _logConsole(level, message, code, httpStatus, trace);
        }

        // log remote message
        // if (logRemote) {
        //     logRemote(log);
        // }
    } catch (e) {
        if (console && console.error) {
            console.error(e.message);
        }
    }
} : () => {};

/**
 * Records error/exception level logs
 * @private
 * @param {string} level log level
 * @param {RuntimeException | string} log exception information
 */
const _recordException = (ENABLE_LOGGER) ? (
    level: LogLevels,
    log: string | RuntimeException
) => {
    if (log) {
        switch (typeof log) {
            case 'string':
                _processLog({
                    level,
                    message: log
                });
                break;
            case 'object':
                _processLog({
                    level,
                    ...log
                });
                break;
            default:
        }
    }
} : () => {};
