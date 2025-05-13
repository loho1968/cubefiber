import * as THREE from 'three';
import { useRef, useState, useEffect, createRef, forwardRef, useImperativeHandle } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, RoundedBox } from '@react-three/drei';

// 导入所有魔方旋转相关的函数
import { rotateBackClockwise, rotateBackCounterclockwise, rotateFrontClockwise, rotateFrontCounterclockwise, rotateDownClockwise, rotateDownCounterclockwise, rotateLeftClockwise, rotateLeftCounterclockwise, rotateRightClockwise, rotateRightCounterclockwise, rotateUpClockwise, rotateUpCounterclockwise, rotateFullCubeClockwise, rotateFullCubeCounterclockwise, rotateMiddleLayerX, rotateMiddleLayerY, rotateMiddleLayerZ } from './rotation'; // 从rotation.js导入2D魔方的旋转函数
const Cube = ({ position, refProp, blindCode, showCode, showFaces }) => {
  const stickerOffset = 0.535; // 贴纸偏移量，略高于方块表面
  const cubeScale = 1.5; // 添加缩放变量，可以根据需要调整这个值来改变魔方大小

  function GetFaceColor(position, color, face, showFaces) {
    if (!showFaces || showFaces === '' || showFaces.length === 0) return color;
    let result = 'black';
    const code = blindCode.find((x) => x.id === position[3] && x.面 === face);
    if (code) {
      const faceId = code.面 + code.面序号;
      console.log(faceId);
      if (showFaces.includes(faceId)) {
        result = color;
      }
    }
    return result;
  }
  function GetLabel(position, face, type = 'code') {
    if (!showCode) return '';
    let code = blindCode.find((x) => x.id === position[3] && x.面 === face);

    if (code) {
      code = type === 'code' ? code.编码 : code.面 + code.面序号; //code.编码
    } else {
      code = face;
    }
    return code;
  }
  // 魔方颜色定义 (右、左、上、下、前、后)
  let colors;
  // colors = ["red", "orange", "white", "yellow", "#90EE90", "#04d9ff"];
  colors = ['#009E60', '#0051BA', '#FFD500', '#FFFFFF', '#C41E3A', '#FF5800']; // R L U D F B
  return (
    <group ref={refProp} position={[position[0] * cubeScale, position[1] * cubeScale, position[2] * cubeScale]}>
      {/* 渲染圆角方块作为基础 */}
      <RoundedBox args={[cubeScale, cubeScale, cubeScale]} radius={0.15 * cubeScale} smoothness={10}>
        <meshStandardMaterial color='black' />
      </RoundedBox>

      {/* 渲染6个面的贴纸*/}
      {[
        {
          pos: [0, 0, stickerOffset * cubeScale],
          rot: [0, 0, 0],
          color: colors[4],
          face: 'F',
        },
        {
          pos: [0, 0, -stickerOffset * cubeScale],
          rot: [0, Math.PI, 0],
          color: colors[5],
          face: 'B',
        },
        { pos: [-stickerOffset * cubeScale, 0, 0], rot: [0, -Math.PI / 2, 0], color: colors[1], face: 'L' },
        {
          pos: [stickerOffset * cubeScale, 0, 0],
          rot: [0, Math.PI / 2, 0],
          color: colors[0],
          face: 'R',
        },
        {
          pos: [0, stickerOffset * cubeScale, 0],
          rot: [-Math.PI / 2, 0, 0],
          color: colors[2],
          face: 'U',
        },
        {
          pos: [0, -stickerOffset * cubeScale, 0],
          rot: [Math.PI / 2, 0, 0],
          color: colors[3],
          face: 'D',
        },
      ].map(({ pos, rot, color, face }, i) => (
        <group key={i} position={pos} rotation={rot}>
          <mesh>
            <planeGeometry args={[0.85 * cubeScale, 0.85 * cubeScale]} />
            <meshStandardMaterial color={GetFaceColor(position, color, face, showFaces)} emissive={0.2} emissiveIntensity={0.2} metalness={0.1} roughness={0.3} />
          </mesh>
          <Text position={[0, 0, 0.01]} fontSize={0.2 * cubeScale} color={face === 'L' ? 'white' : 'black'} anchorX='center' anchorY='middle'>
            {GetLabel(position, face)}
          </Text>
        </group>
      ))}
    </group>
  );
};

