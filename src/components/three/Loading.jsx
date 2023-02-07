import React, { useEffect, useRef, useState } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { angleToRadians } from '../../utils/angle';
import { useTimer } from 'use-timer';

function Loading(props) {
  return (
    <mesh
      {...props}
      //   ref={meshRef}
    >
      <Text
        rotation={[angleToRadians(270), angleToRadians(270), angleToRadians(0)]}
        fontSize={0.5}
        color={'red'}
        anchorX="center"
        anchorY="middle"
      >
        Loading..
      </Text>

      <meshStandardMaterial color={props.color} />
    </mesh>
  );
}

export default Loading;
