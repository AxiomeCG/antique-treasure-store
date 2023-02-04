import { Canvas, useThree } from "@react-three/fiber";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { Euler, Quaternion, Vector3 } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    position: new Vector3(0.7450892432264768, -1.171423004129647,  1.6672241164365516),
    target: new Vector3(-2.79, -0.13, 0.49),
    rotation: new Euler().setFromQuaternion(new Quaternion(0.04968318113661581, -0.028031887588781116, -0.028031887588781116, 0.8695191141477744)),
  },
]

function Model() {

  const gltf = useGLTF("/scene.glb")
  return <primitive object={gltf.scene}></primitive>;
}

function CameraKeyframes() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline()
      let scrollTriggerParams = {
        start: "top bottom",
        end: "top top",

        scrub: true,
        markers: true,
      };
      //FIRST SECTION

      tl.to(cameraRef.current.position, {
        x: cameraKeyframes[1].position.x,
        y: cameraKeyframes[1].position.y,
        z: cameraKeyframes[1].position.z,
        scrollTrigger: {
          trigger: ".section-2",
          ...scrollTriggerParams
        },
      } )
        .to(cameraRef.current.rotation, {
          x: cameraKeyframes[1].rotation.x,
          y: cameraKeyframes[1].rotation.y,
          z: cameraKeyframes[1].rotation.z,
          scrollTrigger: {
            trigger: ".section-2",
            ...scrollTriggerParams
          }
        })
        //SECOND SECTION
        .to(cameraRef.current.position, {
          x: cameraKeyframes[2].position.x,
          y: cameraKeyframes[2].position.y,
          z: cameraKeyframes[2].position.z,
          scrollTrigger: {
            trigger: ".section-3",
            ...scrollTriggerParams
          }
        })
        .to(cameraRef.current.rotation, {
          x: cameraKeyframes[2].rotation.x,
          y: cameraKeyframes[2].rotation.y,
          z: cameraKeyframes[2].rotation.z,
          scrollTrigger: {
            trigger: ".section-3",
            ...scrollTriggerParams
          }
        }, )
    }); // <- scopes all selector text inside the context to this component (optional, default is document)

    return () => ctx.revert(); // cleanup!
  }, [])


  return <>
    <PerspectiveCamera ref={cameraRef} makeDefault fov={50} position={cameraKeyframes[0].position} rotation={cameraKeyframes[0].rotation} />
  </>;
}

export const ThreeViewer = () => {

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
