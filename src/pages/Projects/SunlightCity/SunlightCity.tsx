import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './SunlightCity.css';
import nycMap from '../../../assets/citymaps/NYC_3D_1.svg';

export function SunlightCity() {
  const navigate = useNavigate();

  useEffect(() => {
    // MathJax setup
    if (!(window as any).MathJax) {
      const script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
      script.async = true;
      document.head.appendChild(script);
    } else {
      (window as any).MathJax.typesetPromise();
    }

    // Mermaid setup
    const loadMermaid = async () => {
      const mermaid = (await import('mermaid')).default;
      mermaid.initialize({ startOnLoad: true, theme: 'default' });
      mermaid.contentLoaded();
    };
    loadMermaid();

    // Intersection Observer for Side Nav
    const observerOptions = {
      root: null,
      rootMargin: '-5% 0px -90% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['intro', 'meo-tables', 'graph-generation', 'solar-simulation', 'data-collection', 'data-pipeline', 'metrics', 'qa'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const [activeSection, setActiveSection] = useState('intro');


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="project-detail-page sunlight-city"
    >
      <div className="project-hero">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="hero-content"
        >
          <button className="back-button" onClick={() => navigate('/dashboard')}>
            ← Back to Dashboard
          </button>
          <h1>Sunlight City</h1>
          <p className="lead">Unity-Based Spatial Simulation and Large-Scale Data Pipeline for Multi-Objective Pathfinding</p>
          <div className="project-meta">
            <div className="meta-item">
              <span className="label">Role</span>
              <span className="value">System Architect</span>
            </div>
            <div className="meta-item">
              <span className="label">Timeline</span>
              <span className="value">2025 - Present</span>
            </div>
            <div className="meta-item">
              <span className="label">Tech Stack</span>
              <span className="value">Unity, C#, PostGIS, Python</span>
            </div>
          </div>
        </motion.div>
        <div className="hero-image-container">
          <img src={nycMap} alt="NYC 3D Map" className="hero-map-svg" />
        </div>
      </div>

      <div className="project-body">
        <aside className="side-nav">
          <nav>
            <ul>
              {[
                { id: 'intro', label: 'Intro' },
                { id: 'meo-tables', label: 'MEO Tables' },
                { id: 'graph-generation', label: 'Graph Generation' },
                { id: 'solar-simulation', label: 'Solar Simulation' },
                { id: 'data-collection', label: 'Data Collection' },
                { id: 'data-pipeline', label: 'Data Pipeline' },
                { id: 'metrics', label: 'Metrics' },
                { id: 'qa', label: 'Q&A' }
              ].map((item, i) => (
                <motion.li 
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className={activeSection === item.id ? 'active' : ''}
                >
                  <a href={`#${item.id}`} onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(item.id); // Immediate feedback
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    <span className="dot"></span>
                    <span className="nav-label">{item.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>
        </aside>

        <div className="section-box" id="intro">
          <h2>1. Introduction and System Overview</h2>
          <p>Sunlight City is a high-performance spatial simulation system built to solve a simple yet often overlooked urban challenge: <strong>how do we find the most comfortable path to walk based on real-time environmental conditions?</strong></p>
          <p>As developers, we often build pathfinding systems that optimize for the shortest distance. However, in the real world, a five-minute walk in scorching direct sunlight can feel much more taxing than an eight-minute walk through cool, tree-lined shade. The standard GPS doesn't know where the shadows are, and that's the gap we set out to bridge.</p>
          
          <h3>The Technical Challenge</h3>
          <p>The core problem we tackled was the massive scale of data required to make these "shade-aware" decisions. To provide a truly dynamic routing experience, we couldn't just guess or use low-resolution heatmaps. We needed to simulate the sun's exact position every few minutes across the entire year, factoring in the complex 3D geometry of every building, bridge, and tree canopy in the city.</p>
          
          <h3>What We Achieved</h3>
          <p>In this project, I engineered a specialized data pipeline that connects high-fidelity 3D physics with real-world geographic data. By utilizing Unity as a massive spatial evaluator, we successfully fired over <strong>1.5 billion raycasts</strong> across a digital twin of the city to map out a year's worth of light and shadow.</p>
          <p>The result is a highly optimized PostGIS database that powers a Multiobjective Evolutionary Optimizer (MEO) engine. 
            Ultimately, this system calculates a "Pareto" frontier of paths instead of a single route, which provides users with the perfect balance between reaching their destination quickly and staying in the shade.</p>
        </div>

        <div className="section-box" id="meo-tables">
          <h2>2. Building the Brain: The Multiobjective Evolutionary Optimizer (MEO) Database</h2>
          <p>The goal of the Multiobjective Evolutionary Optimizer (MEO) database schemas is to formalize the spatial graph such that graph-traversal algorithms (e.g., A* or Dijkstra variants) can efficiently search for paths along the <strong>Pareto frontier</strong>.</p>
          <h3>2.1 Goal of the MEO Architecture</h3>
          <p>{`In standard pathfinding, the only objective is distance \\( f(p) = \\sum_{e \\in p} distance(e) \\). However, considering environmental factors requires dual-objective optimization: minimizing traversal distance while minimizing solar exposure (maximizing shade). A path \\( p_1 \\) dominates \\( p_2 \\) if and only if it is shorter and has less solar exposure. The set of non-dominated paths forms the Pareto frontier. By precomputing exposure values for every graph edge at highly granular time steps (e.g., every 3 minutes across 24 representative days of the year), the backend can instantaneously weigh edge costs dynamically without performing raycast physics at query time.`}</p>
          
          <h3>2.2 MEO Database Schema and Table Descriptions</h3>
          <p>{`The MEO system involves five core tables designed for normalized hierarchical querying and efficient data aggregation. Sample points are generated with a high-resolution separation distance of \\( \\Delta x = 2.0m \\).`}</p>
          
          <table>
            <thead>
              <tr>
                <th>Table Name</th>
                <th>Description and Key Columns</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>meo_waypoints</code></td>
                <td>
                  <strong>Graph Nodes:</strong> Represents street intersections and terminal points.
                  <ul>
                    <li><code>id</code>: Unique UUID for the node.</li>
                    <li><code>geom</code>: PostGIS <code>GEOMETRY(PointZ)</code> storing Unity coordinates.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td><code>meo_edges</code></td>
                <td>
                  <strong>Topological Connections:</strong> Defines the path connectivity between waypoints.
                  <ul>
                    <li><code>start_wp_id</code> / <code>end_wp_id</code>: Foreign keys to waypoints.</li>
                    <li><code>sample_count</code>: Precomputed total number of samples along the edge.</li>
                    <li>Index: Spatial index on waypoint geometries for fast bounding-box retrieval.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td><code>meo_sample_points</code></td>
                <td>
                  <strong>Simulation Units:</strong> High-resolution equidistant points generated along edges.
                  <ul>
                    <li><code>edge_id</code>: Parent edge reference.</li>
                    <li><code>sequence_index</code>: Ordering of the point along the edge.</li>
                    <li><code>distance_from_start</code>: Scalar distance from the starting waypoint.</li>
                    <li><code>geom</code>: World position for raycast execution.</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td><code>meo_exposure_samples</code></td>
                <td>
                  <strong>Raw Simulation Data:</strong> Stores the boolean result of individual raycasts.
                  <ul>
                    <li><code>sample_point_id</code>: Target simulation point.</li>
                    <li><code>datetime</code>: Simulation timestamp (3-minute increments).</li>
                    <li><code>is_sunlit</code>: Boolean (TRUE if raycast hits sun, FALSE if in shadow).</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td><code>meo_exposure_edges</code></td>
                <td>
                  <strong>Aggregated Metrics:</strong> Sum of sunlit points per edge per timestamp.
                  <ul>
                    <li><code>edge_id</code>: Target road segment.</li>
                    <li><code>sunlit_sum</code>: Total count of sunlit samples {`(\\( \\sum is\\_sunlit \\))`}.</li>
                    <li>Goal: Allows pathfinding algorithms to query precomputed costs without per-sample overhead.</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <p>This hierarchical design effectively decouples the heavy spatial physics (done in Unity) from the fast arithmetic summation (done in PostgreSQL), enabling highly scalable pathfinding.</p>
        </div>

        <div className="section-box" id="graph-generation">
          <h2>3. Extracting the Network: Procedural Road Graph Generation</h2>
          <p>The road network is procedurally extracted from unstructured 3D city meshes using morphological operations, distance transforms, and topology-preserving graph simplifications. The pipeline systematically converts raw geometry into an optimized pathfinding graph through the following sequential algorithms.</p>
          
          <div className="mermaid">
            {`graph TD
              A[Mesh Input] --> B[Grid Rasterization]
              B --> C[Morphological Dilation]
              C --> D[Distance Transform BFS]
              D --> E[Ridge Skeletonization]
              E --> F[Raw Graph Extraction]
              F --> G[Spatial Clustering]
              G --> H[Cycle Removal DFS + Union-Find]
              H --> I[Endpoint Pruning]
              I --> J[Straight Vertex Dissolution]
              J --> K[Optimized Road Graph]`}
          </div>

          <h3>3.1 Grid Rasterization and Morphological Dilation</h3>
          <p>The bounding meshes of the city are rasterized into a 2D boolean grid that maps walkable areas. Rasterizing raw 3D mesh data involves converting continuous geometric triangles into discrete 2D grid pixels.</p>
          
          <p>{`To perform this efficiently without checking the entire grid, the algorithm first projects the 3D vertices of each triangle onto the 2D plane (forming 2D coordinates \\(p_0, p_1, p_2\\)). It then computes a minimal Axis-Aligned Bounding Box (AABB) covering the triangle, iterating only over the pixels within this local box.`}</p>
          
          <div className="grid-viz">
            <div>
              <span className="g-title">Rasterization within AABB</span>
              <table className="grid-table g-border">
                <tbody>
                  <tr>
                    <td></td><td></td><td></td><td></td><td className="g-point">p0</td><td></td><td></td><td></td><td></td>
                  </tr>
                  <tr>
                    <td></td><td></td><td></td><td className="g-fill"></td><td className="g-fill"></td><td className="g-fill"></td><td></td><td></td><td></td>
                  </tr>
                  <tr>
                    <td></td><td></td><td className="g-fill"></td><td className="g-fill"></td><td className="g-fill"></td><td className="g-fill"></td><td className="g-fill"></td><td></td><td></td>
                  </tr>
                  <tr>
                    <td></td><td className="g-fill"></td><td className="g-fill"></td><td className="g-fill"></td><td className="g-fill"></td><td className="g-fill"></td><td className="g-fill"></td><td className="g-fill"></td><td></td>
                  </tr>
                  <tr>
                    <td className="g-point">p1</td><td className="g-fill"></td><td className="g-fill"></td><td className="g-fill"></td><td className="g-fill"></td><td className="g-fill"></td><td className="g-fill"></td><td className="g-fill"></td><td className="g-point">p2</td>
                  </tr>
                </tbody>
              </table>
              <span className="g-cap">Blue border represents the [min, max] AABB</span>
            </div>
          </div>

          <p>{`For each pixel \\(p\\) within the bounding box, the algorithm utilizes Barycentric coordinates to determine if the pixel's center lies strictly inside the triangle. By calculating the 2D cross products of the vectors forming the triangle, the algorithm derives the scalar weights \\(s\\) and \\(t\\). The pixel is determined to be inside the triangle if \\(s \\ge 0\\), \\(t \\ge 0\\), and \\(s + t \\le 1\\).`}</p>

          <pre><code>{`// 1. Calculate the Axis-Aligned Bounding Box (AABB) for the triangle
minX = Max(0, Floor(Min(p0.x, p1.x, p2.x)))
maxX = Min(GridWidth, Ceil(Max(p0.x, p1.x, p2.x)))

// 2. Iterate through pixels in the AABB and apply the Barycentric Test
for x from minX to maxX:
    for y from minY to maxY:
        // Calculate barycentric weights s and t using 2D cross products
        s = CrossProduct(PixelPos - p0, p2 - p0) / TotalTriangleArea
        t = CrossProduct(p1 - p0, PixelPos - p0) / TotalTriangleArea

        // If s >= 0, t >= 0, and s + t <= 1, the pixel center is inside the triangle
        if (s >= 0 and t >= 0 and s + t <= 1):
            grid[x, y] = Walkable`}</code></pre>
          
          <p>Once rasterized, the raw grid often suffers from disconnections or 1-pixel gaps due to floating point inaccuracies or separated 3D meshes. To fix these disconnections, a <strong>morphological dilation</strong> algorithm is applied over multiple passes. In each pass, if a pixel is currently marked as empty (false) but has at least one walkable neighbor within its <strong>8-way Moore neighborhood</strong> (N, S, E, W, NE, NW, SE, SW), it is flipped to true. This visually thickens the walkable area outward in all 8 directions, reliably bridging narrow gaps.</p>
          <div className="grid-viz">
            <div>
              <span className="g-title">Before Dilation</span>
              <table className="grid-table">
                <tbody>
                  <tr> <td></td><td></td><td></td><td></td><td></td><td></td><td></td> </tr>
                  <tr> <td></td><td className="g-fill"></td><td className="g-fill"></td><td></td><td className="g-fill"></td><td className="g-fill"></td><td></td> </tr>
                  <tr> <td></td><td className="g-fill"></td><td className="g-fill"></td><td></td><td className="g-fill"></td><td className="g-fill"></td><td></td> </tr>
                  <tr> <td></td><td></td><td></td><td></td><td></td><td></td><td></td> </tr>
                </tbody>
              </table>
              <span className="g-cap">Disconnected gap in center</span>
            </div>
            <div>
              <span className="g-title">After 1 Pass</span>
              <table className="grid-table">
                <tbody>
                  <tr> <td></td><td className="g-fill"></td><td className="g-fill"></td><td className="g-fill"></td><td className="g-fill"></td><td className="g-fill"></td><td></td> </tr>
                  <tr> <td className="g-fill"></td><td className="g-old"></td><td className="g-old"></td><td className="g-fill"></td><td className="g-old"></td><td className="g-old"></td><td className="g-fill"></td> </tr>
                  <tr> <td className="g-fill"></td><td className="g-old"></td><td className="g-old"></td><td className="g-fill"></td><td className="g-old"></td><td className="g-old"></td><td className="g-fill"></td> </tr>
                  <tr> <td></td><td className="g-fill"></td><td className="g-fill"></td><td className="g-fill"></td><td className="g-fill"></td><td className="g-fill"></td><td></td> </tr>
                </tbody>
              </table>
              <span className="g-cap">Topology merged via 8-way expansion</span>
            </div>
          </div>

          <h3>3.2 Distance Transform and Ridge Skeletonization</h3>
          <p>To mathematically find the center line of the roads, the system creates a topological "height map" representing how far each walkable pixel is from the nearest edge or boundary.</p>
          <p>{`This is achieved using a Breadth-First Search (BFS) distance transform. All non-road boundaries are initialized to a distance of 0 and placed in a queue. As the BFS propagates inward into the walkable area via 8-way connectivity, each pixel is assigned a distance value of \\( distance(parent) + 1 \\). The center line naturally becomes the "highest ridge" on this map.`}</p>
          <div className="grid-viz">
            <div>
              <span className="g-title">Distance Transform Height Map</span>
              <table className="grid-table">
                <tbody>
                  <tr> <td style={{color:'#aaa'}}>0</td><td style={{color:'#aaa'}}>0</td><td style={{color:'#aaa'}}>0</td><td style={{color:'#aaa'}}>0</td><td style={{color:'#aaa'}}>0</td><td style={{color:'#aaa'}}>0</td><td style={{color:'#aaa'}}>0</td> </tr>
                  <tr> <td style={{color:'#aaa'}}>0</td><td style={{color:'#777'}}>1</td><td style={{color:'#777'}}>1</td><td style={{color:'#777'}}>1</td><td style={{color:'#777'}}>1</td><td style={{color:'#777'}}>1</td><td style={{color:'#aaa'}}>0</td> </tr>
                  <tr> <td style={{color:'#aaa'}}>0</td><td style={{color:'#777'}}>1</td><td style={{background:'#2ecc71', color:'#fff', fontWeight:'bold'}}>2</td><td style={{background:'#2ecc71', color:'#fff', fontWeight:'bold'}}>2</td><td style={{background:'#2ecc71', color:'#fff', fontWeight:'bold'}}>2</td><td style={{color:'#777'}}>1</td><td style={{color:'#aaa'}}>0</td> </tr>
                  <tr> <td style={{color:'#aaa'}}>0</td><td style={{color:'#777'}}>1</td><td style={{color:'#777'}}>1</td><td style={{color:'#777'}}>1</td><td style={{color:'#777'}}>1</td><td style={{color:'#777'}}>1</td><td style={{color:'#aaa'}}>0</td> </tr>
                  <tr> <td style={{color:'#aaa'}}>0</td><td style={{color:'#aaa'}}>0</td><td style={{color:'#aaa'}}>0</td><td style={{color:'#aaa'}}>0</td><td style={{color:'#aaa'}}>0</td><td style={{color:'#aaa'}}>0</td><td style={{color:'#aaa'}}>0</td> </tr>
                </tbody>
              </table>
              <span className="g-cap">Center skeleton naturally has the highest distance value</span>
            </div>
          </div>
          <p>{`Finally, a pixel is extracted as part of the centerline skeleton only if its distance is a local maximum—meaning \\( D(x,y) \\ge D(N_i) \\) for all its 8-way neighbors \\( N_i \\). This guarantees the structural graph will lie perfectly at the geometric center of the road corridors.`}</p>

          <h3>3.3 Initial Graph Extraction (Grid to Graph)</h3>
          <p>A raw graph structure is spawned directly from this boolean skeleton grid. Every extracted centerline pixel generates a graph node. The algorithm then iterates through the 8-way neighbors of each skeleton pixel; if a neighboring pixel is also part of the skeleton, an edge is instantiated between them. While this accurately traces the centerline topology, it results in a highly oversampled grid-graph (with a node for every pixel) requiring significant vector simplification.</p>

          <h3>3.4 Graph Simplification: Spatial Clustering</h3>
          <p>The first simplification step merges nodes that are extremely close to one another to remove dense pixel-clusters at intersections. As illustrated in the diagram below, if multiple interconnected nodes (like Nodes A, B, and C) fall within a specified spatial threshold, they are identified for consolidation.</p>
          <div className="mermaid">
            {`graph TD
              subgraph Before[Before Clustering]
                  direction LR
                  subgraph Radius["Within mergeRadius"]
                      A((Node A)) --- B((Node B))
                      B --- C((Node C))
                      C --- A
                  end
                  A --- D((Node D))
                  C --- E((Node E))
                  style A fill:#ff9999,stroke:#333,stroke-width:2px
                  style B fill:#ff9999,stroke:#333,stroke-width:2px
                  style C fill:#ff9999,stroke:#333,stroke-width:2px
                  style Radius fill:#fff0f0,stroke:#ff6666,stroke-dasharray: 5 5
              end

              subgraph After[After Clustering]
                  direction LR
                  Centroid((Centroid Node)) --- D2((Node D))
                  Centroid --- E2((Node E))
                  style Centroid fill:#99ff99,stroke:#333,stroke-width:2px
              end`}
          </div>
          <p>Any nodes found within this <code>mergeRadius</code> bounding area are mathematically averaged to spawn a single <strong>Centroid Node</strong>. Once created, the graph's adjacency lists are safely updated to preserve external topology: outside edges (such as those pointing to D or E) are disconnected from the old cluster and redirected to the new centroid.</p>

          <h3>3.5 Graph Simplification: Cycle Removal</h3>
          <p>Grid extraction inherently creates tiny, visually redundant topological loops around wide intersections or parallel lanes. To clean these up, the cycle removal algorithm executes a Depth-First Search (DFS) to detect closed cycles of lengths up to a specified <code>maxCycleLength</code>. Once a cycle is detected, the algorithm uses Kruskal's Minimum Spanning Tree (MST) approach via a <strong>Disjoint-Set (Union-Find)</strong> data structure to safely break the loop.</p>
          <p>By sorting the edges of the cycle by distance, the Union-Find algorithm connects all nodes using the shortest, most structurally sound edges.The longest edge that improperly closes the loop by connecting two nodes that are already in the same Union-Find set is the most redundant one and will be correctly discarded.</p>

          <div className="mermaid">
            {`graph TD
              subgraph Before[Detected Cycle]
                  direction LR
                  A((Node A)) -- "Dist: 5m" --- B((Node B))
                  B -- "Dist: 4m" --- C((Node C))
                  C -- "Dist: 15m (Redundant)" --- A
              end

              subgraph After[Broken Cycle / MST]
                  direction LR
                  A2((Node A)) -- "Dist: 5m" --- B2((Node B))
                  B2 -- "Dist: 4m" --- C2((Node C))
                  C2 -. "Deleted" .- A2
              end`}
          </div>

          <pre><code>{`// 1. Identify all edges belonging to a detected cycle and sort by length
EdgesInCycle = SortAscending(EdgesInCycle, edge => edge.Length)

// 2. Apply a Kruskal-based Minimum Spanning Tree approach
for each Edge (A, B) in EdgesInCycle:
    if Find(A) != Find(B):
        Union(A, B)      // Keep this edge to maintain connectivity
        MarkAsSafe(Edge) 
    else:
        // This edge would close a cycle; discard it to simplify topology
        MarkForDeletion(Edge)`}</code></pre>

          <h3>3.6 Graph Simplification: Endpoint Pruning (Degree-1)</h3>
          <p>Degree-1 nodes (dead-ends) are often artificial spurs generated by the skeletonization process branching into small driveways, wide sidewalks, or building entrances. The endpoint pruning algorithm systemically evaluates these dead-end nodes and prunes them if they do not represent true structural roads.</p>
          <p>The logic checks the neighbor of the degree-1 node:</p>
          <ul>
            <li>If the neighbor is an intersection (degree &gt; 2), the degree-1 node is immediately classified as a micro-stub and flagged for removal.</li>
            <li>If the neighbor is a continuing road (degree 2), the algorithm calculates the bend angle. If the branch turns sharply (e.g., &gt; 75°) and there are no forward candidate nodes within a 5m radius to bridge to, it is deemed an artifact and pruned.</li>
          </ul>

          <div className="mermaid">
            {`graph TD
              subgraph Case1[Case 1: Intersection Micro-Stub]
                  direction LR
                  Stub1((Stub Node<br/>Deg: 1)) -. "Pruned" .- Intersect((Intersection<br/>Deg: 3))
                  Intersect --- C1((Road))
                  Intersect --- C2((Road))
                  style Stub1 fill:#ff9999,stroke:#e74c3c,stroke-dasharray: 5 5,stroke-width:2px
              end

              subgraph Case2[Case 2: Sharp Spurious Branch]
                  direction LR
                  Spur((Spur Node<br/>Deg: 1)) -. "Pruned<br/>Angle > 75°" .- RoadNode((Road Node<br/>Deg: 2))
                  RoadNode --- ContRoad((Continuing Road))
                  style Spur fill:#ff9999,stroke:#e74c3c,stroke-dasharray: 5 5,stroke-width:2px
              end`}
          </div>

          <pre><code>{`if (Degree(Node) == 1):
    Neighbor = GetNeighbor(Node)
    
    // 1. Remove stubs extending from major intersections
    if Degree(Neighbor) > 2:
        Prune(Node)
        
    // 2. Remove spurs that turn sharply and lead to dead ends
    else if Degree(Neighbor) == 2:
        if TurnAngle > 75 and NoForwardContinuityFound():
            Prune(Node)`}</code></pre>

          <h3>3.7 Graph Simplification: Straight Vertex Dissolution (Degree-2)</h3>
          <p>Degree-2 nodes sitting on a relatively straight line provide no topological value for pathfinding algorithms; they merely inflate the graph size. The dissolution algorithm identifies any node connected to exactly two other nodes. If the angle between the incoming and outgoing edges is nearly straight (e.g., &gt; 165°), the intermediate vertex is dissolved.</p>
          
          <div className="mermaid">
            {`graph LR
                subgraph Before Dissolution
                    direction LR
                    u((Node u)) -- "Edge 1" --- v((Node v<br/>Degree 2))
                    v -- "Edge 2" --- w((Node w))
                    style v fill:#ff9999,stroke:#333
                end
                
                subgraph After Dissolution
                    direction LR
                    u2((Node u)) -- "Merged Edge<br/>Angle > 165°" --- w2((Node w))
                end`}
          </div>
          
          <pre><code>{`// Identify intermediate nodes with exactly two connections
if (Degree(V) == 2):
    // Calculate the angular deviation between the two connecting segments
    Angle = CalculateAngle(Segment_UV, Segment_VW)

    // If the path is nearly colinear (straight), dissolve the intermediate node
    if (Angle > 165 degrees):
        Disconnect(V, U)
        Disconnect(V, W)
        ConnectDirectly(U, W)
        Delete(V)`}</code></pre>
        </div>

        <div className="section-box" id="solar-simulation">
          <h2>4. Tracking the Sun: High-Fidelity Solar Physics</h2>
          <p>Accurate sun exposure requires realistic astronomical positioning. The simulation system yields high-fidelity sun movement over the annual cycle by utilizing authoritative astronomical datasets rather than simplified mathematical approximations.</p>
          
          <h3>4.1 Binary Data Loading and Cache Locality</h3>
          <p>To avoid the significant overhead of parsing CSVs or calculating complex astronomical formulas at runtime, the simulation relies on pre-compiled binary datasets. When the simulation initializes a new year, it reads the entire year's minute-by-minute solar data into a flat, 1-dimensional array.</p>
          <p>This data structure is deliberately packed linearly as alternating <code>[azimuth, elevation, azimuth, elevation, ...]</code> pairs. This ensures optimal CPU cache locality, allowing the physics engine to poll the sun's position millions of times during the fast-forwarded simulation loop with near-zero I/O latency.</p>
          
          <h3>4.2 Temporal Interpolation Algorithm</h3>
          <p>While the binary dataset provides discrete minute-by-minute solar coordinates, the simulation requires smooth fractional transitions. The simulation engine maps the current floating-point simulation timestamp to exact solar azimuth and elevation angles specific to the geographic latitude.</p>
          <p>By determining the exact current minute and the subsequent minute, the algorithm uses linear interpolation to calculate the sub-minute progress. Crucially, the azimuth interpolation handles circular 360-degree wrapping to prevent the sun from snapping erratically across the sky when crossing north.</p>

          <pre><code>{`// 1. Calculate precise time indices and sub-minute fraction
int currentDay = simulationTime.DayOfYear;
int currentMinuteOfDay = simulationTime.Hour * 60 + simulationTime.Minute;
float minuteFraction = (simulationTime.TimeOfDay.TotalSeconds % 60) / 60.0f;

// 2. O(1) Cache-Friendly Array Lookups
var currentPos = GetPositionFromLinearArray(currentDay, currentMinuteOfDay);
var nextPos = GetPositionFromLinearArray(currentDay, currentMinuteOfDay + 1);

// 3. Fractional Interpolation
// LerpAngle safely interpolates the shortest circular distance (e.g., 359° to 1°)
float interpolatedAzimuth = LerpAngle(currentPos.azimuth, nextPos.azimuth, minuteFraction);
float interpolatedElevation = Lerp(currentPos.elevation, nextPos.elevation, minuteFraction);

// 4. Apply precise solar coordinates to the physics environment light source
ApplyRotation(interpolatedElevation, interpolatedAzimuth);`}</code></pre>
        </div>

        <div className="section-box" id="data-collection">
          <h2>5. The Simulation Loop: Sun Exposure and Tree Shade Collection</h2>
          <p>Unity serves as the physics evaluator for spatial data collection, orchestrating massive arrays of raycasts to detect shadow collisions.</p>
          
          <h3>5.1 Sample Point Generation</h3>
          <p>For every edge in <code>meo_edges</code>, sample points are instantiated at a defined interval (e.g., 2 meters). These points are locked to a normalized elevation to maintain mathematical consistency with the planar graph.</p>
          
          <h3>5.2 Physics Raycasting and Horizontal Angle Mitigation</h3>
          <p>{`During the solar export loop, the simulation iterates through time steps (e.g., every 3 minutes) for specific dates. The core logic relies on high-performance ray detection: at each step, a raycast is fired from a slightly elevated offset above the sample point (\\( \\vec{P} + \\vec{U}_{offset} \\)) strictly toward the inverse direction of the sun (\\( -\\vec{L}_{sun} \\)).`}</p>
          
          <h4>Efficient Ray Detection Mechanism</h4>
          <p>This boolean detection approach is highly efficient because it leverages the physics engine's internal Bounding Volume Hierarchies (BVH). By employing a strict bounding <code>LayerMask</code>, the raycast ignores irrelevant objects and only tests intersections against designated buildings and ground planes. Because the system only requires a boolean outcome (sunlit vs. shadowed), the raycast terminates the instant it detects any collision along the vector, executing in microseconds per point.</p>

          <h4>Solving Abnormal Exposure at Shallow Sun Angles</h4>
          <p>A critical algorithmic challenge arises during early morning or late evening when the sun's elevation angle approaches the horizon (near 0° or 180°). At these shallow angles, horizontal raycasts must traverse enormous physical distances across the 3D urban mesh. This leads to profound numerical instability: a nearly horizontal ray might travel infinitely down a street corridor until the distance traveled exceeds the limit, causing a false positive in sunlight detection, or it might suffer floating-point precision degradation, resulting in erratic collision detection.</p>
          
          <p>To resolve this, the system implements a strict angle validation constraint. By utilizing a 1D Euler angle system, the logic checks the sun's absolute elevation. Because Euler angles naturally map the sky dome from east to west, the system can gracefully trap boundary conditions. If the elevation angle is below a predefined threshold (e.g., <code>&le; threshold</code> for dawn) or beyond the opposing horizon (e.g., <code>&ge; 180 - threshold</code> for dusk), the system forcefully marks the point as "in shadow." This entirely bypasses the expensive and error-prone horizontal raycast computation.</p>

          <h4>Database-Level Temporal Filtering</h4>
          <p>To resolve the remaining early morning and late evening data noise, downstream analytics utilize database-side filtering scripts. By querying specific temporal ranges (e.g., strictly fetching hours in dawn and dusk), the SQL engine aggregates and trims the temporal spikes server-side. This ensures the Pareto-optimization backend receives clean, high-confidence daylight exposure metrics without transferring massive amounts of useless night data across the network.</p>
          
          <h3>5.3 Static Tree Shade Integration via Spatial Clustering</h3>
          <p>While dynamic solar exposure is calculated using the 3D physics engine, static tree shading is resolved entirely within the database environment using 2D spatial operations. This decoupled architecture significantly improves simulation speed by offloading static environmental factors to the SQL engine.</p>
          
          <h4>Proximity-Based Shade Calculation</h4>
          <p>Tree data, including locations and normalized canopy densities (<code>shade_norm</code>), is pre-loaded into the database. To map this shading onto the pedestrian routing graph, a server-side aggregation executes a spatial proximity search. For every high-resolution sample point along the road network, the algorithm utilizes spatial queries (e.g., <code>ST_DWithin</code>) to find all trees within a fixed search radius (e.g., 5.0 meters).</p>
          <p>Because tree canopies provide overlapping shade, the system mathematically sums the <code>shade_norm</code> of all nearby trees. To prevent arbitrary inflation of shade values in dense forests, the total accumulated shade value for a given sample point is strictly clamped to a maximum of 1.0 (representing 100% canopy coverage).</p>

          <div className="mermaid">
            {`graph TD
              subgraph Spatial Tree Search
                  direction LR
                  P((Sample Point)) -. "5m Radius" .- T1((Tree A<br/>shade: 0.4))
                  P -. "5m Radius" .- T2((Tree B<br/>shade: 0.5))
                  P -. "Out of Bounds" .- T3((Tree C<br/>shade: 0.8))
                  style P fill:#e0f7fa,stroke:#00acc1,stroke-width:2px
                  style T1 fill:#e8f5e9,stroke:#4caf50
                  style T2 fill:#e8f5e9,stroke:#4caf50
                  style T3 fill:#ffebee,stroke:#f44336
              end`}
          </div>

          <h4>Edge-Level Aggregation</h4>
          <p>Once individual sample points are assigned a computed tree value, a final aggregation pass sums these values to the parent structural edge. This generates a total static shade coefficient for each road segment, which the Multiobjective Evolutionary Optimizer algorithm can immediately use as a deterministic cost modifier alongside dynamic shadows.</p>

          <pre><code>{`-- 1. Assign tree shade values to individual sample points via 2D spatial clustering
UPDATE sample_points s
SET tree_value = LEAST(COALESCE((
    SELECT SUM(t.shade_norm)
    FROM trees t
    WHERE ST_DWithin(s.geom, t.geom, 5.0) -- 5 meter search radius
), 0.0), 1.0);

-- 2. Aggregate the cumulative static shade to the routing edges
UPDATE edges e
SET total_tree_value = COALESCE((
    SELECT SUM(s.tree_value)
    FROM sample_points s
    WHERE s.edge_id = e.id
), 0.0);`}</code></pre>
        </div>

        <div className="section-box" id="data-pipeline">
          <h2>6. The Data Pipeline: Scaling I/O and Memory Performance</h2>
          <p>Rather than attempting to calculate complex 3D ray-mesh intersections in Python, the simulation operates as an upstream geometric data feeder. Handling massive urban environmental data requires strict architectural optimizations to prevent memory exhaustion, network bottlenecks, and UI freezing.</p>
          
          <h3>6.1 Asynchronous Execution and Multi-Process Pipeline</h3>
          <p>The simulation utilizes asynchronous coroutines (e.g., yielding execution across frames) to distribute the massive raycasting workload. While the physics API relies on the main CPU thread, this asynchronous yielding prevents the application from freezing. More importantly, it creates a true <strong>multi-process pipeline</strong>: while the physics engine (Producer) utilizes local CPU cores to calculate spatial intersections, the database (Consumer) simultaneously utilizes server-side CPU cores to handle heavy data aggregation. This concurrent processing drastically reduces overall execution time.</p>

          <div className="mermaid">
            {`sequenceDiagram
              participant U as Physics Engine (Producer)
              participant M as Local RAM Buffer
              participant DB as Database (Consumer)
              
              loop Every 3 Simulation Minutes
                  U->>U: Execute Raycasts
                  U->>M: Append boolean results
              end
              
              note over U,M: Incremental 3-Hour Flush
              U->>DB: Stream buffer via COPY protocol
              M->>M: Clear memory (Garbage Collection safe)
              DB->>DB: Asynchronous Server-Side SQL Aggregation`}
          </div>

          <h3>6.2 Strict Memory Management (Incremental Buffering)</h3>
          <p>If the system attempted to store an entire year's worth of raycast data in RAM before exporting, it would immediately trigger Garbage Collection (GC) crashes and out-of-memory errors. To use memory space wisely, the system implements an <strong>incremental 3-hour buffer flush</strong>.</p>
          <p>By flushing the data queue every 3 in-simulation hours, the local list never exceeds a few hundred thousand lightweight tuples. This strict bounding guarantees that the peak RAM consumption for the data pipeline remains consistently under ~250MB regardless of whether the simulation runs for 1 day or a full year.</p>

          <h3>6.3 Efficient I/O via Bulk Protocols</h3>
          <p>To maximize execution speed, the pipeline abandons traditional transactional <code>INSERT</code> statements. Instead, it utilizes PostgreSQL's native bulk-copy protocol (e.g., <code>COPY FROM STDIN CSV</code>). By streaming the buffered data directly as a raw text block, it bypasses SQL parsing overhead and dramatically reduces network latency.</p>
          <p>Once a 3-hour block is uploaded, the simulation triggers an immediate server-side aggregation command. This collapses the millions of individual sample booleans into edge-level exposure metrics entirely within the database. Because this aggregation happens server-side, the raw sample data never travels back across the network.</p>
        </div>

        <div className="section-box" id="metrics">
          <h2>7. Results and Scale: Processing 1.57 Billion Data Points</h2>
          <p>The combination of the BVH-optimized physics engine, asynchronous multi-process execution, strict local buffer constraints, and PostgreSQL bulk I/O achieves massive scalability.</p>

          <h3>7.1 Urban Scale and Graph Complexity</h3>
          <p>The road graph and static environmental datasets feature the following structural scale:</p>
          <ul>
            <li><strong>Nodes (Waypoints):</strong> 4,168 intersections and endpoints.</li>
            <li><strong>Road Segments (Edges):</strong> 6,700 topological connections.</li>
            <li><strong>Simulation Sample Points:</strong> 365,133 points generated at exactly 2-meter spacing along all edges.</li>
            <li><strong>Urban Trees:</strong> 1,280,954 individual tree canopies used for spatial shade integration.</li>
          </ul>

          <h3>7.2 Simulation Throughput (1.57 Billion Raycasts)</h3>
          <p>The system was configured to simulate 12 representative days (one day per month) across the annual cycle. The simulation iterated in 3-minute intervals from 03:00 to 21:00, resulting in 360 temporal steps per day.</p>
          <ul>
            <li><strong>Total Raycast Volume:</strong> 365,133 sample points &times; 360 steps &times; 12 days = <strong>1.577 billion individual raycasts</strong>.</li>
            <li><strong>Execution Time:</strong> Thanks to asynchronous yielding and the optimized Producer-Consumer architecture, the entire simulation—including physical raycasting, 3-hour buffer flushing, and database bulk uploading via the <code>COPY</code> protocol—successfully finished in <strong>6 hours</strong>.</li>
            <li><strong>Throughput:</strong> This represents a sustained computational and I/O pipeline speed of roughly <strong>262.8 million raycasts per hour</strong> (or ~73,000 raycasts per second).</li>
          </ul>

          <h3>7.3 Database Size and Aggregation Efficiency</h3>
          <p>The raw boolean exposure results for all 1.57 billion raycasts are streamed continuously into the <code>exposure_samples</code> table, resulting in a database size of approximately <strong>110 GB</strong>.</p>
          
          <p>{`However, querying 110 GB of point-level data dynamically during downstream pathfinding is computationally unfeasible. The server-side SQL aggregation completely resolves this bottleneck by mathematically collapsing the 1.57 billion sample booleans into edge-level metrics (exposure_edges). This instantly reduces the operational data size from 110 GB down to just 2.09 GB. By shifting this massive summation workload to the C-optimized database engine during the Unity execution loop, the system ensures that downstream multi-objective algorithms can query lightweight, pre-computed edge costs with \\( O(1) \\) efficiency.`}</p>
        </div>

        <div className="section-box" id="qa">
          <h2>8. Technical Q&A</h2>
          
          <div className="qa-item">
            <h3>Q: Why use Unity for a data-heavy simulation instead of building a dedicated C++/CUDA raycaster?</h3>
            <p>It was a trade-off between absolute performance and development velocity. Unity's high-level physics API (PhysX) and Bounding Volume Hierarchy (BVH) optimizations provided more than enough throughput for our simulation window. The MEO tables are generated and permenantly stored before the actual user requests arrive so it does not matter if it takes a relatively long time to generate all the data.  More importantly, Unity enables use to inspect the simulation visually in 3D, which was invaluable for debugging "weird" shadow results that would have been invisible in a headless CLI tool.</p>
          </div>

          <div className="qa-item">
            <h3>Q: 1.5 billion data points is a lot for a standard database. How did you prevent the pipeline from becoming an I/O bottleneck?</h3>
            <p>We treated the simulation like a high-throughput stream rather than a series of DB transactions. We implemented a 3-hour (in-sim) buffer that flushed via PostgreSQL's <code>COPY</code> protocol. This bypasses the SQL parsing overhead of <code>INSERT</code> statements. By offloading the heavy aggregation (from boolean samples to edge costs) to the database's C-optimized core, we kept the local simulation footprint under 250MB RAM while maintaining 73k raycasts/sec.</p>
          </div>

          <div className="qa-item">
            <h3>Q: Why solve for a Pareto frontier instead of just using a weighted sum of distance and shade?</h3>
            <p>A weighted sum (Distance * α + Shade * β) forces a single "best" path on the user, but "best" is subjective. One user might be in a hurry (Distance-heavy), while another might be carrying groceries and desperately needs shade (Shade-heavy). By computing the Pareto frontier, we empower the frontend to offer a range of optimal choices. It's a more robust architectural decision that separates the objective physics from the subjective user preference.</p>
          </div>

          <div className="qa-item">
            <h3>Q: Why pre-generate the entire road graph with fixed nodes instead of dynamically building a graph based on the user's specific origin and destination?</h3>
            <p>This is a classic architectural trade-off between flexibility and system performance. From an engineering standpoint, using a fixed, pre-calculated graph is the industrial standard for large-scale routing. It allows us to pre-compute and cache complex environmental metrics such as our 1.5 billion solar samples onto a stable set of edges. If we generated the graph on the fly, we'd lose all cache efficiency and face massive real-time computational overhead. Instead, we follow the standard approach by snapping the user's origin and destination to the nearest nodes in our optimized network. This keeps the data pipeline clean and ensures the search space remains predictable and high-performance.</p>
          </div>

          <div className="qa-item">
            <h3>Q: If you had to scale this to a 10x larger city or real-time updates, what would you change?</h3>
            <p>I'd move the raycasting to Compute Shaders (GPU) and explore Voxel-based GI or Signed Distance Fields (SDFs) for faster shadow lookups. On the data side, we'd transition from a relational PostGIS setup to a specialized time-series or columnar storage like ClickHouse or Apache Pinot to handle the aggregation of trillions of points without pre-computation lag.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
