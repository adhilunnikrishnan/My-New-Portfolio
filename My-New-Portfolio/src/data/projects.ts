export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  color: string;
}

export const projects: Project[] = [
  {
    id: '01',
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with real-time inventory management, secure checkout, and a comprehensive admin dashboard for analytics and order tracking.',
    image: '/project1.png',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    color: '#FFEB3B'
  },
  {
    id: '02',
    title: 'Financial Dashboard',
    description: 'A cinematic financial tracking dashboard featuring real-time data visualization, multi-currency support, and predictive analysis for personalized investment insights.',
    image: '/project2.png',
    tech: ['Next.js', 'TypeScript', 'D3.js', 'PostgreSQL'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    color: '#00C4CC'
  },
  {
    id: '03',
    title: 'Creative Studio CMS',
    description: 'A headless CMS solution tailored for creative agencies, allowing seamless content distribution across multiple platforms with a focus on visual storytelling and speed.',
    image: '/project3.png',
    tech: ['Nest.js', 'GraphQL', 'AWS', 'Tailwind'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    color: '#FF4E1E'
  },
  {
    id: '04',
    title: 'Social Network AI',
    description: 'An AI-powered social networking app that uses machine learning to connect users based on shared interests and content engagement patterns.',
    image: '/project1.png',
    tech: ['Python', 'FastAPI', 'React Native', 'OpenAI'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    color: '#61DAFB'
  },
  {
    id: '05',
    title: 'Task Management Pro',
    description: 'A highly productive task management tool with drag-and-drop kanban boards, time tracking, and team collaboration features built for modern agile workflows.',
    image: '/project2.png',
    tech: ['Vue.js', 'Firebase', 'GSAP', 'Express'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    color: '#47A248'
  }
];
