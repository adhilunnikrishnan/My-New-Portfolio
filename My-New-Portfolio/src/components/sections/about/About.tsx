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
    <section ref={sectionRef} className="relative min-h-[100vh] bg-background text-primary z-10 py-12 overflow-hidden shadow-[0_-30px_100px_rgba(0,0,0,0.8)]" id="about">
      <div className="absolute top-[8%] left-0 text-[25vw] font-display font-extrabold text-primary/2 whitespace-nowrap pointer-events-none z-0 leading-none select-none">
        ABOUT ME ABOUT ME ABOUT ME
      </div>

      <div className="max-w-[1200px] mx-auto px-8 flex flex-col gap-12 relative z-20">
        <div className="flex flex-col gap-16 items-start max-w-[900px]">
          <div className="flex flex-col gap-4">
            <span className="block overflow-hidden">
              <h2 className="about-reveal font-display text-[clamp(2.5rem,6vw,6rem)] leading-[0.85] mb-2">
                CRAFTING <br />
                DIGITAL <br />
                <span className="outline-text">EXPERIENCE</span>
              </h2>
            </span>
            <div className="about-reveal font-display font-normal text-lg tracking-[6px] opacity-40">EST. 2024</div>
          </div>

          <div className="about-reveal flex flex-col gap-8 pt-4">
            <p className="text-[clamp(1.1rem,1.8vw,1.8rem)] leading-[1.3] font-light">
              Hey there! I'm <span className="highlight">Adhil Unnikrishnan</span>, a Full Stack Developer.
              I work with <span className="highlight">MERN and MEAN</span> stacks, building scalable web applications
              using <span className="highlight">React.js, Next.js, Node.js, Nest.js, TypeScript, MongoDB</span>, and <span className="highlight">PostgreSQL</span>.
            </p>
            <p className="text-lg opacity-60 font-light leading-relaxed">
              With experience delivering projects for clients worldwide, I focus on creating efficient,
              user-centric digital products. I am committed to solving real-world problems through
              technology and continuously improving my skills to deliver impactful solutions.
            </p>
          </div>
        </div>

        <div className="about-reveal grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-primary/10 pt-12">
          <div className="relative pt-16">
            <div className="absolute left-0 top-0 font-display text-5xl font-extrabold leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,235,59,0.4)]">01</div>
            <h3 className="text-3xl mb-6 text-primary font-display uppercase">Web Development</h3>
            <p className="text-lg opacity-70 leading-relaxed">Building responsive and scalable web applications using modern frameworks like React and Node.js.</p>
          </div>
          <div className="relative pt-16">
            <div className="absolute left-0 top-0 font-display text-5xl font-extrabold leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,235,59,0.4)]">02</div>
            <h3 className="text-3xl mb-6 text-primary font-display uppercase">UI/UX Design</h3>
            <p className="text-lg opacity-70 leading-relaxed">Designing intuitive and visually engaging user interfaces that enhance user experience and improve product usability.</p>
          </div>
          <div className="relative pt-16">
            <div className="absolute left-0 top-0 font-display text-5xl font-extrabold leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,235,59,0.4)]">03</div>
            <h3 className="text-3xl mb-6 text-primary font-display uppercase">Freelancing</h3>
            <p className="text-lg opacity-70 leading-relaxed">Delivering high-quality web development services to clients across the globe.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
