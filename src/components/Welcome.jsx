import React, { useState, Suspense } from 'react';
import Btn from './three/Btn';
import Planet from './three/Planet';
import { MdScreenRotation } from 'react-icons/md';

import { Canvas, useFrame } from '@react-three/fiber';

function Welcome({ setIsStarted, isMobile }) {
  const [className, setClassName] = useState('welcome-page');
  const handleClick = () => {
    setClassName('welcome-page fade-out');
    setTimeout(() => {
      setIsStarted(true);
    }, 1000);
  };
  return (
    <div className={className}>
      <div className="welcome-container">
        <h1>D3 Data Visualization</h1>
        <h3>interactive display of my Data Visualization projects</h3>
        <p>
          the projects presented in the page are all part of FreeCodeCamp D3
          Data Visualization curse. the interface was created with React.js and
          Three.js. the projects was created using D3, API calls and AJAX
          technologies
        </p>
        {isMobile ? (
          <>
            <br />
            <h5>Please rotate youre device to start</h5>
            <MdScreenRotation className="phone-icon" />
          </>
        ) : (
          <>
            <div className="canvas-container">
              <Suspense fallback={<span>loading...</span>}>
                <Canvas>
                  <ambientLight intensity={0.5} />
                  <mesh
                    onClick={() => {
                      handleClick();
                      dispatch(changePage('home'));
                    }}
                  >
                    <Btn position={[0, 0, 4.1]} text="Lets Go!" />
                  </mesh>
                  <Planet speed={2} />
                </Canvas>
              </Suspense>
            </div>
            <br />
            <span>
              *if your'e using a tablet or an un conventinal screen size. be
              sure to rotate it to use the wide mode
            </span>
          </>
        )}
      </div>
      <footer>
        <span>
          Build by{' '}
          <a href="https://dorplaut.netlify.app/" target="_blank">
            Dor Plaut
          </a>
        </span>
      </footer>
    </div>
  );
}

export default Welcome;
