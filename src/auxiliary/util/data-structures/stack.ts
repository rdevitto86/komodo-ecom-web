// TODO - consider WeakMap for increased security

/**
 * @class
 * @version 1.0
 * @description implementation of a FILO stack
 * @complexity
 *  - add => O(1)
 *  - remove => O(1)
 *  - search => O(n)
 */
export default class Stack<T> {
    /**
     * @private
     * @property {T[]} _stack
     * @description queues items based on FILO
     */
    private _stack: T[] = [];

    /**
     * @public
     * @function Stack.push
     * @description adds item to top of the stack
     * @param {T} item item to add
     */
    push(item: T) {
        this._stack.push(item);
    }

    /**
     * @public
     * @function Stack.pop
     * @description fetches and removes item from top of the stack
     * @returns {T | Undefined} stack item
     */
    pop() {
        return (this._stack.length > 0) ? this._stack.pop() : undefined;
    }

    /**
     * @public
     * @function Stack.peek
     * @description fetches item from top of the stack
     * @returns {T | Undefined} stack item
     */
    peek() {
        return (this._stack.length > 0) ? this._stack[this._stack.length - 1] : undefined;
    }

    /**
     * @public
     * @function Stack.seek
     * @description finds the index of the specified item
     * @param {T} item item to search
     * @returns {Number} first index of item, -1 if not found
     */
    seek(item: any) {
        return this._stack.indexOf(item);
    }

    /**
     * @public
     * @function Stack.print
     * @description prints-out all items, in order, from the stack
     * @returns {String} string print-out
     */
    print() {
        return JSON.stringify(this._stack);
    }

    /**
     * @public
     * @function Stack.clear
     * @description removes all elements from stack
     */
    clear() {
        this._stack = [];
    }

    /**
     * @public
     * @property {Number} size
     * @description current size of the stack
     */
    get size() {
        return this._stack.length;
    }

    /**
     * @public
     * @property {Boolean} isEmpty
     * @description determines if stack is empty (no items)
     */
    get isEmpty() {
        return this._stack.length === 0;
    }
}
