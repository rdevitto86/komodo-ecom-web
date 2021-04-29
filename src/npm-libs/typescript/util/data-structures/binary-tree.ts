/* eslint-disable max-classes-per-file */

/**
 * @class
 * @description creates a tree node
 */
class Node {
    /**
     * @public
     * @property {Any} data
     * @description node data
     */
    public data: any = null;

    /**
     * @public
     * @property {Node | Null} left
     * @description left child node
     */
    public left: Node | null = null;

    /**
     * @public
     * @property {Node | Null} right
     * @description right child node
     */
    public right: Node | null = null;

    /**
     * @constructor
     * @param {Any} data node data
     */
    constructor(data: any) {
        this.data = data;
    }
}

/**
 * @class
 * @version 1.0
 * @description creates a binary search tree
 */
export default class BinaryTree<T> {
    /**
     * @public
     * @property {Node | Null} root
     * @description top-most node in the tree
     */
    public root: Node | null = null;

    /**
     * @public
     * @property {Number} size
     * @description size of the tree
     */
    public size = 0;

    /**
     * @constructor
     * @param {T} data data to build root node
     */
    constructor(data: T) {
        if (data) {
            this.insert(data);
        }
    }

    /**
     * @public
     * @function BinaryTree.insert
     * @description inserts a new node and auto-balances tree
     * @param {T} data node data
     */
    insert(data: T) {
        if (typeof data !== 'number' && typeof data !== 'string') {
            return;
        }

        const newNode = new Node(data);

        if (!this.root) {
            this.root = newNode;
        } else {
            /**
             * @private
             * @function _insertNode
             * @description helper function that inserts and balances node in tree
             * @param {Node} current current node in resursive search
             * @param {Node} newNode new node to insert
             */
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
     * @public
     * @function BinaryTree.remove
     * @description removes a node and auto-balances tree
     * @param {T} searchVal node data to search for
     */
    remove(searchVal: T) {
        const { getMinNode } = this;

        /**
         * @private
         * @function _removeNode
         * @description helper function that removes node from tree and balances nodes
         * @param {Node} current current node in recursive search
         * @param {T} key value/node to search for
         * @returns {Node} removed node
         */
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
     * @public
     * @function BinaryTree.find
     * @description searches for a specified node
     * @param {T} searchVal node data to search for
     * @returns {Node} requested node
     */
    find(searchVal: T) {
        /**
         * @private
         * @function _search
         * @description helper function that searches for a specified node
         * @param {Node} current current node in recursive search
         * @param {T} key value/node to search for
         * @returns {Node | Null} searched node
         */
        return (function _search(current, key): Node | null {
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
     * @public
     * @function BinaryTree.getInOrder
     * @description parses tree data in-order
     * @returns {T[] | Null} in-order data
     */
    getInOrder() {
        if (!this.root) {
            return null;
        }

        const inOrder = [];

        /**
         * @private
         * @function _preOrder
         * @description helper function that parses data in-order
         * @param {Node | Null} node current node in recursive search
         * @returns {T[] | Null} in-ordered data
         */
        (function _inOrder(node: Node | null) {
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
     * @public
     * @function BinaryTree.getPreOrder
     * @description parses tree data in pre-order
     * @returns {T[] | Null} pre-ordered data
     */
    getPreOrder() {
        if (!this.root) {
            return null;
        }

        const preOrder = [];

        /**
         * @private
         * @function _preOrder
         * @description helper function that parses data in pre-order
         * @param {Node | Null} node current node in recursive search
         * @returns {T[] | Null} pre-ordered data
         */
        (function _preOrder(node: Node | null) {
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
     * @public
     * @function BinaryTree.getPostOrder
     * @description parses tree data in post-order
     * @returns {T[] | Null} post-ordered data
     */
    getPostOrder() {
        if (!this.root) {
            return null;
        }

        const postOrder = [];

        /**
         * @private
         * @function _postOrder
         * @description helper function that parses data in post-order
         * @param {Node | Null} node current node in recursive search
         * @returns {T[] | Null} post-ordered data
         */
        (function _postOrder(node: Node | null) {
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
     * @public
     * @function BinaryTree.getMaxNode
     * @description fetches the largest node after a given node
     * @param {Node} [node] starting node, default is root
     * @returns {Node} greatest node
     */
    getMaxNode(node: Node) {
        // validate start node
        if (!(node instanceof Node)) {
            // default to root node
            if (this.root) {
                node = this.root;
            } else {
                return null;
            }
        }

        /**
         * @private
         * @function _getMaxNode
         * @description helper function that gets the largest node in tree
         * @param {Node} current current node in search
         * @returns {Node} largest-value node
         */
        return (function _getMaxNode(current): Node {
            if (current.right === null) {
                return current;
            }
            return _getMaxNode(current.right);
        }(node));
    }

    /**
     * @public
     * @function BinaryTree.getMinNode
     * @description fetches the smallest node after a given node
     * @param {Node} [node] starting node, default is root
     * @returns {Node} smallest node
     */
    getMinNode(node: Node) {
        // validate start node
        if (!(node instanceof Node)) {
            // default to root node
            if (this.root) {
                node = this.root;
            } else {
                return null;
            }
        }

        /**
         * @private
         * @function _getMinNode
         * @description helper function that gets the smallest node in tree
         * @param {Node} current current node in search
         * @returns {Node} smallest-value node
         */
        return (function _getMinNode(current): Node {
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
