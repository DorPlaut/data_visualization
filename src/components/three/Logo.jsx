import React, { useEffect, useRef, useState } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useTimer } from 'use-timer';
import Btn from './Btn';
import { angleToRadians } from '../../utils/angle';

function Logo(props) {
  const [text, setText] = useState('Hello World');
  const meshRef = useRef();
  const { time, start, pause, reset, status } = useTimer();
  // const fastTime = useTimer(10).time;
  const [int, setInt] = useState(0.001);

  const floatTimer = () => {
    setInt(0.0004);
    setTimeout(() => {
      setInt(-0.0004);
      setTimeout(() => {
        floatTimer();
      }, 2000);
    }, 2000);
  };

  // useFrame((state, delta) => {
  //   meshRef.current.position.z += int;
  // });
  // useEffect(() => {
  //   floatTimer();
  // }, []);

  return (
    <>
      <mesh {...props} ref={meshRef}>
        <Text
          fontSize={0.5}
          color={props.color}
          anchorX="center"
          anchorY="middle"
        >
          Data Visualization
        </Text>
        <Text
          position={[0, -0.3, 0]}
          fontSize={0.2}
          color={props.color}
          anchorX="center"
          anchorY="middle"
        >
          4 Data Visualization projects made with D3.js
        </Text>
        <Text
          position={[0, -0.6, 0]}
          fontSize={0.2}
          color={props.color}
          anchorX="center"
          anchorY="middle"
        >
          By Dor Plaut
        </Text>
        <meshStandardMaterial color={props.color} toneMapped={false} />
        <mesh
          onClick={(e) => {
            window.open('https://dorplaut.netlify.app/');
          }}
        >
          <Btn position={[0, -0.85, 0]} text="My Portfolio" />
        </mesh>

        <mesh
          rotation={[angleToRadians(90), 0, angleToRadians(90)]}
          position={[0, -0.5, -0.02]}
        >
          <boxGeometry args={[0.01, 4.3, 1.6]} />
          <meshStandardMaterial
            toneMapped={false}
            transparent={true}
            opacity={0.7}
            color={'black'}
          />
        </mesh>
      </mesh>
    </>
  );
}

export default Logo;
