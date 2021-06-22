/**
 * Time instance object
 * @private
 */
let _timer: number | null = null;

/**
 * Default timeout (in milliseconds)
 * @private
 */
const DEFAULT_TIMEOUT = 1000;

/**
 * A running timer to track time durations
 * @version 1.0.0
 */
export default class RunningTimer {
    /**
     * Formatted running time
     */
    current: string = '00:00:00';

    /**
     * Number of milliseconds past
     */
    milliseconds: number = 0;

    /**
     * Denotes if the timer is currently running
     */
    isRunning: boolean = false;

    /**
     * Timestamp of start time
     */
    startTime: string | null = null;

    /**
     * Timestamp of end time
     */
    endTime: string | null = null;

    /**
     * Lap history
     */
    history: string[] = [];

    /**
     * Starts the timer
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
     * Stops the timer
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
     * Adds a timestamp to lap history
     */
    lap() {
        this.history.push(this.current);
    }

    /**
     * Resets the timer to default state
     */
    reset() {
        this.stop();
        this.milliseconds = 0;
        this.current = '00:00:00';
        this.startTime = null;
        this.history = [];
    }

    /**
     * Time elapsed in seconds
     */
    get seconds() {
        const { current } = this;
        return Number(current.substring(current.length - 2, current.length));
    }

    /**
     * Time elapsed in minutes
     */
    get minutes() {
        const { current } = this;
        const startIndex = current.indexOf(':');
        return Number(current.substring(startIndex + 1, startIndex + 3));
    }

    /**
     * Time elapsed in hours
     */
    get hours() {
        return Number(this.current.substring(0, 2));
    }
}
