import ListNode from './list-node';

/**
 * Creates a doublely linked list
 * @complexity
 *  - add: [best case] => O(1), [worst case] => O(n)
 *  - remove: [best case] => O(1), [worst case] => O(n)
 *  - search => [best case] => O(1), [worst case] => O(n)
 */
export default class LinkedList<T> {
    /**
     * First node in list
     */
    head: ListNode | null = null;

    /**
     * Last node in list
     */
    tail: ListNode | null = null;

    /**
     * Size of linked list
     */
    size: number = 0;

    /**
     * @param {T} [data] data used in first list node
     */
    constructor(data: T) {
        if (data) {
            this.head = new ListNode(data);
        }
    }

    /**
     * Adds a new leading node
     * @param {T} item data of new node
     */
    insertHead(item: T) {
        const newNode = new ListNode(item, this.head);

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
     * Adds a new trailing node
     * @param {T} item data of new node
     */
    insertTail(item: T) {
        const newNode = new ListNode(item, null, this.tail);

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
    //  * @description adds a new node at a specific list index
    //  * @param {any} item data of new node
    //  * @param {number} index location in index to insert
    //  */
    // insertAt(item: any, index: number) {

    // }

    /**
     * Removes first node and adjusts list
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
     * Removes last node and adjusts list
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
    //  * removes a node at a specific list index
    //  * @param {number} index location in index to insert
    //  */
    // removeAt(index: number) {

    // }

    // /**
    //  * TODO - future enhancement
    //  * sorts the linked list
    //  */
    // sort() {

    // }

    /**
     * Searches for the first node with a given value
     * @param {T} item data to match to exsisting node
     * @returns {ListNode | undefined} node matching search item
     */
    search(item: T) {
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
     * Determines if an item exsists in the list
     * @param {T} item data to match to exsisting node
     * @returns {boolean} item exsists or not
     */
    contains(item: T) {
        return !!(this.search(item));
    }
}
