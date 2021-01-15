/**
 * @class
 * @singleton
 * @description clientside logger that records runtime messages
 */
export default Object.freeze(new class Logger {
    constructor() {
        const {
            LOGGING_MODE, ENABLE_CONSOLE, ENABLE_LOGGING_SERVICE
        } = process.env;

        const isProd = LOGGING_MODE === 'PROD';
        const hasConsole = (console && console.log) !== undefined;
        const enableConsole = hasConsole && ENABLE_CONSOLE === 'TRUE';
        const enableRemote = ENABLE_LOGGING_SERVICE === 'TRUE';

        /**
         * @public
         * @static
         * @function Logger#IS_PROD
         * @readonly
         * @description flag used to enable local logging
         * @returns {Boolean}
         */
        this.IS_PROD = () => isProd;

        /**
         * @public
         * @function Logger#logConsole
         * @description prints a log message to the browser console
         * @param {String} message log message
         * @param {String?} level log level
         * @param {String?} errorCode app-specific error code
         * @param {(String | Number)?} httpCode http status code
         * @see https://developer.mozilla.org/en-US/docs/Web/API/console
         */
        this.logConsole = (enableConsole) ? (message, level, errorCode, httpCode) => {
            // validate log message
            if (typeof message !== 'string' || message === '') {
                return;
            }

            // build new log string with relevant data
            const logLevel = (typeof level === 'string') ? `[${level}]` : '';
            const logHTTP = (httpCode) ? `[${httpCode}] ` : '';
            const logTimestamp = `${String(new Date())}`;
            const logErrorCode = (errorCode) ? ` | ${errorCode}` : '';
            const logMessage = ` | ${message}`;

            /*
                Example:
                [ERROR][500] Fri Mar 06 2020 19:41:40 GMT-0600 (Central Standard Time)
                | ECD-LP001 | Uncaught ReferenceError: foo is not defined
                ......
                @https://www.samplewesbite.com/javascript-tester.html line 46 > eval:4:11
                @https://www.samplewesbite.com.html:46:36
                dispatch@https://www.samplewesbite.com/js/jquery-1.10.2.min.js:5:14129
            */
            const formatted = `${logLevel}${logHTTP}${logTimestamp}${logErrorCode}${logMessage}`;

            switch (level) {
                case 'FATAL':
                case 'ERROR':
                    console.error(`${formatted}\n......\n${console.trace()}`);
                    break;
                case 'WARN':
                    console.warn(formatted);
                    break;
                case 'INFO':
                case 'CONFIG':
                    console.info(formatted);
                    break;
                case 'DEBUG':
                    console.debug(formatted);
                    break;
                default:
                    console.log(formatted);
            }
        } : () => {}; // remove functionality if disabled

        /**
         * @public
         * @function Logger#logRemote
         * @param {Object} message log message data
         * @description records front-end errors to remote analytics DB
         */
        this.logRemote = (enableRemote)
            ? (message) => {
                fetch('https://www.todo.com', {
                    message
                });
            }
            : () => {}; // remove functionality if disabled

        // print start-up message
        if (hasConsole) {
            console.log(
`Looks like we got someone who knows what they're doing here...
     
We trust you're accessing our web console to learn about the cool technology at work; and not abuse the availibility of Javascript code.
Don't worry though, we tied-up all loose ends such that only learning can transpire here.

With that said, we at Komodo admire all those seeking to further their understanding of web/mobile technologies. This website was built not only with
the intention of providing customer with a marketplace to utilize our services, but a place to learn and improve skillsets. 
         
Hidden within the codebase of this website are three easter-eggs. Each one will corresponds with a user's web skillset 
(ex. beginner, intermediate, and advanced). These easter-eggs will utilize the full-stack of technologies at play. Don't be afraid to experiment
with what's available to you.
         
Happy hunting!
-Komodo WebDev Teams`
            );
        }
    }

    /**
     * @public
     * @function Logger#fatal
     * @description logs a fatal message
     * @param {Error} error runtime-generated error
     */
    fatal(error) {
        const { message, code, http } = error;
        const level = this.FATAL;

        this.logConsole(message, level, code, http);
        this.logRemote({
            message,
            level,
            code,
            http
        });
    }

    /**
     * @public
     * @function Logger#error
     * @description logs an error message
     * @param {Error} error runtime-generated error
     */
    error(error) {
        const { message, code, http } = error;
        const level = this.ERROR;

        this.logConsole(message, level, code, http);
        this.logRemote({
            message,
            level,
            code,
            http
        });
    }

    /**
     * @public
     * @function Logger#warning
     * @description logs a warning message
     * @param {String} message log message to record
     */
    warning(message) {
        if (!this.IS_PROD) {
            this.logConsole(message, this.WARN);
        }
    }

    /**
     * @public
     * @function Logger#info
     * @description logs an informational message
     * @param {String} message log message to record
     */
    info(message) {
        if (!this.IS_PROD) {
            this.logConsole(message, this.INFO);
        }
    }

    /**
     * @public
     * @function Logger#config
     * @description logs a configuration message
     * @param {String} message log message to record
     */
    config(message) {
        if (!this.IS_PROD) {
            this.logConsole(message, this.CONFIG);
        }
    }

    /**
     * @public
     * @function Logger#debug
     * @description logs a debug message
     * @param {String} message log message to record
     */
    debug(message) {
        if (!this.IS_PROD) {
            this.logConsole(message, this.DEBUG);
        }
    }

    /**
     * @public
     * @static
     * @readonly
     * @property {String} FATAL
     */
    static get FATAL() {
        return 'FATAL';
    }

    /**
     * @public
     * @static
     * @readonly
     * @property {String} ERROR
     */
    static get ERROR() {
        return 'ERROR';
    }

    /**
     * @public
     * @static
     * @readonly
     * @property {String} WARN
     */
    static get WARN() {
        return 'WARN';
    }

    /**
     * @public
     * @static
     * @readonly
     * @property {String} INFO
     */
    static get INFO() {
        return 'INFO';
    }

    /**
     * @public
     * @static
     * @readonly
     * @property {String} CONFIG
     */
    static get CONFIG() {
        return 'CONFIG';
    }

    /**
     * @public
     * @static
     * @readonly
     * @property {String} DEBUG
     */
    static get DEBUG() {
        return 'DEBUG';
    }
}());
