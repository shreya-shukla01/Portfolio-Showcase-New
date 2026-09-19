import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, Points, PointMaterial } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const technologies = [
  { label: "React", position: [-2.25, 1.35, 0.35] },
  { label: "Node.js", position: [2.2, 1.05, -0.2] },
  { label: "TypeScript", position: [-2.35, -1.1, -0.4] },
  { label: "AI", position: [0.15, 2.35, -0.65] },
  { label: "API", position: [2.45, -0.85, 0.4] },
  { label: "Database", position: [0.2, -2.35, -0.3] },
] as const;

function ResponsiveCamera({ compact }: { compact: boolean }) {
  const { camera, size } = useThree();

  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    camera.position.set(0, compact ? 0.08 : 0, compact ? 8.4 : 7.4);
    camera.fov = compact ? 52 : 43;
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
  }, [camera, compact, size.height, size.width]);

  return null;
}

function SystemCore({ compact }: { compact: boolean }) {
  const group = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Group>(null);
  const nodes = useMemo(
    () =>
      Array.from({ length: 30 }, (_, index) => {
        const phi = Math.acos(-1 + (2 * index) / 29);
        const theta = Math.sqrt(30 * Math.PI) * phi;
        return new THREE.Vector3(
          Math.cos(theta) * Math.sin(phi),
          Math.sin(theta) * Math.sin(phi),
          Math.cos(phi),
        ).multiplyScalar(1.68);
      }),
    [],
  );
  const connections = useMemo(
    () =>
      nodes.flatMap((node, index) =>
        nodes
          .slice(index + 1)
          .filter((other) => node.distanceTo(other) < 1.04)
          .map((other) => [node, other] as const),
      ),
    [nodes],
  );
  const particlePositions = useMemo(() => {
    const values = new Float32Array(110 * 3);
    for (let index = 0; index < 110; index += 1) {
      const radius = 2.9 + ((index * 17) % 70) / 45;
      const angle = index * 2.399;
      values[index * 3] = Math.cos(angle) * radius;
      values[index * 3 + 1] = Math.sin(index * 1.37) * 2.55;
      values[index * 3 + 2] = Math.sin(angle) * radius;
    }
    return values;
  }, []);
  const systemLinks = useMemo(
    () =>
      technologies.map(
        ({ position }) => [new THREE.Vector3(0, 0, 0), new THREE.Vector3(...position)] as const,
      ),
    [],
  );

  useFrame(({ pointer, clock }, rawDelta) => {
    const current = group.current;
    if (!current) return;
    const delta = Math.min(rawDelta, 0.05);
    current.rotation.y += delta * 0.1;
    current.rotation.x = THREE.MathUtils.damp(current.rotation.x, pointer.y * 0.13, 4, delta);
    current.rotation.z = THREE.MathUtils.damp(current.rotation.z, -pointer.x * 0.07, 4, delta);
    current.position.x = THREE.MathUtils.damp(current.position.x, pointer.x * 0.2, 3, delta);
    current.position.y = THREE.MathUtils.damp(current.position.y, pointer.y * 0.14, 3, delta);
    if (halo.current) halo.current.rotation.z = clock.elapsedTime * -0.045;
  });

  return (
    <group ref={group} scale={compact ? 0.74 : 1}>
      <mesh scale={0.78}>
        <icosahedronGeometry args={[1.55, 3]} />
        <meshStandardMaterial
          color="#75d9ec"
          emissive="#147b91"
          emissiveIntensity={0.38}
          roughness={0.28}
          metalness={0.7}
          wireframe
          transparent
          opacity={0.38}
        />
      </mesh>
      <mesh scale={0.46}>
        <icosahedronGeometry args={[1.48, 2]} />
        <meshStandardMaterial
          color="#d3ff79"
          emissive="#769c28"
          emissiveIntensity={0.52}
          roughness={0.22}
          metalness={0.72}
        />
      </mesh>
      {connections.map(([start, end], index) => (
        <Line
          key={index}
          points={[start, end]}
          color="#62d7ef"
          transparent
          opacity={0.24}
          lineWidth={0.65}
        />
      ))}
      {nodes.map((position, index) => (
        <group key={index} position={position}>
          <mesh>
            <sphereGeometry args={[index % 7 === 0 ? 0.065 : 0.035, 10, 10]} />
            <meshBasicMaterial color={index % 7 === 0 ? "#d7ff73" : "#8be8ff"} />
          </mesh>
        </group>
      ))}
      <group ref={halo} rotation={[0.76, 0.18, 0]}>
        <mesh>
          <torusGeometry args={[2.18, 0.012, 8, 96]} />
          <meshBasicMaterial color="#8be8ff" transparent opacity={0.38} />
        </mesh>
        <mesh rotation={[0.92, 0.25, 0.5]}>
          <torusGeometry args={[2.62, 0.008, 8, 96]} />
          <meshBasicMaterial color="#d7ff73" transparent opacity={0.2} />
        </mesh>
      </group>
      {systemLinks.map(([start, end], index) => (
        <Line
          key={`system-${technologies[index]?.label}`}
          points={[start, end]}
          color={index % 2 ? "#d7ff73" : "#8be8ff"}
          transparent
          opacity={0.12}
          lineWidth={0.5}
        />
      ))}
      {technologies.map(({ label, position }, index) => (
        <group key={label} position={position}>
          <mesh>
            <octahedronGeometry args={[index === 3 ? 0.15 : 0.11, 0]} />
            <meshStandardMaterial
              color={index % 2 ? "#d7ff73" : "#8be8ff"}
              emissive={index % 2 ? "#5b771e" : "#126779"}
              emissiveIntensity={0.7}
              roughness={0.3}
              metalness={0.5}
            />
          </mesh>
          <mesh scale={1.8}>
            <octahedronGeometry args={[index === 3 ? 0.15 : 0.11, 0]} />
            <meshBasicMaterial
              color={index % 2 ? "#d7ff73" : "#8be8ff"}
              wireframe
              transparent
              opacity={0.22}
            />
          </mesh>
        </group>
      ))}
      <Points positions={particlePositions} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#8be8ff"
          size={0.022}
          sizeAttenuation
          depthWrite={false}
          opacity={0.44}
        />
      </Points>
    </group>
  );
}

export function HeroScene() {
  const reduced = useReducedMotion();
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 680px)");
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  if (reduced) return null;

  return (
    <div className="absolute inset-0 hero-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7.4], fov: 43 }}
        dpr={[1, 1.35]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ResponsiveCamera compact={compact} />
        <ambientLight intensity={0.52} />
        <pointLight position={[3, 3, 4]} color="#8be8ff" intensity={8} distance={12} />
        <pointLight position={[-3, -2, 3]} color="#d7ff73" intensity={5} distance={10} />
        <SystemCore compact={compact} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0">
        {technologies.map(({ label }, index) => (
          <span key={label} className={`scene-label scene-label-${index + 1}`}>
            <i />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
