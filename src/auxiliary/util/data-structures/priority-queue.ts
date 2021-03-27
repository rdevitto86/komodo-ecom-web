/* eslint-disable max-classes-per-file */
/**
 * @private
 * @class
 * @description binds a queue element to a given priority
 */
class QueueElement {
    public value: any;
    public priority: number;

    /**
     * @constructor
     * @param {Any} value value to be stored in queue
     * @param {Number} priority priority of element
     */
    constructor(value: any, priority: number) {
        this.value = value;
        this.priority = priority;
    }
}

/**
 * @class
 * @version 1.0
 * @description implementation of a FIFO queue w/ priority sorting
 * @complexity
 *  - add => O(n)
 *  - remove => O(1)
 *  - search => O(n)
 */
export default class PriorityQueue<T> {
    /**
     * @private
     * @property {QueueElement[]} _queue
     * @description queues items based on FIFO
     */
    private _queue: QueueElement[] = [];

    /**
     * @public
     * @function Queue.enqueue
     * @description adds item to the queue and sorts priority
     * @param {Any} item item to add
     * @param {Number} [priority] item priority
     */
    enqueue(item: T, priority: number = 0) {
        const { _queue } = this;
        const element = new QueueElement(item, priority);

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
     * @public
     * @function Queue.dequeue
     * @description fetches and removes item from front of the queue
     * @returns {QueueElement | Undefined} queue item
     */
    dequeue() {
        return (this.isEmpty) ? undefined : (this._queue.shift() || {}).value;
    }

    /**
     * @public
     * @function Queue.peek
     * @description peeks element at the front of the queue
     * @returns {QueueElement | Undefined} queue item
     */
    peekFront() {
        return (this.isEmpty) ? undefined : (this._queue[0]).value;
    }

    /**
     * @public
     * @function Queue.peek
     * @description peeks element at the back of the queue
     * @param {Number} [priority] priority of queue to peek item
     * @returns {QueueElement | Undefined} queue item
     */
    peekBack() {
        return (this.isEmpty) ? undefined : (this._queue[this._queue.length - 1]).value;
    }

    /**
     * @public
     * @function Queue.seek
     * @description finds the index of the specified item
     * @param {T} item item to search
     * @returns {Number} first index of item, -1 if not found
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
