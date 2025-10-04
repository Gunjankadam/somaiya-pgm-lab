// Graph Algorithm Utilities

export interface GraphEdge {
  from: string;
  to: string;
  weight: number;
}

export interface GraphData {
  nodes: string[];
  edges: GraphEdge[];
  type: string;
}

export interface DijkstraResult {
  path: string[];
  distance: number;
  visited: string[];
  distances: { [key: string]: number };
}

/**
 * Dijkstra's algorithm implementation
 * Finds the shortest path between two nodes in a weighted graph
 */
export const dijkstra = (graph: { [key: string]: Array<{ node: string; weight: number }> }, start: string, end: string): DijkstraResult => {
  const distances: { [key: string]: number } = {};
  const previous: { [key: string]: string | null } = {};
  const visited = new Set<string>();
  const unvisited = new Set<string>();
  
  // Initialize distances
  Object.keys(graph).forEach(node => {
    distances[node] = node === start ? 0 : Infinity;
    previous[node] = null;
    unvisited.add(node);
  });
  
  while (unvisited.size > 0) {
    // Find unvisited node with smallest distance
    let current: string | null = null;
    let minDistance = Infinity;
    
    for (const node of unvisited) {
      if (distances[node] < minDistance) {
        minDistance = distances[node];
        current = node;
      }
    }
    
    if (current === null || current === end) break;
    
    unvisited.delete(current);
    visited.add(current);
    
    // Update distances to neighbors
    if (graph[current]) {
      for (const neighbor of graph[current]) {
        if (!visited.has(neighbor.node)) {
          const newDistance = distances[current] + neighbor.weight;
          if (newDistance < distances[neighbor.node]) {
            distances[neighbor.node] = newDistance;
            previous[neighbor.node] = current;
          }
        }
      }
    }
  }
  
  // Reconstruct path
  const path: string[] = [];
  let current: string | null = end;
  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }
  
  return {
    path: path.length > 1 ? path : [],
    distance: distances[end],
    visited: Array.from(visited),
    distances
  };
};

/**
 * Convert graph data to adjacency list format
 */
export const convertToAdjacencyList = (nodes: string[], edges: GraphEdge[]): { [key: string]: Array<{ node: string; weight: number }> } => {
  const graph: { [key: string]: Array<{ node: string; weight: number }> } = {};
  
  // Initialize all nodes
  nodes.forEach(node => {
    graph[node] = [];
  });
  
  // Add edges
  edges.forEach(edge => {
    graph[edge.from].push({
      node: edge.to,
      weight: edge.weight
    });
    
    // For undirected graph, add reverse edge
    graph[edge.to].push({
      node: edge.from,
      weight: edge.weight
    });
  });
  
  return graph;
};

/**
 * Convert graphData to adjacency list format
 */
export const convertGraphDataToAdjacencyList = (graphData: GraphData): { [key: string]: Array<{ node: string; weight: number }> } => {
  const graph: { [key: string]: Array<{ node: string; weight: number }> } = {};
  
  // Initialize all nodes
  graphData.nodes.forEach(node => {
    graph[node] = [];
  });
  
  // Add edges
  graphData.edges.forEach(edge => {
    graph[edge.from].push({
      node: edge.to,
      weight: edge.weight
    });
    
    // For undirected graph, add reverse edge
    graph[edge.to].push({
      node: edge.from,
      weight: edge.weight
    });
  });
  
  return graph;
};

/**
 * Breadth-First Search implementation
 */
