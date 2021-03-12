import ThreadPool from './thread-pool';

/**
 * @class
 * @version 1.0
 * @singleton
 * @description manages worker thread pools
 */
class ThreadPoolManager {
   // thread pools
   public Test = new ThreadPool('TEST', 'test.js', 5);
}

// build and export singleton
const singleton = new ThreadPoolManager();
export default singleton;
