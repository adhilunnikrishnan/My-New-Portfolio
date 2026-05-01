import React, { useState, useRef, useLayoutEffect } from 'react';
import Marquee from 'react-fast-marquee';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';
import './FeaturedWork.css';

gsap.registerPlugin(ScrollTrigger);

// Handle potential CommonJS/ESM interop issues with react-fast-marquee
const MarqueeComponent = (Marquee as any).default || Marquee;

const FeaturedWork: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const overlayContainerRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for the section
      gsap.from('.featured-reveal', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openProject = (project: Project, e: React.MouseEvent) => {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    
    setSelectedProject(project);

    // GSAP animation for opening
    gsap.set(overlayRef.current, { visibility: 'visible', opacity: 1 });
    
    // Animate container from card position to center
    gsap.fromTo(overlayContainerRef.current, 
      {
        x: rect.left - (window.innerWidth / 2) + (rect.width / 2),
        y: rect.top - (window.innerHeight / 2) + (rect.height / 2),
        scale: rect.width / 1000, // Approximate scale
        opacity: 0
      },
      {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'power4.inOut'
      }
    );

    // Animate flap opening
    gsap.to(flapRef.current, {
      rotateX: -110,
      duration: 1,
      delay: 0.4,
      ease: 'power2.inOut'
    });

    // Fade in content
    gsap.to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 0.8,
      ease: 'power2.out'
    });
  };

  const closeProject = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedProject(null);
        gsap.set(overlayRef.current, { visibility: 'hidden', opacity: 0 });
      }
    });

    tl.to(contentRef.current, { opacity: 0, y: 20, duration: 0.3 })
      .to(flapRef.current, { rotateX: 0, duration: 0.5 }, '-=0.1')
      .to(overlayContainerRef.current, { scale: 0.9, opacity: 0, duration: 0.4 }, '-=0.2');
  };

  return (
    <section ref={sectionRef} className="py-32 bg-background relative overflow-hidden z-10" id="work">
      <div className="absolute top-[10%] left-0 text-[20vw] font-display font-extrabold text-primary/2 whitespace-nowrap pointer-events-none z-0 leading-none select-none">
        FEATURED WORK FEATURED WORK
      </div>
      
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="mb-16 relative z-10 featured-reveal">
          <h2 className="font-display text-[clamp(2.5rem,6vw,6rem)] leading-[0.85] mb-2 uppercase">
            FEATURED <br />
            <span className="outline-text">WORK</span>
          </h2>
        </div>

        <div className="py-16 -mx-8 featured-reveal" ref={marqueeRef}>
          <MarqueeComponent 
            pauseOnHover={true} 
            speed={50} 
            gradient={false}
          >
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="w-[320px] mx-6 relative cursor-pointer transition-transform duration-300 hover:-translate-y-2.5 group" 
                onClick={(e) => openProject(project, e)}
              >
                <div className="w-[100px] h-[30px] rounded-t-xl relative z-10 ml-2.5" style={{ backgroundColor: project.color }}></div>
                <div className="w-full h-[220px] bg-surface rounded-tr-xl rounded-br-xl rounded-bl-xl relative z-20 shadow-[0_20px_40px_rgba(0,0,0,0.4)] p-6 flex flex-col justify-end border border-primary/5">
                  <div className="absolute -top-[60px] left-[15px] right-[15px] h-[180px] rounded-lg overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-30 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.02]">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="relative z-40">
                    <h3 className="font-display text-xl font-extrabold text-white mb-2 uppercase">{project.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((t, i) => (
                        <span key={i} className="text-[0.7rem] px-2 py-0.5 bg-white/5 text-primary rounded font-semibold uppercase">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </MarqueeComponent>
        </div>
      </div>

      {/* Project Overlay */}
      <div ref={overlayRef} className="fixed inset-0 w-full h-full bg-background/98 z-[9999] flex justify-center items-center opacity-0 invisible overflow-y-auto py-16 px-8">
        <div className="absolute top-8 right-8 w-[50px] h-[50px] bg-white/5 rounded-full flex items-center justify-center cursor-pointer z-[100] text-white text-2xl transition-all duration-300 hover:bg-primary hover:text-background hover:rotate-90" onClick={closeProject}>&times;</div>
        
        {selectedProject && (
          <div ref={overlayContainerRef} className="max-w-[1000px] w-full relative [perspective:1500px]">
            <div className="w-[150px] h-[40px] rounded-t-[20px] absolute -top-[40px] left-0" style={{ backgroundColor: selectedProject.color }}></div>
            <div className="bg-surface rounded-tr-[20px] rounded-br-[20px] rounded-bl-[20px] relative p-8 lg:p-12 border border-primary/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
              <div ref={flapRef} className="absolute top-0 left-0 w-full h-1/2 bg-[#222] rounded-tr-[20px] origin-top z-10 pointer-events-none flex items-center justify-center border border-primary/5">
                <span className="opacity-20 font-extrabold text-[2rem]">CONFIDENTIAL</span>
              </div>
              
              <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 opacity-0 translate-y-5">
                <div className="w-full">
                  <img src={selectedProject.image} alt={selectedProject.title} className="w-full rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.5)]" />
                </div>
                
                <div className="flex flex-col gap-6 lg:gap-8">
                  <h3 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-none text-primary uppercase">{selectedProject.title}</h3>
                  <p className="text-lg leading-relaxed text-text-muted font-light">{selectedProject.description}</p>
                  
                  <div className="flex flex-wrap gap-4">
                    {selectedProject.tech.map((t, i) => (
                      <span key={i} className="px-4 py-2 bg-primary/5 border border-primary/20 text-primary text-sm font-semibold uppercase rounded">{t}</span>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-6 mt-auto">
                    <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-primary text-background font-display font-extrabold uppercase transition-all duration-300 text-sm flex items-center justify-center gap-3 hover:-translate-y-1 hover:shadow-lg">
                      Live Demo
                    </a>
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-primary text-primary font-display font-extrabold uppercase transition-all duration-300 text-sm flex items-center justify-center gap-3 hover:-translate-y-1 hover:shadow-lg">
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedWork;