export const bfs = (graph: { [key: string]: string[] }, start: string): string[] => {
  const visited: string[] = [];
  const queue: string[] = [start];
  const visitedSet = new Set<string>();
  
  visitedSet.add(start);
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    visited.push(current);
    
    if (graph[current]) {
      for (const neighbor of graph[current]) {
        if (!visitedSet.has(neighbor)) {
          visitedSet.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  }
  
  return visited;
};

/**
 * Depth-First Search implementation
 */
export const dfs = (graph: { [key: string]: string[] }, start: string): string[] => {
  const visited: string[] = [];
  const visitedSet = new Set<string>();
  
  const dfsHelper = (node: string) => {
    visited.push(node);
    visitedSet.add(node);
    
    if (graph[node]) {
      for (const neighbor of graph[node]) {
        if (!visitedSet.has(neighbor)) {
          dfsHelper(neighbor);
        }
      }
    }
  };
  
  dfsHelper(start);
  return visited;
};

/**
 * Find connected components using DFS
 */
export const findConnectedComponents = (graph: { [key: string]: string[] }): string[][] => {
  const components: string[][] = [];
  const visited = new Set<string>();
  
  const dfs = (node: string, component: string[]) => {
    component.push(node);
    visited.add(node);
    
    if (graph[node]) {
      for (const neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          dfs(neighbor, component);
        }
      }
    }
  };
  
  for (const node of Object.keys(graph)) {
    if (!visited.has(node)) {
      const component: string[] = [];
      dfs(node, component);
      components.push(component);
    }
  }
  
  return components;
};

/**
 * Calculate vertex degrees
 */
export const calculateVertexDegrees = (graph: { [key: string]: string[] }): { [key: string]: number } => {
  const degrees: { [key: string]: number } = {};
  
  Object.keys(graph).forEach(node => {
    degrees[node] = graph[node] ? graph[node].length : 0;
  });
  
  return degrees;
};

/**
 * Find all shortest paths between two vertices using BFS
 */
export const findAllShortestPaths = (graph: { [key: string]: string[] }, start: string, end: string): string[][] => {
  if (start === end) return [[start]];
  
  const paths: string[][] = [];
  const queue: { node: string; path: string[] }[] = [{ node: start, path: [start] }];
  const visited = new Set<string>();
  let shortestLength = Infinity;
  
  while (queue.length > 0) {
    const { node, path } = queue.shift()!;
    
    if (path.length > shortestLength) continue;
    
    if (node === end) {
      if (path.length < shortestLength) {
        shortestLength = path.length;
        paths.length = 0; // Clear longer paths
      }
      if (path.length === shortestLength) {
        paths.push([...path]);
      }
      continue;
    }
    
    if (visited.has(node)) continue;
    visited.add(node);
    
    if (graph[node]) {
      for (const neighbor of graph[node]) {
        if (!path.includes(neighbor)) {
          queue.push({ node: neighbor, path: [...path, neighbor] });
        }
      }
    }
  }
  
  return paths;
};

/**
 * Find all shortest paths from a single vertex using BFS
 */
export const findAllShortestPathsFromVertex = (graph: { [key: string]: string[] }, start: string): { [key: string]: { path: string[]; distance: number } } => {
  const distances: { [key: string]: number } = {};
  const paths: { [key: string]: string[] } = {};
  const queue: { node: string; path: string[]; distance: number }[] = [{ node: start, path: [start], distance: 0 }];
  
  distances[start] = 0;
  paths[start] = [start];
  
  while (queue.length > 0) {
    const { node, path, distance } = queue.shift()!;
    
    if (graph[node]) {
      for (const neighbor of graph[node]) {
        if (distances[neighbor] === undefined || distances[neighbor] > distance + 1) {
          distances[neighbor] = distance + 1;
          paths[neighbor] = [...path, neighbor];
          queue.push({ node: neighbor, path: [...path, neighbor], distance: distance + 1 });
        }
      }
    }
  }
  
  const result: { [key: string]: { path: string[]; distance: number } } = {};
  Object.keys(distances).forEach(node => {
    result[node] = {
      path: paths[node] || [],
      distance: distances[node]
    };
  });
  
  return result;
};

/**
 * Find the longest path between two vertices using DFS
 */
export const findLongestPath = (graph: { [key: string]: string[] }, start: string, end: string): { path: string[]; length: number } => {
  if (start === end) return { path: [start], length: 0 };
  
  let longestPath: string[] = [];
  let maxLength = -1;
  
  const dfs = (current: string, target: string, visited: Set<string>, path: string[]): void => {
    if (current === target) {
      if (path.length > maxLength) {
        maxLength = path.length;
        longestPath = [...path];
      }
      return;
    }
    
    visited.add(current);
    
    if (graph[current]) {
      for (const neighbor of graph[current]) {
        if (!visited.has(neighbor)) {
          dfs(neighbor, target, visited, [...path, neighbor]);
        }
      }
    }
    
    visited.delete(current);
  };
  
  dfs(start, end, new Set(), [start]);
  
  return {
    path: longestPath,
    length: maxLength
  };
};

/**
 * Find all paths between two vertices using DFS
 */
export const findAllPaths = (graph: { [key: string]: string[] }, start: string, end: string): string[][] => {
  if (start === end) return [[start]];
  
  const allPaths: string[][] = [];
  
  const dfs = (current: string, target: string, visited: Set<string>, path: string[]): void => {
    if (current === target) {
      allPaths.push([...path]);
      return;
    }
    
    visited.add(current);
    
    if (graph[current]) {
      for (const neighbor of graph[current]) {
        if (!visited.has(neighbor)) {
          dfs(neighbor, target, visited, [...path, neighbor]);
        }
      }
    }
    
    visited.delete(current);
  };
  
  dfs(start, end, new Set(), [start]);
  
  return allPaths;
};

/**
 * Find all possible paths between two vertices (including cycles)
 */
export const findAllPossiblePaths = (graph: { [key: string]: string[] }, start: string, end: string, maxDepth: number = 10): string[][] => {
  if (start === end) return [[start]];
  
  const allPaths: string[][] = [];
  
  const dfs = (current: string, target: string, visited: Set<string>, path: string[], depth: number): void => {
    if (depth > maxDepth) return; // Prevent infinite recursion
    
    if (current === target && path.length > 1) {
      allPaths.push([...path]);
      return;
    }
    
    if (graph[current]) {
      for (const neighbor of graph[current]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          dfs(neighbor, target, visited, [...path, neighbor], depth + 1);
          visited.delete(neighbor);
        }
      }
    }
  };
  
  dfs(start, end, new Set([start]), [start], 0);
  
  return allPaths;
};

