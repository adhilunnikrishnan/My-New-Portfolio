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

      items.forEach((item, index) => {
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
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <span className="mask">
            <p className="description reveal-text">HELLO, I AM</p>
          </span>
          <span className="mask">
            <h1 className="name reveal-text">ADHIL UNNIKRISHNAN</h1>
          </span>
          <span className="mask">
            <p className="description reveal-text">Full Stack Developer & Creative Designer</p>
          </span>
          
          <div className="ticker-wrapper reveal-text">
            <div className="ticker-container" ref={tickerRef}>
              {thingsIDo.map((thing, index) => (
                <div key={index} className="ticker-item" style={{ transform: 'translateY(100%)', opacity: 0 }}>
                  {thing}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-image">
          <div className="image-wrapper">
            <img 
              src={photo} 
              alt="Adhil Unnikrishnan" 
              className="profile-photo"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
