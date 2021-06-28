/* eslint-disable class-methods-use-this */

/*
    NOTE:
        - add listeners functionality
        - https://threads.js.org/usage
        - https://threads.js.org/usage-observables
*/

/**
 * Web worker thread instance
 * @private
 */
let _thread: Worker | null = null;

/**
 * Implements a web-worker thread
 * @extends Worker
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
 */
export default class WorkerThread extends Worker {
    /**
     * Unique thread indentifier
     */
    id: string | null = null;

    /**
     * Executable filepath
     */
    filepath: string | URL | null = null;

    /**
     * Execution options
     */
    options?: globalThis.WorkerOptions;

    /**
     * Dentotes if thread is actively running
     */
    isActive: boolean = false;

    /**
     * Timestamp of thread creation
     */
    createdTimestamp: string | null = null;

    /**
     * Timestamp of thread termination
     */
    terminatedTimestamp: string | null = null;

    /**
     * @param {string} filepath thread executable filepath
     * @param {WorkerOptions} [options] thread identifier
     * @param {string} [id] thread identifier
     */
    constructor(
        filepath: string | URL,
        options?: globalThis.WorkerOptions,
        id?: string
    ) {
        super(filepath, options);

        // disable functionality if web workers not supported
        if (!window.Worker) {
            this.run = () => false;
            this.postMessage = () => false;
            this.terminate = () => false;
            this.restart = () => false;
            return;
        }

        // validate and set thread properties
        if (typeof id === 'string') {
            this.id = id;
        }
        this.filepath = filepath;
        this.options = options;
    }

    /**
     * Builds and starts a web-worker thread
     * @returns {boolean} success/failure
     * @throws {Error}
     */
    run() {
        const { filepath, terminatedTimestamp } = this;

        if (!filepath) {
            throw new Error('failed to start worker thread - missing filepath');
        }

        this.createdTimestamp = String((new Date()).getTime());

        const thread = new Worker(filepath, this.options);

        // // handles messages sent from child thread
        // thread.onmessage = (event: any) => {
        //     if (event && event.data) {
        //         this._msgCallback(event.data);
        //     }
        // };

        // // handles fatal errors thrown by child thread
        // thread.onerror = (event) => {
        //     this._errCallback(event);
        //     // this.terminate();
        // };

        // // handles message errors thrown by child thread
        // thread.onmessageerror = (event) => {
        //     this._errCallback(event);
        // };

        // set local thread
        _thread = thread;
        this.isActive = true;

        // reset last terminated time (if not previously)
        if (terminatedTimestamp) {
            this.terminatedTimestamp = null;
        }
        return true;
    }

    /**
     * Sends data to worker thread
     * @param {any} message data to send to child thread
     * @returns {boolean} success/failure
     * @throws {Error}
     */
    postMessage(message: any) {
        if (!_thread) {
            throw Error('failed to post message - worker thread non-exsistant');
        }
        _thread.postMessage(message);
        return true;
    }

    /**
     * Terminates the worker thread
     * @returns {boolean} success/failure
     */
    terminate() {
        if (_thread) {
            this.terminatedTimestamp = String((new Date()).getTime());
            _thread.terminate();
            _thread = null;
            this.isActive = false;
            return true;
        }
        return false;
    }

    /**
     * Restarts the worker thread
     * @returns {boolean} success/failure
     */
    restart() {
        return (this.terminate()) ? this.run() : false;
    }

    /**
     * Returns the total time (in milliseconds) since thread start
     */
    get timeActive() {
        return (this.createdTimestamp)
            ? (Date.now() - new Date(this.createdTimestamp).getTime())
            : 0;
    }
}