/**
 * Check if graph has Eulerian path
 */
export const hasEulerianPath = (graph: { [key: string]: string[] }): boolean => {
  const nodes = Object.keys(graph);
  if (nodes.length === 0) return false;
  
  let oddDegreeCount = 0;
  
  for (const node of nodes) {
    const degree = graph[node] ? graph[node].length : 0;
    if (degree % 2 === 1) {
      oddDegreeCount++;
    }
  }
  
  // Eulerian path exists if:
  // - All vertices have even degree (Eulerian cycle), OR
  // - Exactly 2 vertices have odd degree (Eulerian path)
  return oddDegreeCount === 0 || oddDegreeCount === 2;
};

/**
 * Find Eulerian path using Hierholzer's algorithm
 */
export const findEulerianPath = (graph: { [key: string]: string[] }): { path: string[]; hasPath: boolean } => {
  const nodes = Object.keys(graph);
  if (nodes.length === 0) return { path: [], hasPath: false };
  
  // Check if Eulerian path exists
  if (!hasEulerianPath(graph)) {
    return { path: [], hasPath: false };
  }
  
  // Create adjacency list with edge counts
  const adjList: { [key: string]: string[] } = {};
  const edgeCount: { [key: string]: number } = {};
  
  for (const node of nodes) {
    adjList[node] = [...(graph[node] || [])];
    edgeCount[node] = adjList[node].length;
  }
  
  // Find starting vertex (odd degree vertex if exists, otherwise any vertex)
  let startVertex = nodes[0];
  for (const node of nodes) {
    if (edgeCount[node] % 2 === 1) {
      startVertex = node;
      break;
    }
  }
  
  const path: string[] = [];
  const circuit: string[] = [];
  
  // Start from the chosen vertex
  let currentVertex = startVertex;
  circuit.push(currentVertex);
  
  while (circuit.length > 0) {
    // If current vertex has remaining edges
    if (edgeCount[currentVertex] > 0) {
      // Add vertex to circuit
      circuit.push(currentVertex);
      
      // Find next vertex
      const nextVertex = adjList[currentVertex].pop();
      if (nextVertex) {
        // Remove edge from both directions
        const nextIndex = adjList[nextVertex].indexOf(currentVertex);
        if (nextIndex > -1) {
          adjList[nextVertex].splice(nextIndex, 1);
        }
        
        // Update edge counts
        edgeCount[currentVertex]--;
        edgeCount[nextVertex]--;
        
        // Move to next vertex
        currentVertex = nextVertex;
      }
    } else {
      // No more edges from current vertex, add to path
      path.push(currentVertex);
      currentVertex = circuit.pop() || '';
    }
  }
  
  // Reverse the path to get correct order
  path.reverse();
  
  return { path, hasPath: true };
};

/**
 * Find Eulerian cycle (special case of Eulerian path where start = end)
 */
export const findEulerianCycle = (graph: { [key: string]: string[] }): { path: string[]; hasCycle: boolean } => {
  const nodes = Object.keys(graph);
  if (nodes.length === 0) return { path: [], hasCycle: false };
  
  // Check if all vertices have even degree
  for (const node of nodes) {
    const degree = graph[node] ? graph[node].length : 0;
    if (degree % 2 === 1) {
      return { path: [], hasCycle: false };
    }
  }
  
  const result = findEulerianPath(graph);
  if (result.hasPath && result.path.length > 0) {
    // For cycle, the path should start and end at the same vertex
    const cycle = [...result.path];
    if (cycle[0] !== cycle[cycle.length - 1]) {
      cycle.push(cycle[0]);
    }
    return { path: cycle, hasCycle: true };
  }
  
  return { path: [], hasCycle: false };
};

