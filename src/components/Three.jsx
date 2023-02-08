import React, { useRef, useState, useEffect, Suspense } from 'react';
import { angleToRadians } from '../utils/angle';
// three
import { useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  Stars,
  Effects,
} from '@react-three/drei';
import { extend } from '@react-three/fiber';
import { UnrealBloomPass } from 'three-stdlib';
extend({ UnrealBloomPass });

// components
import Planet from './three/Planet';
import Ring from './three/Ring';
import GlowBall from './three/GlowBall';
import LightHelper from './three/LightHelper';
import Loading from './three/Loading';
import Btn from './three/Btn';

function Three() {
  // state
  const [isMainPage, setIsMainPage] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // ref
  const orbitControlsRef = useRef(null);
  const starsRef = useRef(null);
  const cameraRef = useRef(null);
  useFrame((state, delta, xrFrame) => {
    starsRef.current.rotation.y += delta / 50;
  });

  // camera positions
  const startPosition = {
    position: [-20, 20, 70],
    rotation: [angleToRadians(90), angleToRadians(0), angleToRadians(90)],
  };
  const endPosition = {
    position: [0, 2, 7],
    rotation: [angleToRadians(-16), 0, 0],
  };

  useFrame((state, delta) => {
    const elapsed = (state.clock.getElapsedTime() * 2) / 6;
    if (isAnimating == true) {
      if (elapsed < 1) {
        cameraRef.current.position.x =
          startPosition.position[0] * (1 - elapsed) +
          endPosition.position[0] * elapsed;
        cameraRef.current.position.y =
          startPosition.position[1] * (1 - elapsed) +
          endPosition.position[1] * elapsed;
        cameraRef.current.position.z =
          startPosition.position[2] * (1 - elapsed) +
          endPosition.position[2] * elapsed;
        cameraRef.current.rotation.x =
          startPosition.rotation[0] * (1 - elapsed) +
          endPosition.rotation[0] * elapsed;
        cameraRef.current.rotation.y =
          startPosition.rotation[1] * (1 - elapsed) +
          endPosition.rotation[1] * elapsed;
        cameraRef.current.rotation.z =
          startPosition.rotation[2] * (1 - elapsed) +
          endPosition.rotation[2] * elapsed;
      } else {
        setIsAnimating(false);
      }
    }
  });
  useEffect(() => {
    if (isAnimating) {
      setTimeout(() => {
        setIsMainPage(true);
      }, 3000);
    }
  }, [isAnimating]);

  // mouse control

  useFrame((state, delta) => {
    if (!!orbitControlsRef.current) {
      const { x, y } = state.mouse;
      orbitControlsRef.current.setAzimuthalAngle(x * angleToRadians(4));
      orbitControlsRef.current.update();
    }
  });

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={startPosition.position}
        rotation={startPosition.rotation}
        ref={cameraRef}
      />
      {isMainPage ? (
        <OrbitControls
          ref={orbitControlsRef}
          enableRotate={false}
          enablePan={false}
          enableZoom={false}
        />
      ) : (
        ''
      )}
      {/* <LightHelper /> */}
      <ambientLight intensity={0.5} />
      <pointLight position={[2, -3, 0]} color="red" intensity={1} />
      <pointLight position={[-2, 3, 0]} color="blue" intensity={2} />
      <pointLight position={[2, 3, 2]} color="green" intensity={2} />
      <pointLight position={[10, 2, -5]} color="yellow" intensity={2} />
      <Loading />
      <Suspense
        fallback={
          <Loading
            position={[-20, 26, 70]}
            rotation={[
              angleToRadians(0),
              angleToRadians(90),
              angleToRadians(90),
            ]}
          />
        }
      >
        <mesh
          position={[-20, 22, 70]}
          rotation={[angleToRadians(90), angleToRadians(0), angleToRadians(90)]}
          onClick={() => setIsAnimating(true)}
        >
          <Btn text="Lets Fly" />
        </mesh>

        <GlowBall />
        <Planet speed={10} />
        <Ring setIsAnimating={setIsAnimating} />
      </Suspense>
      <Stars
        ref={starsRef}
        radius={100}
        depth={50}
        count={6000}
        factor={7}
        saturation={0}
        fade
        speed={1}
      ></Stars>
      <Effects disableGamma>
        <unrealBloomPass threshold={1} strength={10} radius={1} />
      </Effects>
    </>
  );
}

export default Three;
