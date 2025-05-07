import * as THREE from "three";
import { useRef, useState, useEffect, createRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, RoundedBox } from "@react-three/drei";

const Cube=(position,cubeRef,blindCode,showColor,showFace){
    const pasterOffset=0.535 // 贴纸偏移量，略高于方块表面

    //获取盲拧魔方的编码
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
    //魔方6面颜色
    let colors = ['#009E60', '#0051BA', '#FFD500', '#FFFFFF', '#C41E3A', '#FF5800'] // R L U D F B
    colors = ['#00FF00', '#0000FF', '#FFFF00', '#FFFFFF', '#FF0000', '#FFA500'] // R L U D F B
     return (
         <group ref={cubeRef} position={position} >
             {/* 渲染圆角方块作为基础 */}
             <RoundedBox args={[1, 1, 1]} radius={0.15} smoothness={10}>
                 <meshStandardMaterial color="black" />
             </RoundedBox>
         </group>
     )
}

const RubiksCube = (blindCode) => {

    //#region 基础变量
    const [cubeRefs, setCubeRefs] = useState([]);
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

    //#region 基础函数
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
    //#endregion
}