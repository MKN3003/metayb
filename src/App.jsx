import React, { useState, useEffect } from 'react'
import {
  Globe,
  Cpu,
  Layers,
  Settings,
  Shield,
  TrendingUp,
  Check,
  Sun,
  Moon,
  Menu,
  X,
  AlertTriangle,
  Clock,
  Database,
  Activity,
  Workflow,
  Truck,
  Calendar,
  Zap,
  Award,
  Users,
  CheckCircle2,
  FileText,
  Briefcase,
  TrendingDown,
  LineChart,
  HardDrive,
  Mail,
  MessageSquare,
  GitBranch,
  Video,
  Radio,
  CheckSquare
} from 'lucide-react'

// Mock Data for AI Readiness Assessment
const ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    question: "How is your company's data currently integrated?",
    options: [
      { text: "Highly disconnected. Siloed teams and software systems.", points: 10 },
      { text: "Partially connected. Some central reports but manual sharing.", points: 20 },
      { text: "Fully integrated. Single source of truth with API connections.", points: 30 }
    ]
  },
  {
    id: 2,
    question: "What is your primary method for operational decision making?",
    options: [
      { text: "Reactive. We resolve issues as they happen based on gut feeling.", points: 10 },
      { text: "Analytic-led. We use weekly/monthly reports to steer direction.", points: 20 },
      { text: "Predictive. We leverage AI model forecasts and real-time alerts.", points: 30 }
    ]
  },
  {
    id: 3,
    question: "To what extent are your key business processes automated?",
    options: [
      { text: "Mostly manual. High reliance on paperwork, spreadsheets, and emails.", points: 10 },
      { text: "Semi-automated. Basic workflow rules but frequent manual interventions.", points: 20 },
      { text: "End-to-end automation. Intelligent triggers, bots, and automated SAP sync.", points: 30 }
    ]
  },
  {
    id: 4,
    question: "What are your current infrastructure capabilities for IoT systems?",
    options: [
      { text: "None. No active data streaming from devices or assets.", points: 10 },
      { text: "Limited. We collect sensor logs but don't action them dynamically.", points: 20 },
      { text: "Advanced. Real-time telemetry feeding into predictive loops.", points: 30 }
    ]
  }
]

