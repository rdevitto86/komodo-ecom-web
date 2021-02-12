import WorkerThread from './worker-thread';

/*
   [option] Move threads to WeakMap. Threads will be automatically destroyed when done/terminated.
   [option] move threads to done/failed array upon completion
*/

 /**
  * @interface
  * @description defines a thread pool manager object
  */
 interface ThreadPoolContainer {
   /**
    * @public
    * @function ThreadPoolContainer.create
    * @description creates a new thread for the given file
    * @param {Function} [listener] callback/listener function
    * @returns {String | Undefined} identifer of newly created thread
    */
   create: Function;

   /**
    * @public
    * @function ThreadPoolContainer.terminate
    * @description stops and removes thread from pool
    * @param {String} threadID identifer of newly created thread
    * @returns {Boolean} success/failure
    */
   terminate: Function;
 }

/**
 * @class
 * @singleton
 * @description manages web worker threads created by the application
 */
class ThreadManager {
   // thread pools
   public Test: ThreadPoolContainer;

   /**
    * @constructor
    * @description populates local thread pools
    */
   constructor() {
      /**
       * @private
       * @function buildPool
       * @description creates a thread pool manager object
       * @param {String} id unique indentifier for thread pool
       * @param {String} filepath worker thread execution path
       * @returns {Object<ThreadPoolContainer>} thread pool container
       */
      const buildPool = (id: string, filepath: string): ThreadPoolContainer => {
         // check if worker threads are supported, return empty pool manager if not
         if (window.Worker) {
            return {
               create: () => undefined,
               terminate: () => false
            };
         }

         // TODO - validate filepath exsists

         // thread pool for given file
         const threads = new Map<string, WorkerThread>();

         return {
            create(listener?: Function): string | undefined {
               // calculate new thread posistion
               const pos = threads.size + 1;

               // validate thread pool hasn't reached max capacity
               // TODO move max threads to env property
               if (pos > 5) {
                  return undefined;
               }

               let threadID = `${id}_${pos}`;

               try {
                  // check if exsisting thread exsists
                  if (threads.get(threadID)) {
                     let threadsAvl = false;
                     let i = pos + 1;

                     // loop until free thread found
                     do {
                        // reset index to begining
                        if (i > 5) {
                           i = 1;
                        }

                        // iterate to next thread spot
                        threadID = `${id}_${i}`;

                        // check for exsisting thread
                        if (!threads.get(threadID)) {
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

                  // add new thread to pool
                  threads.set(threadID, new WorkerThread(
                     threadID, `../workers/${filepath}`, listener
                  ));
               } catch (err) {
                  console.error(err.message);
                  return undefined;
               }

               // return thread posisiton
               return threadID;
            },
            terminate(threadID: string): boolean {
               // find and delete thread container
               if (threadID.constructor === String && !threads.delete(threadID)) {
                  console.warn(`failed to remove thread - thread id '${threadID}' does not exsist`);
                  return false;
               }
               return true;
            }
         };
      };

      // assign properties and build thread pool objects
      this.Test = buildPool('TEST', 'test.js');
   }
}

// build and export singleton
const singleton = new ThreadManager();
export default singleton;
