import UserModel from '../../app-core/models/user';
import BrowserUtil from '../../app-supplemental/utility/browser-util';

const LOG_PROPS = {
    'FATAL': {
        priority: 6,
        output: 'error'
    },
    'ERROR': {
        priority: 5,
        output: 'error'
    },
    'WARN': {
        priority: 4,
        output: 'warn'
    },
    'INFO': {
        priority: 3,
        output: 'info'
    },
    'CONFIG': {
        priority: 2,
        output: 'log'
    },
    'DEBUG': {
        priority: 1,
        output: 'debug'
    },
    'OFF': {
        priority: 0,
        output: 'null'
    }
};
Object.freeze(LOG_PROPS);

const _defaultLevel = String(process.env.LOG_LEVEL);
const _defaultPriority = ((LOG_PROPS[_defaultLevel] || {}).priority) || 5;

//TODO - allow option for business-enabled flag in PROD
const _allowConsole = process.env.ENABLE_CONSOLE && Boolean(console) && Boolean(console.log); 
const _allowService = process.env.ENABLE_LOGGING_SERVICE;

/**
 * @class
 * @version 0.1.0
 * @description - creates a runtime logger that records errors and client-side activity
 */
class RuntimeLogger {
    /**
     * @public
     * @function Logger#log
     * @param {String} level - message log level
     * @param {String} message - situation context of a given event
     * @param {Object} error - object containing error properties
     */
    log(level = undefined, message = undefined, error = undefined) {
        const logProps = LOG_PROPS[String(level)] || {
            priority: -1
        };

        //check if log type is allowed
        if(logProps.priority >= _defaultPriority) {
            return;
        }

        const isError = logProps.priority >= LOG_PROPS['ERROR'].priority;

        //check if console logging is available
        if(_allowConsole) {
            /**
                Prints a formatted console message to the client browser using the console interface. Example: 
                
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
            let log = '[' + level + ']'; //ex. [ERROR]

            log += (isError && error.http) ? ('[' + error.http + '] ') : ' '; //ex. [500]
            log += String(new Date()); //ex. Fri Mar 06 2020 19:41:40 ...

            if(isError && error instanceof Error) {
                //ex. 0xvd1lp001 || Unhandled Exception
                log += (' | ' + (error.code || 'Unhandled Exception') + ' | ');
                log += (error.message) 
                    //ex. Uncaught ReferenceError: ...
                    ? (' | ' + error.message + (
                        /** @see console.trace */
                        (error.stack || console.trace) 
                            ? '\n.......\n' + (Boolean(error.stack)) 
                                ? error.stack : console.trace()
                            : ''
                    )) : message;
            } else {
                log += message;
            }

            //print console log message 
            (console[logProps.output] || console.log)(log);
        }

        //check if service logging is available
        if(_allowService) {
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
                    'level': level,
                    'message': (isError)
                        ? error.message : (message || null),
                    'error': (isError) ? {
                        code: error.code || null,
                        message: error.message || null,
                        stack: error.stack || null
                    } : null,
                    'meta': {
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
     * @function Logger#fatal
     * @description - logs a fatal message 
     * @param {Object} error - log message
     */
    fatal(error = undefined) {
        this.log('FATAL', null, error);
    }

    /**
     * @public
     * @function Logger#error
     * @description - logs a error message 
     * @param {Object} error - log message
     */
    error(error = undefined) {
        this.log('ERROR', null, error);
    }

    /**
     * @public
     * @function Logger#warn
     * @description - logs a warning message 
     * @param {String} message - log message
     */
    warn(message = undefined) {
        this.log('WARN', message);
    }

    /**
     * @public
     * @function Logger#info
     * @description - logs a info message 
     * @param {String} message - log message
     */
    info(message = undefined) {
        this.log('INFO', message);
    }

    /**
     * @public
     * @function Logger#config
     * @description - logs a configuration message 
     * @param {String} message - log message
     */
    config(message = undefined) {
        this.log('CONFIG', message);
    }

    /**
     * @public
     * @function Logger#debug
     * @description - logs a debug message 
     * @param {String} message - log message
     */
    debug(message = undefined) {
        this.log('DEBUG', message);
    }

    /**
     * @public
     * @static
     * @property LOG_LEVEL
     * @returns {String}
     */
    static get LOG_LEVEL() {
        return _defaultLevel;
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

const instance = new RuntimeLogger();
Object.freeze(instance);

if(_allowConsole) {
    console.log(
        `TODO - print warning/developer information on start-up (like Facebook)`
    );
}

export default instance;