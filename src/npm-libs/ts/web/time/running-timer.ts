/**
 * @private
 * @description timer object
 */
let _timer: number | null = null;

/**
 * @private
 * @readonly
 * @description default timeout in milliseconds
 */
const DEFAULT_TIMEOUT = 1000;

/**
 * @version 1.0.0
 * @description creates a stopwatch timer to track time durations
 */
export default class RunningTimer {
    /**
     * @description shows the current running time
     */
    current: string = '00:00:00';

    /**
     * @description number of milliseconds past
     */
    milliseconds: number = 0;

    /**
     * @description shows if the timer is currently running
     */
    isRunning: boolean = false;

    /**
     * @description timer start
     */
    startTime: string | null = null;

    /**
     * @description timer end
     */
    endTime: string | null = null;

    /**
     * @description lap history
     */
    history: string[] = [];

    /**
     * @description starts the timer
     * @param {number} [timeout] custom timeout variable
     */
    start(timeout: number) {
        // validate the timeout variable
        if (typeof timeout !== 'number' || timeout <= 0) {
            timeout = DEFAULT_TIMEOUT;
        }

        this.startTime = (new Date()).toDateString();

        // start new timer and begin recording (timeout of 1000ms)
        _timer = window.setInterval(() => {
            this.milliseconds++;

            let remain = this.milliseconds;

            let hours: number | string = Math.floor(remain / 3600);
            remain -= hours * 3600;

            let mins: number | string = Math.floor(remain / 60);
            remain -= mins * 60;

            let secs: number | string = remain;

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
        }, timeout);

        // set runtime variables
        this.isRunning = true;
        this.endTime = null;
    }

    /**
     * @description ends the timer
     */
    stop() {
        if (_timer) {
            this.endTime = new Date().toDateString();
            window.clearInterval(_timer);
            _timer = null;
            this.isRunning = false;
        }
    }

    /**
     * @description adds a recorded time (lap)
     */
    lap() {
        const { history, current } = this;
        history.push(current);
    }

    /**
     * @description resets the timer to default state
     */
    reset() {
        // remove timer (if not stopped)
        this.stop();

        // reset locals
        this.milliseconds = 0;
        this.current = '00:00:00';
        this.startTime = null;
        this.history = [];
    }

    /**
     * @description total time elapsed in seconds
     */
    get seconds() {
        const { current } = this;
        const results = Number(current.substring(current.length - 2, current.length));
        return (!Number.isNaN(results)) ? results : -1;
    }

    /**
     * @description total time elapsed in minutes
     */
    get minutes() {
        const { current } = this;
        const startIndex = current.indexOf(':');
        const results = Number(current.substring(startIndex + 1, startIndex + 3));
        return (!Number.isNaN(results)) ? results : -1;
    }

    /**
     * @description total time elapsed in hours
     */
    get hours() {
        const results = Number(this.current.substring(0, 2));
        return (!Number.isNaN(results)) ? results : -1;
    }
}
