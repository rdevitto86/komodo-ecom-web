// TODO - consider WeakMap for increased security

/**
 * Implementation of a FILO stack
 * @version 1.0.0
 * @complexity
 *  - add => O(1)
 *  - remove => O(1)
 *  - search => O(n)
 */
export default class Stack<T> {
    /**
     * Queues items based on FILO
     * @private
     */
    private _stack: T[] = [];

    /**
     * Adds item to top of the stack
     * @param {T} item item to add
     */
    push(item: T) {
        this._stack.push(item);
    }

    /**
     * Fetches and removes item from top of the stack
     * @returns {T | undefined} stack item
     */
    pop() {
        if (this._stack.length > 0) {
            this._stack.pop();
        }
        return undefined;
    }

    /**
     * Fetches item from top of the stack
     * @returns {T | undefined} stack item
     */
    peek() {
        if (this._stack.length > 0) {
            return this._stack[this._stack.length - 1];
        }
        return undefined;
    }

    /**
     * Finds the index of the specified item
     * @param {T} item item to search
     * @returns {number} first index of item, -1 if not found
     */
    seek(item: any) {
        return this._stack.indexOf(item);
    }

    /**
     * Prints-out all items, in order, from the stack
     * @returns {string} string print-out
     */
    print() {
        return JSON.stringify(this._stack);
    }

    /**
     * Removes all elements from stack
     */
    clear() {
        this._stack = [];
    }

    /**
     * Current size of the stack
     */
    get size() {
        return this._stack.length;
    }

    /**
     * Determines if stack is empty (no items)
     */
    get isEmpty() {
        return this._stack.length === 0;
    }
}
