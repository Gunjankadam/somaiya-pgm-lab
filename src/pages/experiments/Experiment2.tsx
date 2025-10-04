import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, Play, RotateCcw, Info, BookOpen, Code, BarChart3, Network } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as THREE from 'three';
import { dijkstra, convertGraphDataToAdjacencyList, bfs, dfs, findConnectedComponents, calculateVertexDegrees, findAllShortestPaths, findAllShortestPathsFromVertex, findLongestPath, findAllPaths, findAllPossiblePaths, hasEulerianPath, findEulerianPath, findEulerianCycle, hasHamiltonianPath, findHamiltonianPath, findHamiltonianCycle, floydWarshall, reconstructPath, getAllShortestPathsFromFloydWarshall, findMinimumSpanningTree, graphColoring, findMaximumFlow, checkGraphIsomorphism, findMaximumIndependentSet, findMaximumClique, findRadiusAndDiameter, createWeightBasedVisualization } from '@/utils/graphAlgorithms';

const Graph3D = ({ graphData, highlightPath = null }) => {
  const containerRef = useRef(null);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !graphData) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 0.8);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3b82f6, 0.4);
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    // Create nodes
    const nodes = {};
    const nodeGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    
    // Calculate positions in 3D space
    const positions = {};
    const numNodes = graphData.nodes.length;
    const radius = 8;
    
    graphData.nodes.forEach((nodeId, index) => {
      const angle = (index / numNodes) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 4; // Random height variation
      positions[nodeId] = new THREE.Vector3(x, y, z);
    });

    // Create node meshes
    graphData.nodes.forEach(nodeId => {
      const position = positions[nodeId];
      
      const nodeMaterial = new THREE.MeshPhongMaterial({
        color: highlightPath && highlightPath.includes(nodeId) ? 0xff6b6b : 0x3b82f6,
        emissive: highlightPath && highlightPath.includes(nodeId) ? 0x4a1a1a : 0x1e3a8a,
        shininess: 100,
        transparent: true,
        opacity: 0.9
      });
      
      const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      nodeMesh.position.copy(position);
      scene.add(nodeMesh);

      // Create node labels
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 128;
      canvas.height = 128;
      
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      
      context.fillStyle = '#ffffff';
      context.font = 'Bold 60px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      
      context.strokeStyle = '#000000';
      context.lineWidth = 2;
      context.strokeText(nodeId, 64, 64);
      context.fillText(nodeId, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ 
        map: texture,
        depthTest: false,
        depthWrite: false
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.copy(position);
      sprite.position.y += 1.5;
      sprite.scale.set(1.2, 1.2, 1);
      sprite.renderOrder = 999;
      scene.add(sprite);

      nodes[nodeId] = { mesh: nodeMesh, sprite };
    });

    // Create edges
    const edges = [];
    graphData.edges.forEach((edge, index) => {
      const fromPos = positions[edge.from];
      const toPos = positions[edge.to];
      
      const isHighlighted = highlightPath && 
        highlightPath.includes(edge.from) && 
        highlightPath.includes(edge.to) &&
        Math.abs(highlightPath.indexOf(edge.from) - highlightPath.indexOf(edge.to)) === 1;
      
      const curve = new THREE.LineCurve3(fromPos, toPos);
      const tubeGeometry = new THREE.TubeGeometry(curve, 20, 0.15, 8, false);
      const tubeMaterial = new THREE.MeshPhongMaterial({
        color: isHighlighted ? 0xff6b6b : 0x3b82f6,
        emissive: isHighlighted ? 0x4a1a1a : 0x1e3a8a,
        transparent: true,
        opacity: isHighlighted ? 1.0 : 0.7
      });
      const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
      scene.add(tube);
      
      edges.push(tube);
    });

    // Mouse interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationVelocity = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      setIsRotating(false);
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onMouseMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        rotationVelocity.x = deltaY * 0.005;
        rotationVelocity.y = deltaX * 0.005;

        scene.rotation.y += rotationVelocity.y;
        scene.rotation.x += rotationVelocity.x;
      }

      previousMousePosition = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const onTouchStart = (e) => {
      isDragging = true;
      setIsRotating(false);
      previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    const onTouchMove = (e) => {
      if (isDragging) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;

        rotationVelocity.x = deltaY * 0.005;
        rotationVelocity.y = deltaX * 0.005;

        scene.rotation.y += rotationVelocity.y;
        scene.rotation.x += rotationVelocity.x;

        previousMousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
      }
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('touchstart', onTouchStart);
    renderer.domElement.addEventListener('touchend', onMouseUp);
    renderer.domElement.addEventListener('touchmove', onTouchMove);

    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isRotating && !isDragging) {
        scene.rotation.y += 0.005;
      }

      if (!isDragging) {
        rotationVelocity.x *= 0.95;
        rotationVelocity.y *= 0.95;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.domElement.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('touchstart', onTouchStart);
      renderer.domElement.removeEventListener('touchend', onMouseUp);
      renderer.domElement.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(animationFrameId);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [graphData, highlightPath, isRotating]);

  return (
    <div className="w-full">
      <div ref={containerRef} className="w-full rounded-lg overflow-hidden" style={{ height: '400px' }} />
      <div className="mt-2 flex gap-2 items-center justify-center">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className="px-2 py-1 bg-accent/20 hover:bg-accent/30 text-accent rounded text-xs font-medium transition-colors"
        >
          {isRotating ? '⏸ Pause' : '▶ Auto Rotate'}
        </button>
        <span className="text-xs text-muted-foreground">Drag to rotate manually</span>
      </div>
    </div>
  );
};

