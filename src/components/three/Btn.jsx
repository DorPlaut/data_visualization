import React, { useRef, useState } from 'react';
import { Text, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { changePage } from '../../redux/currentPageSlice';
import Logo from './Logo';

function Btn(props) {
  const { page, text, setIsSelected } = props;
  // redux
  const dispacth = useDispatch();
  // ref
  const mesh = useRef(null);

  // state
  const [hovered, setHover] = useState(false);
  const [isClickd, setIsClicks] = useState(false);

  // handle click animation
  const handleClick = () => {
    setIsClicks(true);
    setTimeout(() => {
      setIsClicks(false);
    }, 100);
  };
  // animation

  useFrame((state, delta) => {
    if (isClickd) {
      mesh.current.rotation.x += delta * 150;
    } else {
      mesh.current.rotation.x += (0 - mesh.current.rotation.x) * 0.05;
    }
  });
  return (
    <>
      <mesh
        {...props}
        ref={mesh}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}
        onClick={() => {
          handleClick();
        }}
      >
        <Text
          fontSize={0.1}
          color="white"
          anchorX="center"
          anchorY="middle"
          position={[0, 0, 0.03]}
        >
          {text}
        </Text>
        <boxGeometry args={[0.7, 0.2, 0.05]} />
        <meshStandardMaterial color={hovered ? 'purple' : 'green'} />
      </mesh>
    </>
  );
}

export default Btn;
