import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const links = ['About', 'TechStack', 'Projects', 'Blog', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="nav-inner container">
        <a href="#" className="nav-logo">Ram<span>.</span></a>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map(link => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                {link}
              </a>
            </li>
          ))}
        </ul>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 20px 0;
          transition: all 0.3s ease;
        }
        .navbar.scrolled {
          background: rgba(10,10,15,0.9);
          backdrop-filter: blur(12px);
          padding: 14px 0;
          border-bottom: 1px solid var(--border);
        }
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-logo {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text);
          text-decoration: none;
        }
        .nav-logo span { color: var(--accent2); }
        .nav-links {
          display: flex;
          gap: 36px;
          list-style: none;
        }
        .nav-links a {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--accent2); }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        .hamburger span {
          display: block;
          width: 24px; height: 2px;
          background: var(--text);
          border-radius: 2px;
        }
        @media (max-width: 640px) {
          .hamburger { display: flex; }
          .nav-links {
            display: none;
            position: absolute;
            top: 100%; left: 0; right: 0;
            flex-direction: column;
            background: rgba(10,10,15,0.97);
            padding: 24px;
            gap: 20px;
            border-bottom: 1px solid var(--border);
          }
          .nav-links.open { display: flex; }
        }
      `}</style>
    </motion.nav>
  )
}
