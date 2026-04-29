import React from 'react';

interface PreloaderProps {
  heights: number[];
}

const Preloader: React.FC<PreloaderProps> = ({ heights }) => {
  const name1 = "ADHIL".split("");
  const name2 = "UNNIKRISHNAN".split("");

  return (
    <div className="intro-container">
      {heights.map((h, i) => (
        <div 
          key={i} 
          className="intro-block" 
          style={{ 
            height: `${(i === 29 || i === 30) ? 100 : h}vh`,
          }}
        >
          {i === 29 && (
            <div className="slice-name vertical name-first">
              {name1.map((char, index) => <span key={index}>{char}</span>)}
            </div>
          )}
          {i === 30 && (
            <div className="slice-name vertical name-second">
              {name2.map((char, index) => <span key={index}>{char}</span>)}
            </div>
          )}
        </div>
      ))}
      
      <div className="hourglass-wrapper">
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
