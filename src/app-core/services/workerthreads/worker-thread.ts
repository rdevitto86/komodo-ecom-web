/*
    NOTE:
    - add listeners functionality
*/

/**
 * @class
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
    public readonly id?: string;

    /**
     * @public
     * @readonly
     * @property {String | Undefined} filepath
     * @description thread executable filepath
     */
    public readonly filepath?: string;

    /**
     * @public
     * @readonly
     * @property {Function | Undefined} listener
     * @description parent-thread listener function
     */
    public readonly listener?: Function;

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
     * @private
     * @property {Boolean} _enabled
     * @description enables/disables thread creation
     */
    private _enabled: boolean = !!(window.Worker);

    /**
     * @constructor
     * @param {String} id thread identifier
     * @param {String} filepath workerthread executable filepath
     * @param {Function} msgCallback workerthread message handler
     * @param {Function} errCallback workerthread message handler
     */
    constructor(id: string, filepath: string, listener?: Function) {
        // validate and set thread properties
        this.id = id;
        this.filepath = filepath;
        this.listener = listener;

        // start new thread
        this.run();
    }

    /**
     * @public
     * @function WorkerThread.postMessage
     * @description sends information to child thread
     * @param {any} message data to send to child thread
     * @throws {Error}
     */
    postMessage(message: any) {
        if (this._thread) {
            this._thread.postMessage(message);
        } else {
            throw Error('failed to post message - worker thread non-exsistant');
        }
    }

    /**
     * @public
     * @function WorkerThread.run
     * @description builds and starts a webworker thread
     * @throws {Error}
     * @see Worker
     */
    run() {
        const { filepath, terminatedTimestamp, _enabled } = this;

        if (!_enabled) {
            throw new Error('failed to start worker thread - web workers not supported');
        }
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
    }

    /**
     * @public
     * @function WorkerThread.terminate
     * @description terminates/ends the current thread
     */
    terminate() {
        if (this._thread) {
            this.terminatedTimestamp = String((new Date()).getTime());
            this._thread.terminate();
            this._thread = undefined;
            this.isActive = false;
        }
    }

    /**
     * @public
     * @function WorkerThread.restart
     * @description restarts the worker thread
     */
    restart() {
        this.terminate();
        this.run();
    }

    /**
     * @public
     * @description returns the total time (in milliseconds) since thread start
     */
    get timeActive() {
        return (this.createdTimestamp)
            ? (Date.now() - new Date(this.createdTimestamp).getTime()) : 0;
    }
}
