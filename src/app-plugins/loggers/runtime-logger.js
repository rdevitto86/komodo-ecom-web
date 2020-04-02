//import UserModel from '../../app-core/models/user'; //TODO - dependancy cycle -> move to state manager

import BrowserUtil from '../utility/browser-util';

const _allowConsole = process.env.ENABLE_CONSOLE && Boolean(console) && Boolean(console.log);
const _allowService = process.env.ENABLE_LOGGING_SERVICE;

const _defaultLevel = String(process.env.LOG_LEVEL);

const LOG_LEVELS = Object.freeze({
    FATAL: {
        priority: 6,
        output: 'error'
    },
    ERROR: {
        priority: 5,
        output: 'error'
    },
    WARN: {
        priority: 4,
        output: 'warn'
    },
    INFO: {
        priority: 3,
        output: 'info'
    },
    CONFIG: {
        priority: 2,
        output: 'log'
    },
    DEBUG: {
        priority: 1,
        output: 'debug'
    },
    OFF: {
        priority: 0,
        output: 'log'
    }
});

/**
 * @class
 * @version 0.1.1
 * @description - creates a runtime logger that records errors and client-side activity
 */
class RuntimeLogger {
    /**
     * @public
     * @function RuntimeLogger#log
     * @param {String} level - message log level
     * @param {String} message - situation context of a given event
     * @param {Object} data - object containing supplemental log data
     */
    log(level = undefined, message = undefined, data = undefined) {
        const { priority, output } = (LOG_LEVELS[String(level)] || {});

        //TODO - allow option for business-enabled flag in PROD
        //check if log type is allowed
        if (priority >= this.DEFAULT_LOG_PRIORITY) {
            return;
        }

        const isError = priority >= LOG_LEVELS.ERROR.priority && data instanceof Error;

        //check if console logging is available
        if (_allowConsole) {
            /**
                Example:

                [ERROR][500] Fri Mar 06 2020 19:41:40 GMT-0600 (Central Standard Time) | 0xvd1lp001 | Uncaught ReferenceError: foo is not defined
                ......
                @https://www.samplewesbite.com/javascript-tester.html line 46 > eval:4:11
                @https://www.samplewesbite.com.html:46:36
                dispatch@https://www.samplewesbite.com/js/jquery-1.10.2.min.js:5:14129

                ERROR CODE FORMAT:
                0x - ecom web site
                vd || vm - view desktop/mobile
                1 - component
                lp - landing page
                001 - runtime error

                @see https://developer.mozilla.org/en-US/docs/Web/API/console
            */
            let log = `[${level}]`; //ex. [ERROR]

            log += (isError && data.http) ? `['${data.http}] ` : ' '; //ex. [500]
            log += String(new Date()); //ex. Fri Mar 06 2020 19:41:40 ...

            if (isError) {
                //ex. 0xvd1lp001 || Unhandled Exception
                log += ` | ${data.code || 'Unhandled Exception'} | `;
                log += (data.message)
                    //ex. Uncaught ReferenceError: ...
                    ? ` | ${data.message}  ${
                        (data.stack || console.trace)
                            ? `\n.......\n ${data.stack || console.trace()}` : ''
                    }` : message;
            } else {
                log += message;
            }

            //print console log message
            (console[output] || console.log)(log);

            //prints summplementary log data to console
            if (priority === LOG_LEVELS.DEBUG.priority) {
                (console.debug || console.log)(String(data));
            }
        }

        //check if service logging is available
        if (_allowService) {
            //TODO - fire and forget request
            //TODO - worker thread service logger

            fetch(process.env.URL_RUNLOG, {
                method: 'POST',
                //TODO - headers
                headers: {
                    'Content-Type': 'application/json',
                },
                //TODO - body
                body: {
                    level: level,
                    message: (isError)
                        ? data.message : (message || null),
                    error: (isError) ? {
                        code: data.code || null,
                        message: data.message || null,
                        stack: data.stack || null
                    } : null,
                    meta: {
                        custID: UserModel.custID,
                        custName: UserModel.custName,
                        region: BrowserUtil.region
                    }
                }
            });
        }
    }

    /**
     * @public
     * @function RuntimeLogger#fatal
     * @description - logs a fatal message
     * @param {Object} error - log message
     */
    fatal(error = undefined) {
        this.log('FATAL', null, error);
    }

    /**
     * @public
     * @function RuntimeLogger#error
     * @description - logs a error message
     * @param {Object} error - log message
     */
    error(error = undefined) {
        this.log('ERROR', null, error);
    }

    /**
     * @public
     * @function RuntimeLogger#warn
     * @description - logs a warning message
     * @param {String} message - log message
     */
    warn(message = undefined) {
        this.log('WARN', message);
    }

    /**
     * @public
     * @function RuntimeLogger#info
     * @description - logs a info message
     * @param {String} message - log message
     */
    info(message = undefined) {
        this.log('INFO', message);
    }

    /**
     * @public
     * @function RuntimeLogger#config
     * @description - logs a configuration message
     * @param {String} message - log message
     */
    config(message = undefined) {
        this.log('CONFIG', message);
    }

    /**
     * @public
     * @function RuntimeLogger#debug
     * @description - logs a debug message
     * @param {String} message - log message
     * @param {Object} data - additional data to log
     */
    debug(message = undefined, data = undefined) {
        this.log('DEBUG', message, data);
    }

    /**
     * @public
     * @static
     * @property DEFAULT_LOG_LEVEL
     * @description - gets the default log level
     * @returns {String}
     */
    static get DEFAULT_LOG_LEVEL() {
        return _defaultLevel;
    }

    /**
     * @public
     * @static
     * @property DEFAULT_LOG_PRIORITY
     * @description - gets the default log level priority
     * @returns {String}
     */
    static get DEFAULT_LOG_PRIORITY() {
        return ((LOG_LEVELS[_defaultLevel] || {}).priority) || 5;
    }

    /**
     * @public
     * @static
     * @property LOG_LEVELS
     * @description - gets the standardized log levels
     * @returns {Object}
     */
    static get LOG_LEVELS() {
        return LOG_LEVELS;
    }

    /**
     * @public
     * @static
     * @property FATAL
     * @returns {String}
     */
    static get FATAL() {
        return 'FATAL';
    }

    /**
     * @public
     * @static
     * @property ERROR
     * @returns {String}
     */
    static get ERROR() {
        return 'ERROR';
    }

    /**
     * @public
     * @static
     * @property WARN
     * @returns {String}
     */
    static get WARN() {
        return 'WARN';
    }

    /**
     * @public
     * @static
     * @property INFO
     * @returns {String}
     */
    static get INFO() {
        return 'INFO';
    }

    /**
     * @public
     * @static
     * @property CONFIG
     * @returns {String}
     */
    static get CONFIG() {
        return 'CONFIG';
    }

    /**
     * @public
     * @static
     * @property DEBUG
     * @returns {String}
     */
    static get DEBUG() {
        return 'DEBUG';
    }
}

const LOGGER = new RuntimeLogger();
Object.freeze(LOGGER);

//prints custom log message informing users about application
if (_allowConsole) {
    console.log(
        'TODO - print warning/developer information on start-up (like Facebook)'
    );
}

export default LOGGER;