/**
 * Check if graph has Hamiltonian path
 */
export const hasHamiltonianPath = (graph: { [key: string]: string[] }): boolean => {
  const nodes = Object.keys(graph);
  if (nodes.length <= 1) return true;
  
  // For small graphs, try all possible paths
  if (nodes.length <= 8) {
    return findHamiltonianPath(graph).hasPath;
  }
  
  // For larger graphs, use heuristics
  // Check if graph is connected
  const visited = new Set<string>();
  const dfs = (node: string) => {
    visited.add(node);
    if (graph[node]) {
      for (const neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
    }
  };
  
  dfs(nodes[0]);
  return visited.size === nodes.length;
};

/**
 * Find Hamiltonian path using backtracking
 */
export const findHamiltonianPath = (graph: { [key: string]: string[] }): { path: string[]; hasPath: boolean } => {
  const nodes = Object.keys(graph);
  if (nodes.length === 0) return { path: [], hasPath: false };
  if (nodes.length === 1) return { path: [nodes[0]], hasPath: true };
  
  // Try starting from each vertex
  for (const startNode of nodes) {
    const path = [startNode];
    const visited = new Set([startNode]);
    
    if (hamiltonianPathDFS(graph, startNode, path, visited, nodes.length)) {
      return { path, hasPath: true };
    }
  }
  
  return { path: [], hasPath: false };
};

/**
 * Helper function for Hamiltonian path DFS
 */
const hamiltonianPathDFS = (
  graph: { [key: string]: string[] }, 
  currentNode: string, 
  path: string[], 
  visited: Set<string>, 
  totalNodes: number
): boolean => {
  // If we've visited all nodes, we found a Hamiltonian path
  if (path.length === totalNodes) {
    return true;
  }
  
  // Try all unvisited neighbors
  if (graph[currentNode]) {
    for (const neighbor of graph[currentNode]) {
      if (!visited.has(neighbor)) {
        // Add neighbor to path
        path.push(neighbor);
        visited.add(neighbor);
        
        // Recursively explore
        if (hamiltonianPathDFS(graph, neighbor, path, visited, totalNodes)) {
          return true;
        }
        
        // Backtrack
        path.pop();
        visited.delete(neighbor);
      }
    }
  }
  
  return false;
};

/**
 * Find Hamiltonian cycle using backtracking
 */
export const findHamiltonianCycle = (graph: { [key: string]: string[] }): { path: string[]; hasCycle: boolean } => {
  const nodes = Object.keys(graph);
  if (nodes.length < 3) return { path: [], hasCycle: false };
  
  // Try starting from each vertex
  for (const startNode of nodes) {
    const path = [startNode];
    const visited = new Set([startNode]);
    
    if (hamiltonianCycleDFS(graph, startNode, startNode, path, visited, nodes.length)) {
      return { path, hasCycle: true };
    }
  }
  
  return { path: [], hasCycle: false };
};

/**
 * Helper function for Hamiltonian cycle DFS
 */
const hamiltonianCycleDFS = (
  graph: { [key: string]: string[] }, 
  startNode: string,
  currentNode: string, 
  path: string[], 
  visited: Set<string>, 
  totalNodes: number
): boolean => {
  // If we've visited all nodes, check if we can return to start
  if (path.length === totalNodes) {
    // Check if current node is connected to start node
    if (graph[currentNode] && graph[currentNode].includes(startNode)) {
      path.push(startNode); // Complete the cycle
      return true;
    }
    return false;
  }
  
  // Try all unvisited neighbors
  if (graph[currentNode]) {
    for (const neighbor of graph[currentNode]) {
      if (!visited.has(neighbor)) {
        // Add neighbor to path
        path.push(neighbor);
        visited.add(neighbor);
        
        // Recursively explore
        if (hamiltonianCycleDFS(graph, startNode, neighbor, path, visited, totalNodes)) {
          return true;
        }
        
        // Backtrack
        path.pop();
        visited.delete(neighbor);
      }
    }
  }
  
  return false;
};

/**
 * Floyd-Warshall algorithm - finds shortest paths between all pairs of vertices
 */
export const floydWarshall = (graph: { [key: string]: string[] }, weights?: { [key: string]: { [key: string]: number } }): { 
  distances: { [key: string]: { [key: string]: number } }; 
  next: { [key: string]: { [key: string]: string | null } };
  matrix: number[][];
} => {
  const nodes = Object.keys(graph);
  const n = nodes.length;
  const infinity = 1e8;
  
  // Initialize distance matrix
  const distances: { [key: string]: { [key: string]: number } } = {};
  const next: { [key: string]: { [key: string]: string | null } } = {};
  const matrix: number[][] = [];
  
  // Initialize matrices
  for (let i = 0; i < n; i++) {
    distances[nodes[i]] = {};
    next[nodes[i]] = {};
    matrix[i] = [];
    
    for (let j = 0; j < n; j++) {
      if (i === j) {
        distances[nodes[i]][nodes[j]] = 0;
        matrix[i][j] = 0;
      } else {
        distances[nodes[i]][nodes[j]] = infinity;
        matrix[i][j] = infinity;
      }
      next[nodes[i]][nodes[j]] = null;
    }
  }
  
  // Fill with edge weights
  for (const from of nodes) {
    if (graph[from]) {
      for (const to of graph[from]) {
        const weight = weights?.[from]?.[to] || 1;
        const fromIndex = nodes.indexOf(from);
        const toIndex = nodes.indexOf(to);
        
        distances[from][to] = weight;
        matrix[fromIndex][toIndex] = weight;
        next[from][to] = to;
      }
    }
  }
  
  // Floyd-Warshall algorithm
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const ik = distances[nodes[i]][nodes[k]];
        const kj = distances[nodes[k]][nodes[j]];
        const ij = distances[nodes[i]][nodes[j]];
        
        if (ik + kj < ij) {
          distances[nodes[i]][nodes[j]] = ik + kj;
          matrix[i][j] = ik + kj;
          next[nodes[i]][nodes[j]] = next[nodes[i]][nodes[k]];
        }
      }
    }
  }
  
  return { distances, next, matrix };
};

