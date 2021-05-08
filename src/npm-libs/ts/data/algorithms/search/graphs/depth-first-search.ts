// import { GraphDirected } from '../../../data-structures/graphs/graph-directed';
import { UndirectedGraph } from '../../../data-structures/graphs/graph-undirected';

type Graph = UndirectedGraph<any>;

// TODO - make start node
/**
 * Traverses the graph using depth-first search
 * @param {Graph} graph graph data structure
 * @param {any} start starting node
 * @returns {any[]} path traversed
 * @complexity TODO
 */
export function depthSearch(graph: Graph, start: any) {
    const visited: Map<any, boolean> = new Map();
    const traversed = [];
    const { adjacencyList } = graph;

    // recursively executes a depth-first search
    (function _dfs(current: any) {
        visited.set(current, true);
        traversed.push(current);

        const adjacent = adjacencyList.get(current) || [];

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
    return traversed;
}
