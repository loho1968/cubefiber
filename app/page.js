'use client'
import { Button } from "antd";
import Image from "next/image";
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Stats, OrbitControls, Environment, Text } from '@react-three/drei'

export default function Home() {
  function Cube({ position }) {
    const colors = ['#009E60', '#0051BA', '#FFD500', '#FFFFFF', '#C41E3A', '#FF5800'] // R L U D F B
    
    // 计算编码
    const getLabel = (face, pos) => {
      const [x, y, z] = pos;
      
      // 上层 (U)
      if (y === 1) {
        if (x === -1) return 'UL'
        if (x === 0) return 'UC'
        if (x === 1) return 'UR'
      }
      
      // 中层 (M)
      if (y === 0) {
        if (x === -1) return 'ML'
        if (x === 0) return 'MC'
        if (x === 1) return 'MR'
      }
      
      // 下层 (D)
      if (y === -1) {
        if (x === -1) return 'DL'
        if (x === 0) return 'DC'
        if (x === 1) return 'DR'
      }
      
      return ''
    }

    return (
      <>
        <mesh position={position}>
          <boxGeometry args={[0.95, 0.95, 0.95]} />
          <meshPhongMaterial attach="material-0" color={colors[0]} shininess={100} specular="#ffffff" />
          <meshPhongMaterial attach="material-1" color={colors[1]} shininess={100} specular="#ffffff" />
          <meshPhongMaterial attach="material-2" color={colors[2]} shininess={100} specular="#ffffff" />
          <meshPhongMaterial attach="material-3" color={colors[3]} shininess={100} specular="#ffffff" />
          <meshPhongMaterial attach="material-4" color={colors[4]} shininess={100} specular="#ffffff" />
          <meshPhongMaterial attach="material-5" color={colors[5]} shininess={100} specular="#ffffff" />
        </mesh>
        
        {/* 上面编码 */}
        <Text 
          position={[position[0], position[1] + 0.48, position[2]]} 
          rotation={[Math.PI/2, 0, 0]} 
          fontSize={0.2} 
          color="black"
        >
          {getLabel('U', position)}
        </Text>

        {/* 前面编码 */}
        <Text 
          position={[position[0], position[1], position[2] + 0.48]} 
          rotation={[0, 0, 0]} 
          fontSize={0.2} 
          color="black"
        >
          {getLabel('F', position)}
        </Text>

        {/* 右面编码 */}
        <Text 
          position={[position[0] + 0.48, position[1], position[2]]} 
          rotation={[0, Math.PI/2, 0]} 
          fontSize={0.2} 
          color="black"
        >
          {getLabel('R', position)}
        </Text>

        {/* 左面编码 */}
        <Text 
          position={[position[0] - 0.48, position[1], position[2]]} 
          rotation={[0, -Math.PI/2, 0]} 
          fontSize={0.2} 
          color="black"
        >
          {getLabel('L', position)}
        </Text>

        {/* 下面编码 */}
        <Text 
          position={[position[0], position[1] - 0.48, position[2]]} 
          rotation={[-Math.PI/2, 0, 0]} 
          fontSize={0.2} 
          color="black"
        >
          {getLabel('D', position)}
        </Text>

        {/* 后面编码 */}
        <Text 
          position={[position[0], position[1], position[2] - 0.48]} 
          rotation={[0, Math.PI, 0]} 
          fontSize={0.2} 
          color="black"
        >
          {getLabel('B', position)}
        </Text>
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
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="h-[48px] shrink-0 bg-gray-800 text-white flex items-center px-6">
        <h1>Cube Fiber</h1>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 gap-4 p-2 min-h-0">
        {/* Left Panel - 30% */}
        <div className="w-[30%] bg-gray-100 rounded-lg p-4 overflow-auto">
          <Button type="primary">Primary Button</Button>
        </div>

        {/* Right Panel - 70% with Canvas */}
        <div className="w-[70%] flex items-center justify-center rounded-lg">
          <div className="w-full h-full" style={{ aspectRatio: '1/1', maxHeight: 'calc(100vh - 96px - 16px)' }}>
            <Canvas 
              shadows 
              camera={{
                position: [8, 8, 12],
                fov: 25,
                near: 0.1,
                far: 1000
              }}
              style={{
                width: '100%',
                height: '100%'
              }}
            >
              <OrbitControls/>
              <ambientLight intensity={0.7} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <directionalLight position={[-5, -5, -5]} intensity={1} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Rubik />
            </Canvas>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-[48px] shrink-0 bg-gray-800 text-white flex items-center justify-center">
        <p>© 2024 Cube Fiber</p>
      </footer>
    </div>
  );
}
