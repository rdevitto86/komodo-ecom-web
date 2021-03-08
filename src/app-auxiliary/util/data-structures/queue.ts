/**
 * @class
 * @version 1.0
 * @description implementation of Queue w/ priorities
 */
export default class Queue {
    /**
     * @private
     * @property {Array<Any>} _items
     * @description
     */
    private _items: Array<any> = [];

    // TODO - convert _items into a priority map of 1 - n, where 1 is top priority

    /**
     * @public
     * @function Queue.add
     * @description adds item to top of the stack
     * @param {Any} item item to add
     * @param {Number} [priority] item priority, default is 3
     */
    add(item: any) {
        this._items.push(item);
    }

    /**
     * @public
     * @function Queue.remove
     * @description fetches and removes item from top of the stack
     * @returns {Any | Undefined} stack item
     */
    remove() {
        return (this._items.length > 0) ? this._items.shift() : undefined;
    }

    /**
     * @public
     * @function Queue.peek
     * @description fetches item from top of the stack
     * @returns {Any | Undefined} stack item
     */
    peek() {
        return (this._items.length > 0) ? this._items[this._items.length - 1] : undefined;
    }

    /**
     * @public
     * @function Queue.seek
     * @description finds the index of the specified item
     * @param {Any} item item to search
     * @returns {Number} first index of item, -1 if not found
     */
    seek(item: any) {
        return this._items.indexOf(item);
    }

    /**
     * @public
     * @function Queue.print
     * @description prints-out all items, in order, from the stack
     * @returns {String} string print-out
     */
    print() {
        return JSON.stringify(this._items);
    }

    /**
     * @public
     * @function Queue.clear
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
