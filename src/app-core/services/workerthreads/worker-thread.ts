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
     * @description thread indentifier
     */
    public readonly id?: string;

    /**
     * @public
     * @readonly
     * @description thread executable filepath
     */
    public readonly filepath?: string;

    /**
     * @public
     * @description timestamp of thread creation
     */
    public createdTimestamp?: string;

    /**
     * @public
     * @description timestamp of thread termination
     */
    public terminatedTimestamp?: string;

    /**
     * @private
     * @description web worker thread instance
     */
    private _thread?: Worker;

    /**
     * @private
     * @description messenge handler callback (parent thread)
     */
    private _msgCallback: Function = () => {};

    /**
     * @private
     * @description error callback (parent thread)
     */
    private _errCallback: Function = () => {};

    /**
     * @private
     * @description prevents thread creation
     */
    private _enabled: boolean = !!(window.Worker);

    /**
     * @constructor
     * @param {String} id thread identifier
     * @param {String} filepath workerthread executable filepath
     * @param {Function} msgCallback workerthread message handler
     * @param {Function} errCallback workerthread message handler
     */
    constructor(id: string, filepath: string, msgCallback?: Function, errCallback?: Function) {
        // validate and set thread properties
        this.id = id;
        this.filepath = filepath;

        if (typeof msgCallback === 'function') {
            this._msgCallback = msgCallback;
        }
        if (typeof errCallback === 'function') {
            this._errCallback = errCallback;
        }

        // start new thread
        this.start();
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
     * @function WorkerThread.start
     * @description builds and starts a webworker thread
     * @throws {Error}
     * @see Worker
     */
    start() {
        const { filepath, terminatedTimestamp, _enabled } = this;

        if (!_enabled) {
            throw new Error('failed to start worker thread - web workers not supported');
        }
        if (!filepath) {
            throw new Error('failed to start worker thread - missing filepath');
        }

        this.createdTimestamp = String((new Date()).getTime());

        const thread = new Worker(filepath);

        // handles messages sent from child thread
        thread.onmessage = (event: any) => {
            if (event && event.data) {
                this._msgCallback(event.data);
            }
        };

        // handles fatal errors thrown by child thread
        thread.onerror = (event) => {
            this._errCallback(event);
            // this.terminate();
        };

        // handles message errors thrown by child thread
        thread.onmessageerror = (event) => {
            this._errCallback(event);
        };

        // set local thread
        this._thread = thread;

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
        }
    }

    /**
     * @public
     * @function WorkerThread.restart
     * @description restarts the worker thread
     */
    restart() {
        this.terminate();
        this.start();
    }

    /**
     * @public
     * @description returns the total time (in milliseconds) since thread start
     */
    get timeActive() {
        return (this.createdTimestamp)
            ? (Date.now() - new Date(this.createdTimestamp).getTime())
            : 0;
    }
}
