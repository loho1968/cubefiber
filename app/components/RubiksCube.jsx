import * as THREE from "three";
import { useRef, useState, useEffect, createRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text , RoundedBox } from "@react-three/drei";


// 导入所有魔方旋转相关的函数
import {
  rotateBackClockwise,
  rotateBackCounterclockwise,
  rotateFrontClockwise,
  rotateFrontCounterclockwise,
  rotateDownClockwise,
  rotateDownCounterclockwise,
  rotateLeftClockwise,
  rotateLeftCounterclockwise,
  rotateRightClockwise,
  rotateRightCounterclockwise,
  rotateUpClockwise,
  rotateUpCounterclockwise,
  rotateFullCubeClockwise,
  rotateFullCubeCounterclockwise
} from "./rotation"; // 从rotation.js导入2D魔方的旋转函数
let count=1
const Cube = ({ position, refProp ,blindCode}) => {
  const stickerOffset = 0.535; // 贴纸偏移量，略高于方块表面
  count++
  function GetLabel(position,face,type="code"){
    let code=""

    code=blindCode.find(x=>x.id===position && x.面===face)
    if(code) {
      code=type==="code"?code.编码:code.面+code.面序号; //code.编码
    }else{
      console.log(position,face)
      code=face
    }
    return code
  }
  // 魔方颜色定义 (右、左、上、下、前、后)
  let colors
  // colors = ["red", "orange", "white", "yellow", "#90EE90", "#04d9ff"];
    colors = ['#009E60', '#0051BA', '#FFD500', '#FFFFFF', '#C41E3A', '#FF5800'] // R L U D F B
  return (
    <group ref={refProp} position={position}>
      {/* 渲染圆角方块作为基础 */}
      <RoundedBox args={[1, 1, 1]} radius={0.15} smoothness={10}>
        <meshStandardMaterial color="black" />
      </RoundedBox>

      {/* 渲染6个面的贴纸*/}
      {[
        { pos: [0, 0, stickerOffset], rot: [0, 0, 0], color:colors[4], face:'F'}, // 前面 0
        { pos: [0, 0, -stickerOffset], rot: [0, Math.PI, 0],color:colors[5], face:'B'}, // 后面 1
        { pos: [-stickerOffset, 0, 0], rot: [0, -Math.PI / 2, 0], color:  colors[1] , face:'L'}, // 左面 2
        { pos: [stickerOffset, 0, 0], rot: [0, Math.PI / 2, 0], color: colors[0] , face:'R'}, // 右面 3
        { pos: [0, stickerOffset, 0], rot: [-Math.PI / 2, 0, 0], color: colors[2] , face:'U'}, // 上面 4
        { pos: [0, -stickerOffset, 0], rot: [Math.PI / 2, 0, 0], color: colors[3] , face:'D'}, // 下面 5
      ].map(({ pos, rot, color,face }, i) => (
        <group key={i} position={pos} rotation={rot}>
          <mesh>
            <planeGeometry args={[0.85, 0.85]} />
            <meshStandardMaterial 
              color={color} 
              emissive={color}
              emissiveIntensity={0.2}
              metalness={0.1}
              roughness={0.3}
            />
          </mesh>
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.2}
            color={face === "L"? "white" : "black"}
            anchorX="center"
            anchorY="middle"
          >
            {i}
            {/* {GetLabel(position[3],face,'sequence')} */}
            {/* {GetLabel(position[3],face)} */}
          </Text>
        </group>
      ))}
    </group>
  );
};


