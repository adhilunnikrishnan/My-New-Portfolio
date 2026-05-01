import React from 'react';

interface PreloaderProps {
  heights: number[];
}

const Preloader: React.FC<PreloaderProps> = ({ heights }) => {
  const name1 = "ADHIL".split("");
  const name2 = "UNNIKRISHNAN".split("");

  return (
    <div className="fixed inset-0 w-screen h-screen flex items-end justify-center z-[9999] bg-transparent pointer-events-none">
      {heights.map((h, i) => (
        <div 
          key={i} 
          className="intro-block flex-1 bg-primary relative border-none -mr-[0.5px] will-change-transform pointer-events-auto" 
          style={{ 
            height: `${(i === 29 || i === 30) ? 100 : h}vh`,
          }}
        >
          {i === 29 && (
            <div className="name-first absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-10 pointer-events-none text-background font-accent text-[1.5vw] uppercase select-none whitespace-nowrap bottom-[calc(60%-0.7vw)] leading-[0.9] tracking-[0.05em]">
              {name1.map((char, index) => <span key={index} className="opacity-0 block translate-y-[10px]">{char}</span>)}
            </div>
          )}
          {i === 30 && (
            <div className="name-second absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-10 pointer-events-none text-background font-accent text-[1.5vw] uppercase select-none whitespace-nowrap top-[calc(40%-0.7vw)] leading-[0.9] tracking-[0.05em]">
              {name2.map((char, index) => <span key={index} className="opacity-0 block translate-y-[10px]">{char}</span>)}
            </div>
          )}
        </div>
      ))}
      
      <div className="hourglass-wrapper absolute top-1/2 right-20 -translate-y-1/2 z-[10001] pointer-events-none">
        <div className="w-8 h-8 text-background">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2H6v6l4 4-4 4v6h12v-6l-4-4 4-4V2z" />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-20 flex items-end z-[10000] overflow-hidden">
        <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-background loading-line" />
        <span className="absolute right-8 bottom-3 text-background font-display font-extrabold text-[2.2rem] tabular-nums loading-percentage">0%</span>
      </div>
    </div>
  );
};

export default Preloader;
