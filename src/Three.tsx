import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Scroll, useGLTF } from "@react-three/drei";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useControls } from "leva";
import { useScroll } from "framer-motion";
import * as Controls from "three/examples/jsm/controls/OrbitControls";
import { Euler, Quaternion, Vector3 } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three"

gsap.registerPlugin(ScrollTrigger)

interface CameraKeyframes {
  position: Vector3;
  target: Vector3;
  rotation: Euler;
}

export const cameraKeyframes: CameraKeyframes[] = [
  {
    position: new Vector3(2.8, 0.6, 4.9),
    target: new Vector3(-2.79, -0.13, 0.49),
    rotation: new Euler().setFromQuaternion(new Quaternion(-0.05, 0.43, 0.02, 0.9)),
  },
  {
    position: new Vector3(0.4, 3.4, 1.1),
    target: new Vector3(0.87, -1.27, 0.69),
    rotation: new Euler().setFromQuaternion(new Quaternion(-0.59, -0.33, -0.29, 0.7)),
  },
  {
    position: new Vector3(2.8, 0.6, 4.9),
    target: new Vector3(-2.79, -0.13, 0.49),
    rotation: new Euler().setFromQuaternion(new Quaternion(-0.05, 0.43, 0.02, 0.9)),
  },
]

function Model() {

  const gltf = useGLTF("/scene.glb")
  return <primitive object={gltf.scene}></primitive>;
}

function CameraKeyframes() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!)
  const [bundle, set] = useControls(() => ({
    position: {
      x: 3, y: 1, z: 1
    },
    target: {
      x: -1.8280491347,
      y: -0.2978203054,
      z: 1.0575575797,
    },
    quaternion: {
      x: 0,
      y: 0,
      z: 0,
    },
    w: 1
  }))

  useLayoutEffect(() => {
    const tl = gsap.timeline({

      scrollTrigger: {
        trigger: ".section-1",
        start: "top top",
        endTrigger: ".section-3",
        end: "bottom bottom",
        scrub: 1
      }

    });


    tl
      .to(cameraRef.current.position, { duration: 1, x: cameraKeyframes[1].position.x, y:cameraKeyframes[1].position.y, z: cameraKeyframes[1].position.z },'label0')
      .to(cameraRef.current.rotation, { duration: 1, x: cameraKeyframes[1].rotation.x, y:cameraKeyframes[1].rotation.y, z: cameraKeyframes[1].rotation.z }, 'label0')
      .to(cameraRef.current.position, { duration: 1, x: cameraKeyframes[0].position.x, y:cameraKeyframes[0].position.y, z: cameraKeyframes[0].position.z },'label1')
      .to(cameraRef.current.rotation, { duration: 1, x: cameraKeyframes[0].rotation.x, y:cameraKeyframes[0].rotation.y, z: cameraKeyframes[0].rotation.z }, 'label1')


    ScrollTrigger.create({
      scroller: '.scroll-container',
      animation: tl
    })

  })


  return <>
    <PerspectiveCamera ref={cameraRef} makeDefault fov={50} position={cameraKeyframes[0].position}
                       rotation={cameraKeyframes[0].rotation}/>
  </>;
}

export const Three = () => {

  return (
    <div className="canvas-container">
      <Canvas>

        <CameraKeyframes/>
        <ambientLight intensity={0.3}/>
        <Model/>
      </Canvas>
    </div>
  )
}
