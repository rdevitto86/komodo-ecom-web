// import WorkerThread from './worker-thread';

/**
 * NOTES:
 * Add thread pool for specific files - limits threads to a certain number
 * Cache required worker modules (WeakMap key as thread and value is imported file)
 * Add messenger handling between threads
 * Add abiliy to terminate threads
 * Add error handling
 * Consider shared workers
 * Consider a dictionary (names+file paths) for creating new threads (encapsulate threads here)
 * Thread pool for specific files
 * Create file for "Jobs" where threads are created and fi;e-specific properties are kept
 */

 /*
    Example Usage:

    const thread = WorkerThreadManager.Test.create();
    thread.postMessage(*some data*);
 */

/**
 * @class
 * @singleton
 * @description manages web worker threads created by the application
 * @see https://github.com/Mike96Angelo/web-worker-manager/tree/master/lib
 */
class WorkerThreadManager {

}

const singleton = new WorkerThreadManager();
export default singleton;
