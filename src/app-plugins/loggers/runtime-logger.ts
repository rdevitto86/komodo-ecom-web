const _allowConsole = Boolean(process.env.ENABLE_CONSOLE) && Boolean(console && console.log);
const _allowService = Boolean(process.env.ENABLE_LOGGING_SERVICE);

/**
 * @private
 * @interface LogLevels
 * @description abstract definition for a LOG_LEVELS map
 */
interface LogLevels {
    [key: string]: {
        priority: number;
        output: string;
    };
}

/**
 * @readonly
 * @constant LOG_LEVELS
 * @description map of allowed log events with inherent priority and console output
 */
const LOG_LEVELS: LogLevels = Object.freeze({
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

const _defaultLevel = String(process.env.DEFAULT_LOG_LEVEL);
const _defaultPriority = ((LOG_LEVELS[_defaultLevel] || {}).priority) || 5;

/**
 * @singleton
 * @constant LOGGER
 * @class RuntimeLogger
 * @version 0.1.2
 * @description creates a runtime logger that records errors and client-side activity
 */
export default new class RuntimeLogger {
    private _initCompleted = false;

    //injected resources
    private _userID: string | null = null;
    private _userRegion: string | null = null;

    /**
     * @private
     * @function RuntimeLogger~logConsoleMessage
     * @description prints a formatted console message
     * @param {String} level log level
     * @param {String} message log message
     * @param {Boolean} isError flag used to denote error logs
     * @param {String} output console output method
     * @param {Object} data data object passed from the calling function
     */
    private logConsoleMessage(
        level: string,
        message: string,
        isError: boolean,
        output: string,
        data?: any
    ): void {
        /**
            Example:

            [ERROR][500] Fri Mar 06 2020 19:41:40 GMT-0600 (Central Standard Time) | A1D-LP001 | Uncaught ReferenceError: foo is not defined
            ......
            @https://www.samplewesbite.com/javascript-tester.html line 46 > eval:4:11
            @https://www.samplewesbite.com.html:46:36
            dispatch@https://www.samplewesbite.com/js/jquery-1.10.2.min.js:5:14129

            ERROR CODE FORMAT:
            A1 - application ecom web
            d || m - view desktop/mobile
            1 - component
            lp - landing page
            001 - runtime error

            @see https://developer.mozilla.org/en-US/docs/Web/API/console
        */
        let log = `[${level}]`; //ex. [ERROR]
        const logDate = String(new Date()); //ex. Fri Mar 06 2020 19:41:40 ...

        if (isError) {
            log += (data.http) ? `[${data.http}] ` : ' '; //ex. [500]
            log += logDate;

            //ex. 0xvd1lp001 || Unhandled Exception
            log += ` | ${data.code || 'Unhandled Exception'} | `;
            log += (data.message)
                //ex. Uncaught ReferenceError: ...
                ? ` | ${data.message}  ${
                (data.stack || console.trace)
                    ? `\n.......\n ${data.stack || console.trace()}` : ''
                }` : message;
        } else {
            log += (logDate + message);
        }

        //print console log message
        switch (output) {
            case 'error':
                console.error(log);
                break;
            case 'warn':
                console.warn(log);
                break;
            case 'info':
                console.info(log);
                break;
            case 'debug':
                console.debug(log);

                //prints summplementary log data to console
                if (data !== undefined) {
                    console.debug(String(data));
                }
                break;
            default:
                console.log(log);

                //prints summplementary log data to console
                if (_defaultPriority === LOG_LEVELS.DEBUG.priority && data !== undefined) {
                    console.log(String(data));
                }
        }
    }

    /**
     * @private
     * @function RuntimeLogger~logServiceMessage
     * @description sends a client-side log to the logging service
     * @param {String} level log level
     * @param {String} message log message
     * @param {Boolean} isError flag used to denote error logs
     * @param {Object} data data object passed from the calling function
     */
    private logServiceMessage(
        level: string, message: string, isError: boolean, data?: any
    ): void {
        //TODO - fire and forget request
        //TODO - worker thread service logger

        fetch(String(process.env.LOGGING_SERVICE_URL), {
            method: 'POST',
            //TODO - headers
            headers: {
                'Content-Type': 'application/json',
            },
            //TODO - body
            body: JSON.stringify({
                level: level,
                message: (isError)
                    ? data.message : (message || null),
                error: (isError) ? {
                    code: data.code || null,
                    message: data.message || null,
                    stack: data.stack || null
                } : null,
                meta: {
                    custID: this._userID,
                    region: this._userRegion
                }
            })
        });
    }

    /**
     * @public
     * @function RuntimeLogger#log
     * @param {String} level message log level
     * @param {String} message situation context of a given event
     * @param {Object} data object containing supplemental log data
     */
    log(level: string, message: string, data?: any): void {
        const { priority, output } = (
            LOG_LEVELS[String(level)] || { priority: -1, output: 'log' }
        );

        //TODO - allow option for business-enabled flag in PROD
        //check if log type is allowed
        if (priority >= this.DEFAULT_LOG_PRIORITY) {
            return;
        }

        const isError = priority >= LOG_LEVELS.ERROR.priority && data instanceof Error;

        //check if console logging is available
        if (_allowConsole) {
            this.logConsoleMessage(level, message, isError, output, data);
        }

        //check if service logging is available
        if (_allowService) {
            this.logServiceMessage(level, message, isError, data);
        }
    }

    /**
     * @public
     * @function RuntimeLogger#fatal
     * @description - logs a fatal message
     * @param {Object} error - log message
     */
    fatal(error: any): void {
        this.log(
            'FATAL',
            (typeof error === 'string') ? error : '',
            (typeof error === 'object') ? error : null
        );
    }

    /**å
     * @public
     * @function RuntimeLogger#error
     * @description - logs a error message
     * @param {Object} error - log message
     */
    error(error: any): void {
        this.log(
            'ERROR',
            (typeof error === 'string') ? error : '',
            (typeof error === 'object') ? error : null
        );
    }

    /**
     * @public
     * @function RuntimeLogger#warn
     * @description - logs a warning message
     * @param {String} message - log message
     */
    warn(message: string): void {
        this.log('WARN', message);
    }

    /**
     * @public
     * @function RuntimeLogger#info
     * @description - logs a info message
     * @param {String} message - log message
     */
    info(message: string): void {
        this.log('INFO', message);
    }

    /**
     * @public
     * @function RuntimeLogger#config
     * @description - logs a configuration message
     * @param {String} message - log message
     */
    config(message: string): void {
        this.log('CONFIG', message);
    }

    /**
     * @public
     * @function RuntimeLogger#debug
     * @description logs a debug message
     * @param {String} message log message
     * @param {Object} data additional data to log
     */
    debug(message: string, data?: object): void {
        this.log('DEBUG', message, data);
    }

    /**
     * @public
     * @function RuntimeLogger#init
     * @description configures the runtime logger with runtme resources
     * @param {Object} config object containing app-specific injections
     * @returns {Boolean} boolean
     */
    init(config: any): boolean {
        //determine if previous setup has been completed
        if (!this._initCompleted && config && typeof config === 'object') {
            const { userID, region } = config;

            //set injected properties
            if (typeof userID === 'string') {
                this._userID = userID;
            }
            if (typeof region === 'string') {
                this._userRegion = region;
            }
            //setup complete
            this._initCompleted = true;
        }
        return this._initCompleted;
    }

    /**
     * @public
     * @function RuntimeLogger#initComplete
     * @description fetches the initialization status for the logger
     * @returns {Boolean} boolean
     */
    initComplete(): boolean {
        return this._initCompleted;
    }

    /**
     * @public
     * @readonly
     * @property DEFAULT_LOG_LEVEL
     * @description - gets the default log level
     * @returns {String} string
     */
    get DEFAULT_LOG_LEVEL(): string {
        return _defaultLevel;
    }

    /**
     * @public
     * @readonly
     * @property DEFAULT_LOG_PRIORITY
     * @description - gets the default log level priority
     * @returns {String} string
     */
    get DEFAULT_LOG_PRIORITY(): number {
        return _defaultPriority;
    }

    /**
     * @public
     * @readonly
     * @property LOG_LEVELS
     * @description - gets the standardized log levels
     * @returns {Object} object
     */
    get LOG_LEVELS(): LogLevels {
        return LOG_LEVELS;
    }

    /**
     * @public
     * @readonly
     * @property FATAL
     * @returns {String} string
     */
    get FATAL(): string {
        return 'FATAL';
    }

    /**
     * @public
     * @readonly
     * @property ERROR
     * @returns {String} string
     */
    get ERROR(): string {
        return 'ERROR';
    }

    /**
     * @public
     * @readonly
     * @property WARN
     * @returns {String} string
     */
    get WARN(): string {
        return 'WARN';
    }

    /**
     * @public
     * @readonly
     * @property INFO
     * @returns {String} string
     */
    get INFO(): string {
        return 'INFO';
    }

    /**
     * @public
     * @readonly
     * @property CONFIG
     * @returns {String} string
     */
    get CONFIG(): string {
        return 'CONFIG';
    }

    /**
     * @public
     * @readonly
     * @property DEBUG
     * @returns {String} string
     */
    get DEBUG(): string {
        return 'DEBUG';
    }
}();

//prints custom log message informing users about application
if (_allowConsole) {
    console.log(
        'TODO - print warning/developer information on start-up (like Facebook)'
    );
}
