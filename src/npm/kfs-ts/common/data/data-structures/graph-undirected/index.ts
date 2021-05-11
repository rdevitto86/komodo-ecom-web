/**
 * Implements a non-directed graph
 * @version 1.0.0
 */
 export default class UndirectedGraph<T> {
    /**
     * Number of vertices in graph
     */
    totalVertices: number = 0;

    /**
     * Number of edges in graph
     */
    totalEdges: number = 0;

    /**
     * Adjacency list that stores graph
     */
    adjacencyList: Map<T, T[]> = new Map();

    /**
     * Adds a new vertex to the graph
     * @param {GraphData} data node data
     */
    addVertex(data: T) {
        this.adjacencyList.set(data, []);
        this.totalVertices++;
    }

    /**
     * Adds an edge between two nodes
     * @param {GraphData} src source node
     * @param {GraphData} dest destination node
     */
    addEdge(src: T, dest: T) {
        const v = this.adjacencyList.get(src);
        const w = this.adjacencyList.get(dest);

        if (v && w) {
            v.push(dest); // add edge between source and destination
            w.push(src); // add return edge back to source
            this.totalEdges++;
        }
    }

    removeVertex() {
        // TODO - future enhancement
    }

    /**
     * Traverses the graph and prints vertices
     * @returns {string} print-out of graph
     */
    print() {
        const { adjacencyList } = this;
        const vertices = adjacencyList.keys() || [];

        let vertex = vertices.next();
        let graph = '';

        // iterate over the vertices
        while (vertex) {
            const adjacentNodes = adjacencyList.get(vertex.value) || [];
            let adjacentFlow = '';

            // iterate over the adjacency list and concatenate nodes
            for (let i = 0, len = adjacentNodes.length; i < len; i++) {
                adjacentFlow += `${adjacentNodes[i]} `;
            }

            graph += `${vertex} -> ${adjacentFlow}\n`;
            vertex = vertices.next();
        }
        return graph;
    }
}
