import React from 'react';

function LoadScreen() {
  return (
    <div className="load-screen">
      <h1>Loading...</h1>
      <div className="chart-container">
        <div className="bar first-bar"></div>
        <div className="bar second-bar"></div>
        <div className="bar third-bar"></div>
        <div className="bar fourth-bar"></div>
        <div className="bar fifth-bar"></div>
        <div className="bar sixth-bar"></div>
        <div className="bar seventh-bar"></div>
      </div>
    </div>
  );
}

export default LoadScreen;
