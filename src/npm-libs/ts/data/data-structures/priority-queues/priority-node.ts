/**
 * Data structure used in Queues
 */
export default class PriorityNode {
    value: any = null;
    priority: any = 0;

    /**
     * @param {any} value value to be stored in queue
     * @param {number} priority priority of element
     */
    constructor(value: any, priority: number) {
        this.value = value;
        this.priority = priority;
    }
}
