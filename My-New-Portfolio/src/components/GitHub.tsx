import { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { FaGithub, FaStar, FaCodeFork } from 'react-icons/fa6';

interface Repo {
  name: string;
  description?: string;
  stars: number;
  forks: number;
  language?: string;
  html_url: string;
}

interface UserProfile {
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  followers: number;
  public_repos: number;
  html_url: string;
}

const SPECIFIC_REPOS: Repo[] = [
  {
    name: 'node-rest-api-typescript',
    description:
      'Production-grade REST API built with Node.js, TypeScript, Express, MongoDB, Redis and Docker. Includes Jest, Supertest, test Coverage and Docker Compose.',
    stars: 0,
    forks: 0,
    language: 'TypeScript',
    html_url: 'https://github.com/adhilunnikrishnan/node-rest-api-typescript',
  },
  {
    name: 'react-ts-personal-portfolio',
    description:
      'My personal developer portfolio built with React and TypeScript. Features a component-driven architecture, optimized performance, and modern UI design principles.',
    stars: 0,
    forks: 0,
    language: 'React.js',
    html_url: 'https://github.com/adhilunnikrishnan/react-ts-personal-portfolio',
  },
  {
    name: 'Moonlight-Reads-Ecommerce',
    description:
      'A modern online bookstore experience for passionate readers. Users can explore a vast collection of books, manage carts, and place orders effortlessly.',
    stars: 0,
    forks: 0,
    language: 'Node.js',
    html_url: 'https://github.com/adhilunnikrishnan/Moonlight-Reads-Ecommerce-WebApp',
  },
];

export default function GitHub() {
  const [repos] = useState<Repo[]>(SPECIFIC_REPOS);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/users/adhilunnikrishnan')
      .then(res => res.json())
      .then((data: UserProfile) => setUser(data))
      .catch(() => {});
  }, []);

  return (
    <section className="py-12 bg-background text-primary relative z-20 shadow-[0_-30px_100px_rgba(0,0,0,0.8)]" id="github">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="mb-16">
          <span className="font-display text-sm tracking-[4px] opacity-40 block mb-4 uppercase">CONTRIBUTIONS</span>
          <h2 className="flex flex-col font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.9] font-black uppercase">
            <span>OPEN SOURCE</span>
            <span className="outline-text-white">PROJECTS</span>
          </h2>
        </div>

        {/* Contribution Graph */}
        <div className="mb-12 p-8 bg-white/5 border border-primary/20 rounded flex justify-center overflow-x-auto">
          <div className="min-w-[800px] flex justify-center">
            <GitHubCalendar
              username="adhilunnikrishnan"
              blockSize={14}
              blockMargin={5}
              fontSize={14}
              theme={{
                dark: ['#1a1a1a', '#4a4100', '#8a7a00', '#c9b100', '#ffeb3b'],
              }}
            />
          </div>
        </div>

        {/* Top Repositories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {repos.map((repo, index) => (
            <a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#151515] border border-primary/10 p-8 flex flex-col transition-all duration-400 cubic-bezier(0.23, 1, 0.32, 1) hover:-translate-y-2 hover:border-primary/40 hover:shadow-2xl relative group overflow-hidden"
            >
              <span className="absolute top-8 right-8 font-display text-4xl font-extrabold text-white/5 transition-all duration-400 group-hover:text-primary/10">0{index + 1}</span>
              <h3 className="font-display text-xl font-extrabold text-primary mb-6 pr-12">{repo.name}</h3>
              <p className="text-sm leading-relaxed text-text-muted opacity-80 mb-10 flex-grow font-light">{repo.description}</p>
              <div className="flex justify-between items-center pt-6 border-t border-white/5">
                <span className="text-xs font-semibold tracking-wider text-white opacity-40 uppercase">{repo.language}</span>
                <div className="flex gap-4 opacity-40 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex items-center gap-1.5 text-xs"><FaStar size={12} /> {repo.stars}</span>
                  <span className="flex items-center gap-1.5 text-xs"><FaCodeFork size={12} /> {repo.forks}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* GitHub Profile Widget */}
        {user && (
          <div className="bg-background text-primary p-10 flex flex-col gap-8 rounded border border-primary/10 shadow-2xl">
            <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start text-center sm:text-left">
              <img
                src={user.avatar_url}
                alt="GitHub Avatar"
                className="w-20 h-20 rounded border-2 border-primary"
              />
              <div className="flex-1">
                <h3 className="font-sans text-3xl font-semibold mb-1 tracking-tight">{user.name}</h3>
                <p className="font-normal opacity-60 mb-4 text-primary/80">@{user.login}</p>
                <p className="text-sm lg:text-base max-w-[500px] leading-relaxed opacity-80 font-light">{user.bio}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-8 border-t border-primary/10 pt-8">
              <div className="flex gap-8">
                <div className="font-sans font-semibold text-sm opacity-80">
                  <span className="text-primary mr-2">{user.followers}</span> FOLLOWERS
                </div>
                <div className="font-sans font-semibold text-sm opacity-80">
                  <span className="text-primary mr-2">{user.public_repos}</span> REPOSITORIES
                </div>
              </div>

              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-primary text-background px-5 py-2.5 font-semibold text-sm font-sans transition-all duration-300 rounded hover:-translate-y-1 hover:shadow-lg"
              >
                <FaGithub /> VISIT GITHUB PROFILE
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
