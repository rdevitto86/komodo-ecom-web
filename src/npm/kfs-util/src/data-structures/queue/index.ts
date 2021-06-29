// TODO - consider security of data and ways to encapsulate

/**
 * Implementation of a FIFO queue
 * @complexity
 *  - add => O(1)
 *  - remove => O(1)
 *  - search => O(n)
 */
 export default class Queue<T> {
    /**
     * Number of items allowed in history
     * @readonly
     */
    readonly MAX_HISTORY = 10;

    /**
     * Collective queue history
     */
    history: T[] = [];

    /**
     * History of added items
     */
    historyAdded: T[] = [];

    /**
     * History of removed items
     */
    historyRemoved: T[] = [];

    /**
     * Enables/disables queue history
     */
    private historyFlag = false;

    /**
     * Queues items based on FIFO
     * @private
     */
    private queue: T[] = [];

    /**
     * @param {boolean} [historyFlag] flag for history feature
     */
     constructor(historyFlag: boolean = false) {
        this.historyFlag = historyFlag;
    }

    /**
     * Adds item to the queue and sorts priority
     * @param {T} item item to add
     */
    enqueue(item: T) {
        this.queue.push(item);
        this.updateHistory(true, item);
    }

    /**
     * Fetches and removes item from front of the queue
     * @returns {T | undefined} queue item
     */
    dequeue() {
        if (this.isEmpty) {
            return undefined;
        }
        const item = this.queue.shift();
        this.updateHistory(false, item);
        return item;
    }

    /**
     * Peeks element at the front of the queue
     * @returns {T | undefined} queue item
     */
    peekFront() {
        if (this.isEmpty) {
            return undefined;
        }
        return this.queue[0];
    }

    /**
     * Peeks element at the back of the queue
     * @returns {T | undefined} queue item
     */
    peekBack() {
        if (this.isEmpty) {
            return undefined;
        }
        return this.queue[this.queue.length - 1];
    }

    /**
     * Finds the index of the specified item
     * @param {T} item item to search
     * @returns {number} first index of item, -1 if not found
     */
    seek(item: T) {
        return this.queue.indexOf(item);
    }

    /**
     * Prints-out all items, in order, from the queue
     * @returns {string} string print-out
     */
    print() {
        return JSON.stringify(this.queue);
    }

    /**
     * Removes all elements from queue
     */
    clear() {
        this.queue = [];
        this.clearHistory();
    }

    /**
     * Clears queue history
     */
    clearHistory() {
        this.historyAdded = [];
        this.historyRemoved = [];
    }

    /**
     * Enables history tracking
     */
    enableHistory() {
        this.historyFlag = true;
    }

    /**
     * Disables history tracking
     */
    disableHistory() {
        this.historyFlag = false;
    }

    /**
     * Current size of the queue
     */
    get size() {
        return this.queue.length;
    }

    /**
     * Determines if queue is empty (no items)
     */
    get isEmpty() {
        return this.queue.length === 0;
    }

    /**
     * Updates added/removed history
     */
    private updateHistory(isAdded: boolean, item?: T) {
        if (item && this.historyFlag) {
            const { history, MAX_HISTORY } = this;

            if (history.length >= MAX_HISTORY) {
                // TODO - remove last element and adjust array
            }
            history.push(item);

            // update action (add/remove) history
            const actionHistory = (isAdded === true) 
                ? this.historyAdded : this.historyRemoved;

            if (actionHistory.length >= MAX_HISTORY) {
                // TODO - remove last element and adjust array
            }
            actionHistory.push(item);
        }
    }
}
