import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { Brain, Network, TrendingUp } from "lucide-react";
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const BayesianNetwork3D = () => {
  const containerRef = useRef(null);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 0.8);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x10b981, 0.4);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Node positions for Bayesian Network layout (square formation)
    const nodePositions = {
      A: new THREE.Vector3(-2.5, 2, 0),
      B: new THREE.Vector3(2.5, 2, 0),
      C: new THREE.Vector3(-2.5, -2, 0),
      D: new THREE.Vector3(2.5, -2, 0)
    };

    const nodes = {};
    const nodeGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    
    Object.entries(nodePositions).forEach(([label, position]) => {
      const nodeMaterial = new THREE.MeshPhongMaterial({
        color: 0x10b981,
        emissive: 0x065f46,
        shininess: 100,
        transparent: true,
        opacity: 0.9
      });
      
      const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      nodeMesh.position.copy(position);
      scene.add(nodeMesh);

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 128;
      canvas.height = 128;
      
      // Enable text smoothing
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      
      context.fillStyle = '#ffffff';
      context.font = 'Bold 80px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      
      // Add stroke for better visibility
      context.strokeStyle = '#000000';
      context.lineWidth = 3;
      context.strokeText(label, 64, 64);
      context.fillText(label, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ 
        map: texture,
        depthTest: false,
        depthWrite: false
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.copy(position);
      sprite.position.z += 0.1;
      sprite.scale.set(0.8, 0.8, 1);
      sprite.renderOrder = 999;
      scene.add(sprite);

      nodes[label] = { mesh: nodeMesh, sprite };
    });

    // Directed edges for Bayesian Network: A→B, A→C, A→D, C→D
    const edges = [
      ['A', 'B'],
      ['A', 'C'],
      ['A', 'D'],
      ['C', 'D']
    ];

    // Create arrows for directed edges
    edges.forEach(([from, to]) => {
      const fromPos = nodePositions[from];
      const toPos = nodePositions[to];
      
      // Calculate direction
      const direction = new THREE.Vector3().subVectors(toPos, fromPos);
      const length = direction.length();
      
      // Normalize direction
      direction.normalize();
      
      // Start point (offset from source node)
      const startPoint = fromPos.clone().add(direction.clone().multiplyScalar(0.6));
      // End point (offset from target node to make room for arrowhead)
      const endPoint = toPos.clone().sub(direction.clone().multiplyScalar(0.8));
      
      // Create tube for arrow shaft
      const curve = new THREE.LineCurve3(startPoint, endPoint);
      const tubeGeometry = new THREE.TubeGeometry(curve, 20, 0.08, 8, false);
      const tubeMaterial = new THREE.MeshPhongMaterial({
        color: 0x10b981,
        emissive: 0x065f46,
        transparent: true,
        opacity: 0.7
      });
      const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
      scene.add(tube);
      
      // Create arrowhead cone
      const coneGeometry = new THREE.ConeGeometry(0.25, 0.5, 8);
      const coneMaterial = new THREE.MeshPhongMaterial({
        color: 0x10b981,
        emissive: 0x065f46
      });
      const cone = new THREE.Mesh(coneGeometry, coneMaterial);
      
      // Position cone at end point (closer to target node)
      const arrowheadPosition = toPos.clone().sub(direction.clone().multiplyScalar(0.6));
      cone.position.copy(arrowheadPosition);
      
      // Rotate cone to point in direction of arrow
      const axis = new THREE.Vector3(0, 1, 0);
      cone.quaternion.setFromUnitVectors(axis, direction);
      
      scene.add(cone);
    });

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
  }, [isRotating]);

  return (
    <div className="w-full">
      <div ref={containerRef} className="w-full rounded-lg overflow-hidden" style={{ height: '300px' }} />
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

const UndirectedGraph3D = () => {
  const containerRef = useRef(null);
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 0.8);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xdc2626, 0.4);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    const nodePositions = {
      B: new THREE.Vector3(-3, 0, 0),
      A: new THREE.Vector3(0, 0, 0),
      D: new THREE.Vector3(2, -2.5, 0),
      C: new THREE.Vector3(2, 2.5, 0)
    };

    const nodes = {};
    const nodeGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    
    Object.entries(nodePositions).forEach(([label, position]) => {
      const nodeMaterial = new THREE.MeshPhongMaterial({
        color: 0xdc2626,
        emissive: 0x7f1d1d,
        shininess: 100,
        transparent: true,
        opacity: 0.9
      });
      
      const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      nodeMesh.position.copy(position);
      scene.add(nodeMesh);

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 128;
      canvas.height = 128;
      
      // Enable text smoothing
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      
      context.fillStyle = '#ffffff';
      context.font = 'Bold 80px Arial';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      
      // Add stroke for better visibility
      context.strokeStyle = '#000000';
      context.lineWidth = 3;
      context.strokeText(label, 64, 64);
      context.fillText(label, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ 
        map: texture,
        depthTest: false,
        depthWrite: false
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.position.copy(position);
      sprite.position.z += 0.1; // Move sprites slightly forward
      sprite.scale.set(0.8, 0.8, 1);
      sprite.renderOrder = 999; // Ensure sprites render last (on top)
      scene.add(sprite);

      nodes[label] = { mesh: nodeMesh, sprite };
    });

    const edges = [
      ['B', 'A'],
      ['A', 'C'],
      ['A', 'D']
    ];

    edges.forEach(([from, to]) => {
      const curve = new THREE.LineCurve3(nodePositions[from], nodePositions[to]);
      const tubeGeometry = new THREE.TubeGeometry(curve, 20, 0.08, 8, false);
      const tubeMaterial = new THREE.MeshPhongMaterial({
        color: 0xdc2626,
        emissive: 0x7f1d1d,
        transparent: true,
        opacity: 0.7
      });
      const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
      scene.add(tube);
    });

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
  }, [isRotating]);

  return (
    <div className="w-full">
      <div ref={containerRef} className="w-full rounded-lg overflow-hidden" style={{ height: '300px' }} />
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

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      
      <main className="flex-grow page-container">
        <h1 className="text-4xl font-bold mb-8">About Probabilistic Graphical Models</h1>

        <div className="content-section mb-6">
          <h2 className="text-2xl font-semibold mb-4">What are Probabilistic Graphical Models?</h2>
          <p className="text-muted-foreground leading-relaxed text-justify">
            Probabilistic graphical models are a powerful framework for representing complex domains using probability distributions, with numerous applications in machine learning, computer vision, natural language processing and computational biology. Graphical models bring together graph theory and probability theory, and provide a flexible framework for modeling large collections of random variables with complex interactions. A graphical model or probabilistic graphical model (PGM) or structured probabilistic model is a probabilistic model for which a graph expresses the conditional dependence structure between random variables. They are commonly used in probability theory, statistics particularly Bayesian statistics and machine learning.
          </p>
        </div>

        <div className="content-section mb-6">
          <h2 className="text-2xl font-semibold mb-4">Types of Graphical Models</h2>
          <p className="text-muted-foreground leading-relaxed mb-6 text-justify">
            Generally, probabilistic graphical models use a graph-based representation as the foundation for encoding a distribution over a multi-dimensional space and a graph that is a compact or factorized representation of a set of independences that hold in the specific distribution. Two branches of graphical representations of distributions are commonly used, namely, Bayesian networks and Markov random fields. Both families encompass the properties of factorization and independences, but they differ in the set of independences they can encode and the factorization of the distribution that they induce.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="content-section flex flex-col h-full">
              <h3 className="text-xl font-semibold mb-3">Undirected Graphical Model</h3>
              <p className="text-muted-foreground leading-relaxed mb-6 text-justify">
                The undirected graph shown may have one of several interpretations; the common feature is that the presence of an edge implies some sort of dependence between the corresponding random variables. In undirected graphical models, also known as Markov random fields, the absence of an edge between two nodes indicates conditional independence given the values of all other nodes. 
              </p>
              
              <div className="flex-grow">
                <UndirectedGraph3D />
              </div>
              
              
            </div>

            <div className="content-section flex flex-col h-full">
              <h3 className="text-xl font-semibold mb-3">Bayesian Network</h3>
              <p className="text-muted-foreground leading-relaxed mb-6 text-justify">
                If the network structure of the model is a directed acyclic graph, the model represents a factorization of the joint probability of all random variables. Any two nodes are conditionally independent given the values of their parents. In general, any two sets of nodes are conditionally independent given a third set if a criterion called d-separation holds in the graph. Local independences and global independences are equivalent in Bayesian networks.
              </p>
              
              <div className="flex-grow">
                <BayesianNetwork3D />
              </div>
              
              
            </div>
          </div>

          <div className="content-section">
            <h3 className="text-xl font-semibold mb-3">Markov Chain Models</h3>
            <p className="text-muted-foreground leading-relaxed mb-6 text-justify">
              A Markov chain model describing a sequence of possible events in which the probability of each event depends only on the state attained in the previous event. A Markov process is a stochastic process that satisfies the Markov property (sometimes characterized as "memorylessness"). In simpler terms, it is a process for which predictions can be made regarding future outcomes based solely on its present state and—most importantly—such predictions are just as good as the ones that could be made knowing the process's full history.
            </p>
            
            <UndirectedGraph3D />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="content-section">
            <div className="inline-block p-3 rounded-lg bg-accent/10 mb-4">
              <Brain className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Machine Learning</h3>
            <p className="text-muted-foreground text-justify">
              PGMs provide a probabilistic approach to machine learning, enabling better handling of
              uncertainty and missing data in predictive models.
            </p>
          </div>

          <div className="content-section">
            <div className="inline-block p-3 rounded-lg bg-accent/10 mb-4">
              <Network className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Network Modeling</h3>
            <p className="text-muted-foreground text-justify">
              Graph-based representations make it easy to visualize and understand complex relationships
              between variables in real-world systems.
            </p>
          </div>

          <div className="content-section">
            <div className="inline-block p-3 rounded-lg bg-accent/10 mb-4">
              <TrendingUp className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Inference & Prediction</h3>
            <p className="text-muted-foreground text-justify">
              Efficient algorithms for probabilistic inference enable making predictions and decisions
              based on observed evidence.
            </p>
          </div>
        </div>

        <div className="content-section mb-6">
          <h2 className="text-2xl font-semibold mb-4">Applications of PGMs</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Computer Vision:</strong> Image segmentation, object
                recognition, and scene understanding using conditional random fields and Markov random fields.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Natural Language Processing:</strong> Language modeling,
                speech recognition, and machine translation using hidden Markov models and Bayesian networks.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Bioinformatics:</strong> Gene regulatory network modeling,
                protein structure prediction, and disease diagnosis.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Robotics:</strong> Simultaneous localization and mapping
                (SLAM), decision making under uncertainty, and multi-agent coordination.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <span>
                <strong className="text-foreground">Finance:</strong> Risk assessment, portfolio optimization,
                and fraud detection using Bayesian inference.
              </span>
            </li>
          </ul>
        </div>

        <div className="content-section">
          <h2 className="text-2xl font-semibold mb-4">Why Study PGMs?</h2>
          <p className="text-muted-foreground leading-relaxed text-justify">
            Understanding probabilistic graphical models equips you with essential tools for building
            intelligent systems that can reason about uncertainty. This course will provide you with
            both theoretical foundations and practical skills to apply PGMs to real-world problems.
            Through our interactive experiments and hands-on projects, you'll gain experience with
            state-of-the-art techniques in machine learning and artificial intelligence.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;