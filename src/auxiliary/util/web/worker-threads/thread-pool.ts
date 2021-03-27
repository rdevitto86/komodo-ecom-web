import WorkerThread from './worker-thread';

/**
 * @class
 * @version 1.0
 * @description creates and manages a worker thread pool
 */
export default class ThreadPool {
    /**
     * @private
     * @property {String}
     * @description unique identifier for the thread pool
     */
    private _id: string;

    /**
     * @private
     * @property {String}
     * @description executable filepath for the thread pool
     */
    private _filepath: string;

    /**
     * @private
     * @property {Map<string, WorkerThread>}
     * @description thread pool
     */
    private _threads = new Map<string, WorkerThread>();

    /**
     * @private
     * @property {Number}
     * @description limits the number of threads creatable
     */
    private _limit: number;

    /**
     * @private
     * @property {Map<string, WorkerThread>} _completed
     * @description completed thread map
     */
    private _completed = new Map<string, WorkerThread>();

    /**
     * @private
     * @property {Map<string, WorkerThread>} _failed
     * @description failed thread map
     */
    private _failed = new Map<string, WorkerThread>();

    /**
     * @constructor
     * @param {String} id thread pool identifier
     * @param {String} filepath thread execution path. Workers folder path auto-applied.
     * @param {Number} [limit] limits the number of threads. Default = 5.
     */
    constructor(id: string, filepath: string, limit: number = 5) {
        this._id = id;
        this._filepath = filepath;

        const maxThreads = Number(process.env.MAX_THREADS);
        this._limit = (limit < maxThreads) ? limit : maxThreads;

        // disable functionality if web workers not supported
        if (!window.Worker) {
            this.create = () => undefined;
            this.post = () => false;
            this.terminate = () => false;
        }
    }

    /**
     * @public
     * @function ThreadPool.create
     * @description creates a new thread in the thread pool
     * @param {Function | Function[] | undefined} listeners callback listener functions
     * @returns {String | Undefined}
     */
    create(listeners?: Function | Function[]): string | undefined {
        // calculate new thread posistion
        const pos = this._threads.size + 1;

        // validate thread pool hasn't reached max capacity
        // TODO - move max threads to env property
        if (pos > this._limit) {
            return undefined;
        }

        let threadID = `${this._id}_${pos}`;

        try {
            // check if exsisting thread exsists
            if (this._threads.get(threadID)) {
                let threadsAvl = false;
                let i = pos + 1;

                // loop until free thread found
                do {
                    // reset index to begining
                    if (i > 5) {
                        i = 1;
                    }

                    // iterate to next thread spot
                    threadID = `${this._id}_${i}`;

                    // check for exsisting thread
                    if (!this._threads.get(threadID)) {
                        // open spot found
                        threadsAvl = true;
                        break;
                    } else {
                        i++;
                    }
                } while (i !== pos);

                // return undefined if no threads available
                if (threadsAvl === false) {
                return undefined;
                }
            }

            // holds a list of thread listeners
            const listenerCallbacks: Array<Function> = [this.onDone, this.onError];

            // populate additional listeners
            if (listeners !== undefined) {
                if (listeners instanceof Array) {
                    listenerCallbacks.push(...listeners);
                } else if (listeners.constructor === Function) {
                    listenerCallbacks.push(listeners);
                }
            }

            // add new thread to pool
            this._threads.set(threadID, new WorkerThread(
                threadID, `../workers/${this._filepath}`, listenerCallbacks
            ));
        } catch (err) {
            console.error(err.message);
            return undefined;
        }

        // return thread posisiton
        return threadID;
    }

    /**
     * @public
     * @function ThreadPool.create
     * @description sends data to a specified thread
     * @param {String} threadID thread identifier
     * @param {Any} msg message data
     * @returns {Boolean} success/failure
     */
    post(threadID: string, msg: any): boolean {
        const thread = this._threads.get(threadID);
        if (threadID.constructor === String && thread) {
           thread.postMessage(msg);
           return true;
        }
        return false;
    }

    /**
     * @public
     * @function ThreadPool.terminate
     * @description terminates and removes a specified thread
     * @param {String} threadID thread identifier
     * @returns {Boolean} success/failure
     */
    terminate(threadID: string): boolean {
        // find and delete thread container
        if (threadID.constructor === String && !this._threads.delete(threadID)) {
           console.warn(`failed to remove thread - thread id '${threadID}' does not exsist`);
           return false;
        }
        return true;
    }

    /**
     * @public
     * @function ThreadPool.terminateAll
     * @description terminates and removes all active threads
     * @returns {Boolean} success/failure
     */
    terminateAll(): boolean {
        const { _threads } = this;
        let status = true;

        // loop through all active threads and terminate
        for (const threadID in _threads) {
            if (!this.terminate(threadID) && status !== false) {
                status = false;
            }
        }
        return status;
    }

    /**
     * @public
     * @function ThreadPool.clearCompleted
     * @description clears all completed threads
     */
    clearCompleted() {
        this._completed.clear();
    }

    /**
     * @public
     * @function ThreadPool.clearFailed
     * @description clears all failed threads
     */
    clearFailed() {
        this._failed.clear();
    }

    /**
     * @private
     * @function onDone
     * @description moves a thread to the done queue
     * @param {WorkerThread} thread thread object
     */
    private onDone(thread: WorkerThread) {
        if (thread instanceof WorkerThread) {
            this._completed.set(thread.id, thread);
        }
    }

    /**
     * @private
     * @function onError
     * @description moves a thread to the error queue
     * @param {WorkerThread} thread thread object
     */
    private onError(thread: WorkerThread) {
        if (thread instanceof WorkerThread) {
            this._failed.set(thread.id, thread);
        }
    }
}