//rendering who cube with it
const RubiksCube = forwardRef((blindCodeData, refProp) => {
  const cubeScale = 1.5;
  const [cubeRefs, setCubeRefs] = useState([]);
  const [showCode, setShowCode] = useState(false);
  const [showFaces, setShowFaces] = useState([]);
  const rotateStatus = useRef(false);

  //用于在二维中映射三维立方体的初始立方体
  const initialCube = [
    // Up (Yellow)
    [
      ['Y', 'Y', 'Y'],
      ['Y', 'Y', 'Y'],
      ['Y', 'Y', 'Y'],
    ],

    // Front (Red)
    [
      ['R', 'R', 'R'],
      ['R', 'R', 'R'],
      ['R', 'R', 'R'],
    ],

    // Right (Green)
    [
      ['G', 'G', 'G'],
      ['G', 'G', 'G'],
      ['G', 'G', 'G'],
    ],
    // Back (Orange)
    [
      ['O', 'O', 'O'],
      ['O', 'O', 'O'],
      ['O', 'O', 'O'],
    ],
    // Left (Blue)
    [
      ['B', 'B', 'B'],
      ['B', 'B', 'B'],
      ['B', 'B', 'B'],
    ],
    // Down (White)
    [
      ['W', 'W', 'W'],
      ['W', 'W', 'W'],
      ['W', 'W', 'W'],
    ],
  ];

  const [cube, setCube] = useState(initialCube);
  let newCube;

  //读取public目录下的cubecode.xlsx,sheet:blindcode。第一行为列头，生成数据给变量：blindCode
  //颜色映射，用于映射二维立方体的每个div或单元格中的颜色，就像有白色渲染的地方一样#ffffff
  const colorMap = {
    W: '#FFFFFF', // White
    G: '#00FF00', // Green
    R: '#FF0000', // Red
    B: '#0000FF', // Blue
    O: '#FFA500', // Orange
    Y: '#FFFF00', // Yellow
  };

  // Render a single cube cell for 2d mapping
  //渲染单个立方体单元以进行二维映射
  const renderCell = (color, size, rowIndex, row) => {
    const titleText = `${row[0]}-${rowIndex}`;
    return (
      <div
        title={titleText}
        style={{
          border: '1px solid #2d3748',
          backgroundColor: colorMap[color],
          width: size,
          height: size,
          textAlign: 'center',
          fontSize: '8px',
        }}></div>
    );
  };

  // Render a single face for 2d mapping
  const renderFace = (face, size) => {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0',
        }}>
        {face.map((row, rowIndex) => row.map((cell, cellIndex) => <div key={`${rowIndex}-${cellIndex}`}>{renderCell(cell, size, rowIndex, row)}</div>))}
      </div>
    );
  };

  // Render the cube layout mapping
  const renderCube = () => {
    const cellSize = '60px';
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        {/* Up face */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ marginLeft: '96px' }}>{renderFace(cube[0], cellSize)}</div>
        </div>

        {/* Middle row: Left, Front, Right, Back */}
        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: '8px' }}>{renderFace(cube[4], cellSize)}</div>
          <div style={{ marginRight: '8px' }}>{renderFace(cube[1], cellSize)}</div>
          <div style={{ marginRight: '8px' }}>{renderFace(cube[2], cellSize)}</div>
          <div>{renderFace(cube[3], cellSize)}</div>
        </div>

        {/* Down face */}
        <div style={{ marginTop: '8px' }}>
          <div style={{ marginLeft: '96px' }}>{renderFace(cube[5], cellSize)}</div>
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
          refs.push({ ref, position: [x, y, z, x + '' + y + '' + z] });
        }
      }
    }
    setCubeRefs(refs);
  }, []);

  //绑定键盘事件
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (rotateStatus.current) return; // Prevent multiple rotations at once
      const { key, shiftKey } = event;

      const keyPressed = key.toLowerCase();

      if (shiftKey) {
        // 按Shift键，旋转反向  R L U D F B
        switch (keyPressed) {
          case 'x':
            rotateFullCube('x', Math.PI / 2, 'clockwise');
            break;
          case 'y':
            rotateFullCube('y', Math.PI / 2, 'clockwise');
            break;
          case 'z':
            rotateFullCube('z', Math.PI / 2, 'clockwise');
            break;
          case 'u':
            rotateLayer('y', 1, 'clockwise');
            break;
          case 'd':
            rotateLayer('y', -1, 'anti-clockwise');
            break;
          case 'l':
            rotateLayer('x', -1, 'anti-clockwise');
            break;
          case 'r':
            rotateLayer('x', 1, 'anti-clockwise');
            break;
          case 'f':
            rotateLayer('z', 1, 'anti-clockwise');
            break;
          case 'b':
            rotateLayer('z', -1, 'anti-clockwise');
            break;
          case 'e':
            rotateLayer('y', 0, 'anti-clockwise');
            break;
          case 's':
            rotateLayer('z', 0, 'clockwise');
            break;
          case 'm':
            rotateLayer('x', 0, 'anti-clockwise');
        }
      }

      // Handle Regular Rotations
      switch (keyPressed) {
        case 'x':
          rotateFullCube('x', Math.PI / 2, 'clockwise');
          break;
        case 'y':
          rotateFullCube('y', Math.PI / 2, 'clockwise');
          break;
        case 'z':
          rotateFullCube('z', Math.PI / 2, 'clockwise');
          break;
        case 'u':
          rotateLayer('y', 1, 'anti-clockwise');
          break;
        case 'd':
          rotateLayer('y', -1, 'clockwise');
          break;
        case 'l':
          rotateLayer('x', -1, 'clockwise');
          break;
        case 'r':
          rotateLayer('x', 1, 'clockwise');
          break;
        case 'f':
          rotateLayer('z', 1, 'clockwise');
          break;
        case 'b':
          rotateLayer('z', -1, 'clockwise');
        case 'e':
          rotateLayer('y', 0, 'clockwise');
          break;
        case 's':
          rotateLayer('z', 0, 'anti-clockwise');
          break;
        case 'm':
          rotateLayer('x', 0, 'clockwise');
          break;
      }
    };
    // window.addEventListener("keydown", handleKeyDown);
    // return () => {
    //   window.removeEventListener("keydown", handleKeyDown);
    // };
  }, [cube, cubeRefs]); //依赖数组

  //在二维立方体中实现
  const rotateFullCube = (axis, rotationStep, direction) => {
    if (rotateStatus.current) return;
    rotateStatus.current = true;

    const rotationVector = direction === 'anti-clockwise' ? new THREE.Vector3(axis === 'x' ? -1 : 0, axis === 'y' ? -1 : 0, axis === 'z' ? -1 : 0) : new THREE.Vector3(axis === 'x' ? 1 : 0, axis === 'y' ? 1 : 0, axis === 'z' ? 1 : 0);

    let progress = 0;
    const totalRotation = rotationStep;
    const rotationSpeed = Math.PI / 2 / 20; // 动画速度

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
            ref.current.rotation.set(Math.round(ref.current.rotation.x / (Math.PI / 2)) * (Math.PI / 2), Math.round(ref.current.rotation.y / (Math.PI / 2)) * (Math.PI / 2), Math.round(ref.current.rotation.z / (Math.PI / 2)) * (Math.PI / 2));

            const matrix = new THREE.Matrix4().makeRotationAxis(rotationVector, totalRotation);
            const newPosition = new THREE.Vector3(...position).applyMatrix4(matrix);
            // 确保 position 正确更新
            position[0] = Math.round(newPosition.x);
            position[1] = Math.round(newPosition.y);
            position[2] = Math.round(newPosition.z);

            ref.current.position.set(position[0] * cubeScale, position[1] * cubeScale, position[2] * cubeScale);
            // console.log(
            //   `Full cube rotation: Original position ${originalPosition}, New position ${position}`,
            // );
          }
        });

        rotateStatus.current = false;

        setCube((prevState) => {
          if (axis === 'x' && direction === 'anti-clockwise') {
            newCube = rotateFullCubeClockwise(prevState);
            return newCube;
          }
          if (axis === 'x' && direction === 'clockwise') {
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

  //旋转所选图层
  const rotateLayer = (axis, layerValue, direction) => {
    if (rotateStatus.current) return; // 防止同时进行多次旋转
    rotateStatus.current = true;
    const rotationStep = Math.PI / 2; // 旋转90度

    const cubesToRotate = cubeRefs.filter(({ position }) => position[axis === 'x' ? 0 : axis === 'y' ? 1 : 2] === layerValue);

    const rotationVector = direction === 'anti-clockwise' ? new THREE.Vector3(axis === 'x' ? -1 : 0, axis === 'y' ? -1 : 0, axis === 'z' ? -1 : 0) : new THREE.Vector3(axis === 'x' ? 1 : 0, axis === 'y' ? 1 : 0, axis === 'z' ? 1 : 0);

    let progress = 0;
    const rotationSpeed = rotationStep / 30; // 调整速度以获得流畅的动画

    const rotate = async () => {
      cubesToRotate.forEach(({ ref }) => {
        if (ref.current) {
          ref.current.rotateOnWorldAxis(rotationVector, rotationSpeed);
          ref.current.position.applyAxisAngle(rotationVector, rotationSpeed);
        }
      });

      progress += rotationSpeed;
      if (progress >= rotationStep) {
        // ✅ 旋转后，消除精度差异，对齐魔方块

        cubesToRotate.forEach(({ ref, position }) => {
          if (ref.current) {
            const originalPosition = [...position];
            ref.current.rotation.set(Math.round(ref.current.rotation.x / rotationStep) * rotationStep, Math.round(ref.current.rotation.y / rotationStep) * rotationStep, Math.round(ref.current.rotation.z / rotationStep) * rotationStep);

            const matrix = new THREE.Matrix4().makeRotationAxis(rotationVector, rotationStep);
            const newPosition = new THREE.Vector3(...position).applyMatrix4(matrix);
            position[0] = Math.round(newPosition.x);
            position[1] = Math.round(newPosition.y);
            position[2] = Math.round(newPosition.z);

            ref.current.position.set(position[0] * cubeScale, position[1] * cubeScale, position[2] * cubeScale);
            // console.log(
            //   `Layer rotation: Original position ${originalPosition}, New position ${position}`,
            // );
          }
        });

        rotateStatus.current = false;

        setCube((prevCube) => {
          //y轴中间层
          if (axis === 'y' && layerValue === 0 && direction === 'clockwise') {
            newCube = rotateMiddleLayerY(prevCube);
            return newCube;
          }
          if (axis === 'y' && layerValue === 0 && direction === 'anti-clockwise') {
            newCube = rotateMiddleLayerY(prevCube);
            return newCube;
          }
          if (axis === 'y' && layerValue === 1 && direction === 'clockwise') {
            newCube = rotateUpCounterclockwise(prevCube);
            return newCube;
          }
          if (axis === 'y' && layerValue === -1 && direction === 'clockwise') {
            newCube = rotateDownClockwise(prevCube);
            return newCube;
          }
          //x轴中间层
          if (axis === 'x' && layerValue === 0 && direction === 'clockwise') {
            newCube = rotateMiddleLayerX(prevCube);
            return newCube;
          }
          if (axis === 'x' && layerValue === 0 && direction === 'anti-clockwise') {
            newCube = rotateMiddleLayerX(prevCube);
            return newCube;
          }
          if (axis === 'x' && layerValue === 1 && direction === 'clockwise') {
            newCube = rotateRightCounterclockwise(prevCube);
            return newCube;
          }
          if (axis === 'x' && layerValue === -1 && direction === 'clockwise') {
            newCube = rotateLeftClockwise(prevCube);
            return newCube;
          }
          //z轴中间层
          if (axis === 'z' && layerValue === 0 && direction === 'clockwise') {
            newCube = rotateMiddleLayerZ(prevCube);
            return newCube;
          }
          if (axis === 'z' && layerValue === 0 && direction === 'anti-clockwise') {
            newCube = rotateMiddleLayerZ(prevCube);
            return newCube;
          }
          if (axis === 'z' && layerValue === 1 && direction === 'clockwise') {
            newCube = rotateFrontCounterclockwise(prevCube);
            return newCube;
          }
          if (axis === 'z' && layerValue === -1 && direction === 'clockwise') {
            newCube = rotateBackCounterclockwise(prevCube);
            return newCube;
          }
          if (axis === 'z' && layerValue === 1 && direction === 'anti-clockwise') {
            newCube = rotateFrontClockwise(prevCube);
            return newCube;
          }
          if (axis === 'z' && layerValue === -1 && direction === 'anti-clockwise') {
            ('');
            newCube = rotateBackClockwise(prevCube);
            return newCube;
          }
          if (axis === 'x' && layerValue === 1 && direction === 'anti-clockwise') {
            newCube = rotateRightClockwise(prevCube);
            return newCube;
          }
          if (axis === 'x' && layerValue === -1 && direction === 'anti-clockwise') {
            newCube = rotateLeftCounterclockwise(prevCube);
            return newCube;
          }

          if (axis === 'y' && layerValue === 1 && direction === 'anti-clockwise') {
            newCube = rotateUpClockwise(prevCube);
            return newCube;
          }
          if (axis === 'y' && layerValue === -1 && direction === 'anti-clockwise') {
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

  //通过公式选择魔方
  const rotateCube = async (stepSequence, showCode = false, showFacesValue = '') => {
    setShowCode(showCode);
    setShowFaces(showFacesValue);
    for (const step of stepSequence) {
      // 等待上一次选择完成
      while (rotateStatus.current) {
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      switch (step) {
        case 'E':
          rotateLayer('y', 0, 'clockwise');
          break;
        case "E'":
          rotateLayer('y', 0, 'anti-clockwise');
          break;
        case 'M':
          rotateLayer('x', 0, 'clockwise');
          break;
        case "M'":
          rotateLayer('x', 0, 'anti-clockwise');
          break;
        case "S'":
          rotateLayer('z', 0, 'clockwise');
          break;
        case 'S':
          rotateLayer('z', 0, 'anti-clockwise');
          break;
        case "x'":
          rotateFullCube('x', Math.PI / 2, 'clockwise');
          break;
        case 'x':
          rotateFullCube('x', Math.PI / 2, 'anti-clockwise');
          break;
        case "y'":
          rotateFullCube('y', Math.PI / 2, 'clockwise');
          break;
        case 'y':
          rotateFullCube('y', Math.PI / 2, 'anti-clockwise');
          break;
        case 'z':
          rotateFullCube('z', Math.PI / 2, 'anti-clockwise');
          break;
        case "z'":
          rotateFullCube('z', Math.PI / 2, 'clockwise');
          break;
        case "U'":
          rotateLayer('y', 1, 'clockwise');
          break;
        case 'U':
          rotateLayer('y', 1, 'anti-clockwise');
          break;
        case "D'":
          rotateLayer('y', -1, 'anti-clockwise');
          break;
        case 'D':
          rotateLayer('y', -1, 'clockwise');
          break;
        case "L'":
          rotateLayer('x', -1, 'anti-clockwise');
          break;
        case 'L':
          rotateLayer('x', -1, 'clockwise');
          break;
        case "R'":
          rotateLayer('x', 1, 'clockwise');
          break;
        case 'R':
          rotateLayer('x', 1, 'anti-clockwise');
          break;
        case "F'":
          rotateLayer('z', 1, 'clockwise');
          break;
        case 'F':
          rotateLayer('z', 1, 'anti-clockwise');
          break;
        case 'B':
          rotateLayer('z', -1, 'clockwise');
          break;
        case "B'":
          rotateLayer('z', -1, 'anti-clockwise');
          break;
      }
    }
  };
  const setShowCodeValue = (showCode) => {
    setShowCode(showCode);
  };
  const setShowFacesValue = (faces) => {
    setShowFaces(faces);
  };
  const setNewCube = (faces) => {
    setShowFaces(faces);
    cubeRefs.forEach(({ ref, position }) => {
      if (ref.current) {
        // 获取原始坐标（从position数组的第0-2位）
        const [x, y, z] = position.slice(0, 3).map(Number);

        // 重置旋转和位置
        ref.current.rotation.set(0, 0, 0);
        ref.current.position.set(x * cubeScale, y * cubeScale, z * cubeScale);
      }
    });

    // 重置二维状态数组
    setCube(initialCube);
  };
  // 把子组件方法暴露出去  一定注意要把组件的第二个参数ref传递进来
  useImperativeHandle(refProp, () => ({
    rotateCube: rotateCube,
    setNewCube: setNewCube,
    setShowCodeValue: setShowCodeValue,
    setShowFacesValue: setShowFacesValue,
  }));
  return (
    <div className='flex items-center justify-center w-full h-full position-relative'>
      <div className='flex-1 w-full h-full '>
        <Canvas camera={{ position: [5, 5, 5] }}>
          <ambientLight intensity={1} />
          <pointLight position={[5, 5, 5]} />
          <OrbitControls />
          <group>
            {cubeRefs.map(({ ref, position }, index) => (
              <Cube key={index} position={position} refProp={ref} showCode={showCode} showFaces={showFaces} blindCode={blindCodeData.blindCodeData} />
            ))}
          </group>
        </Canvas>
      </div>
    </div>
  );
});

export default RubiksCube;
