/* eslint-disable max-classes-per-file */

/**
 * @private
 * @class
 * @description builds a LinkedList node
 */
class Node {
    /**
     * @public
     * @property {Any} value
     * @description node data
     */
    value;

    /**
     * @public
     * @property {Node | Null} [next]
     * @description next node in linked list
     */
    next = null;

    /**
     * @public
     * @property {Node | Null} [prev]
     * @description previous node in linked list
     */
    prev = null;

    /**
     * @constructor
     * @param {Any} value node data
     * @param {Node | Null} [next] next node in linked list
     * @param {Node | Null} [prev] previous node in linked list
     */
    constructor(value, next = null, prev = null) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

/**
 * @class
 * @version 1.0
 * @description creates a doublely linked list
 * @complexity
 *  - add: [best case] => O(1), [worst case] => O(n)
 *  - remove: [best case] => O(1), [worst case] => O(n)
 *  - search => [best case] => O(1), [worst case] => O(n)
 */
export default class LinkedList {
    /**
     * @public
     * @property {ListNode} [head]
     * @description first node in list
     */
    head = null;

    /**
     * @public
     * @property {ListNode} [tail]
     * @description last node in list
     */
    tail = null;

    /**
     * @public
     * @property {Number} size
     * @description size of linked list
     */
    size = 0;

    /**
     * @constructor
     * @param {T} [data] data used in first list node
     */
    constructor(data) {
        if (data) {
            this.head = new Node(data);
        }
    }

    /**
     * @public
     * @function LinkedList.insertHead
     * @description adds a new leading node
     * @param {T} item data of new node
     */
    insertHead(item) {
        const newNode = new Node(item, this.head);

        // adjust list after insertion
        if (this.head) {
            this.head.prev = newNode;
        } else {
            this.tail = newNode;
        }

        this.head = newNode;
        this.size++;
    }

    /**
     * @public
     * @function LinkedList.insertTail
     * @description adds a new trailing node
     * @param {T} item data of new node
     */
    insertTail(item) {
        const newNode = new Node(item, null, this.tail);

        // adjust list after insertion
        if (this.tail) {
            this.tail.next = newNode;
        } else {
            this.head = newNode;
        }

        this.tail = newNode;
        this.size++;
    }

    // /**
    //  * TODO - future enhancement
    //  * @public
    //  * @function LinkedList.insertAt
    //  * @description adds a new node at a specific list index
    //  * @param {Any} item data of new node
    //  * @param {Number} index location in index to insert
    //  */
    // insertAt(item: any, index: number) {

    // }

    /**
     * @public
     * @function LinkedList.removeHead
     * @description removes first node and adjusts list
     * @returns {ListNode} value of removed node
     */
    removeHead() {
        // check if head exists
        if (!this.head) {
            return null;
        }

        const { value, next } = this.head;

        // set new head to removed head's next
        this.head = next;

        // adjust list after removal
        if (this.head) {
            this.head.prev = null;
        } else {
            this.tail = null;
        }

        this.size--;
        return value;
    }

    /**
     * @public
     * @function LinkedList.removeTail
     * @description removes last node and adjusts list
     * @returns {ListNode} value of removed node
     */
    removeTail() {
        // check if tail exists
        if (!this.tail) {
            return null;
        }

        const { value, prev } = this.tail;

        // set new tail to removed tail's next
        this.tail = prev;

        // adjust list after removal
        if (this.tail) {
            this.tail.next = null;
        } else {
            this.head = null;
        }

        this.size--;
        return value;
    }

    // /**
    //  * TODO - future enhancement
    //  * @public
    //  * @function LinkedList.removeAt
    //  * @description removes a node at a specific list index
    //  * @param {Number} index location in index to insert
    //  */
    // removeAt(index: number) {

    // }

    // /**
    //  * TODO - future enhancement
    //  * @public
    //  * @function LinkedList.sort
    //  * @description sorts the linked list
    //  */
    // sort() {

    // }

    /**
     * @public
     * @function LinkedList.search
     * @description searches for the first node with a given value
     * @param {T} item data to match to exsisting node
     * @returns {Node | Undefined} node matching search item
     */
    search(item) {
        let current = this.head;

        // loop through list and find node with search item
        while (current) {
            // return node if value matches search item
            if (current.value === item) {
                return current;
            }
            // else move node iterator forward
            current = current.next;
        }
        return undefined;
    }

    /**
     * @public
     * @function LinkedList.contains
     * @description determines if an item exsists in the list
     * @param {T} item data to match to exsisting node
     * @returns {Boolean} item exsists or not
     */
    contains(item) {
        return !!(this.search(item));
    }
}
