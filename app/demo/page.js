"use client";
import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

//参考文章：https://zhuanlan.zhihu.com/p/615965916

export default function Home() {
  function Cube(props) {
    // Use useRef hook to access the mesh element
    const mesh = useRef();

    // State values for hover
    const [hovered, setHover] = useState(false);

    //Basic animation to rotate our cube using animation frame
    useFrame(() => (mesh.current.rotation.x += 0.01));

    // Jsx to render our 3d cube. Our cube will have height
    // width and depth equal 2 units.
    // You also need a material so that you can add color
    // and show shadows. We are using the standard
    // material <<meshStandardMaterial />

    return (
      <mesh
        ref={mesh}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
      >
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
      </mesh>
    );
  }

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Cube />
    </Canvas>
  );
}
