import React, { useRef, useEffect } from 'react';
import photo from '../../../assets/photo.png';
import gsap from 'gsap';
import SpaceBackground from '../../ui/SpaceBackground';

interface HeroProps {
  thingsIDo: string[];
}

const Hero: React.FC<HeroProps> = ({ thingsIDo }) => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
            delay: 2,
            ease: 'power3.in'
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [thingsIDo]);

  return (
    <section ref={sectionRef} className="hero h-screen w-full sticky top-0 z-10 overflow-hidden bg-background text-primary">
      <SpaceBackground />
      <div className="max-w-[1200px] mx-auto px-8 h-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 relative z-10">
        <div className="flex-[2] relative z-20 min-w-0">
          <span className="block overflow-hidden">
            <p className="reveal-text translate-y-full opacity-0 text-[clamp(0.9rem,2.5vw,1.1rem)] font-bold tracking-[4px] mb-4 text-primary/60">
              HELLO, I AM
            </p>
          </span>
          <span className="block overflow-hidden">
            <h1 className="reveal-text translate-y-full opacity-0 text-[clamp(2rem,6.5vw,3.48rem)] leading-[1] mb-4 font-black uppercase flex flex-col">
              <span>ADHIL</span>
              <span>UNNIKRISHNAN</span>
            </h1>
          </span>
          <span className="block overflow-hidden">
            <p className="reveal-text translate-y-full opacity-0 text-[clamp(1rem,2.5vw,1.3rem)] font-medium tracking-[1px] mb-8 text-primary/80">
              Full Stack Developer & Creative Designer
            </p>
          </span>
          
          <div className="reveal-text mt-8 h-[2.8rem] overflow-hidden relative translate-y-full opacity-0">
            <div className="h-full relative" ref={tickerRef}>
              {thingsIDo.map((thing, index) => (
                <div 
                  key={index} 
                  className="ticker-item absolute top-0 left-0 w-full h-full flex items-center gap-4 text-xl font-bold border-l-2 border-primary px-4" 
                  style={{ transform: 'translateY(100%)', opacity: 0 }}
                >
                  {thing}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 relative flex justify-center items-center min-w-[250px] lg:min-w-[350px] group cursor-pointer">
          <div className="image-wrapper opacity-0 relative w-full max-w-[280px] lg:max-w-[380px] aspect-square border-[10px] lg:border-[15px] border-primary p-3 lg:p-5 group-hover:-translate-x-4 group-hover:-translate-y-4 transition-all duration-700 ease-out after:content-[''] after:absolute after:top-4 lg:after:top-6 after:left-4 lg:after:left-6 after:-right-4 lg:after:-right-6 after:-bottom-4 lg:after:-bottom-6 after:border-2 after:border-primary after:-z-10 group-hover:after:top-10 group-hover:after:left-10 group-hover:after:-right-10 group-hover:after:-bottom-10 after:transition-all after:duration-700 after:ease-out">
            <div className="w-full h-full overflow-hidden">
              <img 
                src={photo} 
                alt="Adhil Unnikrishnan" 
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-out"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
