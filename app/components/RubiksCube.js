"use client";
import * as THREE from "three";
import { useRef, useState, useEffect, createRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, RoundedBox } from "@react-three/drei";

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
  rotateFullCubeCounterclockwise,
} from "./rotation"; // 从rotation.js导入2D魔方的旋转函数

const Cube = (position, cubeRef, blindCode, showColor, showFace) => {
  const pasterOffset = 0.535; // 贴纸偏移量，略高于方块表面

  //获取盲拧魔方的编码
  function GetLabel(position, face, type = "code") {
    let code = "";

    code = blindCode.find((x) => x.id === position && x.面 === face);
    if (code) {
      code = type === "code" ? code.编码 : code.面 + code.面序号; //code.编码
    } else {
      console.log(position, face);
      code = face;
    }
    return code;
  }
  //魔方6面颜色
  let colors = [
    "#009E60",
    "#0051BA",
    "#FFD500",
    "#FFFFFF",
    "#C41E3A",
    "#FF5800",
  ]; // R L U D F B
  colors = ["#00FF00", "#0000FF", "#FFFF00", "#FFFFFF", "#FF0000", "#FFA500"]; // R L U D F B
  return (
    <group ref={cubeRef} position={position}>
      {/* 渲染圆角方块作为基础 */}
      <RoundedBox args={[1, 1, 1]} radius={0.15} smoothness={10}>
        <meshStandardMaterial color="black" />
      </RoundedBox>
    </group>
  );
};

