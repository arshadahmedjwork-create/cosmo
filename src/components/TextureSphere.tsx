import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Environment, Float } from "@react-three/drei";

import cremaNovaTexture from "@/assets/images/BEIGES AND CREAM/Crema-Nova-min-min.jpeg";

interface SphereProps {
    textureUrl: string;
}

const RotatingSphere = ({ textureUrl }: SphereProps) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useLoader(THREE.TextureLoader, textureUrl);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002;
            meshRef.current.rotation.x += 0.001;
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[2, 64, 64]} />
            <meshStandardMaterial
                map={texture}
                roughness={0.15}
                metalness={0.2}
                envMapIntensity={1.2}
            />
        </mesh>
    );
};

export const TextureSphere = ({
    textureUrl = cremaNovaTexture,
    className = "w-12 h-12 md:w-16 md:h-16 relative cursor-pointer"
}: {
    textureUrl?: string;
    className?: string;
}) => {
    return (
        <div className={className}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
                <Environment preset="city" />
                <directionalLight position={[5, 5, 5]} intensity={0.5} />
                <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
                    <RotatingSphere textureUrl={textureUrl} />
                </Float>
                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    );
};

export default TextureSphere;
