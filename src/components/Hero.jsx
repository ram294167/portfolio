import { motion, AnimatePresence } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiArrowDown, FiDownload, FiEye, FiX } from 'react-icons/fi'
import { SiLeetcode } from 'react-icons/si'
import { useState } from 'react'
import profileImg from '../assets/profile.png'

export default function Hero() {
  const [showResume, setShowResume] = useState(false)

  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
      <div className="container">
        <div className="hero-layout">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.p
            className="hero-greeting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Backend-focused · Full-Stack · Android
          </motion.p>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            Chappidi Rama Prakash
          </motion.h1>

          <motion.h2
            className="hero-role"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            I{' '}
            <TypeAnimation
              sequence={[
                'design backend systems.',
                2000,
                'build full-stack applications.',
                2000,
                'develop Android apps.',
                2000,
                'manage databases at scale.',
                2000,
                'solve problems with logic.',
                2000,
              ]}
              wrapper="span"
              speed={55}
              repeat={Infinity}
              className="hero-type"
            />
          </motion.h2>

          <motion.p
            className="hero-desc"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            From backend logic to full-stack solutions — I build complete, scalable systems.
            Specialized in database management (PostgreSQL, MySQL, MSSQL, MongoDB) and
            engineering APIs that actually perform under pressure.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <a href="#projects" className="btn btn-outline">
              View My Work <FiArrowDown />
            </a>
            <a href="/Rama_Prakash_Resume.pdf" download className="btn btn-outline">
              <FiDownload /> Resume
            </a>
            <button className="btn btn-outline" onClick={() => setShowResume(true)}>
              <FiEye /> View Resume
            </button>
            <a
              href="https://leetcode.com/u/ramaprakash12345/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              <SiLeetcode /> LeetCode Profile
            </a>
          </motion.div>

          <motion.div
            className="hero-stack-chips"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            {['PostgreSQL', 'MySQL', 'MSSQL', 'MongoDB', 'Java', 'Node.js', 'Android'].map(tech => (
              <span key={tech} className="chip">{tech}</span>
            ))}
          </motion.div>
        </motion.div>

          <motion.div
            className="hero-profile"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <img src={profileImg} alt="Rama Prakash" className="profile-img" />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="hero-scroll"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <FiArrowDown />
        <span>Scroll</span>
      </motion.div>

      <AnimatePresence>
        {showResume && (
          <motion.div
            className="resume-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowResume(false)}
          >
            <motion.div
              className="resume-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="resume-modal-header">
                <span>Resume</span>
                <div style={{ display: 'flex', gap: 10 }}>
                  <a href="/Rama_Prakash_Resume.pdf" download className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '6px 14px' }}>
                    <FiDownload /> Download
                  </a>
                  <button className="resume-close" onClick={() => setShowResume(false)}><FiX /></button>
                </div>
              </div>
              <iframe src="/Rama_Prakash_Resume.pdf#zoom=105" className="resume-frame" title="Resume" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .hero-layout {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }
        .hero-profile {
          flex-shrink: 0;
        }
        .profile-img {
          width: 260px;
          height: 260px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid var(--accent);
          box-shadow: 0 0 40px rgba(124, 58, 237, 0.3);
        }
        @media (max-width: 768px) {
          .hero-layout { flex-direction: column-reverse; align-items: flex-start; }
          .profile-img { width: 140px; height: 140px; }
        }
        .hero-greeting {
          color: var(--accent2);
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .hero-name {
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          font-weight: 800;
          line-height: 1.05;
          background: linear-gradient(135deg, #fff 30%, var(--accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 16px;
        }
        .hero-role {
          font-size: clamp(1.2rem, 2.8vw, 1.7rem);
          font-weight: 500;
          color: var(--text-muted);
          margin-bottom: 28px;
          min-height: 2.2rem;
        }
        .hero-type {
          color: var(--accent2);
          font-weight: 700;
        }
        .hero-desc {
          max-width: 580px;
          color: var(--text-muted);
          font-size: 1.05rem;
          line-height: 1.85;
          margin-bottom: 40px;
        }
        .hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          background: rgba(255,255,255,0.05);
          color: var(--text-muted);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .btn-ghost:hover {
          background: rgba(255,255,255,0.1);
          color: var(--text);
          transform: translateY(-2px);
        }
        .hero-stack-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .chip {
          padding: 5px 14px;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 600;
          background: rgba(124, 58, 237, 0.12);
          border: 1px solid rgba(124, 58, 237, 0.3);
          color: var(--accent2);
          letter-spacing: 0.5px;
        }
        .hero-scroll {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: var(--text-muted);
          font-size: 0.8rem;
        }
        .resume-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.85);
          z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        .resume-modal {
          width: 100%; max-width: 860px;
          height: 90vh;
          background: #0d0d1a;
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          display: flex; flex-direction: column;
        }
        .resume-modal-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid var(--border);
          font-weight: 600; font-size: 0.95rem; color: var(--text);
        }
        .resume-close {
          background: rgba(255,255,255,0.06);
          border: 1px solid var(--border);
          color: var(--text);
          border-radius: 8px;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 1rem;
        }
        .resume-frame {
          flex: 1; width: 100%; border: none;
        }
      `}</style>
    </section>
  )
}