const RubiksCube = (blindCode) => {
  //#region 基础变量
  const [cubeRefs, setCubeRefs] = useState([]); //Cube的Ref对象
  const [moves, setMoves] = useState([]);
  const rotateStatus = useRef(false);
  const [cube, setCube] = useState(initialCube);

  //用于在二维中映射三维立方体的初始立方体
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
  let newCube;

  //颜色映射，用于映射二维立方体的每个div或单元格中的颜色，就像有白色渲染的地方一样#ffffff
  const colorMap = {
    W: "#FFFFFF", // White
    G: "#00FF00", // Green
    R: "#FF0000", // Red
    B: "#0000FF", // Blue
    O: "#FFA500", // Orange
    Y: "#FFFF00", // Yellow
  };
  //#endregion

  //#region 平面显示基础函数
  //渲染单个立方体单元以进行二维映射
  const renderCell = (color, size, rowIndex, row) => {
    const titleText = `${row[0]}-${rowIndex}`;
    return (
      <div
        title={titleText}
        style={{
          border: "1px solid #2d3748",
          backgroundColor: colorMap[color],
          width: size,
          height: size,
          textAlign: "center",
          fontSize: "8px",
        }}
      ></div>
    );
  };
  //渲染单个面以进行二维映射
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
            <div key={`${rowIndex}-${cellIndex}`}>
              {renderCell(cell, size, rowIndex, row)}
            </div>
          )),
        )}
      </div>
    );
  };
  //渲染立方体布局映射
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

  //旋转后，在平面映射
  const rotateFullCube = (axis, rotationStep, direction) => {
    if (rotateStatus.current) return;
    rotateStatus.current = true;
    setIsRotating(true);

    const rotationVector =
      direction === "anti-clockwise"
        ? new THREE.Vector3(
            axis === "x" ? -1 : 0,
            axis === "y" ? -1 : 0,
            axis === "z" ? -1 : 0,
          )
        : new THREE.Vector3(
            axis === "x" ? 1 : 0,
            axis === "y" ? 1 : 0,
            axis === "z" ? 1 : 0,
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
              Math.round(ref.current.rotation.z / (Math.PI / 2)) *
                (Math.PI / 2),
            );

            const matrix = new THREE.Matrix4().makeRotationAxis(
              rotationVector,
              totalRotation,
            );
            const newPosition = new THREE.Vector3(...position).applyMatrix4(
              matrix,
            );
            // 确保 position 正确更新
            position[0] = Math.round(newPosition.x);
            position[1] = Math.round(newPosition.y);
            position[2] = Math.round(newPosition.z);

            ref.current.position.set(position[0], position[1], position[2]);
            console.log(
              `Full cube rotation: Original position ${originalPosition}, New position ${position}`,
            );
          }
        });

        setIsRotating(false);
        rotateStatus.current = false;

        setCube((prevState) => {
          if (axis === "x" && direction === "anti-clockwise") {
            newCube = rotateFullCubeClockwise(prevState);
            return newCube;
          }
          if (axis === "x" && direction === "clockwise") {
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
  //#endregion

  //#region 旋转相关
  //旋转通过移动选择的图层
  const rotateLayer = (axis, layerValue, direction) => {
    if (rotateStatus.current) return; // Prevent multiple rotations at once
    rotateStatus.current = true;
    setIsRotating(true);
    const rotationStep = Math.PI / 2; // 90 degrees in radians

    const cubesToRotate = cubeRefs.filter(
      ({ position }) =>
        position[axis === "x" ? 0 : axis === "y" ? 1 : 2] === layerValue,
    );

    const rotationVector =
      direction === "anti-clockwise"
        ? new THREE.Vector3(
            axis === "x" ? -1 : 0,
            axis === "y" ? -1 : 0,
            axis === "z" ? -1 : 0,
          )
        : new THREE.Vector3(
            axis === "x" ? 1 : 0,
            axis === "y" ? 1 : 0,
            axis === "z" ? 1 : 0,
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
              Math.round(ref.current.rotation.z / rotationStep) * rotationStep,
            );

            const matrix = new THREE.Matrix4().makeRotationAxis(
              rotationVector,
              rotationStep,
            );
            const newPosition = new THREE.Vector3(...position).applyMatrix4(
              matrix,
            );
            position[0] = Math.round(newPosition.x);
            position[1] = Math.round(newPosition.y);
            position[2] = Math.round(newPosition.z);

            ref.current.position.set(position[0], position[1], position[2]);
            console.log(
              `Layer rotation: Original position ${originalPosition}, New position ${position}`,
            );
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
  //#endregion

  //#region 加载运行
  //此useeffect在空间中渲染我的3d立方体
  useEffect(() => {
    const refs = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const ref = createRef();
          refs.push({ ref, position: [x, y, z, x + "" + y + "" + z] });
        }
      }
    }
    setCubeRefs(refs);
  }, []);
  //通过keydown事件处理旋转 根据箭头键旋转整个立方体
  //基于箭头键旋转整个立方体
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (rotateStatus.current) return; // 防止一次进行多次旋转

      const { key, shiftKey } = event;
      const keyPressed = key.toLowerCase();

      switch (key) {
        case "ArrowUp":
          rotateFullCube("x", Math.PI / 2, "anti-clockwise");
          break;
        case "ArrowDown":
          rotateFullCube("x", Math.PI / 2, "clockwise");
          break;
        case "ArrowLeft":
          rotateFullCube("y", Math.PI / 2, "clockwise");
          break;
        case "ArrowRight":
          rotateFullCube("y", Math.PI / 2, "anti-clockwise");
          break;
      }

      if (shiftKey) {
        // 处理Shift键（反向）
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
            return;
          case "d":
            rotateLayer("x", 1, "anti-clockwise");
            moves.push("⬆️ R");
            return;
          case "q":
            rotateLayer("z", 1, "anti-clockwise");
            moves.push("↻ F");
            return;
          case "e":
            rotateLayer("z", -1, "anti-clockwise");
            moves.push("↻ B");
            return;
        }
      }

      // 按键旋转
      switch (keyPressed) {
        case "w":
          rotateLayer("y", 1, "clockwise");
          moves.push("➡️ U");
          break;
        case "s":
          rotateLayer("y", -1, "clockwise");
          moves.push("➡️ D");
          break;
        case "a":
          rotateLayer("x", -1, "clockwise");
          moves.push("⬇️ L");
          break;
        case "d":
          rotateLayer("x", 1, "clockwise");
          moves.push("⬇️ R");
          break;
        case "q":
          rotateLayer("z", 1, "clockwise");
          moves.push("↺ F");
          break;
        case "e":
          rotateLayer("z", -1, "clockwise");
          moves.push("↺ B");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cube, cubeRefs]); // 依赖数组
  //#endregion
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
            <Cube
              key={index}
              position={position}
              refProp={ref}
              blindCode={blindCode}
            />
          ))}
        </group>
      </Canvas>
      <div className="moves-list">
        {moves.map((move, index) => (
          <div className="move" key={index}>
            {move}
          </div>
        ))}
      </div>

      <button className="button-52" onClick={scrambleCube}>
        click to scramble
      </button>
      <div className="cube-layout">{renderCube()}</div>
    </div>
  );
};
