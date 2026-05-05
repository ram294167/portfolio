import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FiPlay, FiDownload, FiX, FiInfo } from 'react-icons/fi'

// ─── ADD YOUR PROJECTS HERE ───────────────────────────────────────────────────
const projects = [
  {
    title: 'CoreFix Partner',
    company: 'CoreFix',
    description:
      'Service professional app for mechanics, plumbers & electricians. Auth — login, Google Sign-In, OTP-based password reset. Jobs — receive nearby requests with 30s timer, full lifecycle (accept → navigate → OTP complete). Location — live GPS tracking, Google Maps navigation. Earnings — wallet, payment history, bank withdrawal. Documents — uploads via AWS S3. Notifications — real-time push via FCM.',
    tags: ['React Native', 'Node.js', 'Express', 'PostgreSQL', 'Firebase FCM', 'AWS S3', 'Google Maps', 'Google Auth'],
    video: '',
    apk: '/corefix-partner.apk',
    details: {
      how: 'Employee opens app → goes Online (toggles availability) → GPS starts tracking location to backend in real time. When a nearby job is created, FCM sends a push notification → a modal pops with 30s countdown. Employee accepts → job lifecycle begins: Start → Navigate → Reach → OTP complete. After completion, earnings are added to wallet.',
      frontend: [
        { module: 'React Native', why: 'Cross-platform mobile app — single codebase for Android' },
        { module: 'React Navigation', why: 'Stack + Bottom Tab navigation between screens' },
        { module: 'React Native Maps', why: 'Live map view, employee & customer location pins' },
        { module: 'Geolocation API', why: 'Real-time GPS tracking, sent to backend while online' },
        { module: 'Firebase FCM', why: 'Receive push notifications for job requests' },
        { module: 'AsyncStorage', why: 'Persist auth token and user session locally' },
        { module: 'Context API', why: 'Global state for active job and upcoming jobs' },
        { module: 'Google Sign-In', why: 'OAuth login via Google account' },
      ],
      backend: [
        { module: 'Node.js + Express', why: 'REST API server — handles all app requests' },
        { module: 'PostgreSQL', why: 'Primary database — employees, jobs, earnings, transactions' },
        { module: 'AWS S3', why: 'Store employee documents (KYC, ID proofs) securely' },
        { module: 'Firebase Admin SDK', why: 'Send FCM push notifications to employee devices' },
        { module: 'JWT', why: 'Token-based authentication for all API calls' },
      ],
      modules: [
        { name: 'Auth', desc: 'Login, Google Sign-In, multi-step register, OTP password reset' },
        { name: 'Jobs', desc: 'Nearby job requests, 30s accept timer, full job lifecycle with OTP completion' },
        { name: 'Location', desc: 'Live GPS tracking while online, Google Maps navigation to customer' },
        { name: 'Earnings', desc: 'Wallet balance, payment history, bank withdrawal with status tracking' },
        { name: 'Documents', desc: 'KYC document upload to AWS S3, verification status' },
        { name: 'Notifications', desc: 'FCM push notifications, in-app notification history' },
        { name: 'Profile', desc: 'Edit profile, role & service management, settings' },
      ],
    },
  },
  {
    title: 'CoreFix Admin Panel',
    company: 'CoreFix',
    description:
      'Web-based admin dashboard for the CoreFix platform. Manages employees, jobs, payments, AMC contracts, services, offers, taxes, and push notifications. Role-based access control per staff member. Source code and live access are confidential.',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'FCM', 'AWS S3', 'REST API'],
    video: '',
    apk: '',
    comingSoon: true,
    details: {
      how: 'Admin logs in → accesses role-restricted modules based on permissions. Each module talks to the Node.js/Express REST API. Data is stored in PostgreSQL. Documents and images go to AWS S3. Push notifications are sent via Firebase FCM to employees or customers. Staff access is controlled per menu item through an RBAC system.',
      frontend: [
        { module: 'React', why: 'Component-based web UI — each module is an independent component' },
        { module: 'React Router', why: 'Client-side routing between dashboard sections' },
        { module: 'Recharts', why: 'Sales performance and overview charts on the dashboard' },
        { module: 'SheetJS (XLSX)', why: 'Export reports — AMC customer reports, salary data — to Excel' },
        { module: 'Lucide React', why: 'Icon library used across all components' },
        { module: 'Context API', why: 'Global auth state and user session management' },
      ],
      backend: [
        { module: 'Node.js + Express', why: 'REST API — all admin operations go through dedicated endpoints' },
        { module: 'PostgreSQL', why: 'Primary database — users, jobs, payments, AMC, services, taxes' },
        { module: 'AWS S3', why: 'Store employee documents (Aadhaar, PAN, DL) and service images' },
        { module: 'Firebase Admin SDK', why: 'Send targeted or broadcast push notifications via FCM' },
        { module: 'JWT', why: 'Token-based auth — role and permissions verified on every request' },
      ],
      modules: [
        { name: 'Dashboard', desc: 'KPI cards (staff, employees, customers), sales chart with Today/Month/Year filter' },
        { name: 'User Management', desc: 'Office staff, employees, customers — add, view, verify documents, manage status' },
        { name: 'Jobs', desc: 'All service requests across 6 statuses — assign employees, track progress' },
        { name: 'AMC Management', desc: 'Annual maintenance contracts — plans, assignments, discount rules, customer reports' },
        { name: 'Service Catalog', desc: 'Category → Subcategory → Service hierarchy with images, pricing, capacity' },
        { name: 'Payments', desc: 'Employee withdrawal requests — verify, process, reject with transaction tracking' },
        { name: 'Offers & Promotions', desc: 'Promo codes, flat/percentage discounts, validity, usage limits, featured services' },
        { name: 'Notifications', desc: 'Broadcast or targeted FCM push notifications to employees or customers' },
        { name: 'Taxes', desc: 'Tax rate CRUD — configure tax types and percentages applied to services' },
        { name: 'Feedback', desc: 'Customer feedback with ratings, admin responses, status workflow' },
        { name: 'RBAC', desc: '17 menu items — toggle access per staff role in real time' },
        { name: 'Scrap Services', desc: 'Separate service category for scrap — inquiries, statuses, admin notes' },
      ],
    },
  },
  {
    title: 'Vegaa Partner',
    company: 'Vegaa',
    description:
      'Driver partner app for a ride + parcel delivery platform. Auth — register with vehicle details, login with JWT. Rides — real-time incoming requests via Socket.IO, full lifecycle (accept → OTP pickup → navigate → complete with UPI payment). Parcels — same socket-based flow with dual OTP (pickup + delivery). Location — live GPS to Redis every 5s, DB every 30s. Earnings — bar chart analytics, transaction history. Subscription — UPI payment with proof upload, referral program.',
    tags: ['React Native', 'Node.js', 'Socket.IO', 'PostgreSQL', 'Firebase FCM', 'AWS S3', 'Google Maps', 'Zustand'],
    videos: [
      { url: '/vega/WhatsApp Video 2026-05-05 at 3.48.38 PM.mp4', label: 'WhatsApp Video 2026-05-05 at 3.48.38 PM' },
      { url: '/vega/WhatsApp Video 2026-05-05 at 3.48.04 PM.mp4', label: 'WhatsApp Video 2026-05-05 at 3.48.04 PM' },
    ],
    apk: '/vega/vegaa-partner.apk',
    details: {
      how: 'Driver logs in → goes Online → GPS starts broadcasting location via Socket.IO (every 5s to Redis, every 30s to DB). When a ride or parcel is available nearby, a socket event triggers an incoming request modal. Driver accepts → app auto-navigates to the job screen. For rides: navigate to pickup → OTP from passenger → start ride → navigate to drop → UPI payment → complete. For parcels: navigate to sender → OTP pickup → in transit → navigate to receiver → OTP delivery → complete. Use Customer App Demo and Driver App Demo to play the two Vegaa partner demos separately. All state is persisted locally so the app recovers after a crash.',
      frontend: [
        { module: 'React Native', why: 'Cross-platform mobile app — single codebase for Android' },
        { module: 'Zustand', why: 'Lightweight global state for auth, ride, parcel, driver, notifications' },
        { module: 'Socket.IO Client', why: 'Real-time ride/parcel requests, OTP responses, location emit' },
        { module: 'React Navigation', why: 'Stack + Bottom Tab navigation with deep linking for referral invites' },
        { module: 'React Native Maps', why: 'Live map view with driver and customer location markers' },
        { module: 'React Native Chart Kit', why: 'Bar chart for earnings analytics (last 7 days)' },
        { module: 'Firebase FCM', why: 'Background push notifications for ride/parcel requests' },
        { module: 'AsyncStorage', why: 'Persist JWT token and ride/parcel state for crash recovery' },
        { module: 'Axios', why: 'REST API calls with JWT interceptor auto-attached on every request' },
        { module: 'Image Picker', why: 'Avatar upload and subscription payment proof capture' },
      ],
      backend: [
        { module: 'Node.js + Express', why: 'REST API — auth, rides, parcels, earnings, subscriptions' },
        { module: 'Socket.IO', why: 'Real-time events — ride/parcel offers, OTP verification, location updates' },
        { module: 'Redis', why: 'Store live driver locations — fast reads for nearby matching' },
        { module: 'PostgreSQL', why: 'Primary database — users, trips, parcels, earnings, subscriptions' },
        { module: 'AWS S3', why: 'Store driver documents (KYC) and subscription payment proofs' },
        { module: 'Firebase Admin SDK', why: 'Send FCM push notifications to driver devices' },
        { module: 'JWT', why: 'Token-based auth — all API and socket connections verified' },
      ],
      modules: [
        { name: 'Auth', desc: 'Login, multi-step registration with vehicle details, JWT session with crash recovery' },
        { name: 'Rides', desc: 'Real-time incoming requests, OTP pickup, navigation, UPI payment collection, completion' },
        { name: 'Parcels', desc: 'Socket-based parcel queue, dual OTP (pickup + delivery), navigation, status flow' },
        { name: 'Location', desc: 'Live GPS — Socket.IO every 5s to Redis, REST every 30s to DB, 20m noise filter' },
        { name: 'Earnings', desc: 'Daily bar chart, Today/Week/Month tabs, transaction history with trip details' },
        { name: 'Subscription', desc: 'UPI deep links (GPay/PhonePe/Paytm), payment proof upload, plan expiry alerts' },
        { name: 'Referral', desc: '5 completions = 1 free month, shareable invite link, free coupon redemption' },
        { name: 'Notifications', desc: 'FCM push + in-app history, type-based icons, auto mark-as-read' },
        { name: 'Profile & Docs', desc: 'Avatar upload, vehicle info, rating breakdown, KYC document uploads to S3' },
      ],
    },
  },
  {
    title: 'Vegaa Admin Panel',
    company: 'Vegaa',
    description:
      'Web-based admin dashboard for the Vegaa ride-sharing platform. Manages drivers, customers, rides, payments, vehicle pricing, offers, promo ads, referrals, and team permissions. Role-based access control with a granular permission matrix per screen. Super-admin controls employee creation, role management, and screen-level access. Source code and live access are confidential.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Radix UI', 'Node.js', 'PostgreSQL', 'JWT', 'REST API', 'RBAC'],
    video: '',
    apk: '',
    comingSoon: true,
    details: {
      how: 'Admin logs in with email/password → JWT token stored in localStorage → role and permissions decoded from token → sidebar filters navigation based on allowed screens. Each module fetches from a Node.js/Express REST API with Bearer token. Super admin has unrestricted access; custom roles see only permitted screens. Permission matrix is a live checkbox grid — changes saved in bulk to the backend.',
      frontend: [
        { module: 'React 19', why: 'Component-based dashboard UI — each module is an independent page' },
        { module: 'React Router v7', why: 'Client-side routing with protected route wrappers and permission guards' },
        { module: 'Tailwind CSS', why: 'Utility-first styling — fast, consistent UI across all modules' },
        { module: 'Radix UI', why: 'Headless dialog, dropdown, tooltip, separator components for accessible UI' },
        { module: 'Lucide React', why: 'SVG icon library used across all pages and components' },
        { module: 'JWT Decode', why: 'Decode token client-side to extract role, permissions, and expiry' },
        { module: 'Vite', why: 'Fast dev server and build tool with Nginx proxy config for production' },
      ],
      backend: [
        { module: 'Node.js + Express', why: 'REST API — all admin operations routed through dedicated endpoints' },
        { module: 'PostgreSQL', why: 'Primary database — drivers, rides, payments, offers, roles, employees' },
        { module: 'JWT', why: 'Token-based auth — role and permissions verified on every request' },
        { module: 'AWS S3', why: 'Store promo ad images and driver documents with presigned URLs' },
        { module: 'Nginx', why: 'Reverse proxy in production — handles API routing and WebSocket upgrade' },
      ],
      modules: [
        { name: 'Dashboard', desc: 'KPI cards — total rides, active rides, drivers, customers. Recent rides table with status badges.' },
        { name: 'Rides', desc: 'Full ride history with search by customer/driver/ID and status filter across 6 states.' },
        { name: 'Drivers', desc: 'Driver profiles, approval workflow, KYC document review, subscription plan management with proof images.' },
        { name: 'Customers', desc: 'Customer directory with search, coin balance tracking, join date.' },
        { name: 'Payments', desc: 'Transaction history — ride ID, amount, method, status tracking.' },
        { name: 'Vehicle Types', desc: 'Full CRUD — key, label, icon, seats, base fare, per-km rate, sort order, active toggle.' },
        { name: 'Offers', desc: 'Promo code CRUD — flat/percentage discount, minimum fare, validity date, badge color, active toggle.' },
        { name: 'Promo Ads', desc: 'In-app banner management — image upload, CTA, background color, badge, expiry, display order.' },
        { name: 'Referrals', desc: 'Three-tab view: driver referrals, customer referrals, free coupons. Stats — completions, coins awarded.' },
        { name: 'Employees', desc: 'HR module — add/edit staff with account, personal info, ID documents, bank details. Role assignment.' },
        { name: 'Team & Permissions', desc: 'Role creation, screen management, and a live permission matrix — checkbox grid mapping roles to screens, saved in bulk.' },
      ],
    },
  },
  {
    title: 'Invoice Generator',
    company: 'Personal Project',
    description:
      'A modern React-powered invoice builder application that allows users to create, edit, and export professional invoices as PDFs. Features dynamic invoice editing, GST calculations, file uploads for logos and signatures, and instant PDF generation with html2canvas and jsPDF.',
    tags: ['React', 'Vite', 'html2canvas', 'jsPDF', 'CSS', 'Local Storage'],
    video: 'https://invoice-generator-hioi.vercel.app/',
    apk: '',
    link: 'https://invoice-generator-hioi.vercel.app/',
    github: 'https://github.com/your-username/invoice-generator',
    details: {
      how: 'User fills in company details, invoice number, date, and event name in the left panel. Items are added with quantity, rate, discount, and GST fields. Real-time calculations update the invoice preview on the right side showing taxable amount, GST, and grand total. Logos, QR codes, and signatures can be uploaded and displayed on the invoice. Once complete, the user clicks "Download PDF" to generate and download the professional invoice using html2canvas and jsPDF.',
      frontend: [
        { module: 'React', why: 'Component-based UI for invoice editing form and preview' },
        { module: 'Vite', why: 'Fast development server and optimized production build' },
        { module: 'html2canvas', why: 'Captures the invoice HTML template as a high-quality image for PDF generation' },
        { module: 'jsPDF', why: 'Converts the captured image into a downloadable PDF file' },
        { module: 'CSS', why: 'Responsive design for desktop and mobile invoice layout' },
        { module: 'Local Storage', why: 'Persists invoice data in browser for session continuity' },
        { module: 'React Hooks', why: 'State management for form inputs, items, and calculations' },
      ],
      backend: [],
      modules: [
        { name: 'Invoice Details', desc: 'Company name, invoice number, date, event name, billing address form fields' },
        { name: 'Item Management', desc: 'Add/edit/delete invoice line items with quantity, rate, discount percentage, and GST amount' },
        { name: 'Calculations', desc: 'Real-time subtotal, taxable amount, GST, and grand total computation' },
        { name: 'File Uploads', desc: 'Upload and embed logos, QR codes, and digital signatures on the invoice' },
        { name: 'Invoice Preview', desc: 'Live preview showing professional invoice layout as you edit' },
        { name: 'PDF Export', desc: 'Generate and download fully formatted invoice as PDF file' },
        { name: 'Responsive Design', desc: 'Works seamlessly on desktop and mobile devices with auto-scaling' },
        { name: 'Data Persistence', desc: 'Saves invoice data to browser LocalStorage for offline access' },
      ],
    },
  },
  {
    title: 'YouTube Channel Analysis',
    company: 'Data Analysis Project',
    description:
      'Comprehensive data analysis project that examines YouTube channel performance, audience engagement patterns, and content optimization strategies. Uses advanced statistical modeling and machine learning to provide actionable insights for channel growth and monetization enhancement.',
    tags: ['Python', 'Jupyter Notebook', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'YouTube API', 'Plotly', 'NLTK'],
    video: '',
    apk: '',
    link: 'https://github.com/your-username/analyzing-youtube-channels',
    github: 'https://github.com/your-username/analyzing-youtube-channels',
    details: {
      how: 'The analysis begins by connecting to the YouTube Data API to extract comprehensive channel metrics including subscriber growth, video performance, watch time, and engagement data. Data is processed using Pandas for cleaning and manipulation, then analyzed with statistical methods and machine learning algorithms. Interactive visualizations are created with Plotly and Matplotlib to identify patterns. The final output provides strategic recommendations for optimal posting times, content types, and growth strategies.',
      frontend: [],
      backend: [],
      modules: [
        { name: 'Data Collection', desc: 'YouTube API integration for real-time channel metrics, video statistics, and audience data extraction' },
        { name: 'Data Processing', desc: 'Pandas-based data cleaning, transformation, and feature engineering for analysis-ready datasets' },
        { name: 'Performance Analysis', desc: 'Statistical analysis of views, subscribers, watch time, and engagement metrics over time' },
        { name: 'Audience Insights', desc: 'Demographic analysis, viewing patterns, geographic distribution, and retention analysis' },
        { name: 'Content Strategy', desc: 'Video length optimization, thumbnail effectiveness, SEO performance, and topic analysis' },
        { name: 'Predictive Modeling', desc: 'Machine learning models to forecast subscriber growth and content performance' },
        { name: 'Interactive Dashboards', desc: 'Plotly-based visualizations for real-time performance monitoring and trend analysis' },
        { name: 'Strategic Recommendations', desc: 'Actionable insights for upload scheduling, content optimization, and growth strategies' },
      ],
    },
  },
]
// ─────────────────────────────────────────────────────────────────────────────

