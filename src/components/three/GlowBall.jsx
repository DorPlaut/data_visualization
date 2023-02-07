import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

function GlowBall(props) {
  // generate array
  function generateRandomNumbers(length, min = 0.1, max = 0.9) {
    const result = [];
    for (let i = 0; i < length; i++) {
      result.push(Math.random() * (max - min) + min);
    }
    return result;
  }
  //   ref
  const circleRef = useRef(null);
  const particaleRef = useRef(null);
  //   useFrame
  useFrame((state, delta) => {
    circleRef.current.rotation.y += delta / 10;
  });
  // mouse control

  return (
    <>
      <mesh ref={circleRef}>
        {generateRandomNumbers(300).map((i, index) => {
          const angle = (360 / 100) * index;
          const x = Math.cos(angle) * 3.8;
          const y = i / 4;
          const z = Math.sin(angle) * 3.8;
          return (
            <mesh
              {...props}
              ref={particaleRef}
              scale={0.04}
              position={[x, y, z]}
              key={index}
            >
              <sphereGeometry args={[0.03 + i / 4, 2, 1]} />
              <meshStandardMaterial color={[3, 1, 10]} toneMapped={false} />
            </mesh>
          );
        })}
      </mesh>
    </>
  );
}

export default GlowBall;
