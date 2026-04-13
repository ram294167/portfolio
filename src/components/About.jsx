import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

// ─── MINDSET BLOCKS ───────────────────────────────────────────────────────────
const mindset = [
  {
    num: '01',
    label: 'How I Approach Problems',
    heading: 'Understand the system before touching the code.',
    points: [
      'I map the data flow first — where it comes from, where it goes, what can break.',
      'I ask "why does this fail?" before asking "how do I fix it?"',
      'I treat every bug as a gap in my mental model, not just a typo.',
    ],
    color: 'var(--accent)',
  },
  {
    num: '02',
    label: 'How I Build Systems',
    heading: 'Database outward. Logic inward. UI last.',
    points: [
      'Schema design is architecture — I treat it like one.',
      'I write APIs that are self-explanatory: clean contracts, no surprises.',
      'I build backend-first so the frontend has a rock-solid foundation.',
    ],
    color: 'var(--accent2)',
  },
  {
    num: '03',
    label: 'What Makes Me Different',
    heading: 'I go deep. Not just wide.',
    points: [
      'Most devs know what a query does. I know why it\'s slow.',
      'I practice DSA in Java not to pass interviews — to think in complexity.',
      'I grew from backend → full-stack → Android. Each layer made me understand the previous one better.',
    ],
    color: '#a78bfa',
  },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [active, setActive] = useState(0)

  return (
    <section id="about" ref={ref}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        {/* Top identity strip */}
        <motion.div
          className="about-identity"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="identity-left">
            <div className="identity-avatar">CRP</div>
            <div>
              <h3 className="identity-name">Chappidi Rama Prakash</h3>
              <p className="identity-role">Backend Engineer · Full-Stack Developer · Android Developer</p>
            </div>
          </div>
          <p className="identity-quote">
            "I don't just build features — I build systems that make features possible."
          </p>
        </motion.div>

        {/* Accordion mindset blocks */}
        <div className="about-accordion">
          {mindset.map((block, i) => {
            const isOpen = active === i
            return (
              <motion.div
                key={block.num}
                className={`accordion-item ${isOpen ? 'accordion-item--open' : ''}`}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.6 }}
                style={{ borderColor: isOpen ? block.color : 'var(--border)' }}
              >
                <button
                  className="accordion-trigger"
                  onClick={() => setActive(isOpen ? -1 : i)}
                >
                  <div className="accordion-left">
                    <span className="accordion-num" style={{ color: block.color }}>{block.num}</span>
                    <div>
                      <span className="accordion-label" style={{ color: block.color }}>{block.label}</span>
                      <h4 className="accordion-heading">{block.heading}</h4>
                    </div>
                  </div>
                  <motion.span
                    className="accordion-chevron"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ color: block.color }}
                  >
                    +
                  </motion.span>
                </button>

                <motion.div
                  className="accordion-body"
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <ul className="accordion-points">
                    {block.points.map((pt, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isOpen ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: j * 0.08 }}
                      >
                        <span className="point-dot" style={{ background: block.color }} />
                        {pt}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Journey timeline — horizontal */}
        <motion.div
          className="about-journey"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <h4 className="journey-title">My Journey</h4>
          <div className="journey-track">
            {[
              { step: 'Backend Dev', sub: 'APIs, server logic, DB design' },
              { step: 'Web Developer', sub: 'Frontend, full-stack thinking' },
              { step: 'Full-Stack Dev', sub: 'End-to-end product ownership' },
              { step: 'Android Dev', sub: 'Mobile + backend integration' },
            ].map((item, i, arr) => (
              <div key={item.step} className="journey-node">
                <div className="jnode-dot" style={i === arr.length - 1 ? { background: 'var(--accent)', boxShadow: '0 0 12px var(--accent)' } : {}} />
                <div className="jnode-text">
                  <span className="jnode-step">{item.step}</span>
                  <span className="jnode-sub">{item.sub}</span>
                </div>
                {i < arr.length - 1 && <div className="jnode-line" />}
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      <style>{`
        /* Identity strip */
        .about-identity {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }
        .identity-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .identity-avatar {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: 1px;
          flex-shrink: 0;
        }
        .identity-name {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text);
          margin-bottom: 4px;
        }
        .identity-role {
          font-size: 0.82rem;
          color: var(--accent2);
          font-weight: 600;
        }
        .identity-quote {
          color: var(--text-muted);
          font-size: 0.9rem;
          font-style: italic;
          max-width: 340px;
          line-height: 1.6;
          border-left: 2px solid var(--accent);
          padding-left: 14px;
        }

        /* Accordion */
        .about-accordion {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 40px;
        }
        .accordion-item {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          transition: border-color 0.3s;
        }
        .accordion-trigger {
          width: 100%;
          background: none;
          border: none;
          padding: 22px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          gap: 16px;
          text-align: left;
        }
        .accordion-left {
          display: flex;
          align-items: flex-start;
          gap: 18px;
        }
        .accordion-num {
          font-size: 1.4rem;
          font-weight: 900;
          line-height: 1;
          opacity: 0.6;
          min-width: 32px;
          margin-top: 2px;
        }
        .accordion-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          display: block;
          margin-bottom: 4px;
        }
        .accordion-heading {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text);
          line-height: 1.3;
        }
        .accordion-chevron {
          font-size: 1.6rem;
          font-weight: 300;
          line-height: 1;
          min-width: 24px;
          text-align: center;
        }
        .accordion-body {
          padding: 0 24px 0 74px;
        }
        .accordion-item--open .accordion-body {
          padding-bottom: 22px;
        }
        .accordion-points {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .accordion-points li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: var(--text-muted);
          font-size: 0.93rem;
          line-height: 1.7;
        }
        .point-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          margin-top: 8px;
          flex-shrink: 0;
        }

        /* Journey */
        .about-journey {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 28px;
        }
        .journey-title {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--accent2);
          margin-bottom: 24px;
        }
        .journey-track {
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 0;
        }
        .journey-node {
          display: flex;
          align-items: flex-start;
          gap: 0;
          flex: 1;
          min-width: 140px;
        }
        .jnode-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--bg);
          border: 2px solid var(--accent);
          flex-shrink: 0;
          margin-top: 3px;
        }
        .jnode-text {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding: 0 12px;
        }
        .jnode-step {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text);
        }
        .jnode-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.4;
        }
        .jnode-line {
          flex: 1;
          height: 2px;
          background: linear-gradient(to right, var(--accent), rgba(124,58,237,0.2));
          margin-top: 6px;
          min-width: 20px;
        }

        @media (max-width: 768px) {
          .about-identity { flex-direction: column; align-items: flex-start; }
          .identity-quote { border-left: none; border-top: 2px solid var(--accent); padding: 12px 0 0; max-width: 100%; }
          .accordion-body { padding-left: 24px; }
          .journey-track { flex-direction: column; gap: 16px; }
          .jnode-line { display: none; }
        }
      `}</style>
    </section>
  )
}
