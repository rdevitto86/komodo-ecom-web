/**
 * Data structure used in trees
 */
export default class TreeNode {
    data: any = null;
    left: TreeNode | null = null;
    right: TreeNode | null = null;

    /**
     * @param {any} data node data
     */
    constructor(data: any) {
        this.data = data;
    }
}
