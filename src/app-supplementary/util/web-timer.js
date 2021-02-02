/**
 * @class
 * @version 1.0.0
 * @description creates a stopwatch timer to track time durations
 */
export default class WebTimer {
    /**
     * @constructor
     * @param {Function} [pipe] injected callback used to stream values realtime
     */
    constructor(pipe) {
        /**
         * @public
         * @property {String} current
         * @description shows the current running time
         */
        this.current = '00:00:00';

        /**
         * @public
         * @property {Number} milliseconds
         * @description number of milliseconds past
         */
        this.milliseconds = 0;

        /**
         * @public
         * @property {Boolean} isRunning
         * @description shows if the timer is currently running
         */
        this.isRunning = false;

        /**
         * @public
         * @property {String | Undefined} startTime
         * @description timer start
         */
        this.startTime = undefined;

        /**
         * @public
         * @property {String | Undefined} endTime
         * @description timer end
         */
        this.endTime = undefined;

        /**
         * @public
         * @property {String[]} history
         * @description lap history
         */
        this.history = [];

        /**
         * @private
         * @constant HAS_PIPE
         * @type {Boolean}
         * @description enables value streaming
         */
        const HAS_PIPE = typeof pipe === 'function';

        /**
         * @private
         * @constant DEFAULT_TIMEOUT
         * @type {Number}
         * @description default timeout in milliseconds
         */
        const DEFAULT_TIMEOUT = 1000;

        /**
         * @private
         * @var _timer
         * @type {NodeJS.Timeout | Null}
         * @description timer object
         */
        let _timer = null;

        /**
         * @public
         * @function Timer.start
         * @description starts the timer
         * @param {Number} [timeout] custom timeout variable
         * @see setInterval
         */
        this.start = (timeout) => {
            // validate the timeout variable
            if (typeof timeout !== 'number' || timeout <= 0) {
                timeout = DEFAULT_TIMEOUT;
            }

            this.startTime = new Date().toDateString();

            // start new timer and begin recording (timeout of 1000ms)
            _timer = setInterval(() => {
                this.milliseconds++;

                let remain = this.milliseconds;

                let hours = Math.floor(remain / 3600);
                remain -= hours * 3600;

                let mins = Math.floor(remain / 60);
                remain -= mins * 60;

                let secs = remain;

                if (hours < 10) {
                    hours = `0${hours}`;
                }
                if (mins < 10) {
                    mins = `0${mins}`;
                }
                if (secs < 10) {
                    secs = `0${secs}`;
                }

                this.current = `${hours}:${mins}:${secs}`;

                // record to data stream
                if (HAS_PIPE) {
                    pipe();
                }
            }, timeout);

            // set runtime variables
            this.isRunning = true;
            this.endTime = undefined;
        };

        /**
         * @public
         * @function Timer.stop
         * @description ends the timer
         * @see clearInterval
         */
        this.stop = () => {
            this.endTime = new Date().toDateString();
            clearInterval(_timer);
            _timer = null;
            this.isRunning = false;
        };

        /**
         * @public
         * @function Timer.lap
         * @description adds a recorded time (lap)
         */
        this.lap = () => {
            const { history, current } = this;
            history.push(current);
        };

        /**
         * @public
         * @function Timer.reset
         * @description resets the timer to default state
         */
        this.reset = () => {
            // remove timer (if not stopped)
            if (_timer) {
                this.stop();
            }

            // reset locals
            this.milliseconds = 0;
            this.current = '00:00:00';
            this.startTime = undefined;
            this.history = [];
        };
    }

    /**
     * @public
     * @readonly
     * @property {Number} seconds
     * @description total time elapsed in seconds
     */
    get seconds() {
        const { current } = this;
        const results = Number(current.substring(current.length - 2, current.length));
        return (!Number.isNaN(results)) ? results : -1;
    }

    /**
     * @public
     * @readonly
     * @property {Number} minutes
     * @description total time elapsed in minutes
     */
    get minutes() {
        const { current } = this;
        const startIndex = current.indexOf(':');
        const results = Number(current.substring(startIndex + 1, startIndex + 3));
        return (!Number.isNaN(results)) ? results : -1;
    }

    /**
     * @public
     * @readonly
     * @property {Number} hours
     * @description total time elapsed in hours
     */
    get hours() {
        const results = Number(this.current.substring(0, 2));
        return (!Number.isNaN(results)) ? results : -1;
    }
}
