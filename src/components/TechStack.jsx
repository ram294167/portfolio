import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  FaReact, FaNodeJs, FaAndroid, FaJava, FaPython, FaGitAlt, FaHtml5, FaCss3Alt
} from 'react-icons/fa'
import {
  SiJavascript, SiMongodb, SiFirebase, SiExpress, SiPostgresql, SiMysql
} from 'react-icons/si'

// ─── CATEGORIES ───────────────────────────────────────────────────────────────
const categories = [
  {
    id: 'core',
    label: 'Core Technologies',
    desc: 'Technologies I work with daily and build production systems on.',
    techs: [
      {
        name: 'Java',
        icon: FaJava,
        color: '#ed8b00',
        why: 'Strong typing and OOP fundamentals make it ideal for writing clean, structured solutions to algorithmic problems.',
        where: 'Solving DSA problems — data structures, algorithms, and competitive-style problem solving.',
        solved: 'Building a solid foundation in algorithmic thinking with a strictly-typed language.',
        usedIn: [
          { project: 'DSA Practice', note: 'Primary language for all data structures and algorithm problems.' },
        ],
      },
      {
        name: 'PostgreSQL',
        icon: SiPostgresql,
        color: '#336791',
        why: 'Most powerful open-source relational DB — handles complex queries, constraints, and real-world data at scale.',
        where: 'Primary database in real-time production projects at work.',
        solved: 'Reliable data modeling and optimized querying for live, production-grade systems.',
        usedIn: [
          { project: 'Real-time Projects', note: 'Primary database across production systems — complex queries, joins, and data integrity.' },
        ],
      },
      {
        name: 'MySQL',
        icon: SiMysql,
        color: '#4479a1',
        why: 'Standard relational DB taught in academia — gave me the SQL fundamentals that carry over to every RDBMS.',
        where: 'College coursework and academic database projects.',
        solved: 'Learning relational concepts: normalization, joins, and transactions in a hands-on environment.',
        usedIn: [
          { project: 'College Projects', note: 'Academic database work — schema design, normalization, and SQL queries.' },
        ],
      },
      {
        name: 'MongoDB',
        icon: SiMongodb,
        color: '#47a248',
        why: 'Document model is great for learning NoSQL concepts and understanding schema-flexible data storage.',
        where: 'College projects and academic exploration of NoSQL databases.',
        solved: 'Understanding how non-relational databases differ from RDBMS and when to choose each.',
        usedIn: [
          { project: 'College Projects', note: 'Academic NoSQL projects — document storage, CRUD operations, and schema design.' },
        ],
      },
      {
        name: 'Android',
        icon: FaAndroid,
        color: '#3ddc84',
        why: 'Lets me take backend systems and put them directly in users\' hands.',
        where: 'Mobile apps built alongside backend APIs.',
        solved: 'End-to-end product delivery — from database to the user\'s screen.',
        usedIn: [
          { project: 'Project Two', note: 'Full native Android app with Java.' },
        ],
      },
    ],
  },
  {
    id: 'tools',
    label: 'Tools Used',
    desc: 'Tools that are part of my daily workflow and professional environment.',
    techs: [
      {
        name: 'React',
        icon: FaReact,
        color: '#61dafb',
        why: 'Component-driven UI — clean separation between logic and presentation.',
        where: 'Frontend for web applications and this portfolio.',
        solved: 'Building interactive UIs without managing the DOM manually.',
        usedIn: [
          { project: 'Project Three', note: 'Frontend dashboard and UI components.' },
          { project: 'Portfolio', note: 'This portfolio site.' },
        ],
      },
      {
        name: 'React Native',
        icon: FaReact,
        color: '#00d8ff',
        why: 'Brings the MERN stack to mobile — pairs naturally with Node.js and Express on the backend.',
        where: 'Mobile frontend in MERN-stack projects (Node.js + Express backend, React Native frontend).',
        solved: 'Building cross-platform mobile apps that connect seamlessly to an existing Node/Express API.',
        usedIn: [
          { project: 'MERN Stack Project', note: 'Mobile frontend — consumed Node.js/Express REST APIs with React Native.' },
        ],
      },
      {
        name: 'Node.js',
        icon: FaNodeJs,
        color: '#68a063',
        why: 'Non-blocking I/O makes it efficient for API servers and real-time features.',
        where: 'REST APIs and lightweight backend services.',
        solved: 'Handling concurrent requests without heavy threading overhead.',
        usedIn: [
          { project: 'Project Three', note: 'Backend API server and middleware.' },
        ],
      },
      {
        name: 'Express',
        icon: SiExpress,
        color: '#ffffff',
        why: 'Minimal, unopinionated — gives full control over the request/response cycle.',
        where: 'Node.js API servers.',
        solved: 'Building clean routing and middleware pipelines quickly.',
        usedIn: [
          { project: 'Project Three', note: 'REST API routing and middleware layer.' },
        ],
      },
      {
        name: 'Firebase',
        icon: SiFirebase,
        color: '#ffca28',
        why: 'Real-time sync and authentication out of the box.',
        where: 'Android apps needing push notifications, auth, and live data.',
        solved: 'Eliminating the need to build auth and real-time infra from scratch.',
        usedIn: [
          { project: 'Project Two', note: 'Push notifications and user authentication.' },
        ],
      },
      {
        name: 'Git',
        icon: FaGitAlt,
        color: '#f05032',
        why: 'Version control is non-negotiable for any serious project.',
        where: 'Every project — personal and professional.',
        solved: 'Tracking changes, collaborating safely, and rolling back mistakes.',
        usedIn: [
          { project: 'All Projects', note: 'Version control across every codebase.' },
        ],
      },
      {
        name: 'pgAdmin',
        icon: null,
        abbr: 'PG',
        color: '#336791',
        why: 'Visual interface for managing and querying PostgreSQL databases.',
        where: 'DB administration, query optimization, and schema inspection.',
        solved: 'Visualizing complex schemas and debugging slow queries faster.',
        usedIn: [
          { project: 'Project One', note: 'Schema design and query optimization.' },
          { project: 'Project Three', note: 'Database inspection and debugging.' },
        ],
      },
      {
        name: 'MSSQL',
        icon: null,
        abbr: 'MS',
        color: '#cc2927',
        why: 'Enterprise-grade relational DB — used in corporate environments.',
        where: 'Company projects with Microsoft stack.',
        solved: 'Integrating with enterprise systems that require SQL Server.',
        usedIn: [
          { project: 'Project One', note: 'Enterprise data integration with existing SQL Server setup.' },
        ],
      },
    ],
  },
  {
    id: 'explored',
    label: 'Explored Tech',
    desc: 'Technologies I\'ve dived into out of curiosity or for specific problem-solving.',
    techs: [
      {
        name: 'Python',
        icon: FaPython,
        color: '#3776ab',
        why: 'Clean syntax makes it approachable for picking up fundamentals and writing quick scripts.',
        where: 'Basic scripting and learning exercises — not used in production projects.',
        solved: 'Getting familiar with a second language and understanding scripting-style programming.',
        usedIn: [
          { project: 'Personal Exploration', note: 'Basic syntax, control flow, and small scripts — foundational level only.' },
        ],
      },
      {
        name: 'JavaScript',
        icon: SiJavascript,
        color: '#f7df1e',
        why: 'The language of the web — essential for anything frontend.',
        where: 'Web UIs and frontend logic.',
        solved: 'Making web pages interactive and responsive to user input.',
        usedIn: [
          { project: 'Project Three', note: 'Frontend interactivity and API calls.' },
          { project: 'Portfolio', note: 'React component logic throughout this site.' },
        ],
      },
      {
        name: 'HTML5',
        icon: FaHtml5,
        color: '#e34f26',
        why: 'The foundation of every web interface.',
        where: 'All web-based projects and this portfolio.',
        solved: 'Structuring content semantically for accessibility and SEO.',
        usedIn: [
          { project: 'Portfolio', note: 'Semantic structure of this portfolio.' },
          { project: 'Project Three', note: 'Web dashboard markup.' },
        ],
      },
      {
        name: 'CSS3',
        icon: FaCss3Alt,
        color: '#264de4',
        why: 'Visual layer that turns structure into experience.',
        where: 'Styling all web projects.',
        solved: 'Creating clean, responsive layouts without JavaScript overhead.',
        usedIn: [
          { project: 'Portfolio', note: 'All styling and responsive layout.' },
          { project: 'Project Three', note: 'Dashboard visual design.' },
        ],
      },
      {
        name: 'SQL',
        icon: null,
        abbr: 'SQL',
        color: '#06b6d4',
        why: 'Universal language for relational databases — essential at the core.',
        where: 'Every database project across PostgreSQL, MySQL, and MSSQL.',
        solved: 'Writing complex joins, aggregations, and optimized queries across any RDBMS.',
        usedIn: [
          { project: 'All DB Projects', note: 'Core query language across every relational database.' },
        ],
      },
    ],
  },
]