//rendering who cube with it
const RubiksCube = (blindCodeData) => {
  const [cubeRefs, setCubeRefs] = useState([]);
  const [rotationQueue, setRotationQueue] = useState([]);
  const [moves, setMoves] = useState([]);
  const [isRotating, setIsRotating] = useState(false);
  const [blindCode, setBlindCode] = useState([]); // 新增状态存储Excel数据
  const rotateStatus = useRef(false);
  useEffect(() => {
    setBlindCode(blindCodeData);
  })
  console.log(blindCodeData)
  //inital cube for mapping the 3d cube in 2d
  const initialCube = [
    // Up (Yellow)
    [
      ["Y", "Y", "Y"],
      ["Y", "Y", "Y"],
      ["Y", "Y", "Y"],
    ],

    // Front (Red)
    [
      ["R", "R", "R"],
      ["R", "R", "R"],
      ["R", "R", "R"],
    ],

    // Right (Green)
    [
      ["G", "G", "G"],
      ["G", "G", "G"],
      ["G", "G", "G"],
    ],
    // Back (Orange)
    [
      ["O", "O", "O"],
      ["O", "O", "O"],
      ["O", "O", "O"],
    ],
    // Left (Blue)
    [
      ["B", "B", "B"],
      ["B", "B", "B"],
      ["B", "B", "B"],
    ],
    // Down (White)
    [
      ["W", "W", "W"],
      ["W", "W", "W"],
      ["W", "W", "W"],
    ],
  ];

  const [cube, setCube] = useState(initialCube);
  let newCube;

  //读取public目录下的cubecode.xlsx,sheet:blindcode。第一行为列头，生成数据给变量：blindCode
  //color map for mapping the colors in each div or cell of the 2d cube like whereever there is white render #ffffff
  //颜色映射，用于映射二维立方体的每个div或单元格中的颜色，就像有白色渲染的地方一样#ffffff
  const colorMap = {
    W: "#FFFFFF", // White
    G: "#00FF00", // Green
    R: "#FF0000", // Red
    B: "#0000FF", // Blue
    O: "#FFA500", // Orange
    Y: "#FFFF00", // Yellow
  };

  // Render a single cube cell for 2d mapping
  //渲染单个立方体单元以进行二维映射
  const renderCell = (color, size, rowIndex , row) => {
    const titleText=`${row[0]}-${rowIndex}`
    return (
      <div
          title={titleText}
        style={{
          border: "1px solid #2d3748",
          backgroundColor: colorMap[color],
          width: size,
          height: size,
          textAlign: 'center',
          fontSize: '8px',
        }}
      ></div>
    );
  };

  // Render a single face for 2d mapping
  const renderFace = (face, size) => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0",
        }}
      >
        {face.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <div key={`${rowIndex}-${cellIndex}`}>{renderCell(cell, size, rowIndex , row)}</div>
          ))
        )}
      </div>
    );
  };

  // Render the cube layout mapping
  const renderCube = () => {
    const cellSize = "30px";

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Up face */}
        <div style={{ marginBottom: "8px" }}>
          <div style={{ marginLeft: "96px" }}>
            {renderFace(cube[0], cellSize)}
          </div>
        </div>

        {/* Middle row: Left, Front, Right, Back */}
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "8px" }}>
            {renderFace(cube[4], cellSize)}
          </div>
          <div style={{ marginRight: "8px" }}>
            {renderFace(cube[1], cellSize)}
          </div>
          <div style={{ marginRight: "8px" }}>
            {renderFace(cube[2], cellSize)}
          </div>
          <div>{renderFace(cube[3], cellSize)}</div>
        </div>

        {/* Down face */}
        <div style={{ marginTop: "8px" }}>
          <div style={{ marginLeft: "96px" }}>
            {renderFace(cube[5], cellSize)}
          </div>
        </div>
      </div>
    );
  };

  //this useffect renders my 3d cube in space
  useEffect(() => {
    const refs = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const ref = createRef();
          refs.push({ ref, position: [x, y, z,x+''+y+''+z] });
        }
      }
    }
    setCubeRefs(refs);
  }, []);

  //handling inputs for rotation via keydown event
  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log(event)

      if (rotateStatus.current) return; // Prevent multiple rotations at once
      const { key, shiftKey } = event;
      console.log(key,shiftKey)

      const keyPressed = key.toLowerCase();

      switch (key) {
        case "ArrowUp":
          rotateFullCube("x", Math.PI / 2, "anti-clockwise");
          break;
        case "ArrowDown":
          rotateFullCube("x", Math.PI / 2,  "clockwise");
          break;
        case "ArrowLeft":
          rotateFullCube("y", Math.PI / 2 , "clockwise");
          break;
        case "ArrowRight":
          rotateFullCube("y", Math.PI / 2, "anti-clockwise");
          break;
      }

      if (shiftKey) {
        // Handle Shift Key Variants (Opposite Direction)
        switch (keyPressed) {
          case "w":
            rotateLayer("y", 1, "anti-clockwise");
            moves.push("⬅️ U");
            // newCube = rotateUpClockwise(cube);
            // setCube(newCube);
            return;
          case "s":
            rotateLayer("y", -1, "anti-clockwise");
            moves.push("⬅️ D");

            return;
          case "a":
            rotateLayer("x", -1, "anti-clockwise");
            moves.push("⬆️ L");
            // newCube = rotateLeftCounterclockwise(cube);
            // setCube(newCube);
            return;
          case "d":
            rotateLayer("x", 1, "anti-clockwise");
            moves.push("⬆️ R");
            // newCube = rotateRightClockwise(cube);
            // setCube(newCube);
            return;
          case "q":
            rotateLayer("z", 1, "anti-clockwise");
            moves.push("↻ F");
            // newCube = rotateFrontClockwise(cube);
            // setCube(newCube);
            return;
          case "e":
            rotateLayer("z", -1, "anti-clockwise");
            moves.push("↻ B");
            // newCube = rotateBackClockwise(cube);
            // setCube(newCube);
            return;
        }
      }

      // Handle Regular Rotations
      switch (keyPressed) {
        case "w":
          rotateLayer("y", 1, "clockwise");
          moves.push("➡️ U");
          // newCube = rotateUpCounterclockwise(cube);
          // setCube(newCube);
          break;
        case "s":
          rotateLayer("y", -1, "clockwise");
          moves.push("➡️ D");
          // newCube = rotateDownClockwise(cube);
          // setCube(newCube);
          break;
        case "a":
          rotateLayer("x", -1, "clockwise");
          moves.push("⬇️ L");
          // newCube = rotateLeftClockwise(cube);
          // setCube(newCube);
          break;
        case "d":
          rotateLayer("x", 1, "clockwise");
          moves.push("⬇️ R");
          // newCube = rotateRightCounterclockwise(cube);
          // setCube(newCube);
          break;
        case "q":
          rotateLayer("z", 1, "clockwise");
          moves.push("↺ F");
          // newCube = rotateFrontCounterclockwise(cube);
          // setCube(newCube);
          break;
        case "e":
          rotateLayer("z", -1, "clockwise");
          moves.push("↺ B");
          // newCube = rotateBackCounterclockwise(cube);
          // setCube(newCube);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cube, cubeRefs]); // Dependency array

  //rotation of whole cube on basis of arrow keys
  //to be implemented in the 2d cube
  const rotateFullCube = (axis, rotationStep, direction) => {
    if (rotateStatus.current) return;
    rotateStatus.current = true;
    setIsRotating(true);

    const rotationVector =
      direction === "anti-clockwise"
        ? new THREE.Vector3(
            axis === "x" ? -1 : 0,
            axis === "y" ? -1 : 0,
            axis === "z" ? -1 : 0
          )
        : new THREE.Vector3(
            axis === "x" ? 1 : 0,
            axis === "y" ? 1 : 0,
            axis === "z" ? 1 : 0
          );

    let progress = 0;
    const totalRotation = rotationStep;
    const rotationSpeed = Math.PI / 2 / 20; // Smooth animation speed

    const rotate = () => {
      const step = Math.sign(totalRotation) * rotationSpeed;

      cubeRefs.forEach(({ ref }) => {
        if (ref.current) {
          ref.current.rotateOnWorldAxis(rotationVector, step);
          ref.current.position.applyAxisAngle(rotationVector, step);
        }
      });

      progress += rotationSpeed;
      if (progress >= Math.abs(totalRotation)) {
        // Snap to final rotation to avoid floating-point issues
        cubeRefs.forEach(({ ref, position }) => {
          if (ref.current) {
            const originalPosition = [...position];
            ref.current.rotation.set(
              Math.round(ref.current.rotation.x / (Math.PI / 2)) *
                (Math.PI / 2),
              Math.round(ref.current.rotation.y / (Math.PI / 2)) *
                (Math.PI / 2),
              Math.round(ref.current.rotation.z / (Math.PI / 2)) * (Math.PI / 2)
            );

            const matrix = new THREE.Matrix4().makeRotationAxis(
              rotationVector,
              totalRotation
            );
            const newPosition = new THREE.Vector3(...position).applyMatrix4(
              matrix
            );
            // 确保 position 正确更新
            position[0] = Math.round(newPosition.x);
            position[1] = Math.round(newPosition.y);
            position[2] = Math.round(newPosition.z);

            ref.current.position.set(position[0], position[1], position[2]);
            console.log(`Full cube rotation: Original position ${originalPosition}, New position ${position}`);
          }
        });

        setIsRotating(false);
        rotateStatus.current = false;

        setCube((prevState) => {
          if(axis === "x" && direction === "anti-clockwise"){
            newCube = rotateFullCubeClockwise(prevState);
            return newCube;
          }
          if(axis === "x" && direction === "clockwise"){
            newCube = rotateFullCubeCounterclockwise(prevState);
            return newCube;
          }
          return prevState;
        });
      } else {
        requestAnimationFrame(rotate);
      }
    };

    rotate();
  };

  //scrambling the cube function
  const scrambleCube = async () => {
    const scrambleSequence = [];

    // Generate random sequence first
    for (let i = 0; i < 20; i++) { // 20 moves is standard for competition scrambles
      const moveIndex = Math.floor(Math.random() * 12); // 12 possible moves (6 faces, 2 directions)
      const moves = ["w", "s", "a", "d", "q", "e", "W", "S", "A", "D", "Q", "E"]; // Uppercase for shift variants
      scrambleSequence.push(moves[moveIndex]);
    }

    // Execute each move with awaiting for completion
    for (const move of scrambleSequence) {
      // Wait until current rotation is complete
      while (rotateStatus.current) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      // Execute the move
      const isShift = move === move.toUpperCase();
      const key = move.toLowerCase();

      // Apply the appropriate rotation based on the move
      switch (key) {
        case "w":
          rotateLayer("y", 1, isShift ? "anti-clockwise" : "clockwise");
          moves.push(isShift ? "⬅️ U" : "➡️ U");
          break;
        case "s":
          rotateLayer("y", -1, isShift ? "anti-clockwise" : "clockwise");
          moves.push(isShift ? "⬅️ D" : "➡️ D");
          break;
        case "a":
          rotateLayer("x", -1, isShift ? "anti-clockwise" : "clockwise");
          moves.push(isShift ? "⬆️ L" : "⬇️ L");
          break;
        case "d":
          rotateLayer("x", 1, isShift ? "anti-clockwise" : "clockwise");
          moves.push(isShift ? "⬆️ R" : "⬇️ R");
          break;
        case "q":
          rotateLayer("z", 1, isShift ? "anti-clockwise" : "clockwise");
          moves.push(isShift ? "↻ F" : "↺ F");
          break;
        case "e":
          rotateLayer("z", -1, isShift ? "anti-clockwise" : "clockwise");
          moves.push(isShift ? "↻ B" : "↺ B");
          break;
      }

      // Wait for animation to complete
      await new Promise(resolve => setTimeout(resolve, 100));
    }

  };
  //rotating the layer selected by moves
  const rotateLayer = (axis, layerValue, direction) => {
    if (rotateStatus.current) return; // Prevent multiple rotations at once
    rotateStatus.current = true;
    setIsRotating(true);
    const rotationStep = Math.PI / 2; // 90 degrees in radians

    const cubesToRotate = cubeRefs.filter(
      ({ position }) =>
        position[axis === "x" ? 0 : axis === "y" ? 1 : 2] === layerValue
    );

    const rotationVector =
      direction === "anti-clockwise"
        ? new THREE.Vector3(
            axis === "x" ? -1 : 0,
            axis === "y" ? -1 : 0,
            axis === "z" ? -1 : 0
          )
        : new THREE.Vector3(
            axis === "x" ? 1 : 0,
            axis === "y" ? 1 : 0,
            axis === "z" ? 1 : 0
          );

    let progress = 0;
    const rotationSpeed = rotationStep / 30; // Adjust speed for smooth animation

    const rotate = async () => {
      cubesToRotate.forEach(({ ref }) => {
        if (ref.current) {
          ref.current.rotateOnWorldAxis(rotationVector, rotationSpeed);
          ref.current.position.applyAxisAngle(rotationVector, rotationSpeed);
        }
      });

      progress += rotationSpeed;
      if (progress >= rotationStep) {
        // ✅ Snap to exact rotation to fix floating point errors
        cubesToRotate.forEach(({ ref, position }) => {
          if (ref.current) {
            const originalPosition = [...position];
            ref.current.rotation.set(
              Math.round(ref.current.rotation.x / rotationStep) * rotationStep,
              Math.round(ref.current.rotation.y / rotationStep) * rotationStep,
              Math.round(ref.current.rotation.z / rotationStep) * rotationStep
            );

            const matrix = new THREE.Matrix4().makeRotationAxis(
              rotationVector,
              rotationStep
            );
            const newPosition = new THREE.Vector3(...position).applyMatrix4(
              matrix
            );
            position[0] = Math.round(newPosition.x);
            position[1] = Math.round(newPosition.y);
            position[2] = Math.round(newPosition.z);

            ref.current.position.set(position[0], position[1], position[2]);
            console.log(`Layer rotation: Original position ${originalPosition}, New position ${position}`);
          }
        });

        setRotationQueue((prev) => prev.slice(1));
        setIsRotating(false);
        rotateStatus.current = false;

        setCube((prevCube) => {
          if (axis === "y" && layerValue === 1 && direction === "clockwise") {
            newCube = rotateUpCounterclockwise(prevCube);
            return newCube;
          }
          if (axis === "y" && layerValue === -1 && direction === "clockwise") {
            newCube = rotateDownClockwise(prevCube);
            return newCube;
          }
          if (axis === "x" && layerValue === 1 && direction === "clockwise") {
            newCube = rotateRightCounterclockwise(prevCube);
            return newCube;
          }
          if (axis === "x" && layerValue === -1 && direction === "clockwise") {
            newCube = rotateLeftClockwise(prevCube);
            return newCube;
          }
          if (axis === "z" && layerValue === 1 && direction === "clockwise") {
            newCube = rotateFrontCounterclockwise(prevCube);
            return newCube;
          }
          if (axis === "z" && layerValue === -1 && direction === "clockwise") {
            newCube = rotateBackCounterclockwise(prevCube);
            return newCube;
          }
          if (
            axis === "z" &&
            layerValue === 1 &&
            direction === "anti-clockwise"
          ) {
            newCube = rotateFrontClockwise(prevCube);
            return newCube;
          }
          if (
            axis === "z" &&
            layerValue === -1 &&
            direction === "anti-clockwise"
          ) {
            newCube = rotateBackClockwise(prevCube);
            return newCube;
          }
          if (
            axis === "x" &&
            layerValue === 1 &&
            direction === "anti-clockwise"
          ) {
            newCube = rotateRightClockwise(prevCube);
            return newCube;
          }
          if (
            axis === "x" &&
            layerValue === -1 &&
            direction === "anti-clockwise"
          ) {
            newCube = rotateLeftCounterclockwise(prevCube);
            return newCube;
          }
          if (
            axis === "y" &&
            layerValue === 1 &&
            direction === "anti-clockwise"
          ) {
            newCube = rotateUpClockwise(prevCube);
            return newCube;
          }
          if (
            axis === "y" &&
            layerValue === -1 &&
            direction === "anti-clockwise"
          ) {
            newCube = rotateDownCounterclockwise(prevCube);
            return newCube;
          }
        });
      } else {
        requestAnimationFrame(rotate);
      }
    };

    rotate();
  };
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <div className="moves">
        <div className="layer"> W : moves white layer/clockwise/right</div>
      <div className="layer"> S : move yellow Layer up/clockwise/right</div>
      <div className="layer"> A : moves orange</div>
      <div className="layer"> D : moves red</div>
      <div className="layer"> E : moves blue layer</div>
      <div className="layer"> Q : moves green layer</div>
      </div>
      <Canvas camera={{ position: [5, 5, 5] }}>
        <ambientLight intensity={1} />
        <pointLight position={[5, 5, 5]} />
        <OrbitControls />
        <group>
          {cubeRefs.map(({ ref, position }, index) => (
            <Cube key={index} position={position} refProp={ref} blindCode={blindCode}/>
          ))}
        </group>
      </Canvas>
      <div className="moves-list">
        
          {moves.map((move, index) => (
            <div className="move" key={index}>{move}</div>
          ))}
        
      </div>

      <button className="button-52" onClick={scrambleCube}>
        click to scramble
      </button>
      <div className="cube-layout">{renderCube()}</div>
    </div>
  );
};

export default RubiksCube;