function App() {
  // Theme State
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      if (saved) return saved
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  })

  // Sticky Navigation Scrolled State
  const [scrolled, setScrolled] = useState(false)

  // Mobile Nav Drawer Toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Interactive Hero Dashboard State
  const [task1Completed, setTask1Completed] = useState(false)
  const [task2Completed, setTask2Completed] = useState(false)
  const [task3Completed, setTask3Completed] = useState(false)

  // AI Assistant Chat Messages (Hero Mockup)
  const [chatLog, setChatLog] = useState([
    { sender: 'agent', text: "Axion AI online. Ready to manage enterprise data ingestion." }
  ])

  // Before & After Active Tab
  const [beforeAfterTab, setBeforeAfterTab] = useState('disconnected')

  // Services Interactive Category Filter
  const [activeServiceFilter, setActiveServiceFilter] = useState('all')
  const [activeCapability, setActiveCapability] = useState(0)

  // AI Assessment State
  const [assessmentStep, setAssessmentStep] = useState(0) // 0: intro, 1-4: questions, 5: dashboard results
  const [assessmentAnswers, setAssessmentAnswers] = useState({})
  const [radialScore, setRadialScore] = useState(0)

  // Form Booking States
  const [consultationSubmitted, setConsultationSubmitted] = useState(false)
  const [consultationLoading, setConsultationLoading] = useState(false)
  const [consultationForm, setConsultationForm] = useState({
    name: '',
    email: '',
    company: '',
    challenge: 'Software Development'
  })

  const [demoSubmitted, setDemoSubmitted] = useState(false)
  const [demoLoading, setDemoLoading] = useState(false)
  const [demoForm, setDemoForm] = useState({
    name: '',
    email: '',
    industry: 'Automobile',
    size: '100-500'
  })

  // Booking Modal States
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [bookingModalType, setBookingModalType] = useState('consultation')

  // Toggle tasks helper with AI Chat logs reaction
  const toggleTask = (taskNum, taskName, isCompleted, setCompleted) => {
    setCompleted(!isCompleted)
    const actionText = !isCompleted ? `Triggered: ${taskName}` : `Disabled: ${taskName}`

    let responseText = ""
    if (taskNum === 1) {
      responseText = !isCompleted
        ? "Axion AI: SAP integration pipeline activated. Real-time data synchronization validated. Latency: 14ms."
        : "Axion AI: SAP ERP Ledger Sync paused. Real-time logging standby."
    } else if (taskNum === 2) {
      responseText = !isCompleted
        ? "Axion AI: Neural demand forecasting model run complete. Outputs published to central inventory ledger."
        : "Axion AI: Prediction model pipeline reset."
    } else if (taskNum === 3) {
      responseText = !isCompleted
        ? "Axion AI: Cold-chain IoT diagnostics verified. Active telemetry streaming at 3.8°C (Optimal)."
        : "Axion AI: Sensor checks standby. Monitoring loop disabled."
    }

    setChatLog(prev => [
      ...prev,
      { sender: 'user', text: actionText },
      { sender: 'agent', text: responseText }
    ])
  }

  // Scroll Reveal Observer Setup
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)

    // Intersection Observer for scroll animations
    const revealElements = document.querySelectorAll('.reveal-element')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    )

    revealElements.forEach((el) => observer.observe(el))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      revealElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  // Apply Theme class
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  // AI Assessment Handlers
  const handleAssessmentStart = () => {
    setAssessmentStep(1)
    setAssessmentAnswers({})
  }

  const handleAssessmentAnswer = (questionId, option) => {
    setAssessmentAnswers(prev => ({
      ...prev,
      [questionId]: option
    }))
  }

  const handleAssessmentNext = () => {
    if (assessmentStep < ASSESSMENT_QUESTIONS.length) {
      setAssessmentStep(prev => prev + 1)
    } else {
      // Calculate Score
      let total = 0
      Object.keys(assessmentAnswers).forEach(qId => {
        total += assessmentAnswers[qId].points
      })
      const percentage = Math.round((total / 120) * 100)
      setRadialScore(percentage)
      setAssessmentStep(5)
    }
  }

  const handleAssessmentReset = () => {
    setAssessmentStep(0)
    setAssessmentAnswers({})
    setRadialScore(0)
  }

  // Form Handlers
  const handleConsultationSubmit = (e) => {
    e.preventDefault()
    if (!consultationForm.name || !consultationForm.email) return
    setConsultationLoading(true)
    setTimeout(() => {
      setConsultationLoading(false)
      setConsultationSubmitted(true)
    }, 1200)
  }

  const handleDemoSubmit = (e) => {
    e.preventDefault()
    if (!demoForm.name || !demoForm.email) return
    setDemoLoading(true)
    setTimeout(() => {
      setDemoLoading(false)
      setDemoSubmitted(true)
    }, 1200)
  }

  // Filter Services Logic
  const SERVICES = [
    {
      category: 'dev',
      title: "Software Development",
      desc: "Build scalable digital platforms, enterprise applications, and cloud-native solutions designed for long-term growth.",
      outcomes: ["High-performance platforms", "Modern cloud architecture"]
    },
    {
      category: 'integration',
      title: "SAP Integration",
      desc: "Connect business functions into a unified ecosystem that improves visibility and operational efficiency.",
      outcomes: ["Unified central ledger", "Ecosystem data visibility"]
    },
    {
      category: 'data',
      title: "Data Science & AI",
      desc: "Transform raw data into actionable intelligence using predictive analytics, machine learning, and AI-driven automation.",
      outcomes: ["Predictive intelligence", "AI automated operations"]
    },
    {
      category: 'data',
      title: "IoT Solutions",
      desc: "Monitor, analyze, and optimize operations through connected devices and real-time data ecosystems.",
      outcomes: ["Real-time asset telemetry", "Connected operations logs"]
    },
    {
      category: 'integration',
      title: "Business Process Management",
      desc: "Reduce manual effort and streamline workflows through intelligent automation and process optimization.",
      outcomes: ["Error reduction", "Optimal task workflows"]
    }
  ]

  const filteredServices = activeServiceFilter === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeServiceFilter)

  return (
    <>
      {/* Sticky Header Navigation */}
      <header className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar">
          <a href="#" className="logo-container">
            <div className="logo-sphere"></div>
            <span>AxionSphere</span>
          </a>

          <nav className="nav-links">
            <a href="#services" className="nav-link">Services</a>
            <a href="#industries" className="nav-link">Industries</a>
            <a href="#why-us" className="nav-link">About</a>
            <a href="#process" className="nav-link">Process</a>
          </nav>

          <div className="nav-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme mode"
              style={{ marginRight: '0.25rem' }}
            >
              {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
            </button>
            <button 
              onClick={() => { setBookingModalType('consultation'); setIsBookingModalOpen(true); }} 
              className="btn btn-primary nav-links" 
              style={{ borderRadius: '6px' }}
            >
              Book Consultation
            </button>

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu Overlay */}
      <div className={`mobile-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-overlay-header">
          <a href="#" className="logo-container" onClick={() => setMobileMenuOpen(false)}>
            <div className="logo-sphere"></div>
            <span>AxionSphere</span>
          </a>
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close mobile menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mobile-nav-links">
          <a href="#services" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Services</a>
          <a href="#industries" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Industries</a>
          <a href="#why-us" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#process" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Process</a>
          <a href="#case-studies" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Case Studies</a>
          <a href="#readiness" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>AI Assessment</a>
        </nav>

        <div className="mobile-nav-actions">
          <button 
            onClick={() => { setBookingModalType('consultation'); setIsBookingModalOpen(true); setMobileMenuOpen(false); }} 
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            Book Consultation
          </button>
          <button 
            onClick={() => { setBookingModalType('demo'); setIsBookingModalOpen(true); setMobileMenuOpen(false); }} 
            className="btn btn-secondary"
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            Request Demo
          </button>
        </div>
      </div>

      {/* Centered Hero Section (Akiflow Style Interface but AxionSphere Content) */}
      <section className="hero-section" id="hero">
        <div className="container">
          <div className="hero-content reveal-element reveal-delay-1">
            <span className="badge">
              Enterprise AI & Digital Transformation
            </span>
            <h1 className="hero-headline">
              Transform Enterprise Complexity <br />
              <span style={{ color: 'var(--accent)' }}>Into Intelligent Growth</span>
            </h1>
            <p className="hero-supporting">
              AxionSphere helps enterprises modernize operations, automate workflows, unlock business intelligence, and accelerate digital transformation through AI, Software Engineering, SAP Integration, and IoT solutions.
            </p>
            <div className="hero-ctas">
              <button onClick={() => { setBookingModalType('consultation'); setIsBookingModalOpen(true); }} className="btn btn-primary">Book a Consultation</button>
              <button onClick={() => { setBookingModalType('demo'); setIsBookingModalOpen(true); }} className="btn btn-secondary">Request a Demo</button>
            </div>
          </div>

          <div className="hero-visual-wrapper reveal-element reveal-delay-2">
            {/* Curved Floating Integration Badges */}
            <div className="floating-badge fb-1" title="Slack Integration">
              <MessageSquare size={12} />
            </div>
            <div className="floating-badge fb-2" title="Email Alerts">
              <Mail size={12} />
            </div>
            <div className="floating-badge fb-3" title="GitHub Sync">
              <GitBranch size={12} />
            </div>
            <div className="floating-badge fb-4" title="Process Streams">
              <Video size={12} />
            </div>
            <div className="floating-badge fb-5" title="SAP Database Connector">
              <Database size={12} />
            </div>

            {/* High-Fidelity Workspace Mockup Dashboard (Enterprise Operations Hub) */}
            <div className="workspace-window">
              <div className="window-header">
                <div className="window-dots">
                  <span className="window-dot window-dot-red"></span>
                  <span className="window-dot window-dot-yellow"></span>
                  <span className="window-dot window-dot-green"></span>
                </div>
                <span className="window-title">AXIONSPHERE ENTERPRISE OPERATIONS HUB</span>
                <div style={{ width: '30px' }}></div>
              </div>

              <div className="workspace-layout">
                {/* 1. Sidebar - Data Stream Pipelines */}
                <div className="workspace-sidebar">
                  <span className="sidebar-title">Data Ingestion Streams</span>

                  <div
                    className={`inbox-item ${task1Completed ? 'completed' : ''}`}
                    onClick={() => toggleTask(1, 'SAP ERP Ledger Sync', task1Completed, setTask1Completed)}
                    title="Toggle SAP Integration Sync"
                  >
                    <span>SAP ERP Ledger Sync</span>
                    {task1Completed ? <CheckCircle2 size={10} color="#10b981" /> : <Clock size={10} />}
                  </div>

                  <div
                    className={`inbox-item ${task2Completed ? 'completed' : ''}`}
                    onClick={() => toggleTask(2, 'AI Demand Pipeline', task2Completed, setTask2Completed)}
                    title="Toggle AI Forecast Node"
                  >
                    <span>AI Demand Pipeline</span>
                    {task2Completed ? <CheckCircle2 size={10} color="#10b981" /> : <Clock size={10} />}
                  </div>

                  <div
                    className={`inbox-item ${task3Completed ? 'completed' : ''}`}
                    onClick={() => toggleTask(3, 'IoT Telemetry Flow', task3Completed, setTask3Completed)}
                    title="Toggle IoT Telemetry Check"
                  >
                    <span>IoT Telemetry Flow</span>
                    {task3Completed ? <CheckCircle2 size={10} color="#10b981" /> : <Clock size={10} />}
                  </div>
                </div>

                {/* 2. Process Telemetry and Status tracks */}
                <div className="workspace-body">
                  <div className="calendar-header">
                    <span>Active Digital Infrastructure</span>
                    <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Telemetry Monitor</span>
                  </div>

                  <div className="calendar-grid">
                    <div className="calendar-col">
                      <span className="calendar-day-label">SAP Integration</span>
                      {!task1Completed && <div className="calendar-event">SAP Ledger Live</div>}
                      <div className="calendar-event" style={{ backgroundColor: 'rgba(109, 40, 217, 0.04)', borderLeftColor: 'var(--accent-secondary)' }}>Status: Connected</div>
                    </div>

                    <div className="calendar-col">
                      <span className="calendar-day-label">AI Forecasting</span>
                      {!task2Completed && <div className="calendar-event" style={{ borderLeftColor: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.04)' }}>Demand Predictor</div>}
                      <div className="calendar-event" style={{ backgroundColor: 'rgba(109, 40, 217, 0.04)', borderLeftColor: 'var(--accent-secondary)' }}>Accuracy: 96.8%</div>
                    </div>

                    <div className="calendar-col">
                      <span className="calendar-day-label">IoT Operations</span>
                      {!task3Completed && <div className="calendar-event" style={{ borderLeftColor: '#f59e0b', backgroundColor: 'rgba(245, 158, 11, 0.04)' }}>Cold-Chain Stream</div>}
                    </div>
                  </div>
                </div>

                {/* 3. Right Pane - Axion AI chat feedback */}
                <div className="workspace-mobile-pane">
                  <div className="phone-mockup">
                    <div className="phone-header">
                      <span>9:41</span>
                      <span>Axion AI</span>
                      <span>100%</span>
                    </div>
                    <div className="phone-body">
                      {chatLog.map((msg, idx) => (
                        <div key={idx} className={`chat-bubble ${msg.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-agent'}`}>
                          {msg.text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section className="trust-indicators bg-alt">
        <div className="container trust-container">

          {/* Row 1: Rounded top pill */}
          <div className="trust-top-pill reveal-element">
            <span>Enterprise Grade</span>
            <span className="pill-divider">|</span>
            <span>AI-Driven Optimization</span>
          </div>

          {/* Row 2: Overlapping Avatars & Headline */}
          <div className="trust-head-group reveal-element reveal-delay-1">
            <div className="avatar-group">
              <div className="avatar-circle av-1">M</div>
              <div className="avatar-circle av-2">A</div>
              <div className="avatar-circle av-3">O</div>
              <div className="avatar-circle av-4">E</div>
              <div className="avatar-circle av-5">D</div>
            </div>
            <h3 className="trust-main-heading">
              Trusted by <span style={{ color: 'var(--accent)', fontWeight: 700 }}>120+</span> of ambitious enterprise leaders and teams worldwide
            </h3>
          </div>

          {/* Row 3: Capterra/Software Advice style widget cards */}
          <div className="badge-widgets-grid reveal-element reveal-delay-2">

            {/* Widget 1: Software Advice Front Runners Style */}
            <div className="badge-widget-card advice-style">
              <div className="badge-logo">
                <div className="advice-style .badge-logo" style={{ color: '#fff', fontSize: '10px', fontWeight: '800' }}>SA</div>
              </div>
              <div className="badge-info">
                <span className="badge-name">Software Advice</span>
                <span className="badge-rank">FRONT RUNNERS</span>
                <span className="badge-desc">500+ Projects</span>
              </div>
            </div>

            {/* Widget 2: Capterra Style */}
            <div className="badge-widget-card capterra-style">
              <div className="badge-logo">
                <div className="capterra-style .badge-logo" style={{ color: '#fff', fontSize: '12px' }}>▲</div>
              </div>
              <div className="badge-info">
                <span className="badge-name">Capterra 4.9</span>
                <div className="badge-stars">★★★★★</div>
                <span className="badge-desc">Delivered Successfully</span>
              </div>
            </div>

            {/* Widget 3: GetApp Style */}
            <div className="badge-widget-card getapp-style">
              <div className="badge-logo">
                <div className="getapp-style .badge-logo" style={{ color: '#fff', fontSize: '11px', fontWeight: '800' }}>G</div>
              </div>
              <div className="badge-info">
                <span className="badge-name">GetApp</span>
                <div className="badge-stars">★★★★★ 4.8</div>
                <span className="badge-desc">15+ Industries Served</span>
              </div>
            </div>

            {/* Widget 4: Software Advice Alternative Style */}
            <div className="badge-widget-card advice-dark-style">
              <div className="badge-logo">
                <div className="advice-dark-style .badge-logo" style={{ color: '#fff', fontSize: '12px' }}>★</div>
              </div>
              <div className="badge-info">
                <span className="badge-name">98% Client</span>
                <div className="badge-stars">★★★★★ 4.7</div>
                <span className="badge-desc">Satisfaction Rate</span>
              </div>
            </div>

          </div>

          {/* Row 4: G2 Style Shields */}
          <div className="shield-widgets-row reveal-element reveal-delay-3">

            <div className="shield-widget-card">
              <div className="shield-header">SPRING 2026</div>
              <div className="shield-body">
                <span className="shield-main">Momentum</span>
                <span className="shield-sub">Leader</span>
              </div>
            </div>

            <div className="shield-widget-card">
              <div className="shield-header">SPRING 2026</div>
              <div className="shield-body">
                <span className="shield-main">High</span>
                <span className="shield-sub">Performer</span>
              </div>
            </div>

            <div className="shield-widget-card">
              <div className="shield-header">AXIONSPHERE</div>
              <div className="shield-body">
                <span className="shield-main">Users</span>
                <span className="shield-sub">Love Us</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Problem → Solution Section */}
      <section id="challenges">
        <div className="container">
          <div className="section-intro reveal-element">
            <span className="badge">Operational Friction</span>
            <h2>Modern Enterprises Face New Challenges</h2>
          </div>

          <div className="problems-grid">

            {/* Card 1: Disconnected Systems */}
            <div className="problem-card reveal-element">
              <div className="problem-card-body">
                <div className="problem-icon-wrapper">
                  <Layers size={16} />
                </div>
                <h3>Disconnected Systems <span className="highlight-tag p-violet">Silos</span></h3>
                <p>Teams work across multiple platforms creating inefficiencies.</p>
              </div>

              <div className="mockup-workspace">
                <div className="mockup-window">
                  <div className="window-header">
                    <div className="window-dots">
                      <span className="dot dot-red"></span>
                      <span className="dot dot-yellow"></span>
                      <span className="dot dot-green"></span>
                    </div>
                    <div className="window-address">sync_status.sh</div>
                  </div>
                  <div className="window-body">
                    <div className="disconnected-mockup">
                      <div className="disc-node">
                        <Database size={12} />
                        <span>ERP Data</span>
                      </div>
                      <div className="disc-link">
                        <div className="disc-arrow-broken"></div>
                        <span className="disc-status">Broken Sync</span>
                      </div>
                      <div className="disc-node">
                        <Layers size={12} />
                        <span>CRM Leads</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Slow Decision Making */}
            <div className="problem-card reveal-element reveal-delay-1">
              <div className="problem-card-body">
                <div className="problem-icon-wrapper">
                  <Clock size={16} />
                </div>
                <h3>Slow Decision Making <span className="highlight-tag p-green">Data Lag</span></h3>
                <p>Critical business insights remain buried in data silos.</p>
              </div>

              <div className="mockup-workspace">
                <div className="mockup-window">
                  <div className="window-header">
                    <div className="window-dots">
                      <span className="dot dot-red"></span>
                      <span className="dot dot-yellow"></span>
                      <span className="dot dot-green"></span>
                    </div>
                    <div className="window-address">query_analytics.sql</div>
                  </div>
                  <div className="window-body">
                    <div className="silos-mockup">
                      <div className="silo-query-bar">
                        <span>SELECT * FROM global_insights;</span>
                      </div>
                      <div className="silo-status">
                        <div className="silo-spinner"></div>
                        <span>Query running... Est. 48 hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Manual Operations */}
            <div className="problem-card reveal-element">
              <div className="problem-card-body">
                <div className="problem-icon-wrapper">
                  <AlertTriangle size={16} />
                </div>
                <h3>Manual Operations <span className="highlight-tag p-orange">Repetitive</span></h3>
                <p>Time-consuming processes reduce productivity and growth.</p>
              </div>

              <div className="mockup-workspace">
                <div className="mockup-window">
                  <div className="window-header">
                    <div className="window-dots">
                      <span className="dot dot-red"></span>
                      <span className="dot dot-yellow"></span>
                      <span className="dot dot-green"></span>
                    </div>
                    <div className="window-address">tasks_queue.json</div>
                  </div>
                  <div className="window-body">
                    <div className="manual-mockup">
                      <div className="manual-task-item">
                        <span>Copy CSV Lead Data to ERP Ledger</span>
                        <span className="manual-badge">Pending</span>
                      </div>
                      <div className="manual-task-item">
                        <span>Send Daily Telemetry PDF Report</span>
                        <span className="manual-badge">Pending</span>
                      </div>
                      <div className="manual-task-item">
                        <span>Email Shipment Status to Client</span>
                        <span className="manual-badge">Pending</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Legacy Technology */}
            <div className="problem-card reveal-element reveal-delay-1">
              <div className="problem-card-body">
                <div className="problem-icon-wrapper">
                  <Database size={16} />
                </div>
                <h3>Legacy Technology <span className="highlight-tag p-red">Deprecated</span></h3>
                <p>Outdated systems limit scalability and innovation.</p>
              </div>

              <div className="mockup-workspace">
                <div className="mockup-window">
                  <div className="window-header">
                    <div className="window-dots">
                      <span className="dot dot-red"></span>
                      <span className="dot dot-yellow"></span>
                      <span className="dot dot-green"></span>
                    </div>
                    <div className="window-address">db_config.ini</div>
                  </div>
                  <div className="window-body" style={{ padding: 0 }}>
                    <div className="legacy-mockup">
                      <div><span className="legacy-prompt">db_connect:</span> loading...</div>
                      <div className="legacy-error">
                        [FATAL] Memory limit exceeded.
                        Driver deprecated. Connection failed.
                      </div>
                      <div><span className="legacy-prompt">db_connect:</span> retrying...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="solution-transition-box reveal-element">
            <h3 className="solution-transition-title">How AxionSphere Helps</h3>
            <p className="solution-transition-desc">
              We design intelligent ecosystems that connect data, automate operations, and empower businesses to scale with confidence.
            </p>
          </div>

          {/* Clean Before/After Tab Switcher */}
          <div className="before-after-container reveal-element">
            <div className="before-after-tabs">
              <button
                className={`ba-tab ${beforeAfterTab === 'disconnected' ? 'active' : ''}`}
                onClick={() => setBeforeAfterTab('disconnected')}
              >
                <div className="ba-tab-indicator">
                  {beforeAfterTab === 'disconnected' ? <TrendingDown size={14} /> : 1}
                </div>
                <div className="ba-tab-content">
                  <h4>Before Transformation</h4>
                  <p>Disconnected & Fragmented Silos</p>
                </div>
              </button>

              <button
                className={`ba-tab ${beforeAfterTab === 'connected' ? 'active' : ''}`}
                onClick={() => setBeforeAfterTab('connected')}
              >
                <div className="ba-tab-indicator">
                  {beforeAfterTab === 'connected' ? <TrendingUp size={14} /> : 2}
                </div>
                <div className="ba-tab-content">
                  <h4>After Transformation</h4>
                  <p>Intelligent, Connected Digital Hub</p>
                </div>
              </button>
            </div>

            {/* Simulated Live Architecture Screen */}
            <div className="ba-visual-panel">
              <div className="ba-visual-header">
                <div className="window-dots">
                  <span className="window-dot window-dot-red"></span>
                  <span className="window-dot window-dot-yellow"></span>
                  <span className="window-dot window-dot-green"></span>
                </div>
                <span className="ba-window-title">
                  {beforeAfterTab === 'disconnected' ? 'SYSTEM STATUS: FRAGMENTED SILOS' : 'SYSTEM STATUS: UNIFIED DIGITAL HUB'}
                </span>
                <div style={{ width: '30px' }}></div>
              </div>

              <div className="ba-visual-body">
                {beforeAfterTab === 'disconnected' ? (
                  <div style={{ width: '100%' }}>
                    <div className="state-manual-nodes">
                      <div className="manual-item-card">
                        <HardDrive size={16} />
                        <h5>ERP Data</h5>
                        <p>Isolated DB</p>
                      </div>
                      <div className="manual-item-card">
                        <Layers size={16} />
                        <h5>CRM Leads</h5>
                        <p>Manual CSV Export</p>
                      </div>
                      <div className="manual-item-card">
                        <FileText size={16} />
                        <h5>Delivery Log</h5>
                        <p>Spreadsheet File</p>
                      </div>
                    </div>
                    <div className="disconnect-indicator">
                      LATENCY: HIGH | CONTINUOUS MANIPULATION REQUIRED
                    </div>
                  </div>
                ) : (
                  <div className="state-connected-grid">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div className="connected-node">
                        <div className="connected-node-icon"><Database size={12} /></div>
                        <div>
                          <h5>Core SAP</h5>
                          <p>Live Sync</p>
                        </div>
                      </div>
                      <div className="connected-node">
                        <div className="connected-node-icon"><Cpu size={12} /></div>
                        <div>
                          <h5>Edge IoT</h5>
                          <p>Active</p>
                        </div>
                      </div>
                    </div>

                    <div className="connected-hub">
                      <Globe size={18} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div className="connected-node">
                        <div className="connected-node-icon"><Workflow size={12} /></div>
                        <div>
                          <h5>AI Agent</h5>
                          <p>Automated</p>
                        </div>
                      </div>
                      <div className="connected-node">
                        <div className="connected-node-icon"><LineChart size={12} /></div>
                        <div>
                          <h5>ML Output</h5>
                          <p>Predictive</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-alt">
        <div className="container">
          <div className="section-intro reveal-element">
            <span className="badge">Capabilities</span>
            <h2>Technology Solutions Built Around Business Outcomes</h2>
            <p style={{ fontSize: '13px', color: 'var(--secondary-text)', marginTop: '0.5rem', maxWidth: '600px', marginInline: 'auto' }}>
              We translate complexity into clean systems, connecting operations to measurable performance metrics.
            </p>
          </div>

          <div className="capabilities-split-container reveal-element">

            {/* Left Column: Visual Mockup Showcase */}
            <div className="capabilities-visual-showcase">
              <div className="mockup-window">
                <div className="window-header">
                  <div className="window-dots">
                    <span className="dot dot-red"></span>
                    <span className="dot dot-yellow"></span>
                    <span className="dot dot-green"></span>
                  </div>
                  <div className="window-address">
                    {activeCapability === 0 && 'cloud_architecture.sh'}
                    {activeCapability === 1 && 'sap_sync_ledger.sh'}
                    {activeCapability === 2 && 'ai_prediction_model.py'}
                    {activeCapability === 3 && 'iot_telemetry_flow.cpp'}
                    {activeCapability === 4 && 'bpm_process_automation.json'}
                  </div>
                </div>

                <div className="window-body capabilities-visual-body">
                  {activeCapability === 0 && (
                    <div className="cap-visual-item dev-visual">
                      <div className="visual-metrics-row">
                        <div className="metric-box">
                          <span className="metric-label">API Response</span>
                          <span className="metric-value text-green">14ms</span>
                        </div>
                        <div className="metric-box">
                          <span className="metric-label">Server Cluster</span>
                          <span className="metric-value">Active</span>
                        </div>
                        <div className="metric-box">
                          <span className="metric-label">Uptime</span>
                          <span className="metric-value">99.99%</span>
                        </div>
                      </div>
                      <div className="visual-console-output">
                        <div><span className="console-prompt">$</span> npm run build:production</div>
                        <div className="text-green">✓ Compiled successfully in 280ms</div>
                        <div><span className="console-prompt">$</span> pm2 status cluster</div>
                        <div className="text-violet">Online [Node-1, Node-2, Node-3]</div>
                      </div>
                    </div>
                  )}

                  {activeCapability === 1 && (
                    <div className="cap-visual-item sap-visual">
                      <div className="visual-title-row">
                        <span className="visual-subtitle">Ledger Synchronization Pipeline</span>
                        <span className="status-badge-green">Syncing</span>
                      </div>
                      <div className="sap-sync-list">
                        <div className="sap-sync-row">
                          <span>Sales Ledger Row 1042</span>
                          <span className="text-green">Synced ERP</span>
                        </div>
                        <div className="sap-sync-row">
                          <span>Inventory Allocation</span>
                          <span className="text-green">Synced ERP</span>
                        </div>
                        <div className="sap-sync-row">
                          <span>Logistics Shipping manifest</span>
                          <span className="text-green">Synced ERP</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeCapability === 2 && (
                    <div className="cap-visual-item ai-visual">
                      <div className="visual-title-row">
                        <span className="visual-subtitle">AI Demand Predictor</span>
                        <span className="status-badge-violet">98.6% Acc</span>
                      </div>
                      <div className="ai-bars-chart">
                        <div className="ai-bar-group">
                          <div className="ai-bar-fill-violet" style={{ height: '70px' }}></div>
                          <span className="ai-bar-label">Product Q3</span>
                        </div>
                        <div className="ai-bar-group">
                          <div className="ai-bar-fill-violet" style={{ height: '95px' }}></div>
                          <span className="ai-bar-label">Product Q4</span>
                        </div>
                        <div className="ai-bar-group">
                          <div className="ai-bar-fill-violet" style={{ height: '50px' }}></div>
                          <span className="ai-bar-label">Supply Chain</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeCapability === 3 && (
                    <div className="cap-visual-item iot-visual">
                      <div className="visual-title-row">
                        <span className="visual-subtitle">Edge Telemetry Stream</span>
                        <span className="status-badge-orange">120 streams</span>
                      </div>
                      <div className="iot-devices-list">
                        <div className="iot-device-row">
                          <span>Device #1042 (Motor Temp)</span>
                          <span className="text-green">24.5°C OK</span>
                        </div>
                        <div className="iot-device-row">
                          <span>Device #1043 (Axial Vib)</span>
                          <span className="text-green">0.02mm OK</span>
                        </div>
                        <div className="iot-device-row">
                          <span>Device #1044 (Fluid Pres)</span>
                          <span className="text-green">120 psi OK</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeCapability === 4 && (
                    <div className="cap-visual-item bpm-visual">
                      <div className="visual-title-row">
                        <span className="visual-subtitle">Workflow Operations Autopilot</span>
                        <span className="status-badge-blue">Auto</span>
                      </div>
                      <div className="bpm-flow-steps">
                        <div className="bpm-flow-step-item current-step">
                          <span className="step-num">1</span>
                          <span>CSV Import</span>
                        </div>
                        <div className="bpm-flow-arrow">→</div>
                        <div className="bpm-flow-step-item">
                          <span className="step-num">2</span>
                          <span>AI Ledger Sync</span>
                        </div>
                        <div className="bpm-flow-arrow">→</div>
                        <div className="bpm-flow-step-item">
                          <span className="step-num">3</span>
                          <span>Slack Alert</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Capabilities List */}
            <div className="capabilities-interactive-list">
              {[
                {
                  title: 'Software Development',
                  desc: 'Scalable platforms & cloud-native microservices.',
                  icon: <Workflow size={16} />,
                  category: 'dev'
                },
                {
                  title: 'SAP Integration',
                  desc: 'Connect business functions into a unified ecosystem.',
                  icon: <Layers size={16} />,
                  category: 'integration'
                },
                {
                  title: 'Data Science & AI',
                  desc: 'Predictive intelligence & deep analytical decisions.',
                  icon: <Cpu size={16} />,
                  category: 'data'
                },
                {
                  title: 'IoT Solutions',
                  desc: 'Asset edge monitoring & telemetry ecosystems.',
                  icon: <Radio size={16} />,
                  category: 'data'
                },
                {
                  title: 'Business Process Management',
                  desc: 'Streamline workflows and reduce operational errors.',
                  icon: <CheckSquare size={16} />,
                  category: 'integration'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`capability-list-item ${activeCapability === idx ? 'active-item' : ''}`}
                  onClick={() => setActiveCapability(idx)}
                  onMouseEnter={() => setActiveCapability(idx)}
                >
                  <div className="cap-item-icon-wrapper">
                    {item.icon}
                  </div>
                  <div className="cap-item-info">
                    <h4 className="cap-item-title">{item.title}</h4>
                    <p className="cap-item-desc">{item.desc}</p>
                  </div>
                  {activeCapability === idx && <div className="active-glow-bar"></div>}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries">
        <div className="container">
          <div className="section-intro reveal-element">
            <span className="badge">Domain Experience</span>
            <h2>Industry Expertise That Drives Measurable Results</h2>
            <p style={{ fontSize: '13px', color: 'var(--secondary-text)', marginTop: '0.5rem', maxWidth: '600px', marginInline: 'auto' }}>
              Deep vertical specialization combined with cutting-edge digital execution.
            </p>
          </div>

          <div className="industries-interactive-layout reveal-element">
            
            {/* Left Side: 3 Industries */}
            <div className="industries-side-column">
              <div className="industry-bullet-card">
                <div className="industry-bullet-header">
                  <div className="industry-bullet-icon"><Settings size={14} /></div>
                  <h4>Automobile</h4>
                </div>
                <p>Smart manufacturing, connected operations, and assembly line optimization.</p>
              </div>

              <div className="industry-bullet-card">
                <div className="industry-bullet-header">
                  <div className="industry-bullet-icon"><Truck size={14} /></div>
                  <h4>Logistics</h4>
                </div>
                <p>Fleet visibility, route intelligence, and operational automation.</p>
              </div>

              <div className="industry-bullet-card">
                <div className="industry-bullet-header">
                  <div className="industry-bullet-icon"><Layers size={14} /></div>
                  <h4>Consumer Goods</h4>
                </div>
                <p>Demand forecasting, inventory optimization, and customer analytics.</p>
              </div>
            </div>

            {/* Center: Self-looping Animated AxionSphere Core inside a Dark Screen Mobile Mockup */}
            <div className="industries-center-core">
              {/* Background radar grid rings & ambient AI glow */}
              <div className="radar-ring-bg ring-1"></div>
              <div className="radar-ring-bg ring-2"></div>
              <div className="mockup-ambient-glow"></div>
              
              {/* Sleek Dark Screen Mobile Mockup */}
              <div className="center-mobile-mockup">
                <div className="phone-dynamic-island"></div>
                <div className="phone-screen">
                  <div className="phone-screen-grid"></div>
                  
                  {/* Glowing purple voice assistant orb */}
                  <div className="phone-assistant-orb-container">
                    <div className="assistant-orb-core-glow"></div>
                  </div>
                  
                  <div className="phone-assistant-title">Axion AI</div>
                  <div className="phone-assistant-subtitle">Enterprise Co-Pilot</div>
                </div>
              </div>

              {/* Self-looping floating telemetry notifications (overlaying) */}
              <div className="telemetry-float-container">
                <div className="floating-banner banner-1">
                  <div className="banner-avatar bg-violet">
                    <Settings size={10} className="banner-icon-svg" />
                  </div>
                  <div className="banner-text-content">
                    <span className="banner-title">OEE Sync Active</span>
                    <span className="banner-desc">Efficiency at 98.4%</span>
                  </div>
                </div>

                <div className="floating-banner banner-2">
                  <div className="banner-avatar bg-blue">
                    <Truck size={10} className="banner-icon-svg" />
                  </div>
                  <div className="banner-text-content">
                    <span className="banner-title">Route Optimized</span>
                    <span className="banner-desc">Fuel consumption -14%</span>
                  </div>
                </div>

                <div className="floating-banner banner-3">
                  <div className="banner-avatar bg-emerald">
                    <Shield size={10} className="banner-icon-svg" />
                  </div>
                  <div className="banner-text-content">
                    <span className="banner-title">Compliance Audit</span>
                    <span className="banner-desc">Logs verified & signed</span>
                  </div>
                </div>

                <div className="floating-banner banner-4">
                  <div className="banner-avatar bg-orange">
                    <TrendingUp size={10} className="banner-icon-svg" />
                  </div>
                  <div className="banner-text-content">
                    <span className="banner-title">AUM Ledger</span>
                    <span className="banner-desc">Balances synchronized</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: 3 Industries */}
            <div className="industries-side-column">
              <div className="industry-bullet-card">
                <div className="industry-bullet-header">
                  <div className="industry-bullet-icon"><Shield size={14} /></div>
                  <h4>Pharmaceutical</h4>
                </div>
                <p>Regulatory compliance, production intelligence, and data-driven operations.</p>
              </div>

              <div className="industry-bullet-card">
                <div className="industry-bullet-header">
                  <div className="industry-bullet-icon"><TrendingUp size={14} /></div>
                  <h4>Wealth Management</h4>
                </div>
                <p>Digital advisory platforms, analytics, and secure financial solutions.</p>
              </div>

              <div className="industry-bullet-card">
                <div className="industry-bullet-header">
                  <div className="industry-bullet-icon"><Activity size={14} /></div>
                  <h4>Dairy</h4>
                </div>
                <p>Supply chain visibility, quality monitoring, and cold chain optimization.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Businesses Choose AxionSphere Section */}
      <section id="why-us" className="bg-alt">
        <div className="container">
          <div className="section-intro reveal-element">
            <span className="badge">Our Edge</span>
            <h2>Trusted By Enterprises Focused On Growth</h2>
          </div>

          <div className="why-grid">
            <div className="why-card reveal-element">
              <div className="why-icon-box">
                <Award size={14} />
              </div>
              <h3 className="why-title">Enterprise-Grade Expertise</h3>
              <p className="why-desc">Deep experience delivering large-scale transformation initiatives.</p>
            </div>

            <div className="why-card reveal-element reveal-delay-1">
              <div className="why-icon-box">
                <Cpu size={14} />
              </div>
              <h3 className="why-title">AI-First Innovation</h3>
              <p className="why-desc">Modern solutions built for future-ready businesses.</p>
            </div>

            <div className="why-card reveal-element reveal-delay-2">
              <div className="why-icon-box">
                <Briefcase size={14} />
              </div>
              <h3 className="why-title">Business-Focused Approach</h3>
              <p className="why-desc">Technology decisions aligned with measurable outcomes.</p>
            </div>

            <div className="why-card reveal-element reveal-delay-3">
              <div className="why-icon-box">
                <Layers size={14} />
              </div>
              <h3 className="why-title">Scalable Architecture</h3>
              <p className="why-desc">Solutions designed to support long-term growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Digital Transformation Process */}
      <section id="process">
        <div className="container">
          <div className="section-intro reveal-element">
            <span className="badge">Transformation Map</span>
            <h2>From Strategy To Scale</h2>
          </div>

          <div className="process-timeline reveal-element">
            <div className="process-step">
              <div className="step-number">01</div>
              <h3 className="step-title">Discover</h3>
              <p className="step-desc">Understanding business goals, challenges, and opportunities.</p>
            </div>

            <div className="process-step">
              <div className="step-number">02</div>
              <h3 className="step-title">Design</h3>
              <p className="step-desc">Creating scalable technology roadmaps.</p>
            </div>

            <div className="process-step">
              <div className="step-number">03</div>
              <h3 className="step-title">Build</h3>
              <p className="step-desc">Engineering intelligent digital solutions.</p>
            </div>

            <div className="process-step">
              <div className="step-number">04</div>
              <h3 className="step-title">Optimize</h3>
              <p className="step-desc">Continuously improving performance through data and insights.</p>
            </div>

            <div className="process-step">
              <div className="step-number">05</div>
              <h3 className="step-title">Scale</h3>
              <p className="step-desc">Supporting long-term growth and innovation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="bg-alt">
        <div className="container">
          <div className="section-intro reveal-element">
            <span className="badge">Enterprise Proof</span>
            <h2>Real Business Impact</h2>
          </div>

          <div className="cases-grid">
            <div className="case-card reveal-element">
              <div className="case-image-wrapper">
                <div className="case-metric-box">
                  <span className="case-metric-value">35%</span>
                  <span className="case-metric-label">Reduction in Operational Delays</span>
                </div>
              </div>
              <div className="case-info">
                <span className="case-category">Logistics Company</span>
                <h3 className="case-title">Fleet Visibility Automation</h3>
                <p className="case-desc">We integrated real-time GPS telemetry and weather API models to automate dispatch scheduling.</p>
              </div>
            </div>

            <div className="case-card reveal-element reveal-delay-1">
              <div className="case-image-wrapper">
                <div className="case-metric-box">
                  <span className="case-metric-value">40%</span>
                  <span className="case-metric-label">Increase in Process Efficiency</span>
                </div>
              </div>
              <div className="case-info">
                <span className="case-category">Manufacturing Enterprise</span>
                <h3 className="case-title">Predictive Asset Maintenance</h3>
                <p className="case-desc">Deployed Edge AI agents onto assembly line machinery sensors to predict part failure risks.</p>
              </div>
            </div>

            <div className="case-card reveal-element reveal-delay-2">
              <div className="case-image-wrapper">
                <div className="case-metric-box">
                  <span className="case-metric-value">25%</span>
                  <span className="case-metric-label">Demand Forecasting Accuracy</span>
                </div>
              </div>
              <div className="case-info">
                <span className="case-category">Retail Brand</span>
                <h3 className="case-title">Neural Stock Inventory</h3>
                <p className="case-desc">Connected transactions databases to predictive models to balance regional supply and demands.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Readiness Assessment */}
      <section id="readiness">
        <div className="container">
          <div className="section-intro reveal-element">
            <span className="badge">Interactive Evaluator</span>
            <h2>Is Your Business Ready For AI?</h2>
            <p>Answer a few questions and discover opportunities to improve automation, efficiency, and decision-making.</p>
          </div>

          <div className="assessment-container reveal-element">
            {assessmentStep === 0 && (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <Cpu size={32} color="var(--accent)" style={{ marginBottom: '0.75rem' }} />
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Initiate Infrastructure Evaluation</h3>
                <p style={{ maxWidth: '28rem', margin: '0 auto 1.5rem auto' }}>
                  Analyze how automation, connected telemetry, and unified database layers can reduce your operational friction.
                </p>
                <button className="btn btn-primary" onClick={handleAssessmentStart}>Start Assessment</button>
              </div>
            )}

            {assessmentStep >= 1 && assessmentStep <= ASSESSMENT_QUESTIONS.length && (
              <div>
                <div className="assessment-progress-bar-bg">
                  <div
                    className="assessment-progress-bar-fill"
                    style={{ width: `${(assessmentStep / ASSESSMENT_QUESTIONS.length) * 100}%` }}
                  ></div>
                </div>

                <div className="assessment-step-count">
                  Question {assessmentStep} of {ASSESSMENT_QUESTIONS.length}
                </div>

                <h3 className="assessment-question">
                  {ASSESSMENT_QUESTIONS[assessmentStep - 1].question}
                </h3>

                <div className="assessment-options">
                  {ASSESSMENT_QUESTIONS[assessmentStep - 1].options.map((opt, index) => {
                    const isSelected = assessmentAnswers[assessmentStep] && assessmentAnswers[assessmentStep].text === opt.text
                    return (
                      <button
                        key={index}
                        className={`assessment-option ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleAssessmentAnswer(assessmentStep, opt)}
                      >
                        <span>{opt.text}</span>
                        <div className="assessment-option-circle">
                          {isSelected && <div className="assessment-option-check"></div>}
                        </div>
                      </button>
                    )
                  })}
                </div>

                <div className="assessment-footer">
                  <button
                    className="btn btn-secondary"
                    disabled={assessmentStep === 1}
                    onClick={() => setAssessmentStep(prev => prev - 1)}
                  >
                    Previous
                  </button>

                  <button
                    className="btn btn-primary"
                    disabled={!assessmentAnswers[assessmentStep]}
                    onClick={handleAssessmentNext}
                  >
                    {assessmentStep === ASSESSMENT_QUESTIONS.length ? "Finish Assessment" : "Next Question"}
                  </button>
                </div>
              </div>
            )}

            {assessmentStep === 5 && (
              <div style={{ animation: 'fadeIn 0.3s ease-out forwards' }}>
                <div className="dashboard-radial-metrics">
                  <div className="score-radial">
                    <svg width="90" height="90" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="45" cy="45" r="38" fill="none" stroke="var(--borders)" strokeWidth="5" />
                      <circle
                        cx="45"
                        cy="45"
                        r="38"
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="5"
                        strokeDasharray="238"
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
                      />
                    </svg>
                    <div style={{ position: 'absolute', textAlign: 'center' }}>
                      <span className="score-percentage">{radialScore}%</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'left' }}>
                    <h3 className="assessment-tier">
                      {radialScore <= 45 ? "AI Explorer Tier" : radialScore <= 75 ? "AI Accelerator Tier" : "AI Leader Tier"}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--secondary-text)' }}>
                      {radialScore <= 45 ?
                        "Your enterprise is at the early research phase. Focus on connecting isolated databases and deploying pilot RPA bots." :
                        radialScore <= 75 ?
                          "You have established core databases. Focus on automating cross-system actions and integrating live API telemetry loops." :
                          "Your enterprise is highly integrated. You are ready to deploy predictive neural intelligence models and cognitive agents."
                      }
                    </p>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--borders)', paddingTop: '1rem', marginBottom: '1.5rem', textAlign: 'left' }}>
                  <h4 className="recommendations-title">Recommended Transformation Roadmap</h4>
                  <div className="recommendation-list">
                    <div className="recommendation-item">
                      <CheckCircle2 size={14} color="var(--accent)" style={{ marginTop: '2px' }} />
                      <div>
                        <strong>Phase 1: Database Connector setup.</strong> Integrate your core CRM/ERP data silos to establish a central, queryable database layer.
                      </div>
                    </div>
                    <div className="recommendation-item">
                      <CheckCircle2 size={14} color="var(--accent)" style={{ marginTop: '2px' }} />
                      <div>
                        <strong>Phase 2: Workflow Automation.</strong> Replace recurring manual task handoffs with automated software trigger sequences.
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                  <button onClick={() => { setBookingModalType('consultation'); setIsBookingModalOpen(true); }} className="btn btn-primary">Book Strategy Review</button>
                  <button className="btn btn-secondary" onClick={handleAssessmentReset}>Reset Evaluator</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta-section" id="final-cta">
        <div className="container final-cta-content">
          <span className="badge"><Award size={12} /> Ready to Transform</span>
          <h2 className="final-cta-headline">Build The Future Of Your Business</h2>
          <p className="final-cta-supporting">
            Transform data into decisions. Automate operations. Accelerate innovation.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <button onClick={() => { setBookingModalType('consultation'); setIsBookingModalOpen(true); }} className="btn btn-primary">Book Consultation</button>
            <button onClick={() => { setBookingModalType('demo'); setIsBookingModalOpen(true); }} className="btn btn-secondary">Request Demo</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="logo-container">
                <div className="logo-sphere"></div>
                <span>AxionSphere</span>
              </a>
              <p className="footer-brand-desc">
                Leading digital engineering agency delivering premium SAP integrations, custom software systems, and predictive enterprise AI models.
              </p>
            </div>

            <div>
              <h4 className="footer-column-title">Services</h4>
              <ul className="footer-links">
                <li><a href="#services" className="footer-link">Software Development</a></li>
                <li><a href="#services" className="footer-link">SAP Integration</a></li>
                <li><a href="#services" className="footer-link">Data Science & AI</a></li>
                <li><a href="#services" className="footer-link">IoT Solutions</a></li>
                <li><a href="#services" className="footer-link">Process Management</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-column-title">Industries</h4>
              <ul className="footer-links">
                <li><a href="#industries" className="footer-link">Automobile</a></li>
                <li><a href="#industries" className="footer-link">Logistics</a></li>
                <li><a href="#industries" className="footer-link">Consumer Goods</a></li>
                <li><a href="#industries" className="footer-link">Pharmaceutical</a></li>
                <li><a href="#industries" className="footer-link">Wealth Management</a></li>
                <li><a href="#industries" className="footer-link">Dairy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-column-title">Company</h4>
              <ul className="footer-links">
                <li><a href="#why-us" className="footer-link">About AxionSphere</a></li>
                <li><a href="#process" className="footer-link">Transformation Process</a></li>
                <li><a href="#case-studies" className="footer-link">Featured Proof</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="copyright">
              © {new Date().getFullYear()} AxionSphere. All Rights Reserved. Designed to premium enterprise standards.
            </div>

            <div className="social-links">
              <a href="#" className="social-link" aria-label="AxionSphere LinkedIn">
                <Users size={12} />
              </a>
              <a href="#" className="social-link" aria-label="AxionSphere Twitter">
                <Globe size={12} />
              </a>
              <a href="#" className="social-link" aria-label="AxionSphere GitHub">
                <Cpu size={12} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Premium Full-Screen Modal Overlay for Booking / Demo */}
      {isBookingModalOpen && (
        <div className="booking-modal-overlay" onClick={() => setIsBookingModalOpen(false)}>
          <div className="booking-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="booking-modal-close" onClick={() => setIsBookingModalOpen(false)} aria-label="Close modal">
              <X size={18} />
            </button>
            
            {/* Tabs for switching between Consultation and Demo request */}
            <div className="modal-tabs">
              <button 
                className={`modal-tab-btn ${bookingModalType === 'consultation' ? 'active' : ''}`}
                onClick={() => setBookingModalType('consultation')}
              >
                Book Consultation
              </button>
              <button 
                className={`modal-tab-btn ${bookingModalType === 'demo' ? 'active' : ''}`}
                onClick={() => setBookingModalType('demo')}
              >
                Request Demo
              </button>
            </div>
            
            <div className="modal-form-container">
              {bookingModalType === 'consultation' ? (
                <div>
                  <span className="badge" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>Advisory Call</span>
                  <h3 style={{ marginBottom: '0.5rem', fontSize: '1.4rem', textAlign: 'left' }}>Let's Solve Your Next Business Challenge</h3>
                  <p style={{ marginBottom: '1.5rem', fontSize: '13px', color: 'var(--secondary-text)', textAlign: 'left' }}>
                    Whether you're planning a digital transformation initiative, implementing AI, modernizing enterprise systems, or optimizing operations, our experts are ready to help.
                  </p>
                  
                  {consultationSubmitted ? (
                    <div className="form-success-overlay">
                      <div className="success-icon-box">
                        <Check size={20} />
                      </div>
                      <h4 style={{ fontSize: '1.1rem', margin: '0.5rem 0' }}>Consultation Scheduled</h4>
                      <p style={{ fontSize: '13px', color: 'var(--secondary-text)' }}>A calendar invitation and strategy agenda has been sent to your business email.</p>
                    </div>
                  ) : (
                    <form className="booking-form" onSubmit={handleConsultationSubmit} style={{ maxWidth: '100%' }}>
                      <div className="form-group">
                        <label className="form-label" htmlFor="modal-consult-name">Full Name</label>
                        <input
                          type="text"
                          id="modal-consult-name"
                          className="form-input"
                          required
                          placeholder="Jane Doe"
                          value={consultationForm.name}
                          onChange={(e) => setConsultationForm({ ...consultationForm, name: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="modal-consult-email">Work Email</label>
                        <input
                          type="email"
                          id="modal-consult-email"
                          className="form-input"
                          required
                          placeholder="jane@company.com"
                          value={consultationForm.email}
                          onChange={(e) => setConsultationForm({ ...consultationForm, email: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="modal-consult-company">Company Name</label>
                        <input
                          type="text"
                          id="modal-consult-company"
                          className="form-input"
                          required
                          placeholder="Enterprise Corp"
                          value={consultationForm.company}
                          onChange={(e) => setConsultationForm({ ...consultationForm, company: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="modal-consult-challenge">Primary Focus</label>
                        <select
                          id="modal-consult-challenge"
                          className="form-input form-select"
                          value={consultationForm.challenge}
                          onChange={(e) => setConsultationForm({ ...consultationForm, challenge: e.target.value })}
                        >
                          <option value="Software Development">Software Development</option>
                          <option value="SAP Integration">SAP Integration</option>
                          <option value="Data Science & AI">Data Science & AI</option>
                          <option value="IoT Solutions">IoT Solutions</option>
                          <option value="Business Process Management">Process Optimization</option>
                        </select>
                      </div>
                      <button type="submit" className="btn btn-primary" disabled={consultationLoading} style={{ marginTop: '0.5rem', width: '100%' }}>
                        {consultationLoading ? "Securing Timeslots..." : "Book Consultation"}
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <div>
                  <span className="badge" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>System Demo</span>
                  <h3 style={{ marginBottom: '0.5rem', fontSize: '1.4rem', textAlign: 'left' }}>See Our Solutions In Action</h3>
                  <p style={{ marginBottom: '1.5rem', fontSize: '13px', color: 'var(--secondary-text)', textAlign: 'left' }}>
                    Explore how intelligent technologies can improve efficiency, visibility, and performance.
                  </p>
                  
                  {demoSubmitted ? (
                    <div className="form-success-overlay">
                      <div className="success-icon-box">
                        <Check size={20} />
                      </div>
                      <h4 style={{ fontSize: '1.1rem', margin: '0.5rem 0' }}>Demo Access Approved</h4>
                      <p style={{ fontSize: '13px', color: 'var(--secondary-text)' }}>We've dispatched your credentials and walking onboarding link to your email.</p>
                    </div>
                  ) : (
                    <form className="booking-form" onSubmit={handleDemoSubmit} style={{ maxWidth: '100%' }}>
                      <div className="form-group">
                        <label className="form-label" htmlFor="modal-demo-name">Full Name</label>
                        <input
                          type="text"
                          id="modal-demo-name"
                          className="form-input"
                          required
                          placeholder="John Doe"
                          value={demoForm.name}
                          onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="modal-demo-email">Work Email</label>
                        <input
                          type="email"
                          id="modal-demo-email"
                          className="form-input"
                          required
                          placeholder="john@company.com"
                          value={demoForm.email}
                          onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="modal-demo-industry">Your Sector</label>
                        <select
                          id="modal-demo-industry"
                          className="form-input form-select"
                          value={demoForm.industry}
                          onChange={(e) => setDemoForm({ ...demoForm, industry: e.target.value })}
                        >
                          <option value="Automobile">Automobile</option>
                          <option value="Logistics">Logistics</option>
                          <option value="Consumer Goods">Consumer Goods</option>
                          <option value="Pharmaceutical">Pharmaceutical</option>
                          <option value="Wealth Management">Wealth Management</option>
                          <option value="Dairy">Dairy Industry</option>
                        </select>
                      </div>
                      <button type="submit" className="btn btn-primary" disabled={demoLoading} style={{ marginTop: '0.5rem', width: '100%' }}>
                        {demoLoading ? "Authorizing Dashboard..." : "Request Demo"}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
