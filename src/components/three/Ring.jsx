import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { angleToRadians } from '../../utils/angle';
import { useTimer } from 'use-timer';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// components
import Window from './Window';
import Logo from './Logo';

function Ring(props) {
  // timer
  const { time, start, pause, reset, status } = useTimer();
  // state
  const [target, setTarget] = useState(270);
  // ref
  const mesh = useRef(null);

  // spin func
  const spinToProject = (target) => {
    setTarget(target);
    start();
  };
  // mouse control
  useEffect(() => {
    window.addEventListener('wheel', (event) => {
      setTarget(target + event.deltaY / 30);
    });
  });
  let currentDegree;
  useFrame((state, delta) => {
    if (mesh.current) {
      currentDegree =
        Math.round((mesh.current.rotation.z / Math.PI) * 180) % 360;
      let rotationDifference = (target - currentDegree + 360) % 360;
      if (rotationDifference > 180) {
        rotationDifference -= 360;
      }
      if (rotationDifference !== 0) {
        mesh.current.rotation.z += (delta * 10 * rotationDifference) / 180;
      } else {
        pause();
        reset();
      }
    }
  });
  // positon on ring
  function getPositionArray(degree) {
    const radians = angleToRadians(degree);
    const x = 3.5 * Math.cos(radians);
    const y = 3.5 * Math.sin(radians);
    return [x, y, -1.3];
  }

  // windows details
  const barchartImg = useTexture('/bar_chart.jpg');
  const mapImg = useTexture('/choropleth-map.jpg');
  const heatmapImg = useTexture('/heatmap.jpg');
  const treemapImg = useTexture('/treemap.jpg');
  const scatterplotImg = useTexture('/scatterplot.jpg');

  // set animation on afer load
  // useEffect(() => {
  //   props.setIsAnimating(true);
  // }, []);

  // return
  return (
    <mesh
      {...props}
      ref={mesh}
      position={[0, 0, 0]}
      rotation={[angleToRadians(90), 0, angleToRadians(270)]}
    >
      <Logo
        position={[-3.6, 0, -1.2]}
        rotation={[angleToRadians(0), angleToRadians(250), angleToRadians(90)]}
        color={'lightgreen'}
        onClick={() => {
          spinToProject(270);
        }}
      />

      <Window
        target={target}
        ancor={0}
        map={barchartImg}
        page="barChart"
        text="Visualize Data with a Bar Chart"
        name="United States GDP"
        position={getPositionArray(90)}
        rotation={[angleToRadians(250), 0, 0]}
        onClick={() => {
          spinToProject(0);
        }}
      />
      <Window
        target={target}
        ancor={45}
        map={heatmapImg}
        page="heatMap"
        name="Land-Surface Temperature"
        text="Visualize Data with a Heat Map"
        position={getPositionArray(45)}
        rotation={[angleToRadians(240), angleToRadians(45), angleToRadians(20)]}
        onClick={() => {
          spinToProject(45);
        }}
      />
      <Window
        target={target}
        ancor={90}
        map={mapImg}
        page="choroplethMap"
        text="Visualize Data with a Choropleth Map"
        name="US Educational Attainment"
        position={getPositionArray(0)}
        rotation={[angleToRadians(180), angleToRadians(70), angleToRadians(90)]}
        onClick={() => {
          spinToProject(90);
        }}
      />
      <Window
        target={target}
        ancor={135}
        page="treemap"
        text="Visualize Data with a Treemap Diagram"
        name="Video Game Sales"
        map={treemapImg}
        position={getPositionArray(315)}
        rotation={[
          angleToRadians(300),
          angleToRadians(140),
          angleToRadians(340),
        ]}
        onClick={() => {
          spinToProject(135);
        }}
      />
      <Window
        target={target}
        ancor={180}
        page="scatterplot"
        text="Visualize Data with a Scatterplot Graph"
        name="Doping Cyclists"
        map={scatterplotImg}
        position={getPositionArray(270)}
        rotation={[angleToRadians(290), angleToRadians(180), angleToRadians(0)]}
        onClick={() => {
          spinToProject(180);
        }}
      />
    </mesh>
  );
}

export default Ring;
