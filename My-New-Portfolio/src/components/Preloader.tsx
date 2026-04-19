import React from 'react';

interface PreloaderProps {
  heights: number[];
}

const Preloader: React.FC<PreloaderProps> = ({ heights }) => {
  return (
    <div className="intro-container">
      {heights.map((h, i) => (
        <div 
          key={i} 
          className="intro-block" 
          style={{ 
            height: `${h}vh`,
          }}
        />
      ))}
      <div className="center-loading-wrapper">
        <h2 className="center-loading-text">LOADING</h2>
        <div className="hourglass">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2H6v6l4 4-4 4v6h12v-6l-4-4 4-4V2z" />
          </svg>
        </div>
      </div>
      <div className="loading-line-container">
        <div className="loading-line" />
        <span className="loading-percentage">0%</span>
      </div>
    </div>
  );
};

export default Preloader;
