/* eslint-disable class-methods-use-this */

/*
    NOTE:
        - add listeners functionality
        - https://threads.js.org/usage
        - https://threads.js.org/usage-observables
*/

/**
 * @private
 * @property {Worker | Null} _thread
 * @description web worker thread instance
 */
let _thread: Worker | null = null;

/**
 * @class
 * @version 1.0
 * @extends {Worker}
 * @description
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
 */
export default class WorkerThread extends Worker {
    /**
     * @public
     * @property {String | Null} id
     * @description thread indentifier
     */
    public id: string | null = null;

    /**
     * @public
     * @property {String | Null} filepath
     * @description thread executable filepath
     */
    public filepath: string | URL | null = null;

    /**
     * @public
     * @property {WorkerOptions} [filepath]
     * @description thread execution options
     */
    public options?: globalThis.WorkerOptions;

    /**
     * @public
     * @property {Boolean} isActive
     * @description timestamp of thread termination
     */
    public isActive: boolean = false;

    /**
     * @public
     * @property {String | Null} createdTimestamp
     * @description timestamp of thread creation
     */
    public createdTimestamp: string | null = null;

    /**
     * @public
     * @property {String | Null} terminatedTimestamp
     * @description timestamp of thread termination
     */
    public terminatedTimestamp: string | null = null;

    /**
     * @constructor
     * @param {String} filepath thread executable filepath
     * @param {WorkerOptions} [options] thread identifier
     * @param {String} [id] thread identifier
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
     * @public
     * @function WorkerThread.run
     * @description builds and starts a webworker thread
     * @returns {Boolean} success/failure
     * @throws {Error}
     * @see Worker
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
     * @public
     * @function WorkerThread.postMessage
     * @description sends information to child thread
     * @param {any} message data to send to child thread
     * @returns {Boolean} success/failure
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
     * @public
     * @function WorkerThread.terminate
     * @description terminates/ends the current thread
     * @returns {Boolean} success/failure
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
     * @public
     * @function WorkerThread.restart
     * @description restarts the worker thread
     * @returns {Boolean} success/failure
     */
    restart() {
        return (this.terminate()) ? this.run() : false;
    }

    /**
     * @public
     * @property {Number} timeActive
     * @description returns the total time (in milliseconds) since thread start
     */
    get timeActive() {
        return (this.createdTimestamp)
            ? (Date.now() - new Date(this.createdTimestamp).getTime())
            : 0;
    }
}
