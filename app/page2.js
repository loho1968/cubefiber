'use client'
import { Button } from "antd";
import Image from "next/image";
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Stats, OrbitControls, Environment, useTexture } from '@react-three/drei'

export default function Home() {
  function Cube({ position }) {
    const texture = useTexture('/cubeSprite.png')
    
    // 创建6个不同的纹理，对应图片中的不同区域
    const textures = [
      new THREE.Texture(), // right - 绿色
      new THREE.Texture(), // left - 蓝色
      new THREE.Texture(), // top - 黄色
      new THREE.Texture(), // bottom - 白色
      new THREE.Texture(), // back - 橙色
      new THREE.Texture(), // front - 红色
    ]
    
    // 设置每个纹理的偏移和重复
    textures.forEach((tex, index) => {
      tex.image = texture.image
      tex.needsUpdate = true
      tex.offset.set(0, 1 - (index + 1) / 7)
      tex.repeat.set(1, 1/7)
    })
    
    return (
      <group position={position}>
        <mesh>
          <boxGeometry args={[0.95, 0.95, 0.95]} />
          {/* 增加材质的metalness和roughness参数来调整反光效果 */}
          <meshStandardMaterial attach="material-0" map={textures[0]} metalness={0.1} roughness={0.3} /> {/* right */}
          <meshStandardMaterial attach="material-1" map={textures[1]} metalness={0.1} roughness={0.3} /> {/* left */}
          <meshStandardMaterial attach="material-2" map={textures[2]} metalness={0.1} roughness={0.3} /> {/* top */}
          <meshStandardMaterial attach="material-3" map={textures[3]} metalness={0.1} roughness={0.3} /> {/* bottom */}
          <meshStandardMaterial attach="material-4" map={textures[5]} metalness={0.1} roughness={0.3} /> {/* back */}
          <meshStandardMaterial attach="material-5" map={textures[4]} metalness={0.1} roughness={0.3} /> {/* front */}
        </mesh>
      </group>
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
      {/* 增加环境光强度 */}
      <ambientLight intensity={1.0} />
      {/* 增加主平行光强度并调整位置 */}
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      {/* 添加补充光源 */}
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <pointLight position={[0, 0, 10]} intensity={0.5} />
      <Rubik />
      {/* 添加环境贴图以增加整体光照效果 */}
      <Environment preset="sunset" />
     </Canvas>
    </div>
  );
}
