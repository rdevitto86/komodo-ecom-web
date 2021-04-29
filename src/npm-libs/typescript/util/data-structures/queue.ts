// TODO - consider security of data and ways to encapsulate

/**
 * @class
 * @version 1.0
 * @description @description implementation of a FIFO queue
 * @complexity
 *  - add => O(1)
 *  - remove => O(1)
 *  - search => O(n)
 */
export default class Queue<T> {
    /**
     * @private
     * @property {T[]} _queue
     * @description queues items based on FIFO
     */
    private _queue: T[] = [];

    /**
     * @public
     * @function Queue.enqueue
     * @description adds item to the queue and sorts priority
     * @param {T} item item to add
     */
    enqueue(item: T) {
        this._queue.push(item);
    }

    /**
     * @public
     * @function Queue.dequeue
     * @description fetches and removes item from front of the queue
     * @returns {T | Undefined} queue item
     */
    dequeue() {
        return (this.isEmpty) ? undefined : this._queue.shift();
    }

    /**
     * @public
     * @function Queue.peekFront
     * @description peeks element at the front of the queue
     * @returns {T | Undefined} queue item
     */
    peekFront() {
        return (this.isEmpty) ? undefined : this._queue[0];
    }

    /**
     * @public
     * @function Queue.peekBack
     * @description peeks element at the back of the queue
     * @returns {T | Undefined} queue item
     */
    peekBack() {
        return (this.isEmpty)
            ? undefined : this._queue[this._queue.length - 1];
    }

    /**
     * @public
     * @function Queue.seek
     * @description finds the index of the specified item
     * @param {T} item item to search
     * @returns {Number} first index of item, -1 if not found
     */
    seek(item: T) {
        return this._queue.indexOf(item);
    }

    /**
     * @public
     * @function Queue.clear
     * @description removes all elements from queue
     */
    clear() {
        this._queue = [];
    }

    /**
     * @public
     * @function Queue.print
     * @description prints-out all items, in order, from the queue
     * @returns {String} string print-out
     */
    print() {
        return JSON.stringify(this._queue);
    }

    /**
     * @public
     * @property {Number} size
     * @description current size of the queue
     */
    get size() {
        return this._queue.length;
    }

    /**
     * @public
     * @property {Boolean} isEmpty
     * @description determines if queue is empty (no items)
     */
    get isEmpty() {
        return this._queue.length === 0;
    }
}
