import React from 'react';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { changePage } from '../redux/currentPageSlice';
// components
import Planet from './three/Planet';
import Btn from './three/Btn';
import { angleToRadians } from '../utils/angle';
// three
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  Stars,
  Effects,
} from '@react-three/drei';

function BackHome() {
  const dispatch = useDispatch();
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <mesh
        onClick={() => {
          console.log('ok');
          dispatch(changePage('home'));
        }}
      >
        <Btn position={[0, 0, 4.1]} text="Go Back" />
      </mesh>
      <Planet speed={2} />
    </Canvas>
  );
}

export default BackHome;
