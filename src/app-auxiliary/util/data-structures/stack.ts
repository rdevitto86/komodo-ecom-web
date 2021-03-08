/**
 * @class
 * @version 1.0
 * @description implementation of Stack
 */
export default class Stack {
    /**
     * @private
     * @property {Array<Any>} _items
     * @description
     */
    private _items: Array<any> = [];

    /**
     * @public
     * @function Stack.push
     * @description adds item to top of the stack
     * @param {Any} item item to add
     */
    push(item: any) {
        this._items.push(item);
    }

    /**
     * @public
     * @function Stack.pop
     * @description fetches and removes item from top of the stack
     * @returns {Any | Undefined} stack item
     */
    pop() {
        return (this._items.length > 0) ? this._items.pop() : undefined;
    }

    /**
     * @public
     * @function Stack.peek
     * @description fetches item from top of the stack
     * @returns {Any | Undefined} stack item
     */
    peek() {
        return (this._items.length > 0) ? this._items[this._items.length - 1] : undefined;
    }

    /**
     * @public
     * @function Stack.seek
     * @description finds the index of the specified item
     * @param {Any} item item to search
     * @returns {Number} first index of item, -1 if not found
     */
    seek(item: any) {
        return this._items.indexOf(item);
    }

    /**
     * @public
     * @function Stack.print
     * @description prints-out all items, in order, from the stack
     * @returns {String} string print-out
     */
    print() {
        return JSON.stringify(this._items);
    }

    /**
     * @public
     * @function Stack.clear
     * @description removes all elements from stack
     */
    clear() {
        this._items = [];
    }

    /**
     * @public
     * @property {Number} size
     * @description current size of the stack
     */
    get size() {
        return this._items.length;
    }

    /**
     * @public
     * @property {Boolean} isEmpty
     * @description determines if stack is empty (no items)
     */
    get isEmpty() {
        return this._items.length === 0;
    }
}
