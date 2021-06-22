/**
 * Data structure used in linked lists
 */
export default class ListNode {
    value: any = null;
    next: ListNode | null = null;
    prev: ListNode | null = null;

    /**
     * @param {any} value node data
     * @param {ListNode | null} [next] next node in linked list
     * @param {ListNode | null} [prev] previous node in linked list
     */
    constructor(
        value: any,
        next: ListNode | null = null,
        prev: ListNode | null = null
    ) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}
