import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  FaTrophy, 
  FaFire, 
  FaBolt, 
  FaBrain, 
  FaShieldAlt, 
  FaBullseye,
  FaChevronRight,
  FaUser,
  FaStar,
  FaGamepad
} from 'react-icons/fa';
import { GiBroadsword } from 'react-icons/gi';
import { SiLeetcode } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

interface LeetCodeBadge {
  name: string;
  icon: React.ReactNode;
  unlocked: boolean;
  description: string;
}

interface LeetCodeData {
  username: string;
  level: number;
  currentXP: number;
  maxXP: number;
  solved: number;
  easy: number;
  medium: number;
  hard: number;
  streak: number;
  ranking: number;
  acceptance: string;
  badges: LeetCodeBadge[];
}

const LeetCodeGameSection: React.FC = () => {
  const mockData: LeetCodeData = {
    username: 'adhilunnikrishnan',
    level: 12,
    currentXP: 860,
    maxXP: 1000,
    solved: 145,
    easy: 75,
    medium: 55,
    hard: 15,
    streak: 12,
    ranking: 124567,
    acceptance: '54.2%',
    badges: [
      { name: 'Problem Solver', icon: <FaBrain className="w-6 h-6" />, unlocked: true, description: 'Solved over 50 problems' },
      { name: 'Hard Crusher', icon: <GiBroadsword className="w-6 h-6" />, unlocked: true, description: 'Tackled the toughest challenges' },
      { name: 'Streak Master', icon: <FaBolt className="w-6 h-6" />, unlocked: true, description: 'Consistent daily practice' },
      { name: 'Algorithmic Knight', icon: <FaShieldAlt className="w-6 h-6" />, unlocked: false, description: 'Mastered core algorithms' }
    ]
  };

  const [data, setData] = useState<LeetCodeData>(mockData);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = 'adhilunnikrishnan';
        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
        const result = await response.json();

        if (result.status === 'success') {
          const solved = result.totalSolved || 0;
          const level = Math.floor(solved / 15) + 5;
          const currentXP = (solved % 15) * 60 + 100;
          
          const calendar = result.submissionCalendar || {};
          const timestamps = Object.keys(calendar).map(Number).sort((a, b) => b - a);
          let streak = 0;
          if (timestamps.length > 0) {
            streak = 1;
            const oneDay = 86400;
            for (let i = 0; i < timestamps.length - 1; i++) {
              if (timestamps[i] - timestamps[i+1] <= oneDay) streak++;
              else break;
            }
          }

          setData({
            username,
            level,
            currentXP,
            maxXP: 1000,
            solved,
            easy: result.easySolved || 0,
            medium: result.mediumSolved || 0,
            hard: result.hardSolved || 0,
            streak: streak || 12,
            ranking: result.ranking || 0,
            acceptance: result.acceptanceRate ? `${result.acceptanceRate}%` : '45%',
            badges: [
              { name: 'Problem Solver', icon: <FaBrain className="w-6 h-6" />, unlocked: solved > 50, description: 'Solved over 50 problems' },
              { name: 'Hard Crusher', icon: <GiBroadsword className="w-6 h-6" />, unlocked: result.hardSolved > 5, description: 'Tackled the toughest challenges' },
              { name: 'Streak Master', icon: <FaBolt className="w-6 h-6" />, unlocked: streak > 10, description: 'Consistent daily practice' },
              { name: 'Algorithmic Knight', icon: <FaShieldAlt className="w-6 h-6" />, unlocked: solved > 100, description: 'Mastered core algorithms' }
            ]
          });
        }
      } catch (error) {
        console.error('Error fetching LeetCode data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // console.log("LeetCodeGameSection mounted");
    console.log("Badges count:", data.badges.length);
  }, [data]);

  /* 
  useEffect(() => {
    if (!data) return;

    const ctx = gsap.context(() => {
      // Reveal entire header
      gsap.from('.game-reveal', {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });

      // Reveal game panel
      gsap.from('.game-panel', {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.game-panel',
          start: 'top 85%',
        }
      });

      // Animate XP bar
      gsap.from('.xp-fill', {
        width: '0%',
        duration: 2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: progressBarRef.current,
          start: 'top 90%',
        }
      });

      // Stagger cards
      gsap.from('.stat-card', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
        }
      });

      // Badge reveal
      gsap.from('.badge-item', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.badges-grid',
          start: 'top 90%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [data]);
  */

  return (
    <section ref={sectionRef} className="py-12 bg-background relative overflow-hidden z-20 shadow-[0_-30px_100px_rgba(0,0,0,0.6)]" id="leetcode">
      <div className="absolute top-[8%] right-0 text-[25vw] font-display font-extrabold text-primary/2 whitespace-nowrap pointer-events-none z-0 leading-none select-none">
        PROBLEM SOLVING PROBLEM SOLVING
      </div>

      <div className="max-w-[1200px] mx-auto px-8 flex flex-col gap-10 relative z-10">
        <div className="flex flex-col gap-8 items-start mb-16 group/header cursor-default">
          <span className="block overflow-hidden">
            <h2 className="game-reveal font-display text-[clamp(2.5rem,6vw,6rem)] leading-[0.85] uppercase transition-all duration-500 group-hover/header:tracking-wider group-hover/header:text-primary-glow select-none relative">
              <span className="relative z-10">CODING</span> <br />
              <span className="outline-text block relative z-10 group-hover/header:animate-[flicker_0.5s_infinite] group-hover/header:drop-shadow-[0_0_15px_rgba(255,235,59,0.4)]">QUEST</span>
              
              {/* Decorative glitch lines on hover */}
              <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover/header:opacity-100 transition-opacity pointer-events-none">
                <div className="absolute top-1/4 left-0 w-full h-[1px] bg-primary/20 animate-[glitch-line_1s_infinite]" />
                <div className="absolute top-3/4 left-0 w-full h-[1px] bg-primary/20 animate-[glitch-line_1.5s_infinite_reverse]" />
              </div>
            </h2>
          </span>
          <p className="game-reveal text-[clamp(1.1rem,1.8vw,1.8rem)] leading-[1.3] font-light text-primary max-w-[800px] opacity-80 group-hover/header:opacity-100 transition-opacity duration-500">
            Visualizing my <span className="highlight">problem-solving</span> journey through a gamified 
            lens. Tracking real-time stats, XP, and <span className="highlight">achievements</span> 
            from my competitive programming activity.
          </p>
        </div>

        {/* Profile Panel */}
        <div className="game-panel bg-[#1a1a1a] border border-white/10 rounded-3xl p-8 backdrop-blur-md mb-12 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            {/* Avatar Circle */}
            <div className="w-24 h-24 rounded-2xl border-2 border-primary/30 flex items-center justify-center bg-primary/10 relative group-hover:border-primary transition-colors duration-500">
              <FaUser className="w-12 h-12 text-primary" />
              <div className="absolute -top-2 -right-2 bg-primary text-background text-[10px] font-bold px-2 py-1 rounded-md">
                PRO
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-1">{data.username}</h3>
              <p className="text-primary font-display uppercase text-xs tracking-[4px] mb-6">
                Problem Solver • Rank #{data.ranking.toLocaleString()}
              </p>

              {/* XP Bar */}
              <div className="max-w-md mx-auto md:mx-0">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">XP Progress</span>
                  <span className="text-[10px] font-bold text-primary">{data.currentXP} / {data.maxXP} XP</span>
                </div>
                <div ref={progressBarRef} className="h-4 bg-white/5 rounded-full p-1 border border-white/5 relative overflow-hidden">
                  <div 
                    className="xp-fill h-full bg-gradient-to-r from-primary/60 to-primary rounded-full relative shadow-[0_0_15px_rgba(255,235,59,0.5)]"
                    style={{ width: `${(data.currentXP / data.maxXP) * 100}%` }}
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] animate-[shimmer_2s_infinite]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/5 p-6 rounded-2xl text-center min-w-[140px]">
              <div className="text-3xl font-black text-primary leading-none mb-1">{data.acceptance}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Acceptance Rate</div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatCard 
            label="Total Solved" 
            value={data.solved} 
            icon={<FaTrophy className="w-5 h-5" />} 
            color="primary"
          />
          <StatCard 
            label="Easy" 
            value={data.easy} 
            icon={<FaBullseye className="w-5 h-5" />} 
            color="green-500"
          />
          <StatCard 
            label="Medium" 
            value={data.medium} 
            icon={<FaBolt className="w-5 h-5" />} 
            color="yellow-500"
          />
          <StatCard 
            label="Hard" 
            value={data.hard} 
            icon={<FaFire className="w-5 h-5" />} 
            color="red-500"
          />
        </div>

        {/* Achievements */}
        <div className="bg-surface/30 border border-white/5 rounded-3xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-sm font-bold uppercase tracking-[4px] text-primary/60">Unlocked Achievements</h4>
            <div className="h-[1px] flex-1 bg-white/5 mx-6" />
            <FaStar className="w-4 h-4 text-primary" />
          </div>

          <div className="badges-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Badge badge={{ name: 'Debug Badge', icon: <FaStar />, unlocked: true, description: 'Static Test' }} />
            {data.badges.map((badge, idx) => (
              <Badge key={idx} badge={badge} />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <a 
            href={`https://leetcode.com/u/${data.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary/40 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest group"
          >
            Open Profile <FaChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes flicker {
          0% { opacity: 0.8; }
          10% { opacity: 1; }
          20% { opacity: 0.9; }
          30% { opacity: 1; }
          40% { opacity: 0.8; }
          50% { opacity: 0.9; }
          60% { opacity: 1; }
          70% { opacity: 0.8; }
          80% { opacity: 0.9; }
          90% { opacity: 1; }
          100% { opacity: 0.8; }
        }
        @keyframes glitch-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

const StatCard: React.FC<{ label: string; value: number | string; icon: React.RefNode; color: string }> = ({ label, value, icon, color }) => (
  <div className="stat-card bg-[#141414] border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center group transition-all duration-500 cursor-default hover:border-primary/40 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,235,59,0.1)] relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="mb-3 p-3 rounded-xl bg-white/5 text-primary group-hover:scale-110 group-hover:text-primary transition-all duration-500 relative z-10">
      {icon}
    </div>
    <div className="text-3xl font-black mb-1 text-white group-hover:text-primary transition-colors relative z-10">{value}</div>
    <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 group-hover:text-white/50 transition-colors relative z-10">{label}</div>
  </div>
);

const Badge: React.FC<{ badge: LeetCodeBadge }> = ({ badge }) => (
  <div className={`badge-item p-4 rounded-2xl border transition-all duration-500 flex items-center gap-4 group cursor-default ${
    badge.unlocked 
      ? 'bg-[#141414] border-white/5 hover:border-primary/30 hover:bg-primary/[0.02] hover:-translate-y-1' 
      : 'bg-[#0d0d0d] border-white/[0.02] opacity-30 grayscale'
  }`}>
    <div className={`p-3 rounded-xl transition-all duration-500 ${
      badge.unlocked 
        ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background group-hover:rotate-[360deg]' 
        : 'bg-white/5 text-white/20'
    }`}>
      {badge.icon}
    </div>
    <div className="flex-1">
      <div className={`text-xs font-bold uppercase tracking-tight transition-colors ${badge.unlocked ? 'text-white group-hover:text-primary' : 'text-white/40'}`}>
        {badge.name}
      </div>
      <div className="text-[10px] text-white/20 leading-tight group-hover:text-white/40 transition-colors">{badge.description}</div>
    </div>
    {badge.unlocked && (
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <FaStar className="w-3 h-3 text-primary animate-pulse" />
      </div>
    )}
  </div>
);

export default LeetCodeGameSection;
