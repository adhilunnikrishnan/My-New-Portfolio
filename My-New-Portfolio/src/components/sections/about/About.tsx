import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero fading out
      gsap.to('.hero', {
        opacity: 0,
        y: -100,
        scale: 0.95,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'top 20%',
          scrub: true,
        }
      });

      // Reveal animation
      gsap.to('.about-reveal', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about-section" id="about">
      <div className="about-bg-text">ABOUT ME ABOUT ME ABOUT ME</div>

      <div className="container about-flex-layout">
        <div className="about-main-content">
          <div className="about-header-block">
            <span className="mask">
              <h2 className="about-title about-reveal">
                CRAFTING <br />
                DIGITAL <br />
                <span className="outline-text">EXPERIENCE</span>
              </h2>
            </span>
            <div className="about-year about-reveal">EST. 2024</div>
          </div>

          <div className="about-bio-block about-reveal">
            <p className="about-text">
              Hey there! I'm <span className="highlight">Adhil Unnikrishnan</span>, a Full Stack Developer.
              I work with <span className="highlight">MERN and MEAN</span> stacks, building scalable web applications
              using <span className="highlight">React.js, Next.js, Node.js, Nest.js, TypeScript, MongoDB</span>, and <span className="highlight">PostgreSQL</span>.
            </p>
            <p className="about-text small">
              With experience delivering projects for clients worldwide, I focus on creating efficient,
              user-centric digital products. I am committed to solving real-world problems through
              technology and continuously improving my skills to deliver impactful solutions.
            </p>
          </div>
        </div>

        <div className="about-info-horizontal about-reveal">
          <div className="info-item">
            <div className="info-number">01</div>
            <h3>Web Development</h3>
            <p>Building responsive and scalable web applications using modern frameworks like React and Node.js.</p>
          </div>
          <div className="info-item">
            <div className="info-number">02</div>
            <h3>UI/UX Design</h3>
            <p>Designing intuitive and visually engaging user interfaces that enhance user experience and improve product usability.</p>
          </div>
          <div className="info-item">
            <div className="info-number">03</div>
            <h3>Freelancing</h3>
            <p>Delivering high-quality web development services to clients across the globe.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
