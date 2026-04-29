import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/skills';

gsap.registerPlugin(ScrollTrigger);

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-title', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });

      gsap.from('.skills-subtitle', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });

      gsap.from('.skills-dots span', {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.4,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });

      gsap.from('.skill-card', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="skills-section-new" id="skills">
      <div className="container">
        <div className="skills-header-center">
          <h2 className="skills-title">Skills</h2>
          <p className="skills-subtitle">A modern tech stack designed for impact, efficiency, and scale.</p>
          <div className="skills-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div ref={cardsRef} className="skills-grid-new">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <a 
                key={index} 
                href={skill.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="skill-card"
              >
                <div className="skill-icon" style={{ color: skill.color }}>
                  <Icon />
                </div>
                <span className="skill-name">{skill.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
