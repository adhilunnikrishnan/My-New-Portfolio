import React, { useRef, useEffect } from 'react';
import photo from '../../../assets/photo.png';
import gsap from 'gsap';

interface HeroProps {
  thingsIDo: string[];
}

const Hero: React.FC<HeroProps> = ({ thingsIDo }) => {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tickerRef.current) {
      const items = tickerRef.current.querySelectorAll('.ticker-item');
      const tl = gsap.timeline({ repeat: -1 });

      items.forEach((item) => {
        tl.to(item, {
          y: '0%',
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out'
        })
        .to(item, {
          y: '-100%',
          opacity: 0,
          duration: 0.8,
          delay: 2, // Hold for 2 seconds
          ease: 'power3.in'
        });
      });
    }
  }, [thingsIDo]);

  return (
    <section className="hero h-screen w-full sticky top-0 z-10 overflow-hidden bg-background text-primary">
      <div className="max-w-[1200px] mx-auto px-8 h-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
        <div className="flex-[1.5] z-20">
          <span className="block overflow-hidden">
            <p className="reveal-text text-[clamp(1rem,3vw,1.5rem)] text-primary opacity-80 mb-4 font-light tracking-[2px]">HELLO, I AM</p>
          </span>
          <span className="block overflow-hidden">
            <h1 className="reveal-text text-[clamp(3rem,10vw,6rem)] leading-[0.9] mb-4 text-primary font-black uppercase">ADHIL UNNIKRISHNAN</h1>
          </span>
          <span className="block overflow-hidden">
            <p className="reveal-text text-[clamp(1rem,3vw,1.5rem)] text-primary opacity-80 mb-8 font-light tracking-[2px]">Full Stack Developer & Creative Designer</p>
          </span>
          
          <div className="reveal-text mt-8 h-[2.5rem] overflow-hidden relative">
            <div className="h-full relative" ref={tickerRef}>
              {thingsIDo.map((thing, _index) => (
                <div key={_index} className="ticker-item absolute top-0 left-0 w-full h-full flex items-center gap-4 text-2xl font-semibold text-primary border-l-[3px] border-primary px-4 bg-gradient-to-r from-primary-glow to-transparent" style={{ transform: 'translateY(100%)', opacity: 0 }}>
                  {thing}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 relative flex justify-center items-center">
          <div className="image-wrapper relative w-full max-w-[300px] lg:max-w-[450px] aspect-square border-[6px] lg:border-[10px] border-primary p-3 lg:p-5 transition-transform duration-500 after:content-[''] after:absolute after:top-3 lg:after:top-5 after:left-3 lg:after:left-5 after:-right-3 lg:after:-right-5 after:-bottom-3 lg:after:-bottom-5 after:border-2 after:border-primary after:-z-10 after:transition-all after:duration-500">
            <img 
              src={photo} 
              alt="Adhil Unnikrishnan" 
              className="w-full h-full object-cover grayscale brightness-110 contrast-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