/**
 * Reconstruct path from Floyd-Warshall next matrix
 */
export const reconstructPath = (
  next: { [key: string]: { [key: string]: string | null } }, 
  start: string, 
  end: string
): string[] => {
  if (!next[start] || next[start][end] === null) {
    return []; // No path exists
  }
  
  const path = [start];
  let current = start;
  
  while (current !== end) {
    current = next[current][end]!;
    path.push(current);
  }
  
  return path;
};

/**
 * Get all shortest paths from Floyd-Warshall result
 */
export const getAllShortestPathsFromFloydWarshall = (
  distances: { [key: string]: { [key: string]: number } },
  next: { [key: string]: { [key: string]: string | null } },
  start: string
): { [key: string]: { path: string[]; distance: number } } => {
  const result: { [key: string]: { path: string[]; distance: number } } = {};
  const nodes = Object.keys(distances);
  
  for (const end of nodes) {
    if (start !== end) {
      const path = reconstructPath(next, start, end);
      const distance = distances[start][end];
      
      if (path.length > 0) {
        result[end] = { path, distance };
      }
    }
  }
  
  return result;
};

/**
 * Minimum Spanning Tree using Prim's algorithm
 */
export const findMinimumSpanningTree = (graph: { [key: string]: string[] }, weights?: { [key: string]: { [key: string]: number } }): { 
  edges: { from: string; to: string; weight: number }[]; 
  totalWeight: number;
  isConnected: boolean;
} => {
  const nodes = Object.keys(graph);
  if (nodes.length === 0) return { edges: [], totalWeight: 0, isConnected: true };
  
  const mstEdges: { from: string; to: string; weight: number }[] = [];
  const inTree = new Set<string>();
  
  // Start with first node
  inTree.add(nodes[0]);
  
  while (inTree.size < nodes.length) {
    let minEdge: { from: string; to: string; weight: number } | null = null;
    let minWeight = Infinity;
    
    // Find minimum weight edge connecting tree to non-tree
    for (const node of inTree) {
      if (graph[node]) {
        for (const neighbor of graph[node]) {
          if (!inTree.has(neighbor)) {
            const weight = weights?.[node]?.[neighbor] || 1;
            if (weight < minWeight) {
              minWeight = weight;
              minEdge = { from: node, to: neighbor, weight };
            }
          }
        }
      }
    }
    
    if (minEdge === null) {
      // Graph is not connected
      return { edges: mstEdges, totalWeight: mstEdges.reduce((sum, edge) => sum + edge.weight, 0), isConnected: false };
    }
    
    mstEdges.push(minEdge);
    inTree.add(minEdge.to);
  }
  
  return { 
    edges: mstEdges, 
    totalWeight: mstEdges.reduce((sum, edge) => sum + edge.weight, 0), 
    isConnected: true 
  };
};