function TechCard({ tech, i, inView, autoOpen }) {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const Icon = tech.icon

  const isOpen = hovered || clicked || autoOpen

  function handleClick(e) {
    e.stopPropagation()
    setClicked(prev => !prev)
  }

  return (
    <motion.div
      className={`tcard ${isOpen ? 'tcard--open' : ''} ${clicked ? 'tcard--clicked' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.04, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Front */}
      <div className="tcard-front">
        <div className="tcard-icon" style={{ color: tech.color }}>
          {Icon
            ? <Icon size={30} />
            : <span className="tcard-abbr" style={{ color: tech.color, borderColor: tech.color }}>{tech.abbr}</span>
          }
        </div>
        <span className="tcard-name">{tech.name}</span>
      </div>

      {/* Full reveal — all details */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="tcard-reveal"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="tcard-row">
              <span className="tcard-rlabel" style={{ color: tech.color }}>Why</span>
              <p>{tech.why}</p>
            </div>
            <div className="tcard-row">
              <span className="tcard-rlabel" style={{ color: tech.color }}>Where</span>
              <p>{tech.where}</p>
            </div>
            <div className="tcard-row">
              <span className="tcard-rlabel" style={{ color: tech.color }}>Solved</span>
              <p>{tech.solved}</p>
            </div>
            <div className="tcard-row">
              <span className="tcard-rlabel" style={{ color: tech.color }}>Used In</span>
              {tech.usedIn.map(({ project, note }) => (
                <div key={project} className="tcard-project-item">
                  <span className="tcard-project-name" style={{ borderColor: tech.color, color: tech.color }}>{project}</span>
                  <p className="tcard-project-note">{note}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function TechStack() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [activeTab, setActiveTab] = useState('core')
  const [autoOpenIndex, setAutoOpenIndex] = useState(0)
  const tabIds = categories.map(c => c.id)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return

    const techs = categories.find(c => c.id === activeTab)?.techs ?? []
    const total = techs.length

    const timer = setTimeout(() => {
      const nextCard = autoOpenIndex + 1
      if (nextCard < total) {
        setAutoOpenIndex(nextCard)
      } else {
        // all cards done — move to next tab
        setActiveTab(prev => {
          const idx = tabIds.indexOf(prev)
          return tabIds[(idx + 1) % tabIds.length]
        })
        setAutoOpenIndex(0)
      }
    }, 4000)

    return () => clearTimeout(timer)
  }, [activeTab, autoOpenIndex, paused])

  function handleTabClick(id) {
    setActiveTab(id)
    setAutoOpenIndex(0)
    setPaused(false)
  }

  const active = categories.find(c => c.id === activeTab)
  let cardIndex = 0

  return (
    <section id="techstack" ref={ref} style={{ background: 'rgba(124,58,237,0.03)' }}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Tech Stack
        </motion.h2>

        {/* Tabs */}
        <motion.div
          className="ts-tabs"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`ts-tab ${activeTab === cat.id ? 'ts-tab--active' : ''}`}
              onClick={() => handleTabClick(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Category desc */}
        <motion.p
          key={activeTab}
          className="ts-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {active.desc}
          <span className="ts-hint"> — hover a card for details</span>
        </motion.p>

        {/* Cards */}
        <motion.div
          key={activeTab + '-grid'}
          className="ts-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {active.techs.map((tech, idx) => (
            <TechCard key={tech.name} tech={tech} i={cardIndex++} inView={inView} autoOpen={autoOpenIndex === idx} />
          ))}
        </motion.div>
      </div>

      <style>{`
        /* Tabs */
        .ts-tabs {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 20px;
        }
        .ts-tab {
          padding: 9px 22px;
          border-radius: 999px;
          border: 1.5px solid var(--border);
          background: transparent;
          color: var(--text-muted);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s;
        }
        .ts-tab:hover { border-color: var(--accent2); color: var(--text); }
        .ts-tab--active {
          background: linear-gradient(135deg, var(--accent), #9333ea);
          border-color: transparent;
          color: #fff;
        }

        .ts-desc {
          text-align: center;
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 36px;
        }
        .ts-hint { color: rgba(255,255,255,0.25); font-size: 0.82rem; }

        /* Grid */
        .ts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 14px;
        }

        /* Card */
        .tcard {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 20px 14px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: default;
          transition: border-color 0.3s, transform 0.3s, min-height 0.3s;
          min-height: 100px;
          position: relative;
          overflow: hidden;
        }
        .tcard:hover { border-color: var(--accent2); transform: translateY(-4px); }
        .tcard--open { min-height: 220px; align-items: flex-start; padding: 16px; }

        .tcard-front {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          width: 100%;
        }
        .tcard--open .tcard-front {
          flex-direction: row;
          gap: 10px;
          align-items: center;
          margin-bottom: 8px;
        }
        .tcard-icon { display: flex; align-items: center; }
        .tcard-abbr {
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 1px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          border: 2px solid;
          background: rgba(255,255,255,0.03);
        }
        .tcard-name {
          font-size: 0.82rem;
          color: var(--text-muted);
          font-weight: 600;
          text-align: center;
        }
        .tcard--open .tcard-name {
          font-size: 0.9rem;
          color: var(--text);
          font-weight: 700;
        }

        /* Reveal */
        .tcard-reveal {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
        }
        .tcard-row { display: flex; flex-direction: column; gap: 2px; }
        .tcard-rlabel {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        .tcard-row p {
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin: 0;
        }

        /* Click-reveal: used in projects */
        .tcard--clicked { cursor: pointer; }
        .tcard-projects {
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
        }
        .tcard-project-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .tcard-project-name {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          border-left: 2px solid;
          padding-left: 7px;
        }
        .tcard-project-note {
          font-size: 0.76rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin: 0;
          padding-left: 9px;
        }
        .tcard-click-hint {
          font-size: 0.65rem;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.5px;
          margin-top: 4px;
          text-align: right;
        }

        @media (max-width: 600px) {
          .ts-grid { grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); }
        }
      `}</style>
    </section>
  )
}