function toEmbedUrl(url) {
  if (!url) return null
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/)
  if (match) return `https://www.youtube.com/embed/${match[1]}`
  return url
}

function VideoModal({ url, onClose }) {
  const embed = toEmbedUrl(url)
  const isVideo = url.endsWith('.mp4') || url.endsWith('.webm')
  return (
    <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="modal-box" initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><FiX /></button>
        {isVideo
          ? <video src={embed} controls autoPlay className="modal-media" />
          : <iframe src={embed} className="modal-media" allow="autoplay; encrypted-media" allowFullScreen title="demo" />
        }
      </motion.div>
    </motion.div>
  )
}

function DetailModal({ project, onClose }) {
  const d = project.details
  return (
    <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        className="detail-modal-box"
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}><FiX /></button>

        <div className="dm-header">
          <h3>{project.title}</h3>
          <span className="project-company">{project.company}</span>
        </div>

        {/* How it runs */}
        <div className="dm-section">
          <span className="dm-label">How It Works</span>
          <p className="dm-text">{d.how}</p>
        </div>

        {/* Modules */}
        <div className="dm-section">
          <span className="dm-label">App Modules</span>
          <div className="dm-grid">
            {d.modules.map(m => (
              <div key={m.name} className="dm-item">
                <span className="dm-item-name">{m.name}</span>
                <span className="dm-item-desc">{m.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Frontend */}
        <div className="dm-section">
          <span className="dm-label">Frontend — React Native</span>
          <div className="dm-grid">
            {d.frontend.map(f => (
              <div key={f.module} className="dm-item">
                <span className="dm-item-name">{f.module}</span>
                <span className="dm-item-desc">{f.why}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Backend */}
        <div className="dm-section">
          <span className="dm-label">Backend — Node.js / Express</span>
          <div className="dm-grid">
            {d.backend.map(b => (
              <div key={b.module} className="dm-item">
                <span className="dm-item-name">{b.module}</span>
                <span className="dm-item-desc">{b.why}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="project-tags" style={{ marginTop: 4 }}>
          {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>

        {project.apk && (
          <div style={{ marginTop: 16 }}>
            <a href={project.apk} download className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '9px 18px' }}>
              <FiDownload /> Download APK
            </a>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [activeVideo, setActiveVideo] = useState(null)
  const [activeDetail, setActiveDetail] = useState(null)

  return (
    <>
      <section id="projects" ref={ref}>
        <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Projects
        </motion.h2>

        <motion.p
          className="projects-note"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          First 4 projects built during professional experience — source code confidential. Last 2 are personal projects.
        </motion.p>
        <div className="projects-grid">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -6 }}
            >
              {((project.video && [project.video]) || project.videos)?.length > 0 ? (
                <div
                  className="project-thumb has-video"
                  onClick={() => {
                    const videoUrl = project.videos ? project.videos[0].url : project.video
                    setActiveVideo(videoUrl)
                  }}
                >
                  <div className="thumb-placeholder">
                    <span>{project.videos?.length > 1 ? 'Play Customer App Demo or Driver App Demo' : 'Watch Demo Video'}</span>
                  </div>
                  <div className="play-overlay"><FiPlay size={28} /></div>
                </div>
              ) : project.comingSoon ? (
                <div className="thumb-placeholder">
                  <span>Coming Soon...</span>
                </div>
              ) : (
                <div className="thumb-placeholder">
                  <span>Project Video</span>
                </div>
              )}

              <div className="project-body">
                <div className="project-meta">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3>{project.title}</h3>
                    {project.comingSoon && <span className="coming-soon-badge">Coming Soon</span>}
                  </div>
                  <span className="project-company">{project.company}</span>
                </div>

                <p className="project-desc">{project.description}</p>

                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>

                <div className="project-links">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      <FiPlay /> Visit Project
                    </a>
                  )}
                  {project.details && (
                    <button className="btn btn-primary" onClick={() => setActiveDetail(project)}>
                      <FiInfo /> View Details
                    </button>
                  )}
                  {(project.video || project.videos) && project.video !== project.link && (
                    <>
                      {(project.videos || [project.video]).map((video, idx) => {
                        const videoUrl = typeof video === 'string' ? video : video.url
                        const label = typeof video === 'string' ? (project.videos?.length > 1 ? `Demo ${idx + 1}` : 'Watch Demo') : video.label
                        return (
                          <button
                            key={videoUrl}
                            className="btn btn-primary"
                            onClick={() => setActiveVideo(videoUrl)}
                          >
                            <FiPlay /> {label}
                          </button>
                        )
                      })}
                    </>
                  )}
                  {project.apk && (
                    <>
                      <a href={project.apk} download className="btn btn-outline">
                        <FiDownload /> Download APK
                      </a>
                      <div className="apk-warning">
                        Official note: this APK is a client app that depends on backend servers. Login and live features may not work if the server is down or unavailable.
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && <VideoModal url={activeVideo} onClose={() => setActiveVideo(null)} />}
        {activeDetail && <DetailModal project={activeDetail} onClose={() => setActiveDetail(null)} />}
      </AnimatePresence>

      <style>{`
        .projects-note {
          text-align: center;
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-top: -40px;
          margin-bottom: 48px;
          opacity: 0.7;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }
        .project-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: border-color 0.3s;
        }
        .project-card:hover { border-color: var(--accent); }

        .project-thumb {
          width: 100%;
          aspect-ratio: 16/9;
          position: relative;
          background: #0d0d1a;
          overflow: hidden;
        }
        .project-thumb.has-video { cursor: pointer; }
        .thumb-img { width: 100%; height: 100%; object-fit: cover; opacity: 0.7; transition: opacity 0.3s; }
        .project-thumb.has-video:hover .thumb-img { opacity: 1; }
        .play-overlay {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.35); transition: background 0.3s;
        }
        .project-thumb.has-video:hover .play-overlay { background: rgba(124,58,237,0.5); }
        .play-overlay svg { color: #fff; filter: drop-shadow(0 2px 8px rgba(0,0,0,0.6)); }
        .thumb-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, rgba(124,58,237,0.08), rgba(6,182,212,0.05));
          border-bottom: 1px solid var(--border);
        }
        .thumb-placeholder span { color: var(--text-muted); font-size: 0.85rem; font-weight: 500; letter-spacing: 1px; }

        .project-body { padding: 22px 24px; display: flex; flex-direction: column; gap: 14px; flex: 1; }
        .project-meta { display: flex; flex-direction: column; gap: 4px; }
        .project-card h3 { font-size: 1.15rem; font-weight: 700; color: var(--text); }
        .coming-soon-badge {
          background: rgba(249,115,22,0.15); color: #fb923c;
          border: 1px solid rgba(249,115,22,0.35);
          padding: 3px 10px; border-radius: 12px; font-size: 0.7rem; 
          font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;
          white-space: nowrap;
        }
        .project-company { font-size: 0.8rem; color: var(--accent2); font-weight: 600; letter-spacing: 0.5px; }
        .project-desc { color: var(--text-muted); font-size: 0.93rem; line-height: 1.75; }
        .project-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .tag {
          background: rgba(124,58,237,0.12); color: var(--accent2);
          border: 1px solid rgba(124,58,237,0.25);
          padding: 4px 11px; border-radius: 20px; font-size: 0.78rem; font-weight: 600;
        }
        .project-links { display: flex; gap: 10px; flex-wrap: wrap; margin-top: auto; }
        .project-links .btn { font-size: 0.85rem; padding: 9px 18px; }
        .apk-warning {
          margin-top: 10px;
          color: var(--text-muted);
          font-size: 0.78rem;
          line-height: 1.5;
          border-left: 3px solid rgba(249,115,22,0.75);
          padding-left: 12px;
          opacity: 0.85;
        }

        /* Video Modal */
        .modal-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.85);
          z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
        }
        .modal-box {
          position: relative; width: 100%; max-width: 860px;
          background: #0d0d1a; border-radius: 16px; overflow: hidden;
          border: 1px solid var(--border);
        }
        .modal-close {
          position: absolute; top: 12px; right: 12px; z-index: 10;
          background: rgba(0,0,0,0.6); border: none; color: #fff;
          border-radius: 50%; width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 1.1rem;
        }
        .modal-media { width: 100%; aspect-ratio: 16/9; border: none; display: block; }

        /* Detail Modal */
        .detail-modal-box {
          position: relative; width: 100%; max-width: 720px;
          max-height: 88vh; overflow-y: auto;
          background: #0d0d1a; border-radius: 16px;
          border: 1px solid var(--border);
          padding: 32px 28px 28px;
          scrollbar-width: thin;
          scrollbar-color: var(--accent) transparent;
        }
        .dm-header { margin-bottom: 24px; }
        .dm-header h3 { font-size: 1.3rem; font-weight: 700; color: var(--text); margin-bottom: 4px; }
        .dm-section { margin-bottom: 22px; }
        .dm-label {
          display: block; font-size: 0.7rem; font-weight: 800;
          letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--accent2); margin-bottom: 10px;
        }
        .dm-text { font-size: 0.88rem; color: var(--text-muted); line-height: 1.75; }
        .dm-grid { display: flex; flex-direction: column; gap: 8px; }
        .dm-item {
          display: flex; gap: 10px; align-items: flex-start;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          border-radius: 8px; padding: 8px 12px;
        }
        .dm-item-name {
          font-size: 0.8rem; font-weight: 700; color: var(--text);
          min-width: 140px; flex-shrink: 0;
        }
        .dm-item-desc { font-size: 0.8rem; color: var(--text-muted); line-height: 1.5; }

        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr; }
          .detail-modal-box { padding: 24px 18px 20px; }
          .dm-item { flex-direction: column; gap: 3px; }
          .dm-item-name { min-width: unset; }
        }
      `}</style>
    </section>
    </>
  )
}
