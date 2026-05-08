import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Float, MeshReflectorMaterial, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import type { Project } from '../../../data/projects';

interface ThreeMarqueeProps {
  projects: Project[];
  onCardClick: (project: Project) => void;
}

const ThreeMarquee: React.FC<ThreeMarqueeProps> = ({ projects, onCardClick }) => {
  return (
    <div className="h-[600px] w-full relative bg-background overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 40 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#0a0a0a']} />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Suspense fallback={null}>
          <MarqueeProjects projects={projects} onCardClick={onCardClick} />
          
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
            <planeGeometry args={[100, 100]} />
            <MeshReflectorMaterial
              blur={[300, 100]}
              resolution={1024}
              mixBlur={1}
              mixStrength={40}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#050505"
              metalness={0.5}
              mirror={1}
            />
          </mesh>
        </Suspense>
      </Canvas>
      
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10"></div>
    </div>
  );
};

const MarqueeProjects = ({ projects, onCardClick }: ThreeMarqueeProps) => {
  const { viewport } = useThree();
  const scroll = useRef(0);

  useFrame((state, delta) => {
    scroll.current += delta * 0.5;
  });

  return (
    <group>
      {projects.map((project, i) => (
        <CardWrapper 
          key={project.id}
          project={project}
          index={i}
          total={projects.length}
          scroll={scroll}
          viewport={viewport}
          onCardClick={onCardClick}
        />
      ))}
    </group>
  );
};

const CardWrapper = ({ project, index, total, scroll, viewport, onCardClick }: any) => {
  const ref = useRef<THREE.Group>(null);
  const [opacity, setOpacity] = useState(1);
  const [isActive, setIsActive] = useState(false);

  useFrame(() => {
    if (!ref.current) return;
    
    let pos = (index - scroll.current) % total;
    while (pos < -total / 2) pos += total;
    while (pos > total / 2) pos -= total;

    const x = pos * (viewport.width > 10 ? 8 : 6);
    const z = -Math.abs(pos) * 6;
    const s = 1.2 - Math.abs(pos) * 0.4;
    const op = 1 - Math.abs(pos) * 0.8;
    
    ref.current.position.set(x, 0, z);
    ref.current.scale.setScalar(Math.max(0.1, s));
    ref.current.visible = Math.abs(pos) < 2;
    
    if (Math.abs(opacity - op) > 0.01) setOpacity(op);
    const active = Math.abs(pos) < 0.5;
    if (active !== isActive) setIsActive(active);
  });

  return (
    <group ref={ref}>
      <Float speed={isActive ? 2 : 0.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <RoundedBox 
          args={[4.5, 3.2, 0.1]} 
          radius={0.4} 
          smoothness={4} 
          onClick={() => onCardClick(project)}
        >
          <meshStandardMaterial 
            color={project.color || "#4e46e5"} 
            transparent 
            opacity={opacity} 
            metalness={0.5}
            roughness={0.2}
          />
        </RoundedBox>
        <RoundedBox 
          args={[1.6, 0.8, 0.1]} 
          radius={0.2} 
          smoothness={4}
          position={[-1.3, 1.6, 0]}
        >
          <meshStandardMaterial 
            color={project.color || "#4e46e5"} 
            transparent 
            opacity={opacity}
            metalness={0.5}
            roughness={0.2}
          />
        </RoundedBox>
        <Text
          position={[0, 0, 0.12]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={3.8}
          textAlign="center"
          fillOpacity={opacity}
          fontWeight="bold"
        >
          {project.title.toUpperCase()}
        </Text>
      </Float>
    </group>
  );
};

export default ThreeMarquee;
