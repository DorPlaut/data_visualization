import React, { useRef, useState, useEffect } from 'react';
import { Text, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { changePage } from '../../redux/currentPageSlice';

import Btn from './Btn';

function Window(props) {
  const { ancor, target, map, page, text, name } = props;
  // ref
  const mesh = useRef(null);
  // redux
  const currentPage = useSelector((state) => state.currentPage.value);

  const dispacth = useDispatch();

  // state
  const [isVisible, setIsVisible] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [int, setInt] = useState(0.001);
  // float animation timer
  const floatTimer = () => {
    setInt(0.0004);
    setTimeout(() => {
      setInt(-0.0004);
      setTimeout(() => {
        floatTimer();
      }, 800);
    }, 800);
  };

  useEffect(() => {
    floatTimer();
  }, []);
  useEffect(() => {
    if (currentPage == 'home') {
      setIsSelected(false);
    }
  }, [currentPage]);

  // set is visible when project is on screen
  useEffect(() => {
    if (ancor + 5 < target || ancor - 5 > target) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [target]);
  // click animation
  useFrame((state) => {
    if (isSelected) {
      const cameraPos = state.camera.position.clone();
      cameraPos.z -= 4;
      cameraPos.y -= 2.75;
      mesh.current.position.lerp(cameraPos, 0.1);
    }
    if (!isSelected) {
      mesh.current.position.lerp({ x: 0, y: 0, z: 0 }, 0.1);
    }
  });
  return (
    <>
      <mesh {...props}>
        {/* image */}
        <mesh ref={mesh}>
          <boxGeometry args={[2, 1.2, 0.1]} />
          <meshStandardMaterial map={map} />
        </mesh>
        {/* label */}
        {isVisible ? (
          <>
            <Text
              fontSize={0.4}
              color="white"
              anchorX="center"
              anchorY="middle"
              position={[0, -0.85, 0]}
            >
              {name}
            </Text>
            {/* description */}

            <mesh
              onClick={(event) => {
                setIsSelected(true);
                setTimeout(() => {
                  dispacth(changePage(page));
                }, 800);
              }}
            >
              <Btn
                position={[0, -1.3, 0]}
                setIsSelected={setIsSelected}
                page={page}
                text="Chack It Out"
              />
            </mesh>

            <Text
              fontSize={0.1}
              color="white"
              anchorX="center"
              anchorY="middle"
              position={[0, -1.1, 0]}
              opacity={0}
            >
              {text}
            </Text>
          </>
        ) : (
          ''
        )}
      </mesh>
    </>
  );
}

export default Window;
