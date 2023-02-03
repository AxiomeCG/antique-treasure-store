import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, useGLTF } from "@react-three/drei";
import React, { useEffect, useState } from "react";
import { useControls } from "leva";
import { useScroll } from "framer-motion";
import * as Controls from "three/examples/jsm/controls/OrbitControls";
import { Quaternion, Vector3 } from "three";
import gsap from "gsap";

interface CameraKeyframes {
  position: Vector3;
  target: Vector3;
  quaternion: Quaternion;
}

export const cameraKeyframes: CameraKeyframes[] = [
  {
    position: new Vector3(2.8, 0.6, 4.9),
    target: new Vector3(-2.79, -0.13, 0.49),
    quaternion: new Quaternion(-0.05, 0.43, 0.02, 0.9),
  },
  {
    position: new Vector3(0.4, 3.4, 1.1),
    target: new Vector3(0.87, -1.27, 0.69),
    quaternion: new Quaternion(-0.59, -0.33, -0.29, 0.7),
  }
]

function Model() {

  const gltf = useGLTF("/scene.glb")
  return <primitive object={gltf.scene}></primitive>;
}

function CameraKeyframes() {

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


  const {scrollYProgress} = useScroll();
  const [index, setIndex] = useState(Math.floor((scrollYProgress.get() * 2)));

  scrollYProgress.on("change", (latest) => {
    setIndex(Math.floor(latest * 2))
  })

  const camera = useThree(engine => engine.camera)

  const switchView = (index: number) => {
    const timeline = gsap.timeline();

    const savedQuaternion = camera.quaternion.clone()

    timeline.to(camera.position, {
      x: cameraKeyframes[index].position.x,
      y: cameraKeyframes[index].position.y,
      z: cameraKeyframes[index].position.z,
      duration: 2,
      onUpdate: () => {
        const progress = timeline.progress();
        const slerpedQuaternion = new Quaternion().slerpQuaternions(savedQuaternion, cameraKeyframes[index].quaternion, progress);
        camera.quaternion.copy(slerpedQuaternion)
      }
    })
  }
  useEffect(() => {
    console.log(index);
    if (index >= 1) {
      console.log("animate");
      switchView(1)
    } else {
      switchView(0)
    }
  }, [index])

  useFrame((engine) => {
    const orbitControls = engine.controls as Controls.OrbitControls;

    if (orbitControls && orbitControls.object) {
      set({
        position: [orbitControls.object.position.x, orbitControls.object.position.y, orbitControls.object.position.z],
        target: [orbitControls.target.x, orbitControls.target.y, orbitControls.target.z],
        quaternion: {
          x: orbitControls.object.quaternion.x,
          y: orbitControls.object.quaternion.y,
          z: orbitControls.object.quaternion.z,
        },
        w: orbitControls.object.quaternion.w,
      })
    }
  })

  return <>

  </>;
}

export const Three = () => {

  return (
    <div className="canvas-container">
      <Canvas>
        <PerspectiveCamera makeDefault fov={50} position={cameraKeyframes[0].position}
                           quaternion={cameraKeyframes[0].quaternion}/>
        <CameraKeyframes/>
        <ambientLight intensity={0.3}/>
        <Model/>
      </Canvas>
    </div>
  )
}
