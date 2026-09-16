import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Html, useProgress, Bounds, Center, Grid, Resize } from '@react-three/drei';
import * as THREE from 'three';
import { ComponentInfo, componentData } from '../data/components';

function ESP32Model({ 
  onSelectComponent,
  setClickedPoint
}: { 
  onSelectComponent: (info: ComponentInfo | null) => void,
  setClickedPoint: (p: THREE.Vector3 | null) => void 
}) {
  const { scene } = useGLTF('/esp32.glb');

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  const handleClick = (e: any) => {
    e.stopPropagation();
    const meshName = e.object.name;
    
    const componentInfo = Object.values(componentData).find(
      (comp) => meshName.includes(comp.id) || comp.id.includes(meshName)
    );

    if (componentInfo) {
      onSelectComponent(componentInfo);
      setClickedPoint(e.point.clone());
    } else {
      console.log(`Clicked unmapped part: ${meshName}`);
    }
  };

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    document.body.style.cursor = 'auto';
  };

  return (
    <primitive 
      object={scene} 
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
}

useGLTF.preload('/esp32.glb');

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white font-mono text-xl whitespace-nowrap bg-black/50 p-4 rounded-lg backdrop-blur-md border border-white/10">
        Loading 3D Model: {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

function LineTracker({ 
  clickedPoint, 
  lineRef, 
  dotRef 
}: { 
  clickedPoint: THREE.Vector3 | null, 
  lineRef: React.RefObject<SVGLineElement | null>, 
  dotRef: React.RefObject<SVGCircleElement | null> 
}) {
  const { camera, size } = useThree();
  const vec = useRef(new THREE.Vector3());

  useFrame(() => {
    if (clickedPoint && lineRef.current && dotRef.current) {
      // 1. Project 3D point to 2D screen space
      vec.current.copy(clickedPoint);
      vec.current.project(camera);

      // Convert to CSS pixels
      const x = (vec.current.x * 0.5 + 0.5) * size.width;
      const y = (-(vec.current.y * 0.5) + 0.5) * size.height;

      // 2. Get the target UI card coordinates
      const uiCard = document.getElementById('ui-card');
      let targetX = 0;
      let targetY = 0;

      if (uiCard) {
        const rect = uiCard.getBoundingClientRect();
        
        if (window.innerWidth < 768) {
          // Mobile: point to top center of the bottom sheet
          targetX = rect.left + rect.width / 2;
          targetY = rect.top;
        } else {
          // Desktop: point to middle of the left edge
          targetX = rect.left;
          targetY = rect.top + rect.height / 2;
        }
      }

      // 3. Check if point is behind camera (z > 1 in NDC space)
      if (vec.current.z > 1) {
        lineRef.current.style.display = 'none';
        dotRef.current.style.display = 'none';
      } else {
        lineRef.current.style.display = 'block';
        dotRef.current.style.display = 'block';
        
        // Update SVG circle (dot on the 3D model)
        dotRef.current.setAttribute('cx', x.toString());
        dotRef.current.setAttribute('cy', y.toString());

        // Update SVG line (from 3D model to UI card)
        lineRef.current.setAttribute('x1', x.toString());
        lineRef.current.setAttribute('y1', y.toString());
        lineRef.current.setAttribute('x2', targetX.toString());
        lineRef.current.setAttribute('y2', targetY.toString());
      }
    }
  });

  return null;
}

interface ModelCanvasProps {
  onSelectComponent: (info: ComponentInfo | null) => void;
  setClickedPoint: (p: THREE.Vector3 | null) => void;
  clickedPoint: THREE.Vector3 | null;
  lineRef: React.RefObject<SVGLineElement | null>;
  dotRef: React.RefObject<SVGCircleElement | null>;
}

function GridRoom() {
  const gridConfig = {
    cellSize: 1, 
    cellThickness: 1,
    cellColor: '#3f3f46', 
    sectionSize: 5, 
    sectionThickness: 1.5,
    sectionColor: '#52525b', 
    fadeDistance: 100000, // Massive distance to completely disable the circular fade
    fadeStrength: 0, // Disable fade strength
  };

  // Distance from center to each wall (closer to the model)
  const roomSize = 8; 
  // Size of each grid plane
  const planeSize = 40;

  return (
    <group>
      {/* Floor */}
      <Grid position={[0, -roomSize, 0]} rotation={[0, 0, 0]} args={[planeSize, planeSize]} {...gridConfig} />
      {/* Ceiling */}
      <Grid position={[0, roomSize, 0]} rotation={[Math.PI, 0, 0]} args={[planeSize, planeSize]} {...gridConfig} />
      {/* Back Wall */}
      <Grid position={[0, 0, -roomSize]} rotation={[Math.PI / 2, 0, 0]} args={[planeSize, planeSize]} {...gridConfig} />
      {/* Front Wall */}
      <Grid position={[0, 0, roomSize]} rotation={[-Math.PI / 2, 0, 0]} args={[planeSize, planeSize]} {...gridConfig} />
      {/* Left Wall */}
      <Grid position={[-roomSize, 0, 0]} rotation={[0, 0, -Math.PI / 2]} args={[planeSize, planeSize]} {...gridConfig} />
      {/* Right Wall */}
      <Grid position={[roomSize, 0, 0]} rotation={[0, 0, Math.PI / 2]} args={[planeSize, planeSize]} {...gridConfig} />
    </group>
  );
}

export function ModelCanvas({ onSelectComponent, setClickedPoint, clickedPoint, lineRef, dotRef }: ModelCanvasProps) {
  return (
    <Canvas
      camera={{ position: [5, 5, 5], fov: 45, near: 0.01, far: 10000 }}
      shadows
      onPointerMissed={() => {
        onSelectComponent(null);
        setClickedPoint(null);
      }}
    >
      <color attach="background" args={['#27272a']} />
      
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
      />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      
      <Environment preset="city" />

      <React.Suspense fallback={<Loader />}>
        <Bounds fit observe margin={1.2}>
          {/* Resize forces the model to be exactly 5 units wide, fixing all zoom and clipping bugs! */}
          <Resize scale={5}>
            <Center>
              <ESP32Model onSelectComponent={onSelectComponent} setClickedPoint={setClickedPoint} />
            </Center>
          </Resize>
        </Bounds>
      </React.Suspense>

      {/* 360-degree Holodeck Grid Environment */}
      <GridRoom />

      <LineTracker clickedPoint={clickedPoint} lineRef={lineRef} dotRef={dotRef} />

      <OrbitControls 
        makeDefault
        enablePan={false}
        enableZoom={true}
        minDistance={2}
        maxDistance={12}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}