const Experiment2 = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isGraphRunning, setIsGraphRunning] = useState(false);
  const [isAlgorithmRunning, setIsAlgorithmRunning] = useState(false);
  const [graphType, setGraphType] = useState('simple');
  const [numNodes, setNumNodes] = useState(5);
  const [sourceNode, setSourceNode] = useState('0');
  const [targetNode, setTargetNode] = useState('1');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('dijkstra');
  const [graphData, setGraphData] = useState(null);
  const [algorithmResult, setAlgorithmResult] = useState(null);
  const [customNodes, setCustomNodes] = useState(['0', '1', '2']);
  const [customEdges, setCustomEdges] = useState([{ from: '0', to: '1', weight: 5 }]);
  const [newNodeId, setNewNodeId] = useState('');
  const [newEdge, setNewEdge] = useState({ from: '', to: '', weight: 1 });
  const [isCustomMode, setIsCustomMode] = useState(false);
  
  // 2D Canvas Editor State
  const customCanvasRef = useRef(null);
  const [customMode, setCustomMode] = useState('addNode'); // 'addNode', 'addEdge', 'select', 'delete'
  const [customNodePositions, setCustomNodePositions] = useState({
    '0': { x: 150, y: 200 },
    '1': { x: 350, y: 200 },
    '2': { x: 250, y: 150 }
  });
  const [canvasZoom, setCanvasZoom] = useState(1);
  const [isDraggingNode, setIsDraggingNode] = useState(false);
  const [draggedNode, setDraggedNode] = useState(null);
  const [isCreatingEdge, setIsCreatingEdge] = useState(false);
  const [edgeStartNode, setEdgeStartNode] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [showWeightDialog, setShowWeightDialog] = useState(false);
  const [pendingEdge, setPendingEdge] = useState(null);
  const [edgeWeight, setEdgeWeight] = useState('1');
  
  // Dijkstra algorithm states
  const [isSelectingNodes, setIsSelectingNodes] = useState(false);
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const [selectionMessage, setSelectionMessage] = useState('');
 
  const algorithms = [
    { id: 'dijkstra', name: 'Find shortest path using Dijkstra\'s algorithm', category: 'pathfinding' },
    { id: 'dfs', name: 'Depth-first search', category: 'traversal' },
    { id: 'bfs', name: 'Breadth-first search', category: 'traversal' },
    { id: 'all_shortest', name: 'Find all shortest paths between 2 vertices', category: 'pathfinding' },
    { id: 'all_shortest_from', name: 'Find all shortest paths from vertex', category: 'pathfinding' },
    { id: 'longest_path', name: 'Find the longest path', category: 'pathfinding' },
    { id: 'all_paths', name: 'Find all paths', category: 'pathfinding' },
    { id: 'eulerian_path', name: 'Find Eulerian path', category: 'special' },
    { id: 'eulerian_cycle', name: 'Find Eulerian cycle', category: 'special' },
    { id: 'hamiltonian_path', name: 'Find Hamiltonian path', category: 'special' },
    { id: 'hamiltonian_cycle', name: 'Find Hamiltonian cycle', category: 'special' },
    { id: 'floyd_warshall', name: 'Floyd–Warshall algorithm', category: 'pathfinding' },
    { id: 'mst', name: 'Search of minimum spanning tree', category: 'optimization' },
    { id: 'coloring', name: 'Graph coloring', category: 'optimization' },
    { id: 'arrange', name: 'Arrange the graph', category: 'layout' },
    { id: 'max_flow', name: 'Find Maximum flow', category: 'optimization' },
    { id: 'isomorphism', name: 'Check Graphs Isomorphism', category: 'analysis' },
    { id: 'max_independent', name: 'Max Independent Set', category: 'optimization' },
    { id: 'max_clique', name: 'Max Clique', category: 'optimization' },
    { id: 'radius_diameter', name: 'Search graph radius and diameter', category: 'analysis' },
    { id: 'vertex_degree', name: 'Calculate vertices degree', category: 'analysis' },
    { id: 'weight_visualization', name: 'Visualisation based on weight', category: 'visualization' },
    { id: 'connected_components', name: 'Find connected components', category: 'analysis' }
  ];

  const experimentSteps = [
    {
      title: "Aim",
      description: "To implement Graph Theory in Python using NetworkX library",
      content: "You will learn to generate weighted directed graphs and visualize them using matplotlib. This experiment focuses on understanding graph structures and implementing shortest path algorithms using the NetworkX library."
    },
    {
      title: "Objective",
      description: "Generate weighted directed graphs and find shortest paths",
      content: "The objective is to create different types of graphs (simple, multi, complete) and implement shortest path algorithms. You'll visualize graphs and understand the relationship between nodes and edges in graph theory."
    },
    {
      title: "Theory - Graph Basics",
      description: "Understanding the fundamental concepts of graph theory",
      content: "A Graph is a non-linear data structure consisting of vertices and edges. The vertices are sometimes also referred to as nodes and the edges are lines or arcs that connect any two nodes in the graph. More formally a Graph is composed of a set of vertices(V) and a set of edges(E). The graph is denoted by G(E, V)."
    },
    {
      title: "Types of Graphs",
      description: "Different classifications of graphs based on edges and structure",
      content: "Graphs can be directed or undirected, weighted or unweighted. Key types include Simple Graphs (no multiple edges between same vertices), Multi Graphs (multiple edges allowed), Complete Graphs (every vertex connected to every other), and Cliques (complete subgraphs)."
    },
    {
      title: "Graph Algorithms",
      description: "Essential algorithms for graph traversal and path finding",
      content: "Shortest path algorithms like Dijkstra's algorithm and Floyd-Warshall algorithm help find the minimum cost path between vertices. These algorithms are fundamental in network analysis, routing, and optimization problems."
    }
  ];

  const generateGraph = () => {
    setIsGraphRunning(true);
    
    // Simulate graph generation
    setTimeout(() => {
      const nodes = Array.from({ length: numNodes }, (_, i) => i.toString());
      const edges = [];
      
      // Generate edges based on graph type
      if (graphType === 'simple') {
        // Simple graph - each edge connects different vertices
        for (let i = 0; i < numNodes; i++) {
          for (let j = i + 1; j < numNodes; j++) {
            if (Math.random() < 0.4) { // 40% chance of edge
              edges.push({
                from: i.toString(),
                to: j.toString(),
                weight: Math.floor(Math.random() * 10) + 1
              });
            }
          }
        }
      } else if (graphType === 'complete') {
        // Complete graph - every vertex connected to every other
        for (let i = 0; i < numNodes; i++) {
          for (let j = i + 1; j < numNodes; j++) {
            edges.push({
              from: i.toString(),
              to: j.toString(),
              weight: Math.floor(Math.random() * 10) + 1
            });
          }
        }
      } else if (graphType === 'multi') {
        // Multi graph - multiple edges possible
        for (let i = 0; i < numNodes; i++) {
          for (let j = 0; j < numNodes; j++) {
            if (i !== j && Math.random() < 0.3) {
              const numEdges = Math.floor(Math.random() * 3) + 1; // 1-3 edges
              for (let k = 0; k < numEdges; k++) {
                edges.push({
                  from: i.toString(),
                  to: j.toString(),
                  weight: Math.floor(Math.random() * 10) + 1
                });
              }
            }
          }
        }
      }
      
      setGraphData({ nodes, edges, type: graphType });
      setIsGraphRunning(false);
    }, 2000);
  };

  const createCustomGraph = () => {
    console.log('Creating custom graph, enabling custom mode');
    setIsCustomMode(true);
    
    // Ensure nodes are consecutively numbered
    const renumberedNodes = customNodes.map((_, index) => index.toString());
    const nodeMapping = {};
    customNodes.forEach((oldNodeId, index) => {
      const newNodeId = index.toString();
      nodeMapping[oldNodeId] = newNodeId;
    });
    
    // Update edge references
    const renumberedEdges = customEdges.map(edge => ({
      ...edge,
      from: nodeMapping[edge.from] || edge.from,
      to: nodeMapping[edge.to] || edge.to
    }));
    
    setGraphData({ 
      nodes: renumberedNodes, 
      edges: renumberedEdges, 
      type: 'custom' 
    });
  };

  // 2D Canvas Drawing Functions
  const drawCustomCanvas = () => {
    const canvas = customCanvasRef.current;
    if (!canvas) return;
    
    // Ensure canvas has correct size
    if (canvas.width !== 600 || canvas.height !== 400) {
      console.log('Fixing canvas size from', canvas.width, 'x', canvas.height, 'to 600 x 400');
      canvas.width = 600;
      canvas.height = 400;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    console.log('Drawing with zoom:', canvasZoom, 'Nodes:', customNodes.length, 'Positions:', customNodePositions);
    
    // Draw background
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    const gridSize = 20;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    
    // Draw edges
    customEdges.forEach((edge, index) => {
      const fromPos = customNodePositions[edge.from];
      const toPos = customNodePositions[edge.to];
      console.log(`Drawing edge ${index}:`, { from: edge.from, to: edge.to, fromPos, toPos });
      if (fromPos && toPos) {
        // Apply zoom to edge positions
        const fromX = fromPos.x * canvasZoom;
        const fromY = fromPos.y * canvasZoom;
        const toX = toPos.x * canvasZoom;
        const toY = toPos.y * canvasZoom;
        
        console.log(`Edge ${index} zoomed positions:`, { fromX, fromY, toX, toY });
        
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2 * canvasZoom;
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
        
        // Draw weight
        const midX = (fromX + toX) / 2;
        const midY = (fromY + toY) / 2;
        ctx.fillStyle = '#000';
        ctx.fillRect(midX - 10 * canvasZoom, midY - 8 * canvasZoom, 20 * canvasZoom, 16 * canvasZoom);
        ctx.fillStyle = '#fff';
        ctx.font = `${12 * canvasZoom}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(edge.weight.toString(), midX, midY + 4 * canvasZoom);
        
        console.log(`Edge ${index} drawn successfully`);
      } else {
        console.log(`Edge ${index} missing positions!`);
      }
    });
    
    // Draw nodes
    console.log('Drawing nodes:', customNodes);
    console.log('Node positions:', customNodePositions);
    customNodes.forEach((nodeId) => {
      const pos = customNodePositions[nodeId];
      console.log(`Drawing node ${nodeId}:`, pos);
      if (pos) {
        const isSelected = draggedNode === nodeId;
        const isHovered = hoveredNode === nodeId;
        const isEdgeStart = edgeStartNode === nodeId;
        
        // Apply zoom to node position
        const zoomedX = pos.x * canvasZoom;
        const zoomedY = pos.y * canvasZoom;
        const nodeRadius = 20 * canvasZoom;
        
        console.log(`Node ${nodeId} zoomed position:`, { x: zoomedX, y: zoomedY, radius: nodeRadius });
        console.log(`Canvas bounds:`, { width: canvas.width, height: canvas.height });
        
        // Check if node is within canvas bounds
        if (zoomedX < 0 || zoomedX > canvas.width || zoomedY < 0 || zoomedY > canvas.height) {
          console.log(`Node ${nodeId} is outside canvas bounds!`);
        }
        
        // Node circle
        ctx.beginPath();
        ctx.arc(zoomedX, zoomedY, nodeRadius, 0, 2 * Math.PI);
        // Determine node color based on algorithm selection
        let nodeColor = '#3b82f6'; // Default blue
        if (isEdgeStart) {
          nodeColor = '#ff6b6b'; // Red for edge start
        } else if (isSelected) {
          nodeColor = '#4ecdc4'; // Cyan for selected
        } else if (isHovered) {
          nodeColor = '#ffa726'; // Orange for hovered
        } else if (customMode === 'delete') {
          nodeColor = '#ff4444'; // Red for delete mode
        } else if (selectedAlgorithm === 'dijkstra' && isSelectingNodes) {
          if (nodeId === startNode) {
            nodeColor = '#4ade80'; // Green for start node
          } else if (nodeId === endNode) {
            nodeColor = '#f87171'; // Red for end node
          } else {
            nodeColor = '#60a5fa'; // Light blue for selectable
          }
        }
        
        ctx.fillStyle = nodeColor;
        ctx.fill();
        ctx.strokeStyle = customMode === 'delete' ? '#ff0000' : '#fff';
        ctx.lineWidth = customMode === 'delete' ? 3 * canvasZoom : 2 * canvasZoom;
        ctx.stroke();
        
        // Node label
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${14 * canvasZoom}px Arial`;
        ctx.textAlign = 'center';
        console.log(`Drawing label for node ${nodeId}:`, nodeId);
        ctx.fillText(nodeId, zoomedX, zoomedY + 5 * canvasZoom);
        
        console.log(`Node ${nodeId} drawn successfully`);
      } else {
        console.log(`Node ${nodeId} has no position!`);
      }
    });
  };

  // Canvas Mouse Event Handlers - using useCallback to prevent recreation
  const handleCustomCanvasMouseDown = useCallback((event) => {
    const canvas = customCanvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / canvasZoom;
    const y = (event.clientY - rect.top) / canvasZoom;
    
    console.log('Mouse down at:', x, y, 'Mode:', customMode, 'Custom mode enabled:', isCustomMode);
    
    // Only process clicks if custom mode is enabled
    if (!isCustomMode) {
      console.log('Custom mode not enabled, ignoring click');
      return;
    }
    
    if (customMode === 'addNode') {
      // Add new node at clicked position
      console.log('Add node mode: clicking at', x, y);
      addNodeAtPosition(x, y);
    } else if (customMode === 'select') {
      // Check if clicking on existing node for algorithm selection
      const clickedNode = customNodes.find(nodeId => {
        const pos = customNodePositions[nodeId];
        if (!pos) return false;
        const dx = pos.x - x;
        const dy = pos.y - y;
        return Math.sqrt(dx * dx + dy * dy) <= 20 * canvasZoom;
      });
      
      if (clickedNode) {
        // Handle algorithm node selection
        handleAlgorithmNodeClick(clickedNode);
        
        // Also handle normal node dragging
        setDraggedNode(clickedNode);
        setIsDraggingNode(true);
      }
    } else if (customMode === 'delete') {
      // Find clicked node to delete
      const clickedNode = customNodes.find(nodeId => {
        const pos = customNodePositions[nodeId];
        if (!pos) return false;
        const dx = pos.x - x;
        const dy = pos.y - y;
        return Math.sqrt(dx * dx + dy * dy) <= 20 * canvasZoom;
      });
      
      if (clickedNode) {
        console.log('Deleting node:', clickedNode);
        // Remove node from nodes array
        setCustomNodes(prev => prev.filter(id => id !== clickedNode));
        // Remove node from positions
        setCustomNodePositions(prev => {
          const newPositions = { ...prev };
          delete newPositions[clickedNode];
          return newPositions;
        });
        // Remove any edges connected to this node
        setCustomEdges(prev => prev.filter(edge => 
          edge.from !== clickedNode && edge.to !== clickedNode
        ));
      }
    } else if (customMode === 'addEdge') {
      // Find clicked node
      const clickedNode = customNodes.find(nodeId => {
        const pos = customNodePositions[nodeId];
        if (!pos) return false;
        const dx = pos.x - x;
        const dy = pos.y - y;
        return Math.sqrt(dx * dx + dy * dy) <= 20 * canvasZoom;
      });
      
      if (clickedNode) {
        if (!isCreatingEdge) {
          setEdgeStartNode(clickedNode);
          setIsCreatingEdge(true);
        } else {
          if (clickedNode !== edgeStartNode) {
            // Show weight dialog
            setPendingEdge({ from: edgeStartNode, to: clickedNode });
            setEdgeWeight('1');
            setShowWeightDialog(true);
            setIsCreatingEdge(false);
            setEdgeStartNode(null);
          }
        }
      }
    } else if (customMode === 'select') {
      // Find clicked node for dragging
      const clickedNode = customNodes.find(nodeId => {
        const pos = customNodePositions[nodeId];
        if (!pos) return false;
        const dx = pos.x - x;
        const dy = pos.y - y;
        return Math.sqrt(dx * dx + dy * dy) <= 20 * canvasZoom;
      });
      
      if (clickedNode) {
        setDraggedNode(clickedNode);
        setIsDraggingNode(true);
      }
    }
  }, [customMode, customNodes, customNodePositions, isCreatingEdge, edgeStartNode, canvasZoom, isCustomMode]);

  const handleCustomCanvasMouseMove = useCallback((event) => {
    const canvas = customCanvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / canvasZoom;
    const y = (event.clientY - rect.top) / canvasZoom;
    
    if (isDraggingNode && draggedNode) {
      // Update node position
      setCustomNodePositions(prev => ({
        ...prev,
        [draggedNode]: { x, y }
      }));
    } else {
      // Check for hover
      const hovered = customNodes.find(nodeId => {
        const pos = customNodePositions[nodeId];
        if (!pos) return false;
        const dx = pos.x - x;
        const dy = pos.y - y;
        return Math.sqrt(dx * dx + dy * dy) <= 20 * canvasZoom;
      });
      setHoveredNode(hovered);
    }
  }, [isDraggingNode, draggedNode, customNodes, customNodePositions, canvasZoom]);

  const handleCustomCanvasMouseUp = useCallback(() => {
    setIsDraggingNode(false);
    setDraggedNode(null);
  }, []);

  // Clear custom graph
  const clearCustomGraph = () => {
    console.log('Clearing custom graph');
    setCustomNodes([]);
    setCustomEdges([]);
    setCustomNodePositions({} as any);
    setEdgeStartNode(null);
    setIsCreatingEdge(false);
    setDraggedNode(null);
    setIsDraggingNode(false);
    setHoveredNode(null);
    
    // Clear the graph data to hide 3D visualization
    setGraphData(null);
    
    // Force redraw after clearing
    setTimeout(() => {
      drawCustomCanvas();
    }, 50);
  };

  // Ensure all nodes are visible on canvas
  const ensureNodesVisible = () => {
    const canvas = customCanvasRef.current;
    if (!canvas) return;
    
    const canvasWidth = 600;
    const canvasHeight = 400;
    const margin = 50; // Keep nodes within margin
    
    const updatedPositions = { ...customNodePositions };
    let needsUpdate = false;
    
    customNodes.forEach(nodeId => {
      const pos = updatedPositions[nodeId];
      if (pos) {
        // Check if node is outside canvas bounds
        if (pos.x < margin || pos.x > canvasWidth - margin || 
            pos.y < margin || pos.y > canvasHeight - margin) {
          console.log(`Moving node ${nodeId} from (${pos.x}, ${pos.y}) to visible area`);
          // Move to a random position within bounds
          updatedPositions[nodeId] = {
            x: Math.random() * (canvasWidth - 2 * margin) + margin,
            y: Math.random() * (canvasHeight - 2 * margin) + margin
          };
          needsUpdate = true;
        }
      }
    });
    
    if (needsUpdate) {
      setCustomNodePositions(updatedPositions);
    }
  };

  const addNode = () => {
    if (newNodeId && !customNodes.includes(newNodeId)) {
      setCustomNodes([...customNodes, newNodeId]);
      setNewNodeId('');
    }
  };

  // Add node at clicked position (for canvas clicks)
  const addNodeAtPosition = (x, y) => {
    // Find the next available consecutive number
    let nextId = 0;
    while (customNodes.includes(nextId.toString())) {
      nextId++;
    }
    const nodeId = nextId.toString();
    
    console.log('Adding node at position:', x, y, 'with ID:', nodeId);
    setCustomNodes(prev => [...prev, nodeId]);
    setCustomNodePositions(prev => ({
      ...prev,
      [nodeId]: { x, y }
    }));
  };

  const handleWeightSubmit = () => {
    if (pendingEdge && edgeWeight && !isNaN(parseInt(edgeWeight))) {
      setCustomEdges(prev => [...prev, {
        from: pendingEdge.from,
        to: pendingEdge.to,
        weight: parseInt(edgeWeight)
      }]);
    }
    setShowWeightDialog(false);
    setPendingEdge(null);
    setEdgeWeight('1');
  };

  const handleWeightCancel = () => {
    setShowWeightDialog(false);
    setPendingEdge(null);
    setEdgeWeight('1');
  };


  // Run Dijkstra algorithm
  const runDijkstra = () => {
    if (!startNode || !endNode) {
      setSelectionMessage('Please select both start and end nodes');
      return;
    }
    
    if (startNode === endNode) {
      setSelectionMessage('Start and end nodes must be different');
      return;
    }
    
    if (!graphData) {
      setSelectionMessage('Please create a graph first');
      return;
    }
    
    setIsAlgorithmRunning(true);
    
    // Simulate algorithm execution
    setTimeout(() => {
      const graph = convertGraphDataToAdjacencyList(graphData);
      const result = dijkstra(graph, startNode, endNode);
      
      setAlgorithmResult({
        algorithm: 'dijkstra',
        path: result.path,
        distance: result.distance,
        visited: result.visited,
        distances: result.distances,
        startNode,
        endNode,
        description: 'Shortest path using Dijkstra\'s algorithm'
      });
      
      setSelectionMessage(`Shortest path found: ${result.distance} units`);
      setIsAlgorithmRunning(false);
    }, 1000);
  };

  // Handle algorithm selection
  const handleAlgorithmSelect = (algorithmId) => {
    setSelectedAlgorithm(algorithmId);
    setAlgorithmResult(null);
    
    if (algorithmId === 'dijkstra') {
      setStartNode(null);
      setEndNode(null);
      setSelectionMessage('Select start and end nodes from dropdowns below');
    } else if (algorithmId === 'all_shortest' || algorithmId === 'longest_path' || algorithmId === 'all_paths') {
      setStartNode(null);
      setEndNode(null);
      setSelectionMessage('Select start and end nodes from dropdowns below');
    } else if (algorithmId === 'all_shortest_from') {
      setStartNode(null);
      setEndNode(null);
      setSelectionMessage('Select start node from dropdown below');
    } else {
      setSelectionMessage('');
    }
  };

  // Handle node click for algorithm selection
  const handleAlgorithmNodeClick = (nodeId) => {
    if (selectedAlgorithm === 'dijkstra' && isSelectingNodes) {
      if (!startNode) {
        setStartNode(nodeId);
        setSelectionMessage(`Start node: ${nodeId}. Click end node.`);
      } else if (!endNode) {
        setEndNode(nodeId);
        setSelectionMessage(`End node: ${nodeId}. Click "Run Algorithm" to find shortest path.`);
      }
    }
  };

  const removeNode = (nodeId) => {
    const nodeIndex = customNodes.indexOf(nodeId);
    if (nodeIndex === -1) return;
    
    // Remove the node
    const newNodes = customNodes.filter(n => n !== nodeId);
    
    // Remove edges connected to this node
    const newEdges = customEdges.filter(e => e.from !== nodeId && e.to !== nodeId);
    
    // Renumber remaining nodes to be consecutive starting from 0
    const nodeMapping = {};
    newNodes.forEach((oldNodeId, index) => {
      const newNodeId = index.toString();
      nodeMapping[oldNodeId] = newNodeId;
    });
    
    // Update node IDs
    const renumberedNodes = newNodes.map((_, index) => index.toString());
    
    // Update edge references to use new node IDs
    const renumberedEdges = newEdges.map(edge => ({
      ...edge,
      from: nodeMapping[edge.from] || edge.from,
      to: nodeMapping[edge.to] || edge.to
    }));
    
    // Update positions with new node IDs
    const newPositions: { [key: string]: { x: number; y: number } } = {};
    newNodes.forEach((oldNodeId, index) => {
      const newNodeId = index.toString();
      newPositions[newNodeId] = customNodePositions[oldNodeId];
    });
    
    setCustomNodes(renumberedNodes);
    setCustomEdges(renumberedEdges);
    setCustomNodePositions(newPositions as any);
  };

  const addEdge = () => {
    if (newEdge.from && newEdge.to && newEdge.from !== newEdge.to) {
      const edgeExists = customEdges.some(e => 
        (e.from === newEdge.from && e.to === newEdge.to) ||
        (e.from === newEdge.to && e.to === newEdge.from)
      );
      
      if (!edgeExists) {
        setCustomEdges([...customEdges, { ...newEdge }]);
        setNewEdge({ from: '', to: '', weight: 1 });
      }
    }
  };

  const removeEdge = (index) => {
    setCustomEdges(customEdges.filter((_, i) => i !== index));
  };

  const executeAlgorithm = () => {
    if (!graphData) return;
    
    setIsAlgorithmRunning(true);
    
    // Simulate algorithm execution
    setTimeout(() => {
      let result = null;
      
      switch (selectedAlgorithm) {
        case 'dijkstra':
          result = {
            type: 'path',
            path: [sourceNode, targetNode],
            cost: Math.floor(Math.random() * 20) + 5,
            description: 'Shortest path using Dijkstra\'s algorithm'
          };
          break;
        case 'dfs':
          const dfsGraph = {};
          graphData.nodes.forEach(node => {
            dfsGraph[node] = [];
          });
          graphData.edges.forEach(edge => {
            if (!dfsGraph[edge.from]) dfsGraph[edge.from] = [];
            if (!dfsGraph[edge.to]) dfsGraph[edge.to] = [];
            dfsGraph[edge.from].push(edge.to);
            dfsGraph[edge.to].push(edge.from);
          });
          const dfsResult = dfs(dfsGraph, sourceNode);
          result = {
            type: 'traversal',
            visited: dfsResult,
            description: 'Depth-first search traversal order'
          };
          break;
        case 'bfs':
          const bfsGraph = {};
          graphData.nodes.forEach(node => {
            bfsGraph[node] = [];
          });
          graphData.edges.forEach(edge => {
            if (!bfsGraph[edge.from]) bfsGraph[edge.from] = [];
            if (!bfsGraph[edge.to]) bfsGraph[edge.to] = [];
            bfsGraph[edge.from].push(edge.to);
            bfsGraph[edge.to].push(edge.from);
          });
          const bfsResult = bfs(bfsGraph, sourceNode);
          result = {
            type: 'traversal',
            visited: bfsResult,
            description: 'Breadth-first search traversal order'
          };
          break;
        case 'all_shortest':
          const allShortestGraph = {};
          graphData.nodes.forEach(node => {
            allShortestGraph[node] = [];
          });
          graphData.edges.forEach(edge => {
            if (!allShortestGraph[edge.from]) allShortestGraph[edge.from] = [];
            if (!allShortestGraph[edge.to]) allShortestGraph[edge.to] = [];
            allShortestGraph[edge.from].push(edge.to);
            allShortestGraph[edge.to].push(edge.from);
          });
          const allShortestPathsResult = findAllShortestPaths(allShortestGraph, startNode, endNode);
          result = {
            type: 'paths',
            paths: allShortestPathsResult,
            description: `All shortest paths between ${startNode} and ${endNode}`
          };
          break;
        case 'all_shortest_from':
          const allShortestFromGraph = {};
          graphData.nodes.forEach(node => {
            allShortestFromGraph[node] = [];
          });
          graphData.edges.forEach(edge => {
            if (!allShortestFromGraph[edge.from]) allShortestFromGraph[edge.from] = [];
            if (!allShortestFromGraph[edge.to]) allShortestFromGraph[edge.to] = [];
            allShortestFromGraph[edge.from].push(edge.to);
            allShortestFromGraph[edge.to].push(edge.from);
          });
          const allShortestFromResult = findAllShortestPathsFromVertex(allShortestFromGraph, startNode);
          result = {
            type: 'all_shortest_from',
            paths: allShortestFromResult,
            description: `All shortest paths from vertex ${startNode}`
          };
          break;
        case 'longest_path':
          const longestPathGraph = {};
          graphData.nodes.forEach(node => {
            longestPathGraph[node] = [];
          });
          graphData.edges.forEach(edge => {
            if (!longestPathGraph[edge.from]) longestPathGraph[edge.from] = [];
            if (!longestPathGraph[edge.to]) longestPathGraph[edge.to] = [];
            longestPathGraph[edge.from].push(edge.to);
            longestPathGraph[edge.to].push(edge.from);
          });
          const longestPathResult = findLongestPath(longestPathGraph, startNode, endNode);
          result = {
            type: 'longest_path',
            path: longestPathResult.path,
            length: longestPathResult.length,
            description: `Longest path from ${startNode} to ${endNode}`
          };
          break;
        case 'all_paths':
          const allPathsGraph = {};
          graphData.nodes.forEach(node => {
            allPathsGraph[node] = [];
          });
          graphData.edges.forEach(edge => {
            if (!allPathsGraph[edge.from]) allPathsGraph[edge.from] = [];
            if (!allPathsGraph[edge.to]) allPathsGraph[edge.to] = [];
            allPathsGraph[edge.from].push(edge.to);
            allPathsGraph[edge.to].push(edge.from);
          });
          const allPathsResult = findAllPossiblePaths(allPathsGraph, startNode, endNode);
          result = {
            type: 'all_paths',
            paths: allPathsResult,
            description: `All possible paths from ${startNode} to ${endNode}`
          };
          break;
        case 'eulerian_path':
          const eulerianPathGraph = {};
          graphData.nodes.forEach(node => {
            eulerianPathGraph[node] = [];
          });
          graphData.edges.forEach(edge => {
            if (!eulerianPathGraph[edge.from]) eulerianPathGraph[edge.from] = [];
            if (!eulerianPathGraph[edge.to]) eulerianPathGraph[edge.to] = [];
            eulerianPathGraph[edge.from].push(edge.to);
            eulerianPathGraph[edge.to].push(edge.from);
          });
          const eulerianPathResult = findEulerianPath(eulerianPathGraph);
          result = {
            type: 'eulerian_path',
            path: eulerianPathResult.path,
            hasPath: eulerianPathResult.hasPath,
            description: eulerianPathResult.hasPath ? 'Eulerian path found' : 'No Eulerian path exists'
          };
          break;
        case 'eulerian_cycle':
          const eulerianCycleGraph = {};
          graphData.nodes.forEach(node => {
            eulerianCycleGraph[node] = [];
          });
          graphData.edges.forEach(edge => {
            if (!eulerianCycleGraph[edge.from]) eulerianCycleGraph[edge.from] = [];
            if (!eulerianCycleGraph[edge.to]) eulerianCycleGraph[edge.to] = [];
            eulerianCycleGraph[edge.from].push(edge.to);
            eulerianCycleGraph[edge.to].push(edge.from);
          });
          const eulerianCycleResult = findEulerianCycle(eulerianCycleGraph);
          result = {
            type: 'eulerian_cycle',
            path: eulerianCycleResult.path,
            hasCycle: eulerianCycleResult.hasCycle,
            description: eulerianCycleResult.hasCycle ? 'Eulerian cycle found' : 'No Eulerian cycle exists'
          };
          break;
        case 'hamiltonian_path':
          const hamiltonianPathGraph = {};
          graphData.nodes.forEach(node => {
            hamiltonianPathGraph[node] = [];
          });
          graphData.edges.forEach(edge => {
            if (!hamiltonianPathGraph[edge.from]) hamiltonianPathGraph[edge.from] = [];
            if (!hamiltonianPathGraph[edge.to]) hamiltonianPathGraph[edge.to] = [];
            hamiltonianPathGraph[edge.from].push(edge.to);
            hamiltonianPathGraph[edge.to].push(edge.from);
          });
          const hamiltonianPathResult = findHamiltonianPath(hamiltonianPathGraph);
          result = {
            type: 'hamiltonian_path',
            path: hamiltonianPathResult.path,
            hasPath: hamiltonianPathResult.hasPath,
            description: hamiltonianPathResult.hasPath ? 'Hamiltonian path found' : 'No Hamiltonian path exists'
          };
          break;
        case 'hamiltonian_cycle':
          const hamiltonianCycleGraph = {};
          graphData.nodes.forEach(node => {
            hamiltonianCycleGraph[node] = [];
          });
          graphData.edges.forEach(edge => {
            if (!hamiltonianCycleGraph[edge.from]) hamiltonianCycleGraph[edge.from] = [];
            if (!hamiltonianCycleGraph[edge.to]) hamiltonianCycleGraph[edge.to] = [];
            hamiltonianCycleGraph[edge.from].push(edge.to);
            hamiltonianCycleGraph[edge.to].push(edge.from);
          });
          const hamiltonianCycleResult = findHamiltonianCycle(hamiltonianCycleGraph);
          result = {
            type: 'hamiltonian_cycle',
            path: hamiltonianCycleResult.path,
            hasCycle: hamiltonianCycleResult.hasCycle,
            description: hamiltonianCycleResult.hasCycle ? 'Hamiltonian cycle found' : 'No Hamiltonian cycle exists'
          };
          break;
        case 'floyd_warshall':
          const floydGraph = {};
          const floydWeights: { [key: string]: { [key: string]: number } } = {};
          graphData.nodes.forEach(node => {
            floydGraph[node] = [];
            floydWeights[node] = {};
          });
          graphData.edges.forEach(edge => {
            if (!floydGraph[edge.from]) floydGraph[edge.from] = [];
            if (!floydGraph[edge.to]) floydGraph[edge.to] = [];
            floydGraph[edge.from].push(edge.to);
            floydGraph[edge.to].push(edge.from);
            floydWeights[edge.from][edge.to] = edge.weight;
            floydWeights[edge.to][edge.from] = edge.weight;
          });
          const floydResult = floydWarshall(floydGraph, floydWeights);
          result = {
            type: 'floyd_warshall',
            distances: floydResult.distances,
            matrix: floydResult.matrix,
            next: floydResult.next,
            description: 'Floyd-Warshall algorithm - shortest paths between all pairs'
          };
          break;
        case 'mst':
          const mstGraph = {};
          const mstWeights: { [key: string]: { [key: string]: number } } = {};
          graphData.nodes.forEach(node => {
            mstGraph[node] = [];
            mstWeights[node] = {};
          });
          graphData.edges.forEach(edge => {
            if (!mstGraph[edge.from]) mstGraph[edge.from] = [];
            if (!mstGraph[edge.to]) mstGraph[edge.to] = [];
            mstGraph[edge.from].push(edge.to);
            mstGraph[edge.to].push(edge.from);
            mstWeights[edge.from][edge.to] = edge.weight;
            mstWeights[edge.to][edge.from] = edge.weight;
          });
          const mstResult = findMinimumSpanningTree(mstGraph, mstWeights);
          result = {
            type: 'mst',
            edges: mstResult.edges,
            totalWeight: mstResult.totalWeight,
            isConnected: mstResult.isConnected,
            description: mstResult.isConnected ? 'Minimum spanning tree found' : 'Graph is not connected'
          };
          break;
        case 'coloring':
          const coloringGraph = {};
          graphData.nodes.forEach(node => {
            coloringGraph[node] = [];
          });
          graphData.edges.forEach(edge => {
            if (!coloringGraph[edge.from]) coloringGraph[edge.from] = [];
            if (!coloringGraph[edge.to]) coloringGraph[edge.to] = [];
            coloringGraph[edge.from].push(edge.to);
            coloringGraph[edge.to].push(edge.from);
          });
          const coloringResult = graphColoring(coloringGraph);
          result = {
            type: 'coloring',
            colors: coloringResult.colors,
            chromaticNumber: coloringResult.chromaticNumber,
            description: `Graph coloring with ${coloringResult.chromaticNumber} colors`
          };
          break;
        case 'vertex_degree':
          const degreeGraph = {};
          graphData.nodes.forEach(node => {
            degreeGraph[node] = [];
          });
          graphData.edges.forEach(edge => {
            if (!degreeGraph[edge.from]) degreeGraph[edge.from] = [];
            if (!degreeGraph[edge.to]) degreeGraph[edge.to] = [];
            degreeGraph[edge.from].push(edge.to);
            degreeGraph[edge.to].push(edge.from);
          });
          const degrees = calculateVertexDegrees(degreeGraph);
          result = {
            type: 'degrees',
            degrees: Object.entries(degrees).map(([node, degree]) => ({
              node,
              degree
            })),
            description: 'Vertex degrees in the graph'
          };
          break;
        case 'connected_components':
          const ccGraph = {};
          graphData.nodes.forEach(node => {
            ccGraph[node] = [];
          });
          graphData.edges.forEach(edge => {
            if (!ccGraph[edge.from]) ccGraph[edge.from] = [];
            if (!ccGraph[edge.to]) ccGraph[edge.to] = [];
            ccGraph[edge.from].push(edge.to);
            ccGraph[edge.to].push(edge.from);
          });
          const components = findConnectedComponents(ccGraph);
          result = {
            type: 'components',
            components: components,
            count: components.length,
            description: 'Connected components in the graph'
          };
          break;
        case 'max_flow':
          const maxFlowGraph = {};
          const maxFlowCapacities: { [key: string]: { [key: string]: number } } = {};
          graphData.nodes.forEach(node => {
            maxFlowGraph[node] = [];
            maxFlowCapacities[node] = {};
          });
          graphData.edges.forEach(edge => {
            if (!maxFlowGraph[edge.from]) maxFlowGraph[edge.from] = [];
            if (!maxFlowGraph[edge.to]) maxFlowGraph[edge.to] = [];
            maxFlowGraph[edge.from].push(edge.to);
            maxFlowCapacities[edge.from][edge.to] = edge.weight;
          });
          const maxFlowResult = findMaximumFlow(maxFlowGraph, startNode, endNode, maxFlowCapacities);
          result = {
            type: 'max_flow',
            maxFlow: maxFlowResult.maxFlow,
            flow: maxFlowResult.flow,
            isConnected: maxFlowResult.isConnected,
            description: `Maximum flow from ${startNode} to ${endNode}: ${maxFlowResult.maxFlow}`
          };
          break;
        case 'isomorphism':
          const isomorphismGraph1 = {};
          const isomorphismGraph2 = {};
          graphData.nodes.forEach(node => {
            isomorphismGraph1[node] = [];
            isomorphismGraph2[node] = [];
          });
          graphData.edges.forEach(edge => {
            if (!isomorphismGraph1[edge.from]) isomorphismGraph1[edge.from] = [];
            if (!isomorphismGraph1[edge.to]) isomorphismGraph1[edge.to] = [];
            isomorphismGraph1[edge.from].push(edge.to);
            isomorphismGraph1[edge.to].push(edge.from);
          });
          // Create a slightly modified version for comparison
          const modifiedNodes = [...graphData.nodes];
          const modifiedEdges = [...graphData.edges];
          modifiedNodes.forEach(node => {
            isomorphismGraph2[node] = [];
          });
          modifiedEdges.forEach(edge => {
            if (!isomorphismGraph2[edge.from]) isomorphismGraph2[edge.from] = [];
            if (!isomorphismGraph2[edge.to]) isomorphismGraph2[edge.to] = [];
            isomorphismGraph2[edge.from].push(edge.to);
            isomorphismGraph2[edge.to].push(edge.from);
          });
          const isomorphismResult = checkGraphIsomorphism(isomorphismGraph1, isomorphismGraph2);
          result = {
            type: 'isomorphism',
            isIsomorphic: isomorphismResult.isIsomorphic,
            mapping: isomorphismResult.mapping,
            description: isomorphismResult.isIsomorphic ? 'Graphs are isomorphic' : 'Graphs are not isomorphic'
          };
          break;
        case 'max_independent':
          const maxIndependentGraph = {};
          graphData.nodes.forEach(node => {
            maxIndependentGraph[node] = [];
          });
          graphData.edges.forEach(edge => {
            if (!maxIndependentGraph[edge.from]) maxIndependentGraph[edge.from] = [];
            if (!maxIndependentGraph[edge.to]) maxIndependentGraph[edge.to] = [];
            maxIndependentGraph[edge.from].push(edge.to);
            maxIndependentGraph[edge.to].push(edge.from);
          });
          const maxIndependentResult = findMaximumIndependentSet(maxIndependentGraph);
          result = {
            type: 'max_independent',
            independentSet: maxIndependentResult.independentSet,
            size: maxIndependentResult.size,
            description: `Maximum independent set of size ${maxIndependentResult.size}`
          };
          break;
        case 'max_clique':
          const maxCliqueGraph = {};
          graphData.nodes.forEach(node => {
            maxCliqueGraph[node] = [];
          });
          graphData.edges.forEach(edge => {
            if (!maxCliqueGraph[edge.from]) maxCliqueGraph[edge.from] = [];
            if (!maxCliqueGraph[edge.to]) maxCliqueGraph[edge.to] = [];
            maxCliqueGraph[edge.from].push(edge.to);
            maxCliqueGraph[edge.to].push(edge.from);
          });
          const maxCliqueResult = findMaximumClique(maxCliqueGraph);
          result = {
            type: 'max_clique',
            clique: maxCliqueResult.clique,
            size: maxCliqueResult.size,
            description: `Maximum clique of size ${maxCliqueResult.size}`
          };
          break;
        case 'radius_diameter':
          const radiusDiameterGraph = {};
          graphData.nodes.forEach(node => {
            radiusDiameterGraph[node] = [];
          });
          graphData.edges.forEach(edge => {
            if (!radiusDiameterGraph[edge.from]) radiusDiameterGraph[edge.from] = [];
            if (!radiusDiameterGraph[edge.to]) radiusDiameterGraph[edge.to] = [];
            radiusDiameterGraph[edge.from].push(edge.to);
            radiusDiameterGraph[edge.to].push(edge.from);
          });
          const radiusDiameterResult = findRadiusAndDiameter(radiusDiameterGraph);
          result = {
            type: 'radius_diameter',
            radius: radiusDiameterResult.radius,
            diameter: radiusDiameterResult.diameter,
            center: radiusDiameterResult.center,
            peripheral: radiusDiameterResult.peripheral,
            description: `Graph radius: ${radiusDiameterResult.radius}, diameter: ${radiusDiameterResult.diameter}`
          };
          break;
        case 'weight_visualization':
          const visualizationGraph = {};
          const visualizationWeights: { [key: string]: { [key: string]: number } } = {};
          graphData.nodes.forEach(node => {
            visualizationGraph[node] = [];
            visualizationWeights[node] = {};
          });
          graphData.edges.forEach(edge => {
            if (!visualizationGraph[edge.from]) visualizationGraph[edge.from] = [];
            if (!visualizationGraph[edge.to]) visualizationGraph[edge.to] = [];
            visualizationGraph[edge.from].push(edge.to);
            visualizationGraph[edge.to].push(edge.from);
            visualizationWeights[edge.from][edge.to] = edge.weight;
            visualizationWeights[edge.to][edge.from] = edge.weight;
          });
          const visualizationResult = createWeightBasedVisualization(visualizationGraph, visualizationWeights);
          result = {
            type: 'weight_visualization',
            nodeSizes: visualizationResult.nodeSizes,
            edgeWidths: visualizationResult.edgeWidths,
            description: 'Graph visualization based on weights'
          };
          break;
        case 'arrange':
          // Graph arrangement - create a simple layout
          const arrangeGraph = {};
          graphData.nodes.forEach(node => {
            arrangeGraph[node] = [];
          });
          graphData.edges.forEach(edge => {
            if (!arrangeGraph[edge.from]) arrangeGraph[edge.from] = [];
            if (!arrangeGraph[edge.to]) arrangeGraph[edge.to] = [];
            arrangeGraph[edge.from].push(edge.to);
            arrangeGraph[edge.to].push(edge.from);
          });
          
          // Simple circular arrangement
          const nodeCount = graphData.nodes.length;
          const radius = Math.max(100, nodeCount * 20);
          const arrangedPositions: { [key: string]: { x: number; y: number } } = {};
          
          graphData.nodes.forEach((node, index) => {
            const angle = (index / nodeCount) * 2 * Math.PI;
            arrangedPositions[node] = {
              x: Math.cos(angle) * radius + 300, // Center at 300, 200
              y: Math.sin(angle) * radius + 200
            };
          });
          
          result = {
            type: 'arrange',
            positions: arrangedPositions,
            description: `Graph arranged in circular layout with ${nodeCount} nodes`
          };
          break;
        default:
          result = {
            type: 'general',
            data: 'Algorithm executed successfully',
            description: algorithms.find(a => a.id === selectedAlgorithm)?.name || 'Algorithm'
          };
      }
      
      setAlgorithmResult(result);
      setIsAlgorithmRunning(false);
    }, 2000);
  };

  const resetExperiment = () => {
    setGraphData(null);
    setAlgorithmResult(null);
    setCurrentStep(0);
    setIsRunning(false);
    setIsGraphRunning(false);
    setIsAlgorithmRunning(false);
    setCustomNodes(['0', '1', '2']);
    setCustomEdges([{ from: '0', to: '1', weight: 5 }]);
    setNewNodeId('');
    setNewEdge({ from: '', to: '', weight: 1 });
    setIsCustomMode(false);
    clearCustomGraph();
  };

  // Initialize 2D canvas
  useEffect(() => {
    const canvas = customCanvasRef.current;
    if (!canvas) return;
    
    // Set canvas size FIRST, before getting context
    canvas.width = 600;
    canvas.height = 400;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    console.log('Canvas initialized with size:', canvas.width, 'x', canvas.height);
    
    // Add event listeners
    canvas.addEventListener('mousedown', handleCustomCanvasMouseDown);
    canvas.addEventListener('mousemove', handleCustomCanvasMouseMove);
    canvas.addEventListener('mouseup', handleCustomCanvasMouseUp);
    
    // Force initial draw with proper zoom
    setCanvasZoom(1);
    setTimeout(() => {
      drawCustomCanvas();
    }, 50);
    
    return () => {
      canvas.removeEventListener('mousedown', handleCustomCanvasMouseDown);
      canvas.removeEventListener('mousemove', handleCustomCanvasMouseMove);
      canvas.removeEventListener('mouseup', handleCustomCanvasMouseUp);
    };
  }, [handleCustomCanvasMouseDown, handleCustomCanvasMouseMove, handleCustomCanvasMouseUp]);

  // Redraw canvas when nodes or edges change
  useEffect(() => {
    console.log('Redrawing canvas with zoom:', canvasZoom);
    drawCustomCanvas();
  }, [customNodes, customEdges, customNodePositions, canvasZoom]);

  // Force redraw when custom mode is enabled
  useEffect(() => {
    if (isCustomMode) {
      // Reset zoom to 100% and redraw
      setCanvasZoom(1);
      setTimeout(() => {
        drawCustomCanvas();
      }, 100);
    }
  }, [isCustomMode]);

  // Force initial redraw when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Force initial redraw');
      drawCustomCanvas();
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      
      <main className="flex-grow page-container">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/experiments")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Experiments
            </Button>
            <Badge variant="secondary">Experiment 2</Badge>
          </div>
          
          <h1 className="text-4xl font-bold mb-2">Graph Theory Implementation</h1>
          <p className="text-lg text-muted-foreground">
            Implement graph theory using NetworkX library and visualize graphs with matplotlib
          </p>
        </div>

        <Tabs defaultValue="theory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="theory" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Theory
            </TabsTrigger>
            <TabsTrigger value="simulation" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Simulation
            </TabsTrigger>
            <TabsTrigger value="implementation" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Implementation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="theory" className="space-y-6">
            <Card className="w-full max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Experiment Theory
                </CardTitle>
                <CardDescription>
                  Follow the theoretical concepts to understand graph theory implementation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {experimentSteps.map((step, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                        currentStep === index
                          ? "border-primary bg-primary/5"
                          : "border-muted hover:border-primary/50"
                      }`}
                      onClick={() => setCurrentStep(index)}
                    >
                      <h3 className="font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                      {currentStep === index && (
                        <p className="text-sm text-justify">{step.content}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="simulation" className="space-y-6">
            <Card className="w-full max-w-6xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="w-5 h-5" />
                  Graph Algorithms Simulation
                </CardTitle>
                <CardDescription>
                  Interactive graph generation and comprehensive algorithm execution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Graph Generation Mode Selection */}
                  <div className="p-4 rounded-lg border-2 border-muted hover:border-primary/50 transition-colors">
                    <h4 className="font-semibold mb-2">1. Choose Graph Creation Mode</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Select how you want to create your graph
                    </p>
                    <div className="flex gap-2 mb-4">
                      <Button
                        variant={!isCustomMode ? "default" : "outline"}
                        onClick={() => setIsCustomMode(false)}
                        className="flex-1"
                      >
                        Auto Generate
                      </Button>
                      <Button
                        variant={isCustomMode ? "default" : "outline"}
                        onClick={() => setIsCustomMode(true)}
                        className="flex-1"
                      >
                        Custom Graph
                      </Button>
                    </div>
                  </div>

                  {/* Auto Graph Generation */}
                  {!isCustomMode && (
                    <div className="p-4 rounded-lg border-2 border-muted hover:border-primary/50 transition-colors">
                      <h4 className="font-semibold mb-2">2. Generate Graph</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Create different types of graphs for algorithm testing
                      </p>
                    <div className="space-y-4">
                      <div className="flex gap-2 items-center">
                        <Select value={graphType} onValueChange={setGraphType} disabled={isGraphRunning}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="simple">Simple</SelectItem>
                            <SelectItem value="multi">Multi</SelectItem>
                            <SelectItem value="complete">Complete</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          value={numNodes}
                          onChange={(e) => setNumNodes(parseInt(e.target.value) || 3)}
                          min="3"
                          max="10"
                          className="w-20"
                          disabled={isGraphRunning}
                        />
                        <span className="text-sm text-muted-foreground">nodes</span>
                        <Button
                          onClick={generateGraph}
                          disabled={isGraphRunning}
                          className="flex-1"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {isGraphRunning ? "Generating..." : "Generate Graph"}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={resetExperiment}
                          disabled={isGraphRunning}
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      </div>

                      {isGraphRunning && (
                        <div className="flex flex-col items-center justify-center py-8">
                          <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center animate-pulse">
                            <Network className="w-12 h-12 text-primary" />
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">Generating graph...</p>
                        </div>
                      )}

                      {graphData && !isGraphRunning && (
                        <div className="space-y-4">
                          <h5 className="font-medium">Graph Generated:</h5>
                          <div className="p-3 bg-muted/30 rounded-lg">
                            <div className="text-sm">
                              <strong>Type:</strong> {graphData.type.charAt(0).toUpperCase() + graphData.type.slice(1)} Graph
                            </div>
                            <div className="text-sm">
                              <strong>Nodes:</strong> {graphData.nodes.length}
                            </div>
                            <div className="text-sm">
                              <strong>Edges:</strong> {graphData.edges.length}
                            </div>
                          </div>
                          <div className="text-sm">
                            <strong>Edges:</strong>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {graphData.edges.map((edge, index) => (
                                <Badge key={index} variant="outline">
                                  {edge.from}→{edge.to}({edge.weight})
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          {/* 3D Graph Visualization */}
                          <div className="mt-4">
                            <h6 className="font-medium mb-2">3D Graph Visualization:</h6>
                            <Graph3D 
                              graphData={graphData} 
                              highlightPath={algorithmResult?.type === 'path' ? algorithmResult.path : null}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  )}

                  {/* Custom Graph Creation */}
                  {isCustomMode && (
                    <div className="p-4 rounded-lg border-2 border-muted hover:border-primary/50 transition-colors">
                      <h4 className="font-semibold mb-2">2. Create Custom Graph</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Interactive 2D graph editor - click to add nodes, drag to create edges
                      </p>
                      
                      <div className="space-y-6">
                        {/* 2D Interactive Graph Editor */}
                        <div className="space-y-4">
                          <div className="flex gap-2 items-center">
                            <Button
                              variant={customMode === 'addNode' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => {
                                console.log('Switching to Add Node mode');
                                setCustomMode('addNode');
                              }}
                            >
                              Add Node
                            </Button>
                            <Button
                              variant={customMode === 'addEdge' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setCustomMode('addEdge')}
                            >
                              Add Edge
                            </Button>
                            <Button
                              variant={customMode === 'select' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setCustomMode('select')}
                            >
                              Select
                            </Button>
                            <Button
                              variant={customMode === 'delete' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setCustomMode('delete')}
                            >
                              Delete Node
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={clearCustomGraph}
                            >
                              Clear
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={ensureNodesVisible}
                            >
                              Show All Nodes
                            </Button>
                         
                          
                          <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newZoom = Math.max(0.5, canvasZoom - 0.2);
                                  console.log('Zoom out clicked, changing from', canvasZoom, 'to', newZoom);
                                  setCanvasZoom(newZoom);
                                }}
                              >
                                Zoom Out
                              </Button>
                              <span className="text-sm text-muted-foreground">
                                {Math.round(canvasZoom * 100)}%
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newZoom = Math.min(2, canvasZoom + 0.2);
                                  console.log('Zoom in clicked, changing from', canvasZoom, 'to', newZoom);
                                  setCanvasZoom(newZoom);
                                }}
                              >
                                Zoom In
                              </Button>
                            </div>
                          </div>
                          
                          {/* 2D Canvas */}
                          <div className="w-full rounded-lg overflow-hidden border-2 border-muted flex justify-center">
                            <canvas
                              ref={customCanvasRef}
                              className="border border-gray-300 cursor-crosshair"
                              style={{ width: '600px', height: '400px' }}
                            />
                          </div>
                          
                          <div className="flex gap-2 items-center justify-center">
                            <span className="text-sm text-muted-foreground">
                              Nodes: {customNodes.length} | Edges: {customEdges.length}
                            </span>
                          </div>
                        </div>

                        {/* Create Graph Button */}
                        <div className="flex gap-2">
                          <Button onClick={createCustomGraph} className="flex-1">
                            <Play className="w-4 h-4 mr-2" />
                            Create Custom Graph
                          </Button>
                          <Button variant="outline" onClick={resetExperiment}>
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Custom Graph Display */}
                        {graphData && graphData.type === 'custom' && (
                          <div className="space-y-4">
                            
                            
                            {/* 3D Graph Visualization */}
                            <div className="mt-4">
                              <h6 className="font-medium mb-2">3D Graph Visualization:</h6>
                              <Graph3D 
                                graphData={graphData} 
                                highlightPath={algorithmResult?.type === 'path' ? algorithmResult.path : null}
                              />
                            </div>
                          </div>
                        )}

                      </div>
                    </div>
                  )}
                  <div className="p-4 rounded-lg border-2 border-muted hover:border-primary/50 transition-colors">
                    <h4 className="font-semibold mb-2">3. Select and Execute Algorithm</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Choose from comprehensive graph algorithms and execute them
                    </p>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Algorithm Category</label>
                          <Select value={selectedAlgorithm} onValueChange={handleAlgorithmSelect} disabled={isAlgorithmRunning || !graphData}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {algorithms.map(algorithm => (
                                <SelectItem key={algorithm.id} value={algorithm.id}>
                                  {algorithm.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2 items-end">
                          {selectedAlgorithm === 'dijkstra' ? (
                            <Button
                              onClick={runDijkstra}
                              disabled={isAlgorithmRunning || !graphData || !startNode || !endNode}
                              className="flex-1"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              {isAlgorithmRunning ? "Executing..." : "Run Dijkstra"}
                            </Button>
                          ) : (
                            <Button
                              onClick={executeAlgorithm}
                              disabled={isAlgorithmRunning || !graphData}
                              className="flex-1"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              {isAlgorithmRunning ? "Executing..." : "Execute Algorithm"}
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            onClick={resetExperiment}
                            disabled={isAlgorithmRunning}
                          >
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Source/Target selection for pathfinding algorithms */}
                      {(selectedAlgorithm.includes('path') || selectedAlgorithm === 'dijkstra' || selectedAlgorithm === 'all_shortest' || selectedAlgorithm === 'all_shortest_from' || selectedAlgorithm === 'longest_path' || selectedAlgorithm === 'all_paths' || selectedAlgorithm === 'max_flow') && graphData && (
                        <div className="flex gap-2 items-center">
                          {(selectedAlgorithm === 'dijkstra' || selectedAlgorithm === 'all_shortest' || selectedAlgorithm === 'longest_path' || selectedAlgorithm === 'all_paths' || selectedAlgorithm === 'max_flow') ? (
                            <div className="space-y-2">
                              <div className="flex gap-2 items-center">
                                <span className="text-sm font-medium">{selectedAlgorithm === 'max_flow' ? 'Source Node:' : 'Start Node:'}</span>
                                <Select value={startNode || ''} onValueChange={setStartNode} disabled={isAlgorithmRunning}>
                                  <SelectTrigger className="w-20">
                                    <SelectValue placeholder={selectedAlgorithm === 'max_flow' ? "Source" : "Start"} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {graphData.nodes.map(node => (
                                      <SelectItem key={node} value={node}>{node}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <span className="text-sm text-muted-foreground">to</span>
                                <span className="text-sm font-medium">{selectedAlgorithm === 'max_flow' ? 'Sink Node:' : 'End Node:'}</span>
                                <Select value={endNode || ''} onValueChange={setEndNode} disabled={isAlgorithmRunning}>
                                  <SelectTrigger className="w-20">
                                    <SelectValue placeholder={selectedAlgorithm === 'max_flow' ? "Sink" : "End"} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {graphData.nodes.map(node => (
                                      <SelectItem key={node} value={node}>{node}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              {selectionMessage && (
                                <p className="text-sm text-blue-600">{selectionMessage}</p>
                              )}
                            </div>
                          ) : selectedAlgorithm === 'all_shortest_from' ? (
                            <div className="space-y-2">
                              <div className="flex gap-2 items-center">
                                <span className="text-sm font-medium">Start Node:</span>
                                <Select value={startNode || ''} onValueChange={setStartNode} disabled={isAlgorithmRunning}>
                                  <SelectTrigger className="w-20">
                                    <SelectValue placeholder="Start" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {graphData.nodes.map(node => (
                                      <SelectItem key={node} value={node}>{node}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <span className="text-sm text-muted-foreground">(finds paths to all other nodes)</span>
                              </div>
                              {selectionMessage && (
                                <p className="text-sm text-blue-600">{selectionMessage}</p>
                              )}
                            </div>
                          ) : (
                            <div className="flex gap-2 items-center">
                              <Select value={sourceNode} onValueChange={setSourceNode} disabled={isAlgorithmRunning}>
                                <SelectTrigger className="w-20">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {graphData.nodes.map(node => (
                                    <SelectItem key={node} value={node}>{node}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <span className="text-sm text-muted-foreground">to</span>
                              <Select value={targetNode} onValueChange={setTargetNode} disabled={isAlgorithmRunning}>
                                <SelectTrigger className="w-20">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {graphData.nodes.map(node => (
                                    <SelectItem key={node} value={node}>{node}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                        </div>
                      )}

                      {isAlgorithmRunning && (
                        <div className="flex flex-col items-center justify-center py-8">
                          <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center animate-spin">
                            <Network className="w-12 h-12 text-primary" />
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">Executing algorithm...</p>
                        </div>
                      )}

                      {algorithmResult && !isAlgorithmRunning && (
                        <div className="space-y-2">
                          <h5 className="font-medium">Algorithm Result:</h5>
                          <div className="p-3 bg-primary/10 rounded-lg">
                            <div className="text-sm font-medium mb-2">
                              {algorithmResult.description}
                            </div>
                            
                            {algorithmResult.type === 'path' && (
                              <div className="text-sm">
                                <strong>Path:</strong> {algorithmResult.path.join(' → ')}
                                <br />
                                <strong>Cost:</strong> {algorithmResult.cost}
                              </div>
                            )}
                            
                            {algorithmResult.algorithm === 'dijkstra' && (
                              <div className="text-sm">
                                <strong>Shortest Path:</strong> {algorithmResult.path.join(' → ')}
                                <br />
                                <strong>Distance:</strong> {algorithmResult.distance === Infinity ? 'No path found' : `${algorithmResult.distance} units`}
                                <br />
                                <strong>Visited Nodes:</strong> {algorithmResult.visited.join(', ')}
                              </div>
                            )}
                            
                            {algorithmResult.type === 'traversal' && (
                              <div className="text-sm">
                                <strong>Visited Order:</strong> {algorithmResult.visited.join(' → ')}
                              </div>
                            )}
                            
                            {algorithmResult.type === 'paths' && (
                              <div className="text-sm">
                                <strong>All Shortest Paths:</strong>
                                <div className="mt-1">
                                  {algorithmResult.paths.map((path, index) => (
                                    <div key={index} className="text-xs">
                                      Path {index + 1}: {path.join(' → ')}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {algorithmResult.type === 'all_shortest_from' && (
                              <div className="text-sm">
                                <strong>Shortest Paths from {startNode}:</strong>
                                <div className="mt-1">
                                  {Object.entries(algorithmResult.paths).map(([node, data], index) => (
                                    <div key={index} className="text-xs">
                                      To {node}: {(data as any).path.join(' → ')} (distance: {(data as any).distance})
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {algorithmResult.type === 'longest_path' && (
                              <div className="text-sm">
                                <strong>Longest Path:</strong> {algorithmResult.path.join(' → ')}
                                <br />
                                <strong>Length:</strong> {algorithmResult.length} edges
                              </div>
                            )}
                            
                            {algorithmResult.type === 'all_paths' && (
                              <div className="text-sm">
                                <strong>All Possible Paths ({algorithmResult.paths.length} found):</strong>
                                <div className="mt-1 max-h-32 overflow-y-auto">
                                  {algorithmResult.paths.map((path, index) => (
                                    <div key={index} className="text-xs">
                                      Path {index + 1}: {path.join(' → ')}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {algorithmResult.type === 'eulerian_path' && (
                              <div className="text-sm">
                                <strong>Eulerian Path:</strong>
                                {algorithmResult.hasPath ? (
                                  <div className="mt-1">
                                    <div className="text-green-600">✓ {algorithmResult.description}</div>
                                    <div className="text-xs mt-1">
                                      Path: {algorithmResult.path.join(' → ')}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-red-600 mt-1">✗ {algorithmResult.description}</div>
                                )}
                              </div>
                            )}
                            
                            {algorithmResult.type === 'eulerian_cycle' && (
                              <div className="text-sm">
                                <strong>Eulerian Cycle:</strong>
                                {algorithmResult.hasCycle ? (
                                  <div className="mt-1">
                                    <div className="text-green-600">✓ {algorithmResult.description}</div>
                                    <div className="text-xs mt-1">
                                      Cycle: {algorithmResult.path.join(' → ')}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-red-600 mt-1">✗ {algorithmResult.description}</div>
                                )}
                              </div>
                            )}
                            
                            {algorithmResult.type === 'hamiltonian_path' && (
                              <div className="text-sm">
                                <strong>Hamiltonian Path:</strong>
                                {algorithmResult.hasPath ? (
                                  <div className="mt-1">
                                    <div className="text-green-600">✓ {algorithmResult.description}</div>
                                    <div className="text-xs mt-1">
                                      Path: {algorithmResult.path.join(' → ')}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-red-600 mt-1">✗ {algorithmResult.description}</div>
                                )}
                              </div>
                            )}
                            
                            {algorithmResult.type === 'hamiltonian_cycle' && (
                              <div className="text-sm">
                                <strong>Hamiltonian Cycle:</strong>
                                {algorithmResult.hasCycle ? (
                                  <div className="mt-1">
                                    <div className="text-green-600">✓ {algorithmResult.description}</div>
                                    <div className="text-xs mt-1">
                                      Cycle: {algorithmResult.path.join(' → ')}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-red-600 mt-1">✗ {algorithmResult.description}</div>
                                )}
                              </div>
                            )}
                            
                            {algorithmResult.type === 'floyd_warshall' && (
                              <div className="text-sm">
                                <strong>Floyd-Warshall Algorithm:</strong>
                                <div className="mt-1">
                                  <div className="text-green-600">✓ {algorithmResult.description}</div>
                                  <div className="text-xs mt-2">
                                    <strong>Distance Matrix:</strong>
                                    <div className="mt-1 max-h-32 overflow-y-auto bg-gray-100 p-2 rounded">
                                      <table className="text-xs">
                                        <thead>
                                          <tr>
                                            <th className="px-1"></th>
                                            {Object.keys(algorithmResult.distances).map(node => (
                                              <th key={node} className="px-1 font-bold">{node}</th>
                                            ))}
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {Object.entries(algorithmResult.distances).map(([from, distances]) => (
                                            <tr key={from}>
                                              <td className="px-1 font-bold">{from}</td>
                                              {Object.values(distances).map((dist, idx) => (
                                                <td key={idx} className="px-1 text-center">
                                                  {dist === 1e8 ? '∞' : dist}
                                                </td>
                                              ))}
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {algorithmResult.type === 'mst' && (
                              <div className="text-sm">
                                <strong>Minimum Spanning Tree:</strong>
                                <div className="mt-1">
                                  <div className="text-green-600">✓ {algorithmResult.description}</div>
                                  <div className="text-xs mt-1">
                                    <strong>Edges:</strong> {algorithmResult.edges.length}
                                    <br />
                                    <strong>Total Weight:</strong> {algorithmResult.totalWeight}
                                    <br />
                                    <strong>Connected:</strong> {algorithmResult.isConnected ? 'Yes' : 'No'}
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {algorithmResult.type === 'coloring' && (
                              <div className="text-sm">
                                <strong>Graph Coloring:</strong>
                                <div className="mt-1">
                                  <div className="text-green-600">✓ {algorithmResult.description}</div>
                                  <div className="text-xs mt-1">
                                    <strong>Chromatic Number:</strong> {algorithmResult.chromaticNumber}
                                    <br />
                                    <strong>Node Colors:</strong>
                                    <div className="mt-1">
                                      {Object.entries(algorithmResult.colors).map(([node, color]) => (
                                        <span key={node} className="inline-block mr-2 mb-1 px-2 py-1 bg-gray-100 rounded text-xs">
                                          {node}: Color {color as number}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {algorithmResult.type === 'degrees' && (
                              <div className="text-sm">
                                <strong>Vertex Degrees:</strong>
                                <div className="mt-1">
                                  {algorithmResult.degrees.map((deg, index) => (
                                    <span key={index} className="text-xs mr-2">
                                      {deg.node}: {deg.degree}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {algorithmResult.type === 'components' && (
                              <div className="text-sm">
                                <strong>Connected Components:</strong> {algorithmResult.count}
                                <br />
                                <strong>Components:</strong>
                                {algorithmResult.components.map((comp, index) => (
                                  <div key={index} className="text-xs">
                                    Component {index + 1}: {comp.join(', ')}
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {algorithmResult.type === 'max_flow' && (
                              <div className="text-sm">
                                <strong>Maximum Flow:</strong>
                                <div className="mt-1">
                                  <div className="text-green-600">✓ {algorithmResult.description}</div>
                                  <div className="text-xs mt-1">
                                    <strong>Max Flow Value:</strong> {algorithmResult.maxFlow}
                                    <br />
                                    <strong>Connected:</strong> {algorithmResult.isConnected ? 'Yes' : 'No'}
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {algorithmResult.type === 'isomorphism' && (
                              <div className="text-sm">
                                <strong>Graph Isomorphism:</strong>
                                <div className="mt-1">
                                  <div className={algorithmResult.isIsomorphic ? "text-green-600" : "text-red-600"}>
                                    {algorithmResult.isIsomorphic ? "✓" : "✗"} {algorithmResult.description}
                                  </div>
                                  {algorithmResult.mapping && (
                                    <div className="text-xs mt-1">
                                      <strong>Mapping:</strong>
                                      <div className="mt-1">
                                        {Object.entries(algorithmResult.mapping).map(([from, to]) => (
                                          <span key={from} className="inline-block mr-2 mb-1 px-2 py-1 bg-gray-100 rounded text-xs">
                                            {from} → {to as string}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                            
                            {algorithmResult.type === 'max_independent' && (
                              <div className="text-sm">
                                <strong>Maximum Independent Set:</strong>
                                <div className="mt-1">
                                  <div className="text-green-600">✓ {algorithmResult.description}</div>
                                  <div className="text-xs mt-1">
                                    <strong>Independent Set:</strong> {algorithmResult.independentSet.join(', ')}
                                    <br />
                                    <strong>Size:</strong> {algorithmResult.size}
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {algorithmResult.type === 'max_clique' && (
                              <div className="text-sm">
                                <strong>Maximum Clique:</strong>
                                <div className="mt-1">
                                  <div className="text-green-600">✓ {algorithmResult.description}</div>
                                  <div className="text-xs mt-1">
                                    <strong>Clique:</strong> {algorithmResult.clique.join(', ')}
                                    <br />
                                    <strong>Size:</strong> {algorithmResult.size}
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {algorithmResult.type === 'radius_diameter' && (
                              <div className="text-sm">
                                <strong>Graph Radius and Diameter:</strong>
                                <div className="mt-1">
                                  <div className="text-green-600">✓ {algorithmResult.description}</div>
                                  <div className="text-xs mt-1">
                                    <strong>Radius:</strong> {algorithmResult.radius}
                                    <br />
                                    <strong>Diameter:</strong> {algorithmResult.diameter}
                                    <br />
                                    <strong>Center Vertices:</strong> {algorithmResult.center.join(', ')}
                                    <br />
                                    <strong>Peripheral Vertices:</strong> {algorithmResult.peripheral.join(', ')}
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {algorithmResult.type === 'weight_visualization' && (
                              <div className="text-sm">
                                <strong>Weight-Based Visualization:</strong>
                                <div className="mt-1">
                                  <div className="text-green-600">✓ {algorithmResult.description}</div>
                                  
                                  {/* Visual Graph Display with Weight-Based Sizing */}
                                  <div className="mt-4">
                                    <h6 className="font-medium mb-2">Weight-Based Graph Visualization:</h6>
                                    <div className="w-full rounded-lg overflow-hidden border-2 border-muted flex justify-center">
                                      <svg width="600" height="400" className="border border-gray-300">
                                        {/* Background */}
                                        <rect width="600" height="400" fill="#1a1a1a" />
                                        
                                        {/* Grid */}
                                        <defs>
                                          <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
                                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#333" strokeWidth="1"/>
                                          </pattern>
                                        </defs>
                                        <rect width="600" height="400" fill="url(#grid2)" />
                                        
                                        {/* Calculate node positions in a circle */}
                                        {(() => {
                                          const nodeCount = graphData.nodes.length;
                                          const centerX = 300;
                                          const centerY = 200;
                                          const radius = Math.min(120, nodeCount * 15);
                                          const nodePositions: { [key: string]: { x: number; y: number } } = {};
                                          
                                          graphData.nodes.forEach((node, index) => {
                                            const angle = (index / nodeCount) * 2 * Math.PI;
                                            nodePositions[node] = {
                                              x: centerX + Math.cos(angle) * radius,
                                              y: centerY + Math.sin(angle) * radius
                                            };
                                          });
                                          
                                          return null; // Don't render the object directly
                                        })()}
                                        
                                        {/* Draw edges with weight-based width */}
                                        {graphData.edges.map((edge, index) => {
                                          // Calculate positions for this edge
                                          const nodeCount = graphData.nodes.length;
                                          const centerX = 300;
                                          const centerY = 200;
                                          const radius = Math.min(120, nodeCount * 15);
                                          
                                          const fromIndex = graphData.nodes.indexOf(edge.from);
                                          const toIndex = graphData.nodes.indexOf(edge.to);
                                          
                                          if (fromIndex === -1 || toIndex === -1) return null;
                                          
                                          const fromAngle = (fromIndex / nodeCount) * 2 * Math.PI;
                                          const toAngle = (toIndex / nodeCount) * 2 * Math.PI;
                                          
                                          const fromPos = {
                                            x: centerX + Math.cos(fromAngle) * radius,
                                            y: centerY + Math.sin(fromAngle) * radius
                                          };
                                          const toPos = {
                                            x: centerX + Math.cos(toAngle) * radius,
                                            y: centerY + Math.sin(toAngle) * radius
                                          };
                                          
                                          const edgeKey = `${edge.from}-${edge.to}`;
                                          const edgeWidth = algorithmResult.edgeWidths[edgeKey] || 2;
                                          
                                          return (
                                            <g key={index}>
                                              <line
                                                x1={fromPos.x}
                                                y1={fromPos.y}
                                                x2={toPos.x}
                                                y2={toPos.y}
                                                stroke="#3b82f6"
                                                strokeWidth={edgeWidth}
                                                opacity="0.8"
                                              />
                                              {/* Edge weight */}
                                              <text
                                                x={(fromPos.x + toPos.x) / 2}
                                                y={(fromPos.y + toPos.y) / 2}
                                                fill="#fff"
                                                fontSize="10"
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                style={{ background: '#000', padding: '1px' }}
                                              >
                                                {edge.weight}
                                              </text>
                                            </g>
                                          );
                                        })}
                                        
                                        {/* Draw nodes with weight-based size */}
                                        {graphData.nodes.map((node, index) => {
                                          const nodeCount = graphData.nodes.length;
                                          const centerX = 300;
                                          const centerY = 200;
                                          const radius = Math.min(120, nodeCount * 15);
                                          const angle = (index / nodeCount) * 2 * Math.PI;
                                          const pos = {
                                            x: centerX + Math.cos(angle) * radius,
                                            y: centerY + Math.sin(angle) * radius
                                          };
                                          
                                          const nodeSize = algorithmResult.nodeSizes[node] || 20;
                                          
                                          return (
                                            <g key={node}>
                                              <circle
                                                cx={pos.x}
                                                cy={pos.y}
                                                r={nodeSize / 2}
                                                fill="#3b82f6"
                                                stroke="#fff"
                                                strokeWidth="2"
                                              />
                                              <text
                                                x={pos.x}
                                                y={pos.y + 3}
                                                fill="#fff"
                                                fontSize="12"
                                                fontWeight="bold"
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                              >
                                                {node}
                                              </text>
                                            </g>
                                          );
                                        })}
                                      </svg>
                                    </div>
                                  </div>
                                  
                                  <div className="text-xs mt-2">
                                    <strong>Node Sizes:</strong>
                                    <div className="mt-1">
                                      {Object.entries(algorithmResult.nodeSizes).map(([node, size]) => (
                                        <span key={node} className="inline-block mr-2 mb-1 px-2 py-1 bg-gray-100 rounded text-xs">
                                          {node}: {(size as number).toFixed(1)}px
                                        </span>
                                      ))}
                                    </div>
                                    <strong>Edge Widths:</strong>
                                    <div className="mt-1">
                                      {Object.entries(algorithmResult.edgeWidths).map(([edge, width]) => (
                                        <span key={edge} className="inline-block mr-2 mb-1 px-2 py-1 bg-gray-100 rounded text-xs">
                                          {edge}: {(width as number).toFixed(1)}px
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {algorithmResult.type === 'arrange' && (
                              <div className="text-sm">
                                <strong>Graph Arrangement:</strong>
                                <div className="mt-1">
                                  <div className="text-green-600">✓ {algorithmResult.description}</div>
                                  
                                  {/* Visual Graph Display */}
                                  <div className="mt-4">
                                    <h6 className="font-medium mb-2">Arranged Graph Visualization:</h6>
                                    <div className="w-full rounded-lg overflow-hidden border-2 border-muted flex justify-center">
                                      <svg width="600" height="400" className="border border-gray-300">
                                        {/* Background */}
                                        <rect width="600" height="400" fill="#1a1a1a" />
                                        
                                        {/* Grid */}
                                        <defs>
                                          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#333" strokeWidth="1"/>
                                          </pattern>
                                        </defs>
                                        <rect width="600" height="400" fill="url(#grid)" />
                                        
                                        {/* Draw edges */}
                                        {graphData.edges.map((edge, index) => {
                                          const fromPos = algorithmResult.positions[edge.from];
                                          const toPos = algorithmResult.positions[edge.to];
                                          if (!fromPos || !toPos) return null;
                                          
                                          return (
                                            <g key={index}>
                                              <line
                                                x1={fromPos.x}
                                                y1={fromPos.y}
                                                x2={toPos.x}
                                                y2={toPos.y}
                                                stroke="#3b82f6"
                                                strokeWidth="2"
                                                opacity="0.7"
                                              />
                                              {/* Edge weight */}
                                              <text
                                                x={(fromPos.x + toPos.x) / 2}
                                                y={(fromPos.y + toPos.y) / 2}
                                                fill="#fff"
                                                fontSize="12"
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                style={{ background: '#000', padding: '2px' }}
                                              >
                                                {edge.weight}
                                              </text>
                                            </g>
                                          );
                                        })}
                                        
                                        {/* Draw nodes */}
                                        {Object.entries(algorithmResult.positions).map(([node, pos]) => (
                                          <g key={node}>
                                            <circle
                                              cx={(pos as { x: number; y: number }).x}
                                              cy={(pos as { x: number; y: number }).y}
                                              r="20"
                                              fill="#3b82f6"
                                              stroke="#fff"
                                              strokeWidth="2"
                                            />
                                            <text
                                              x={(pos as { x: number; y: number }).x}
                                              y={(pos as { x: number; y: number }).y + 5}
                                              fill="#fff"
                                              fontSize="14"
                                              fontWeight="bold"
                                              textAnchor="middle"
                                              dominantBaseline="middle"
                                            >
                                              {node}
                                            </text>
                                          </g>
                                        ))}
                                      </svg>
                                    </div>
                                  </div>
                                  
                                  <div className="text-xs mt-2">
                                    <strong>Node Positions:</strong>
                                    <div className="mt-1">
                                      {Object.entries(algorithmResult.positions).map(([node, pos]) => (
                                        <span key={node} className="inline-block mr-2 mb-1 px-2 py-1 bg-gray-100 rounded text-xs">
                                          {node}: ({Math.round((pos as { x: number; y: number }).x)}, {Math.round((pos as { x: number; y: number }).y)})
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {algorithmResult.type === 'general' && (
                              <div className="text-sm">
                                {algorithmResult.data}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="implementation" className="space-y-6">
            <Card className="w-full max-w-6xl mx-auto">
              <CardHeader>
                <CardTitle>Python Implementation</CardTitle>
                <CardDescription>
                  Comprehensive code examples for all graph algorithms with NetworkX
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">1. Basic Graph Creation</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`import networkx as nx
import matplotlib.pyplot as plt
import random

# Create different types of graphs
def create_simple_graph(nodes):
    G = nx.Graph()
    G.add_nodes_from(range(nodes))
    for i in range(nodes):
        for j in range(i+1, nodes):
            if random.random() < 0.4:
                G.add_edge(i, j, weight=random.randint(1, 10))
    return G

def create_complete_graph(nodes):
    G = nx.complete_graph(nodes)
    for (u, v) in G.edges():
        G[u][v]['weight'] = random.randint(1, 10)
    return G

def create_multi_graph(nodes):
    G = nx.MultiGraph()
    G.add_nodes_from(range(nodes))
    for i in range(nodes):
        for j in range(nodes):
            if i != j and random.random() < 0.3:
                num_edges = random.randint(1, 3)
                for _ in range(num_edges):
                    G.add_edge(i, j, weight=random.randint(1, 10))
    return G`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">2. Pathfinding Algorithms</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`# Dijkstra's Algorithm
def dijkstra_shortest_path(G, source, target):
    try:
        path = nx.shortest_path(G, source, target, weight='weight')
        length = nx.shortest_path_length(G, source, target, weight='weight')
        return path, length
    except nx.NetworkXNoPath:
        return None, None

# Floyd-Warshall Algorithm
def floyd_warshall(G):
    return nx.floyd_warshall(G, weight='weight')

# All shortest paths
def all_shortest_paths(G, source, target):
    return list(nx.all_shortest_paths(G, source, target, weight='weight'))

# BFS and DFS
def bfs_traversal(G, start):
    return list(nx.bfs_tree(G, start).nodes())

def dfs_traversal(G, start):
    return list(nx.dfs_tree(G, start).nodes())`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">3. Graph Analysis Algorithms</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`# Minimum Spanning Tree
def minimum_spanning_tree(G):
    mst = nx.minimum_spanning_tree(G, weight='weight')
    return mst, sum(edge[2]['weight'] for edge in mst.edges(data=True))

# Graph Coloring
def graph_coloring(G):
    coloring = nx.greedy_color(G, strategy='largest_first')
    chromatic_number = max(coloring.values()) + 1
    return coloring, chromatic_number

# Connected Components
def connected_components(G):
    return list(nx.connected_components(G))

# Graph Metrics
def graph_metrics(G):
    radius = nx.radius(G)
    diameter = nx.diameter(G)
    return radius, diameter

# Vertex Degrees
def vertex_degrees(G):
    return dict(G.degree())

# Maximum Clique
def maximum_clique(G):
    return nx.max_clique(G)`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">4. Special Path Algorithms</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`# Eulerian Path and Cycle
def eulerian_path(G):
    try:
        return list(nx.eulerian_path(G))
    except nx.NetworkXError:
        return None

def eulerian_cycle(G):
    try:
        return list(nx.eulerian_circuit(G))
    except nx.NetworkXError:
        return None

# Hamiltonian Path and Cycle
def hamiltonian_path(G):
    try:
        return list(nx.hamiltonian_path(G))
    except nx.NetworkXError:
        return None

def hamiltonian_cycle(G):
    try:
        return list(nx.hamiltonian_cycle(G))
    except nx.NetworkXError:
        return None

# Maximum Flow
def maximum_flow(G, source, sink):
    flow_value, flow_dict = nx.maximum_flow(G, source, sink)
    return flow_value, flow_dict`}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">5. Graph Visualization</h4>
                    <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`def visualize_graph(G, title="Graph", highlight_path=None):
    plt.figure(figsize=(12, 8))
    pos = nx.spring_layout(G)
    
    # Draw all nodes
    nx.draw_networkx_nodes(G, pos, node_color='lightblue', 
                          node_size=500, alpha=0.9)
    
    # Draw all edges
    nx.draw_networkx_edges(G, pos, alpha=0.5, edge_color='gray')
    
    # Highlight specific path if provided
    if highlight_path:
        path_edges = [(highlight_path[i], highlight_path[i+1]) 
                     for i in range(len(highlight_path)-1)]
        nx.draw_networkx_edges(G, pos, edgelist=path_edges, 
                              edge_color='red', width=3)
    
    # Draw edge weights
    nx.draw_networkx_edge_labels(G, pos, 
                                nx.get_edge_attributes(G, 'weight'))
    
    # Draw node labels
    nx.draw_networkx_labels(G, pos, font_size=12, font_weight='bold')
    
    plt.title(title)
    plt.axis('off')
    plt.tight_layout()
    plt.show()

# Example usage
G = create_simple_graph(5)
path, cost = dijkstra_shortest_path(G, 0, 4)
visualize_graph(G, "Graph with Shortest Path", path)`}</pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />

      {/* Weight Input Dialog */}
      {showWeightDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border rounded-lg p-6 w-96 max-w-[90vw]">
            <h3 className="text-lg font-semibold mb-4">Set Edge Weight</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Enter the weight for the edge connecting nodes {pendingEdge?.from} and {pendingEdge?.to}
            </p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Weight:</label>
                <Input
                  type="number"
                  value={edgeWeight}
                  onChange={(e) => setEdgeWeight(e.target.value)}
                  placeholder="Enter weight"
                  className="mt-1"
                  autoFocus
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={handleWeightCancel}>
                  Cancel
                </Button>
                <Button onClick={handleWeightSubmit}>
                  Create Edge
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experiment2;
