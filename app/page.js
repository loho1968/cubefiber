'use client'
import '@ant-design/v5-patch-for-react-19';
import { Button } from "antd";
import Image from "next/image";
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Stats, OrbitControls, Environment, Text } from '@react-three/drei'
import { useState, useRef } from 'react'

//重点参考
//https://github.com/starkeyyyy/3d-Rubiks-cube 


//https://blog.songxingguo.com/posts/tech/react-three-fiber-cube/
//https://abhtri.medium.com/rubiks-cube-in-react-three-fiber-0e8d81fae769
//https://medium.com/@nicholasrogers_98170/building-a-rubiks-cube-in-react-three-js-and-good-ole-javascript-96649d1172d9
//https://github.com/selfboot/ai_gallery


export default function Home() {

 function rotateULayer(){
  
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
          <div className="space-y-4">
            <Button type="primary" onClick={rotateULayer}>
              旋转U层
            </Button>
          </div>
        </div>

        {/* Right Panel - 70% with Canvas */}
        <div className="w-[70%] flex items-center justify-center rounded-lg">
          <div className="w-full h-full" style={{ aspectRatio: '1/1', maxHeight: 'calc(100vh - 96px - 16px)' }}>
           
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