/**
 * Graph Coloring using greedy algorithm
 */
export const graphColoring = (graph: { [key: string]: string[] }): { 
  colors: { [key: string]: number }; 
  chromaticNumber: number;
} => {
  const nodes = Object.keys(graph);
  const colors: { [key: string]: number } = {};
  let chromaticNumber = 0;
  
  for (const node of nodes) {
    const usedColors = new Set<number>();
    
    // Check colors of adjacent nodes
    if (graph[node]) {
      for (const neighbor of graph[node]) {
        if (colors[neighbor] !== undefined) {
          usedColors.add(colors[neighbor]);
        }
      }
    }
    
    // Find smallest available color
    let color = 0;
    while (usedColors.has(color)) {
      color++;
    }
    
    colors[node] = color;
    chromaticNumber = Math.max(chromaticNumber, color + 1);
  }
  
  return { colors, chromaticNumber };
};

/**
 * Maximum Flow using Ford-Fulkerson algorithm
 */
export const findMaximumFlow = (
  graph: { [key: string]: string[] }, 
  source: string, 
  sink: string, 
  capacities?: { [key: string]: { [key: string]: number } }
): { 
  maxFlow: number; 
  flow: { [key: string]: { [key: string]: number } };
  isConnected: boolean;
} => {
  const nodes = Object.keys(graph);
  if (!nodes.includes(source) || !nodes.includes(sink)) {
    return { maxFlow: 0, flow: {}, isConnected: false };
  }
  
  // Initialize residual graph
  const residual: { [key: string]: { [key: string]: number } } = {};
  const flow: { [key: string]: { [key: string]: number } } = {};
  
  for (const node of nodes) {
    residual[node] = {};
    flow[node] = {};
    if (graph[node]) {
      for (const neighbor of graph[node]) {
        const capacity = capacities?.[node]?.[neighbor] || 1;
        residual[node][neighbor] = capacity;
        flow[node][neighbor] = 0;
      }
    }
  }
  
  let maxFlow = 0;
  
  // Ford-Fulkerson algorithm
  while (true) {
    const path = findAugmentingPath(residual, source, sink);
    if (path.length === 0) break;
    
    // Find minimum capacity in path
    let minCapacity = Infinity;
    for (let i = 0; i < path.length - 1; i++) {
      minCapacity = Math.min(minCapacity, residual[path[i]][path[i + 1]]);
    }
    
    // Update flow and residual graph
    for (let i = 0; i < path.length - 1; i++) {
      const from = path[i];
      const to = path[i + 1];
      flow[from][to] += minCapacity;
      residual[from][to] -= minCapacity;
      if (!residual[to]) residual[to] = {};
      if (!residual[to][from]) residual[to][from] = 0;
      residual[to][from] += minCapacity;
    }
    
    maxFlow += minCapacity;
  }
  
  return { maxFlow, flow, isConnected: true };
};

/**
 * Helper function for Ford-Fulkerson - find augmenting path using BFS
 */
const findAugmentingPath = (residual: { [key: string]: { [key: string]: number } }, source: string, sink: string): string[] => {
  const queue: string[] = [source];
  const parent: { [key: string]: string | null } = { [source]: null };
  const visited = new Set<string>([source]);
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    
    if (current === sink) {
      // Reconstruct path
      const path: string[] = [];
      let node: string | null = sink;
      while (node !== null) {
        path.unshift(node);
        node = parent[node];
      }
      return path;
    }
    
    if (residual[current]) {
      for (const neighbor of Object.keys(residual[current])) {
        if (!visited.has(neighbor) && residual[current][neighbor] > 0) {
          visited.add(neighbor);
          parent[neighbor] = current;
          queue.push(neighbor);
        }
      }
    }
  }
  
  return [];
};

/**
 * Graph Isomorphism Check (simplified)
 */
export const checkGraphIsomorphism = (
  graph1: { [key: string]: string[] }, 
  graph2: { [key: string]: string[] }
): { 
  isIsomorphic: boolean; 
  mapping?: { [key: string]: string };
} => {
  const nodes1 = Object.keys(graph1);
  const nodes2 = Object.keys(graph2);
  
  if (nodes1.length !== nodes2.length) {
    return { isIsomorphic: false };
  }
  
  // Check if degrees match
  const degrees1 = nodes1.map(node => graph1[node]?.length || 0).sort((a, b) => a - b);
  const degrees2 = nodes2.map(node => graph2[node]?.length || 0).sort((a, b) => a - b);
  
  for (let i = 0; i < degrees1.length; i++) {
    if (degrees1[i] !== degrees2[i]) {
      return { isIsomorphic: false };
    }
  }
  
  // For small graphs, try all permutations
  if (nodes1.length <= 6) {
    return tryAllMappings(graph1, graph2, nodes1, nodes2);
  }
  
  // For larger graphs, use heuristics
  return { isIsomorphic: checkIsomorphismHeuristic(graph1, graph2) };
};

