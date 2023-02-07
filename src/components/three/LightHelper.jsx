import React, { useRef, useState } from 'react';

function LightHelper(props) {
  const mesh = useRef(null);
  const [position, setPosition] = useState([10, 2, -12]);

  return (
    <>
      <pointLight position={position} color="yellow" intensity={0.5} />
      <mesh {...props} ref={mesh} position={position}>
        <coneGeometry args={[0.5, 1, 3]} />
        <meshStandardMaterial color={'red'} wireframe={true} />
      </mesh>
    </>
  );
}

export default LightHelper;
