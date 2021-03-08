/*
    NOTE:
    - add listeners functionality
*/

/**
 * @class
 * @version 1.0.0
 * @description
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
 */
export default class WorkerThread {
    /**
     * @public
     * @readonly
     * @property {String | Undefined} id
     * @description thread indentifier
     */
    public readonly id: string;

    /**
     * @public
     * @readonly
     * @property {String | Undefined} filepath
     * @description thread executable filepath
     */
    public readonly filepath: string;

    /**
     * @public
     * @readonly
     * @property {Function | Function[] | Undefined} listener
     * @description parent-thread listener function
     */
    public readonly listener?: Function | Function[];

    /**
     * @public
     * @property {Boolean} isActive
     * @description timestamp of thread termination
     */
    public isActive: boolean = false;

    /**
     * @public
     * @property {String | Undefined} createdTimestamp
     * @description timestamp of thread creation
     */
    public createdTimestamp?: string;

    /**
     * @public
     * @property {String | Undefined} terminatedTimestamp
     * @description timestamp of thread termination
     */
    public terminatedTimestamp?: string;

    /**
     * @private
     * @property {Worker | Undefined} _thread
     * @description web worker thread instance
     */
    private _thread?: Worker;

    /**
     * @constructor
     * @param {String} id thread identifier
     * @param {String} filepath thread executable filepath
     * @param {Function | Function[] | Undefined} [listener] workerthread message handler
     */
    constructor(id: string, filepath: string, listener?: Function | Function[]) {
        // validate and set thread properties
        this.id = id;
        this.filepath = filepath;
        this.listener = listener;

        // disable functionality if web workers not supported
        if (window.Worker) {
            // start new thread
            this.run();
        } else {
            this.run = () => false;
            this.postMessage = () => false;
            this.terminate = () => false;
            this.restart = () => false;
        }
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

        const thread = new Worker(filepath);

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
        this._thread = thread;
        this.isActive = true;

        // reset last terminated time (if not previously)
        if (terminatedTimestamp) {
            this.terminatedTimestamp = undefined;
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
    postMessage(message: any): boolean {
        if (!this._thread) {
            throw Error('failed to post message - worker thread non-exsistant');
        }
        this._thread.postMessage(message);
        return true;
    }

    /**
     * @public
     * @function WorkerThread.terminate
     * @description terminates/ends the current thread
     * @returns {Boolean} success/failure
     */
    terminate(): boolean {
        if (this._thread) {
            this.terminatedTimestamp = String((new Date()).getTime());
            this._thread.terminate();
            this._thread = undefined;
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
    restart(): boolean {
        return (this.terminate()) ? this.run() : false;
    }

    /**
     * @public
     * @property {Number} timeActive
     * @description returns the total time (in milliseconds) since thread start
     */
    get timeActive() {
        return (this.createdTimestamp)
            ? (Date.now() - new Date(this.createdTimestamp).getTime()) : 0;
    }
}
