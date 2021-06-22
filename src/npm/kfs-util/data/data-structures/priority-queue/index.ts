import PriorityNode from './priority-node';

/**
 * Implementation of a FIFO queue w/ priority sorting
 * @version 1.0.0
 * @complexity
 *  - add => O(n)
 *  - remove => O(1)
 *  - search => O(n)
 */
export default class PriorityQueue<T> {
    /**
     * Internal data structure
     * @private
     */
    private _queue: PriorityNode[] = [];

    /**
     * Adds item to the queue and sorts priority
     * @param {T} item item to add
     * @param {number} [priority] item priority
     */
    enqueue(item: T, priority = 0) {
        const { _queue } = this;
        const element = new PriorityNode(item, priority);

        // tracks if new item is higher or lower priority
        let lowerPriority = false;

        // loop through queue and insert prioritized item
        for (let i = 0, len = _queue.length; i < len; i++) {
            if (_queue[i].priority > element.priority) {
                _queue.splice(i, 0, element);
                lowerPriority = true;
                break;
            }
        }

        // add item to front of queue
        if (!lowerPriority) {
            _queue.push(element);
        }
    }

    /**
     * Fetches and removes item from front of the queue
     * @returns {PriorityNode | undefined} queue item
     */
    dequeue() {
        if (this.isEmpty) {
            return undefined;
        }
        return (this._queue.shift() || {}).value;
    }

    /**
     * Peeks element at the front of the queue
     * @returns {PriorityNode | undefined} queue item
     */
    peekFront() {
        if (this.isEmpty) {
            return undefined;
        }
        return (this._queue[0]).value;
    }

    /**
     * Peeks element at the back of the queue
     * @param {number} [priority] priority of queue to peek item
     * @returns {PriorityNode | undefined} queue item
     */
    peekBack() {
        if (this.isEmpty) {
            return undefined;
        }
        return (this._queue[this._queue.length - 1]).value;
    }

    /**
     * Finds the index of the specified item
     * @param {T} item item to search
     * @returns {number} first index of item, -1 if not found
     */
    seek(item: T) {
        const { _queue } = this;
        for (let i = 0, len = _queue.length; i < len; i++) {
            if (_queue[i].value === item) {
                return i;
            }
        }
        return -1;
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
