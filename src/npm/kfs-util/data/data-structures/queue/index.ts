// TODO - consider security of data and ways to encapsulate

/**
 * Implementation of a FIFO queue
 * @version 1.0.0
 * @complexity
 *  - add => O(1)
 *  - remove => O(1)
 *  - search => O(n)
 */
 export default class Queue<T> {
    /**
     * Queues items based on FIFO
     * @private
     */
    private _queue: T[] = [];

    /**
     * Adds item to the queue and sorts priority
     * @param {T} item item to add
     */
    enqueue(item: T) {
        this._queue.push(item);
    }

    /**
     * Fetches and removes item from front of the queue
     * @returns {T | undefined} queue item
     */
    dequeue() {
        if (this.isEmpty) {
            return undefined;
        }
        return this._queue.shift();
    }

    /**
     * Peeks element at the front of the queue
     * @returns {T | undefined} queue item
     */
    peekFront() {
        if (this.isEmpty) {
            return undefined;
        }
        return this._queue[0];
    }

    /**
     * Peeks element at the back of the queue
     * @returns {T | undefined} queue item
     */
    peekBack() {
        if (this.isEmpty) {
            return undefined;
        }
        return this._queue[this._queue.length - 1];
    }

    /**
     * Finds the index of the specified item
     * @param {T} item item to search
     * @returns {number} first index of item, -1 if not found
     */
    seek(item: T) {
        return this._queue.indexOf(item);
    }

    /**
     * Removes all elements from queue
     */
    clear() {
        this._queue = [];
    }

    /**
     * Prints-out all items, in order, from the queue
     * @returns {string} string print-out
     */
    print() {
        return JSON.stringify(this._queue);
    }

    /**
     * Current size of the queue
     */
    get size() {
        return this._queue.length;
    }

    /**
     * Determines if queue is empty (no items)
     */
    get isEmpty() {
        return this._queue.length === 0;
    }
}
