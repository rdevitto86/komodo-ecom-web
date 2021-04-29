/**
 * @type
 * @description defines accetable graph vertex values
 */
type GraphData = number | string;

/**
 * @class
 * @version 1.0
 * @description implements a non-directed graph
 * @complexity TODO
 */
export default class UndirectedGraph {
    /**
     * @public
     * @property {Number} totalVertices
     * @description number of vertices in graph
     */
    public totalVertices: number = 0;

    /**
     * @public
     * @property {Number} totalEdges
     * @description number of edges in graph
     */
    public totalEdges: number = 0;

    /**
     * @private
     * @property {Map<GraphData, GraphData[]>} _adjacencyList
     * @description adjacency list that stores graph
     */
    private _adjacencyList: Map<GraphData, GraphData[]> = new Map();

    /**
     * @public
     * @function UndirectedGraph.addVertex
     * @description adds a new vertex to the graph
     * @param {GraphData} data node data
     */
    addVertex(data: GraphData) {
        this._adjacencyList.set(data, []);
        this.totalVertices++;
    }

    /**
     * @public
     * @function UndirectedGraph.addEdge
     * @description adds an edge between two nodes
     * @param {GraphData} src source node
     * @param {GraphData} dest destination node
     */
    addEdge(src: GraphData, dest: GraphData) {
        const v = this._adjacencyList.get(src);
        const w = this._adjacencyList.get(dest);

        if (v && w) {
            v.push(dest); // add edge between source and destination
            w.push(src); // add return edge back to source
            this.totalEdges++;
        }
    }

    // removeVertex() {

    // }

    /**
     * @public
     * @function UndirectedGraph.breadthSearch
     * @description traverses the graph using breadth-first search
     * @param {GraphData} start starting node
     * @complexity TODO
     */
    breadthSearch(start: GraphData) {
        const visited: Map<GraphData, boolean> = new Map();

        visited.set(start, true);

        // queue for adjacent elements
        const queue = [start];

        const { _adjacencyList } = this;

        // loop until queue is element
        while (!queue.length) {
            const current = queue.shift();

            // console.log(current);

            // get the adjacent list for current vertex
            if (current) {
                const adjacentNodes = _adjacencyList.get(current) || [];

                // loop through the list and add adjacent node(s) to queue
                for (const key in adjacentNodes) {
                    if (key) {
                        const node = adjacentNodes[key];

                        if (!visited.get(node)) {
                            visited.set(node, true);
                            queue.push(node);
                        }
                    }
                }
            }
        }
    }

    /**
     * @public
     * @function UndirectedGraph.depthSearch
     * @description traverses the graph using depth-first search
     * @param {GraphData} start starting node
     * @complexity TODO
     */
    depthSearch(start: GraphData) {
        const visited: Map<GraphData, boolean> = new Map();
        const { _adjacencyList } = this;

        /**
         * @private
         * @function _dfs
         * @description
         * @param {Any} node current node in recursive search
         */
        (function _dfs(current: any) {
            visited.set(current, true);
            // console.log(node);

            const adjacent = _adjacencyList.get(current) || [];

            // loop through edges and visit adjacent nodes
            for (const key in adjacent) {
                if (key) {
                    const node = adjacent[key];
                    if (!visited.get(node)) {
                        _dfs(node);
                    }
                }
            }
        }(start));
    }

    /**
     * @public
     * @function UndirectedGraph.print
     * @description traverses the graph and prints vertices
     */
    print() {
        const { _adjacencyList } = this;
        const vertices = _adjacencyList.keys() || [];
        let vertex = vertices.next(); // iterator

        // iterate over the vertices
        while (vertex) {
            const adjacentNodes = _adjacencyList.get(vertex.value) || [];
            let adjacentFlow = '';

            // iterate over the adjacency list and concatenate nodes
            for (const node of adjacentNodes) {
                adjacentFlow += `${node} `;
            }

            // print the vertex and its adjacency list
            console.log(`${vertex} -> ${adjacentFlow}`);

            vertex = vertices.next();
        }
    }
}
