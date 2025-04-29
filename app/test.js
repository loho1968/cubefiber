'use client'
import { Canvas ,useFrame} from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import JEASINGS, { JEasing } from 'jeasings'
import {  useRef,useEffect } from 'react'

export default function Home() {
  const ref = useRef()
  const rotationGroup = useRef()

// Using useFrame to update the scene on screen using JEASINGS achieves animation.
  useFrame(() => {
    JEASINGS.update()
  })

// useEffect hook is used for simple keyboard event on press of q 
// try to rotate the back face (x-axis) of the cube. 

  useEffect(() => {
    const handleKeyDown = (e) => {
        e.stopPropagation()
        if (e.key.toLowerCase() === 'q' ) {
            rotate(ref.current, rotationGroup?.current, 'x', -0.5, 1)
        }
      }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
    }
  )
// In the return function the group with rotationGroup ref is used for temp holder
// we will use this to achieve full face rotation on group axis in a direction 
// instead of individually rotating them on their own axis.
  return (
    <>
    <group ref={ref}>
          {[...Array(3).keys()].map((x) =>
            [...Array(3).keys()].map((y) => 
              [...Array(3).keys()].map((z) => 
              <Cube key={x + y * 3 + z * 9} position={[x - 1, y - 1, z - 1]} />
                  )
              )
          )}
    </group>
    <group ref={rotationGroup}/>
  </>
    
  )
}

// The attach to rotation group works by filtering all the boxes from the main 
// cubeGroup (cubeGroup holds the ref for the main rubiks group) 
// ccubGroup.children give us all the react objects with their properties 
// the limit and position values are used to get front or back positons, while 
// axis is x or y or z based on required face. 
// try changing the limits and axis to understand it better. 

function attachToRotationGroup(cubeGroup, rotationGroup, axis, limit) {
  cubeGroup.children
    .slice()
    .reverse()
    .filter(function (c) {
      return limit < 0 ? c.position[axis] < limit : c.position[axis] > limit
    })
    .forEach(function (c) {
      rotationGroup.attach(c)
    })
}

// The resetCubeGroup function should just takes the boxes in rotation group and 
// returns them back to the main group. 

function resetCubeGroup(cubeGroup, rotationGroup) {
  rotationGroup.children.slice().reverse()
.forEach(function (c) {
      cubeGroup.attach(c)
    })
  rotationGroup.quaternion.set(0, 0, 0, 1)
}

// moveGroup just uses the animation library and rotates it by 90degress with a 
// multiplier giving speed of rotation. 

function moveGroup(rotationGroup, axis, multiplier) {
  new JEasing(rotationGroup.rotation)
    .to(
      {
        [axis]: rotationGroup.rotation[axis] + (Math.PI / 2) * multiplier
      },
      250
    )
    .easing(JEASINGS.Cubic.InOut)
    .start()
}

// This is the main function for controls when no animation is on it resets the 
// rotation group, attaches new faces to the rotation group and calls 
// move function. 

function rotate(cubeGroup, rotationGroup, axis, limit, multiplier) {
  if (!JEASINGS.getLength()) {
    resetCubeGroup(cubeGroup, rotationGroup)
    attachToRotationGroup(cubeGroup, rotationGroup, axis, limit)
    moveGroup(rotationGroup, axis, multiplier)
  }
}