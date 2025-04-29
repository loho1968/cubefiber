'use client'
import { Button } from "antd";
import Image from "next/image";
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Stats, OrbitControls, Environment } from '@react-three/drei'
export default function Home() {
  function Cube({ position }) {
    const colors = ['#009E60', '#0051BA', '#FFD500', '#FFFFFF', '#C41E3A', '#FF5800'] // R L U D F B
    return (
      <>
        <mesh position={position}>
          <boxGeometry args={[0.95, 0.95, 0.95]} />
          <meshStandardMaterial attach="material-0" color={colors[0]} roughness={0.2} metalness={0.1} /> {/* right */}
          <meshStandardMaterial attach="material-1" color={colors[1]} roughness={0.2} metalness={0.1} /> {/* left */}
          <meshStandardMaterial attach="material-2" color={colors[2]} roughness={0.2} metalness={0.1} /> {/* top */}
          <meshStandardMaterial attach="material-3" color={colors[3]} roughness={0.2} metalness={0.1} /> {/* bottom */}
          <meshStandardMaterial attach="material-4" color={colors[4]} roughness={0.2} metalness={0.1} /> {/* front */}
          <meshStandardMaterial attach="material-5" color={colors[5]} roughness={0.2} metalness={0.1} /> {/* back */}
        </mesh>
      </>
    )
  }
  function Rubik(){
    return (
      <group >
      {[...Array(3).keys()].map((x) =>
        [...Array(3).keys()].map((y) => 
          [...Array(3).keys()].map((z) => 
          <Cube key={x + y * 3 + z * 9} position={[x - 1, y - 1, z - 1]} />
              )
          )
      )}
    </group>
      
    )
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     <Button type="primary">Primary Button</Button>
     <Canvas shadows camera={{position:[10,10,15], fov:30}}>
      <OrbitControls/>
      <ambientLight intensity={1.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <Rubik />
     </Canvas>
    </div>
  );
}
