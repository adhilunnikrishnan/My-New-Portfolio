export const THINGS_I_DO = [
  "Full Stack Development",
  "UI/UX Designing",
  "Cloud Architecture",
  "Mobile App Solutions"
];

// 60 randomized heights (all >= 100vh to ensure full screen coverage top and bottom)
export const INTRO_HEIGHTS = Array.from({ length: 60 }, () => 
  Math.floor(Math.random() * (150 - 110 + 1)) + 110
);
