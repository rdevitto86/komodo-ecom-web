import TreeNode from './tree-node';

/**
 * Creates a binary search tree
 */
export default class BinaryTree<T> {
    /**
     * Top-most node in the tree
     */
    root: TreeNode | null = null;

    /**
     * Size of the tree
     */
    size = 0;

    /**
     * @param {T} data data to build root node
     */
    constructor(data: T) {
        if (data) {
            this.insert(data);
        }
    }

    /**
     * Inserts a new node and auto-balances tree
     * @param {T} data node data
     */
    insert(data: T) {
        if (typeof data !== 'number' && typeof data !== 'string') {
            return;
        }

        const newNode = new TreeNode(data);

        if (!this.root) {
            this.root = newNode;
        } else {
            (function _insertNode(current, toAdd) {
                if (toAdd.data < current.data) {
                    if (current.left === null) {
                        current.left = toAdd;
                    } else {
                        _insertNode(current.left, toAdd);
                    }
                } else if (current.right === null) {
                    current.right = toAdd;
                } else {
                    _insertNode(current.right, toAdd);
                }
            }(this.root, newNode));
        }

        // increase size of tree
        this.size++;
    }

    /**
     * Removes a node and auto-balances tree
     * @param {T} searchVal node data to search for
     */
    remove(searchVal: T) {
        const { getMinNode } = this;

        this.root = (function _removeNode(current, key) {
            if (current === null) {
                return null;
            }

            const { data, left, right } = current;

            if (key < data) {
                current.left = _removeNode(left, key);
                return current;
            }
            if (key > data) {
                current.right = _removeNode(right, key);
                return current;
            }

            // check if left child is null
            if (left === null) {
                // check if both left and right are null
                if (right === null) {
                    current = null;
                    return current;
                }
                // only left is null
                current = right;
                return current;
            }
            // check if only right child is  null
            if (right === null) {
                current = left;
                return current;
            }

            // @ts-ignore - not inferring that right cant be null and root exists
            const minT = getMinNode(right).data;
            current.data = minT;

            current.right = _removeNode(right, minT);
            return current;
        }(this.root, searchVal));

        // reduce size of tree
        this.size--;
    }

    /**
     * Searches for a specified node
     * @param {T} searchVal node data to search for
     * @returns {TreeNode} requested node
     */
    find(searchVal: T) {
        return (function _search(current, key): TreeNode | null {
            if (current === null) {
                return null;
            }

            const { data, left, right } = current;

            if (key < data) {
                return _search(left, key);
            }
            if (key > data) {
                return _search(right, key);
            }
            return current;
        }(this.root, searchVal));
    }

    /**
     * Parses tree data in-order
     * @returns {T[] | null} in-order data
     */
    getInOrder() {
        if (!this.root) {
            return null;
        }

        const inOrder = [];

        (function _inOrder(node: TreeNode | null) {
            if (node !== null) {
                const { data, left, right } = node;
                _inOrder(left);
                inOrder.push(data);
                _inOrder(right);
            }
        }(this.root));

        return inOrder;
    }

    /**
     * Parses tree data in pre-order
     * @returns {T[] | null} pre-ordered data
     */
    getPreOrder() {
        if (!this.root) {
            return null;
        }

        const preOrder = [];

        (function _preOrder(node: TreeNode | null) {
            if (node !== null) {
                const { data, left, right } = node;
                preOrder.push(data);
                _preOrder(left);
                _preOrder(right);
            }
        }(this.root));

        return preOrder;
    }

    /**
     * Parses tree data in post-order
     * @returns {T[] | null} post-ordered data
     */
    getPostOrder() {
        if (!this.root) {
            return null;
        }

        const postOrder = [];

        (function _postOrder(node: TreeNode | null) {
            if (node !== null) {
                const { data, left, right } = node;
                _postOrder(left);
                _postOrder(right);
                postOrder.push(data);
            }
        }(this.root));

        return postOrder;
    }

    /**
     * Fetches the largest node after a given node
     * @param {TreeNode} [node] starting node, default is root
     * @returns {TreeNode} greatest node
     */
    getMaxNode(node: TreeNode) {
        // validate start node
        if (!(node instanceof TreeNode)) {
            // default to root node
            if (this.root) {
                node = this.root;
            } else {
                return null;
            }
        }

        return (function _getMaxNode(current): TreeNode {
            if (current.right === null) {
                return current;
            }
            return _getMaxNode(current.right);
        }(node));
    }

    /**
     * Fetches the smallest node after a given node
     * @param {TreeNode} [node] starting node, default is root
     * @returns {TreeNode} smallest node
     */
    getMinNode(node: TreeNode) {
        // validate start node
        if (!(node instanceof TreeNode)) {
            // default to root node
            if (this.root) {
                node = this.root;
            } else {
                return null;
            }
        }

        return (function _getMinNode(current): TreeNode {
            if (current.left === null) {
                return current;
            }
            return _getMinNode(current.left);
        }(node));
    }

    // /**
    //  * TODO - future enhancement
    //  */
    // get isFull() {

    // }

    // /**
    //  * TODO - future enhancement
    //  */
    // get isBalanced() {

    // }
}
