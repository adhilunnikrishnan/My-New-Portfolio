import React from 'react';
import photo from '../assets/photo.png';

interface HeroProps {
  thingsIDo: string[];
}

const Hero: React.FC<HeroProps> = ({ thingsIDo }) => {
  return (
    <main className="container">
      <section className="hero">
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
          
          <div className="things-i-do">
            {thingsIDo.map((thing, index) => (
              <div key={index} className="mask">
                <div className="thing-item reveal-text">
                  <span className="dot">✦</span>
                  <span>{thing}</span>
                </div>
              </div>
            ))}
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
      </section>
    </main>
  );
};

export default Hero;
