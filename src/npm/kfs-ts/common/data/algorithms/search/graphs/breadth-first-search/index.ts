// import { GraphDirected } from '../../../data-structures/graphs/graph-directed';
import UndirectedGraph from '../../../../data-structures/graph-undirected';

type Graph = UndirectedGraph<any>;

/**
 * Traverses the graph using breadth-first search
 * @param {Graph} graph graph data structure
 * @param {any} start starting node
 * @returns {any[]} path traversed
 * @complexity TODO
 */
export default function BFS(graph: Graph, start: any) {
    const visited: Map<any, boolean> = new Map();
    const traversed = [];

    visited.set(start, true);
    traversed.push(start);

    const queue = [graph]; // queue for adjacent elements
    const { adjacencyList } = graph;

    // loop until queue is element
    while (!queue.length) {
        const current = queue.shift();

        // get the adjacent list for current vertex
        if (current) {
            const adjacentNodes = adjacencyList.get(current) || [];

            // loop through the list and add adjacent node(s) to queue
            for (let i = 0, len = adjacentNodes.length; i < len; i++) {
                const node = adjacentNodes[i];

                if (!visited.get(node)) {
                    visited.set(node, true);
                    traversed.push(node);
                    queue.push(node);
                }
            }
        }
    }
    return traversed;
}
