import gsap from 'gsap';

/**
 * Initializes and plays the cinematic intro animation sequence
 * @param onComplete Callback function when the animation finishes
 */
export const playIntroAnimation = (onComplete: () => void) => {
  const tl = gsap.timeline({ 
    delay: 0.2, // Reduced delay to start line sooner
    onComplete 
  });

  // 1. Loading Line Progress & Percentage
  tl.to(".loading-line", {
    width: "100%",
    duration: 1.5,
    ease: "power2.inOut"
  });

  tl.to(".loading-percentage", {
    innerText: 100,
    duration: 1.5,
    snap: { innerText: 1 },
    onUpdate: function() {
      const target = this.targets()[0];
      if (target) target.innerText = Math.round(this.progress() * 100) + "%";
    },
    ease: "power2.inOut"
  }, "<");

  // 1c. Name Writing Animation (Staggered appearance)
  tl.to(".name-first span", {
    opacity: 1,
    y: 0,
    stagger: 0.1,
    duration: 0.6,
    ease: "power2.out"
  }, 0.3);

  tl.to(".name-second span", {
    opacity: 1,
    y: 0,
    stagger: 0.05,
    duration: 0.5,
    ease: "power2.out"
  }, "-=0.4");

  // 1b. Loading Line Exit
  tl.to([".loading-line", ".loading-percentage"], {
    x: "100%",
    opacity: 0,
    duration: 0.6,
    ease: "power2.in"
  });

  // 2. Cinematic Block Reveal (Slide Up)
  // SPEED UP: duration reduced from 2.2s to 1.2s
  tl.to(".intro-block", {
    y: "-160%",
    duration: 1.2,
    stagger: {
      amount: 0.8,
      from: "random"
    },
    ease: "power4.inOut"
  }, "-=0.4");

  // 3. Hourglass Reveal (Slide Up with blocks)
  tl.to(".hourglass-wrapper", {
    y: "-100vh",
    opacity: 0,
    duration: 1.2,
    ease: "power4.inOut"
  }, "<");

  // 3. Text Mask Reveal for Hero Content
  tl.to(".reveal-text", {
    y: "0%",
    opacity: 1,
    duration: 1.4,
    stagger: 0.15,
    ease: "power3.out"
  }, "-=1.4");

  // 3. Image reveal
  tl.fromTo(".image-wrapper", 
    { scale: 0.9, opacity: 0, x: 50 },
    { scale: 1, opacity: 1, x: 0, duration: 1.6, ease: "power4.out" },
    "-=1.8"
  );

  return tl;
};
