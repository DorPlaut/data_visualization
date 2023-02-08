import React, { useEffect, useRef, useState } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { angleToRadians } from '../../utils/angle';
import { useTimer } from 'use-timer';

function Loading(props) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x -= delta / 8;
  });
  return (
    <mesh
      {...props}
      //   ref={meshRef}
    >
      <Text
        ref={meshRef}
        rotation={[angleToRadians(270), angleToRadians(270), angleToRadians(0)]}
        fontSize={0.5}
        color={'white'}
        anchorX="center"
        anchorY="middle"
      >
        Loading...
      </Text>

      <meshStandardMaterial color={props.color} />
    </mesh>
  );
}

export default Loading;