/**
 * Try all possible mappings for small graphs
 */
const tryAllMappings = (
  graph1: { [key: string]: string[] }, 
  graph2: { [key: string]: string[] },
  nodes1: string[], 
  nodes2: string[]
): { isIsomorphic: boolean; mapping?: { [key: string]: string } } => {
  const permutations = getPermutations(nodes2);
  
  for (const perm of permutations) {
    const mapping: { [key: string]: string } = {};
    for (let i = 0; i < nodes1.length; i++) {
      mapping[nodes1[i]] = perm[i];
    }
    
    if (isValidMapping(graph1, graph2, mapping)) {
      return { isIsomorphic: true, mapping };
    }
  }
  
  return { isIsomorphic: false };
};

/**
 * Check if a mapping is valid
 */
const isValidMapping = (
  graph1: { [key: string]: string[] }, 
  graph2: { [key: string]: string[] },
  mapping: { [key: string]: string }
): boolean => {
  for (const node1 of Object.keys(graph1)) {
    const mappedNode1 = mapping[node1];
    if (!graph2[mappedNode1]) continue;
    
    const neighbors1 = graph1[node1] || [];
    const neighbors2 = graph2[mappedNode1] || [];
    
    if (neighbors1.length !== neighbors2.length) return false;
    
    for (const neighbor1 of neighbors1) {
      const mappedNeighbor1 = mapping[neighbor1];
      if (!neighbors2.includes(mappedNeighbor1)) {
        return false;
      }
    }
  }
  
  return true;
};

/**
 * Heuristic isomorphism check for larger graphs
 */
const checkIsomorphismHeuristic = (graph1: { [key: string]: string[] }, graph2: { [key: string]: string[] }): boolean => {
  // Simple heuristic: check if adjacency matrices are similar
  const nodes1 = Object.keys(graph1);
  const nodes2 = Object.keys(graph2);
  
  if (nodes1.length !== nodes2.length) return false;
  
  // Check degree sequences
  const degrees1 = nodes1.map(node => graph1[node]?.length || 0).sort((a, b) => b - a);
  const degrees2 = nodes2.map(node => graph2[node]?.length || 0).sort((a, b) => b - a);
  
  for (let i = 0; i < degrees1.length; i++) {
    if (degrees1[i] !== degrees2[i]) return false;
  }
  
  return true;
};

/**
 * Generate all permutations of an array
 */
const getPermutations = <T>(arr: T[]): T[][] => {
  if (arr.length <= 1) return [arr];
  
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i++) {
    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
    const perms = getPermutations(rest);
    for (const perm of perms) {
      result.push([arr[i], ...perm]);
    }
  }
  
  return result;
};

/**
 * Maximum Independent Set using greedy algorithm
 */
export const findMaximumIndependentSet = (graph: { [key: string]: string[] }): { 
  independentSet: string[]; 
  size: number;
} => {
  const nodes = Object.keys(graph);
  const independentSet: string[] = [];
  const used = new Set<string>();
  
  // Sort nodes by degree (ascending)
  const sortedNodes = nodes.sort((a, b) => (graph[a]?.length || 0) - (graph[b]?.length || 0));
  
  for (const node of sortedNodes) {
    if (!used.has(node)) {
      independentSet.push(node);
      used.add(node);
      
      // Mark neighbors as used
      if (graph[node]) {
        for (const neighbor of graph[node]) {
          used.add(neighbor);
        }
      }
    }
  }
  
  return { independentSet, size: independentSet.length };
};

/**
 * Maximum Clique using greedy algorithm
 */
