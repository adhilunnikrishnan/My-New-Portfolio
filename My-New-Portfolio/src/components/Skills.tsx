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
      // Reveal animation for header and grid
      gsap.to('.skills-reveal', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });

      // Individual cards animation
      gsap.to('.skill-card', {
        y: 0,
        opacity: 1,
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
    <section ref={sectionRef} className="py-32 bg-background relative overflow-hidden z-10 shadow-[0_-30px_100px_rgba(0,0,0,0.6)]" id="skills">
      <div className="absolute top-[15%] right-0 text-[25vw] font-display font-extrabold text-primary/2 whitespace-nowrap pointer-events-none z-0 leading-none select-none">
        TECHNICAL COMPETENCE TECHNICAL COMPETENCE
      </div>

      <div className="max-w-[1200px] mx-auto px-8 flex flex-col gap-32 relative z-10">
        <div className="flex flex-col gap-8 items-start mb-16">
          <span className="block overflow-hidden">
            <h2 className="skills-reveal font-display text-[clamp(2.5rem,6vw,6rem)] leading-[0.85] uppercase">
              TECHNICAL <br />
              <span className="outline-text">COMPETENCE</span>
            </h2>
          </span>
          <p className="skills-reveal text-[clamp(1.1rem,1.8vw,1.8rem)] leading-[1.3] font-light text-primary max-w-[800px] opacity-80">
            A modern tech stack designed for <span className="highlight">impact</span>, 
            <span className="highlight">efficiency</span>, and <span className="highlight">scale</span>. 
            Constantly evolving with the latest industry standards to deliver 
            <span className="highlight">world-class</span> digital solutions.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-5">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <a 
                key={index} 
                href={skill.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="skill-card skills-reveal bg-white/3 border border-primary/5 rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:bg-primary/10 hover:border-primary/30 hover:-translate-y-2 group relative overflow-hidden"
                style={{ opacity: 0, transform: 'translateY(40px)' }}
              >
                <div className="text-[2.5rem] flex items-center justify-center drop-shadow-[0_0_8px_rgba(0,0,0,0.3)] transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_var(--color-primary-glow)] z-10" style={{ color: skill.color }}>
                  <Icon />
                </div>
                <span className="font-display text-sm font-bold text-white opacity-60 uppercase tracking-wider transition-all duration-300 group-hover:opacity-100 group-hover:text-primary z-10">{skill.name}</span>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
