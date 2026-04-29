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
    <section className="github-section" id="github">
      <div className="container">
        <div className="github-header">
          <span className="github-label">CONTRIBUTIONS</span>
          <h2 className="github-heading">
            <span>OPEN SOURCE</span>
            <span className="outline-text-white">PROJECTS</span>
          </h2>
        </div>

        {/* Contribution Graph */}
        <div className="calendar-wrapper">
          <div className="calendar-card">
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
        <div className="repo-grid">
          {repos.map((repo, index) => (
            <a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-card"
            >
              <span className="repo-card-num">0{index + 1}</span>
              <h3 className="repo-title">{repo.name}</h3>
              <p className="repo-desc">{repo.description}</p>
              <div className="repo-footer">
                <span className="repo-lang">{repo.language}</span>
                <div className="repo-stats">
                  <span><FaStar size={12} /> {repo.stars}</span>
                  <span><FaCodeFork size={12} /> {repo.forks}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* GitHub Profile Widget */}
        {user && (
          <div className="github-profile-widget">
            <div className="profile-main">
              <img
                src={user.avatar_url}
                alt="GitHub Avatar"
                className="profile-avatar"
              />
              <div className="profile-info">
                <h3 className="profile-name">{user.name}</h3>
                <p className="profile-login">@{user.login}</p>
                <p className="profile-bio">{user.bio}</p>
              </div>
            </div>

            <div className="profile-stats-footer">
              <div className="stats-row">
                <div className="stat-item">
                  <span>{user.followers}</span> FOLLOWERS
                </div>
                <div className="stat-item">
                  <span>{user.public_repos}</span> REPOSITORIES
                </div>
              </div>

              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="github-btn"
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