export const findMaximumClique = (graph: { [key: string]: string[] }): { 
  clique: string[]; 
  size: number;
} => {
  const nodes = Object.keys(graph);
  let maxClique: string[] = [];
  
  // Try each node as potential clique member
  for (const startNode of nodes) {
    const clique = [startNode];
    const candidates = new Set<string>();
    
    // Add neighbors of start node as candidates
    if (graph[startNode]) {
      for (const neighbor of graph[startNode]) {
        candidates.add(neighbor);
      }
    }
    
    // Greedily add nodes that are connected to all current clique members
    while (candidates.size > 0) {
      let bestNode: string | null = null;
      let maxConnections = 0;
      
      for (const candidate of candidates) {
        let connections = 0;
        for (const cliqueMember of clique) {
          if (graph[cliqueMember]?.includes(candidate)) {
            connections++;
          }
        }
        
        if (connections === clique.length && connections > maxConnections) {
          maxConnections = connections;
          bestNode = candidate;
        }
      }
      
      if (bestNode === null) break;
      
      clique.push(bestNode);
      candidates.delete(bestNode);
      
      // Remove candidates that are not connected to the new clique member
      for (const candidate of Array.from(candidates)) {
        if (!graph[bestNode]?.includes(candidate)) {
          candidates.delete(candidate);
        }
      }
    }
    
    if (clique.length > maxClique.length) {
      maxClique = clique;
    }
  }
  
  return { clique: maxClique, size: maxClique.length };
};

/**
 * Graph Radius and Diameter
 */
export const findRadiusAndDiameter = (graph: { [key: string]: string[] }): { 
  radius: number; 
  diameter: number; 
  center: string[]; 
  peripheral: string[];
} => {
  const nodes = Object.keys(graph);
  if (nodes.length === 0) return { radius: 0, diameter: 0, center: [], peripheral: [] };
  if (nodes.length === 1) return { radius: 0, diameter: 0, center: nodes, peripheral: nodes };
  
  // Calculate shortest paths between all pairs using Floyd-Warshall
  const floydResult = floydWarshall(graph);
  const distances = floydResult.distances;
  
  // Calculate eccentricity for each node
  const eccentricities: { [key: string]: number } = {};
  let minEccentricity = Infinity;
  let maxEccentricity = -Infinity;
  
  for (const node of nodes) {
    let maxDistance = -1;
    for (const otherNode of nodes) {
      if (node !== otherNode && distances[node][otherNode] < 1e8) {
        maxDistance = Math.max(maxDistance, distances[node][otherNode]);
      }
    }
    
    if (maxDistance >= 0) {
      eccentricities[node] = maxDistance;
      minEccentricity = Math.min(minEccentricity, maxDistance);
      maxEccentricity = Math.max(maxEccentricity, maxDistance);
    }
  }
  
  const radius = minEccentricity === Infinity ? 0 : minEccentricity;
  const diameter = maxEccentricity === -Infinity ? 0 : maxEccentricity;
  
  const center = nodes.filter(node => eccentricities[node] === radius);
  const peripheral = nodes.filter(node => eccentricities[node] === diameter);
  
  return { radius, diameter, center, peripheral };
};

/**
 * Graph Visualization based on weights
 */
export const createWeightBasedVisualization = (
  graph: { [key: string]: string[] }, 
  weights?: { [key: string]: { [key: string]: number } }
): { 
  nodeSizes: { [key: string]: number }; 
  edgeWidths: { [key: string]: number };
} => {
  const nodes = Object.keys(graph);
  const nodeSizes: { [key: string]: number } = {};
  const edgeWidths: { [key: string]: number } = {};
  
  // Calculate node sizes based on degree
  const degrees: { [key: string]: number } = {};
  let totalDegree = 0;
  
  for (const node of nodes) {
    const degree = graph[node]?.length || 0;
    degrees[node] = degree;
    totalDegree += degree;
  }
  
  const minSize = 20;
  const maxSize = 100;
  
  for (const node of nodes) {
    if (totalDegree > 0) {
      const normalizedDegree = degrees[node] / totalDegree;
      nodeSizes[node] = Math.max(minSize, Math.min(maxSize, normalizedDegree * maxSize * 2));
    } else {
      nodeSizes[node] = minSize;
    }
  }
  
  // Calculate edge widths based on weights
  const edgeList: { edge: string; weight: number }[] = [];
  let totalWeight = 0;
  
  for (const from of nodes) {
    if (graph[from]) {
      for (const to of graph[from]) {
        const weight = weights?.[from]?.[to] || 1;
        const edgeKey = `${from}-${to}`;
        edgeList.push({ edge: edgeKey, weight });
        totalWeight += weight;
      }
    }
  }
  
  const minWidth = 2;
  const maxWidth = 12;
  
  for (const { edge, weight } of edgeList) {
    if (totalWeight > 0) {
      const normalizedWeight = weight / totalWeight;
      edgeWidths[edge] = Math.max(minWidth, Math.min(maxWidth, normalizedWeight * maxWidth * 2));
    } else {
      edgeWidths[edge] = minWidth;
    }
  }
  
  return { nodeSizes, edgeWidths };
};