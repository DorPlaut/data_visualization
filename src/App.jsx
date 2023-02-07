import { useEffect, useState } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { changePage } from './redux/currentPageSlice';

// components
import BackHome from './components/BackHome';
import Three from './components/Three';
import BarChart from './components/projects/BarChart';
import ChoroplethMap from './components/projects/ChoroplethMap';
import HeatMap from './components/projects/HeatMap';
import Treemap from './components/projects/Treemap';
import Scatterplot from './components/projects/Scatterplot';
import Welcome from './components/Welcome';

function App() {
  // local state
  const [isMobile, setIsMobile] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  // redux
  const currentPage = useSelector((state) => state.currentPage.value);

  //
  const defineMobile = () => {
    if (window.outerWidth < 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    defineMobile();
    window.addEventListener('resize', () => {
      defineMobile();
    });
  }, []);
  // useEffect(() => {
  //   if (window.outerWidth < 700) {
  //     setIsMobile(true);
  //   } else {
  //     setIsMobile(false);
  //   }
  // }, []);
  return (
    <>
      <div className="app">
        {isStarted ? (
          <>
            <div className="three">
              <Canvas>
                <Three />
              </Canvas>
            </div>

            {/* Projects */}
            <div
              className={
                currentPage == 'home' ? 'unvisible' : 'project-container'
              }
            >
              {currentPage == 'home' ? (
                ''
              ) : (
                <div className="back-home-btn">
                  <BackHome />
                </div>
              )}
              {currentPage == 'barChart' ? <BarChart /> : ''}

              {currentPage == 'choroplethMap' ? <ChoroplethMap /> : ''}

              {currentPage == 'heatMap' ? <HeatMap /> : ''}

              {currentPage == 'treemap' ? <Treemap /> : ''}
              {currentPage == 'scatterplot' ? <Scatterplot /> : ''}
            </div>
          </>
        ) : (
          ''
        )}
        <>
          <Welcome setIsStarted={setIsStarted} isMobile={isMobile} />
        </>
      </div>
    </>
  );
}

export default App;
