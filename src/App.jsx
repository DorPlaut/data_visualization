import { useEffect, useState, Suspense } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { changePage } from './redux/currentPageSlice';
import { setIsMobile } from './redux/isMobileSlice';

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
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  // redux
  const currentPage = useSelector((state) => state.currentPage.value);
  const isMobile = useSelector((state) => state.isMobile.value);
  const dispatch = useDispatch();

  //
  const defineMobile = () => {
    if (window.outerWidth < 950) {
      dispatch(setIsMobile(true));
    } else {
      dispatch(setIsMobile(false));
    }
    if (window.outerWidth < 600) {
      setIsWideScreen(true);
    } else {
      setIsWideScreen(false);
    }
  };
  useEffect(() => {
    defineMobile();
    window.addEventListener('resize', () => {
      defineMobile();
    });
  }, []);

  return (
    <>
      <div className="app">
        {isStarted ? (
          <>
            <div className="three">
              <Suspense fallback={<span>loading...</span>}>
                <Canvas>
                  <Three />
                </Canvas>
              </Suspense>
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
          <Welcome setIsStarted={setIsStarted} isMobile={isWideScreen} />
        </>
      </div>
    </>
  );
}

export default App;
