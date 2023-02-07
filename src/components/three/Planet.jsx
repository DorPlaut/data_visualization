import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Effects } from '@react-three/drei';
import * as THREE from 'three';

import { extend } from '@react-three/fiber';
import { UnrealBloomPass } from 'three-stdlib';
extend({ UnrealBloomPass });

function Planet(props) {
  console.log(props.speed);
  const planetTexture = useTexture(
    {
      map: './Textures/planet/Canyon_Rock_002_basecolor.jpg',
      normalMap: './Textures/planet/Canyon_Rock_002_normal.jpg',
      displacementMap: './Textures/planet/Canyon_Rock_002_height.png',
      roughnessMap: './Textures/planet/Canyon_Rock_002_roughness.jpg',
      aoMap: './Textures/planet/Canyon_Rock_002_ambientOcclusion.jpg',
    },
    (texture) => {
      // mesh.current.material.map.repeat.set(4, 4);
      texture.map((i) => {
        i.wrapS = i.wrapT = THREE.RepeatWrapping;
        i.repeat.set(2, 2);
      });
    }
  );
  const sunTexture = useTexture(
    {
      map: './Textures/planet/Lava_002_COLOR.png',
      normalMap: './Textures/planet/Lava_002_NRM.png',
      displacementMap: './Textures/planet/Lava_002_DISP.png',
      roughnessMap: './Textures/planet/Lava_002_SPEC.png',
      aoMap: './Textures/planet/Lava_002_OCC.png',
    },
    (texture) => {
      // mesh.current.material.map.repeat.set(4, 4);
      texture.map((i) => {
        i.wrapS = i.wrapT = THREE.RepeatWrapping;
        i.repeat.set(2, 2);
      });
    }
  );

  useEffect(() => {}, []);
  const mesh = useRef(null);
  useFrame((state, delta) => {
    // mesh.current.rotation.x += delta / 15;
    mesh.current.rotation.y -= delta / props.speed;
    // mesh.current.rotation.z += delta / 15;
  });
  return (
    <>
      <mesh {...props} ref={mesh}>
        <sphereGeometry args={[1.5, 100, 50]} />
        <meshStandardMaterial
          {...planetTexture}
          displacementScale={0.05}
          color={[3, 0, 1]}
          toneMapped={false}
        />
      </mesh>
      <mesh {...props} position={[25, 3, -30]}>
        <sphereGeometry args={[1.5, 100, 50]} />
        <meshStandardMaterial
          {...sunTexture}
          displacementScale={0.1}
          color={[2, 2, 2]}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

export default Planet;
