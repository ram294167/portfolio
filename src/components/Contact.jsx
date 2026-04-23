import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiGithub, FiMail, FiLinkedin } from 'react-icons/fi'

const socials = [
  { icon: FiGithub, label: 'GitHub', href: 'https://github.com/ram294167' },
  { icon: FiLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/rama-prakash-240b4127b/' },
  { icon: FiMail, label: 'Email', href: 'https://mail.google.com/mail/?view=cm&to=chappidiramaprakash167@gmail.com' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" ref={ref} style={{ background: 'rgba(124,58,237,0.03)' }}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Contact
        </motion.h2>

        <motion.div
          className="contact-box"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h3>Let's build something together</h3>
          <p>
            Have a project idea, a problem to solve, or just want to connect?
            I'm open to collaboration, freelance work, and interesting conversations.
          </p>

          <div className="socials">
            {socials.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="social-link"
                whileHover={{ scale: 1.1, y: -4 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Icon size={22} />
                <span>{label}</span>
              </motion.a>
            ))}
          </div>

        </motion.div>

        <motion.p
          className="footer-note"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          Built with React + Framer Motion — {new Date().getFullYear()}
        </motion.p>
      </div>

      <style>{`
        .contact-box {
          max-width: 600px;
          margin: 0 auto;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 48px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .contact-box h3 {
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--text);
        }
        .contact-box p {
          color: var(--text-muted);
          line-height: 1.8;
          max-width: 440px;
        }
        .socials {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 8px;
        }
        .social-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.8rem;
          padding: 14px 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          border-radius: 12px;
          transition: color 0.2s, border-color 0.2s;
        }
        .social-link:hover {
          color: var(--accent2);
          border-color: var(--accent2);
        }
        .footer-note {
          text-align: center;
          color: var(--text-muted);
          font-size: 0.85rem;
          margin-top: 60px;
        }
        @media (max-width: 640px) {
          .contact-box { padding: 32px 24px; }
        }
      `}</style>
    </section>
  )
}
