// TODO - consider WeakMap for increased security

/**
 * Implementation of a FILO stack
 * @complexity
 *  - add => O(1)
 *  - remove => O(1)
 *  - search => O(n)
 */
 export default class Stack<T> {
    /**
     * Number of items allowed in history
     * @readonly
     */
    readonly MAX_HISTORY = 10;

    /**
     * Collective stack history
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
     * Enables/disables stack history
     */
    private historyFlag = false;

    /**
     * Queues items based on FILO
     * @private
     */
    private stack: T[] = [];

    /**
     * @param {boolean} [historyFlag] flag for history feature
     */
    constructor(historyFlag: boolean = false) {
        this.historyFlag = historyFlag;
    }

    /**
     * Adds item to top of the stack
     * @param {T} item item to add
     */
    push(item: T) {
        this.stack.push(item);
        this.updateHistory(true, item);
    }

    /**
     * Fetches and removes item from top of the stack
     * @returns {T | undefined} stack item
     */
    pop() {
        const top = this.stack.pop();
        this.updateHistory(false, top);
        return top;
    }

    /**
     * Fetches item from top of the stack
     * @returns {T | undefined} stack item
     */
    peek() {
        if (this.stack.length > 0) {
            return this.stack[this.stack.length - 1];
        }
        return undefined;
    }

    /**
     * Finds the index of the specified item
     * @param {T} item item to search
     * @returns {number} first index of item, -1 if not found
     */
    seek(item: any) {
        return this.stack.indexOf(item);
    }

    /**
     * Prints-out all items, in order, from the stack
     * @returns {string} string print-out
     */
    print() {
        return JSON.stringify(this.stack);
    }

    /**
     * Removes all elements from stack
     */
    clear() {
        this.stack = [];
        this.clearHistory();
    }

    /**
     * Clears stack history
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
     * Current size of the stack
     */
    get size() {
        return this.stack.length;
    }

    /**
     * Determines if stack is empty (no items)
     */
    get isEmpty() {
        return this.stack.length === 0;
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
