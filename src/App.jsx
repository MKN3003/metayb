import React, { useState, useEffect, useRef } from 'react'
import {
  Globe,
  Cpu,
  Layers,
  Settings,
  Shield,
  TrendingUp,
  ArrowRight,
  Check,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
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
  User,
  Briefcase,
  Building,
  TrendingDown,
  LineChart,
  HardDrive
} from 'lucide-react'

// Mock Data for AI Readiness Assessment
const ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    question: "How would you describe your company's current data integration?",
    options: [
      { text: "Highly disconnected. Siloed teams and software systems.", points: 10 },
      { text: "Partially connected. Some central reports but manual sharing.", points: 20 },
      { text: "Fully integrated. Single source of truth with APIs.", points: 30 }
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
    question: "What is your current infrastructure capabilities for IoT and Edge Systems?",
    options: [
      { text: "None. No active data streaming from devices or assets.", points: 10 },
      { text: "Limited. We collect sensor logs but don't action them dynamically.", points: 20 },
      { text: "Advanced. Real-time telemetry feeding into predictive maintenance loops.", points: 30 }
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

  // Before & After Active Tab
  const [beforeAfterTab, setBeforeAfterTab] = useState('disconnected')

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

  // Scroll Reveal Observer Setup
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)

    // Intersection Observer for slide reveal animations
    const revealElements = document.querySelectorAll('.reveal-element')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
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
      // Max score is 120 (4 questions * 30 points). Map to 100 percentage.
      const percentage = Math.round((total / 120) * 100)
      setRadialScore(percentage)
      setAssessmentStep(5) // Show results
    }
  }

  const handleAssessmentReset = () => {
    setAssessmentStep(0)
    setAssessmentAnswers({})
    setRadialScore(0)
  }

  // Form handlers
  const handleConsultationSubmit = (e) => {
    e.preventDefault()
    if (!consultationForm.name || !consultationForm.email) return
    setConsultationLoading(true)
    setTimeout(() => {
      setConsultationLoading(false)
      setConsultationSubmitted(true)
    }, 1500)
  }

  const handleDemoSubmit = (e) => {
    e.preventDefault()
    if (!demoForm.name || !demoForm.email) return
    setDemoLoading(true)
    setTimeout(() => {
      setDemoLoading(false)
      setDemoSubmitted(true)
    }, 1500)
  }

  // Radial calculation helper
  const strokeDashoffset = 440 - (440 * radialScore) / 100

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
            <a href="#case-studies" className="nav-link">Case Studies</a>
            <a href="#readiness" className="nav-link">AI Assessment</a>
          </nav>

          <div className="nav-actions">
            <button 
              className="theme-toggle" 
              onClick={toggleTheme} 
              aria-label="Toggle theme mode"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <a href="#booking" className="btn btn-primary nav-links">Book Consultation</a>

            <button 
              className="mobile-menu-btn" 
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <Menu size={24} />
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
            <X size={24} />
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
          <a href="#booking" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>Book Consultation</a>
          <a href="#demo" className="btn btn-secondary" onClick={() => setMobileMenuOpen(false)}>Request Demo</a>
        </div>
      </div>

      {/* Section 1: Hero Section */}
      <section className="hero-section" id="hero">
        <div className="container hero-grid">
          <div className="hero-content reveal-element reveal-delay-1">
            <span className="badge">
              <Zap size={14} /> Enterprise AI & Digital Transformation
            </span>
            <h1 className="hero-headline text-gradient">
              Transform Enterprise Complexity Into Intelligent Growth
            </h1>
            <p className="hero-supporting">
              AxionSphere helps enterprises modernize operations, automate workflows, unlock business intelligence, and accelerate digital transformation through AI, Software Engineering, SAP Integration, and IoT solutions.
            </p>
            <div className="hero-ctas">
              <a href="#booking" className="btn btn-primary">Book Consultation</a>
              <a href="#demo" className="btn btn-secondary">Request Demo</a>
            </div>
          </div>

          <div className="hero-visual-wrapper reveal-element reveal-delay-2">
            <div className="globe-container">
              {/* Central orbiting globe visualization */}
              <div className="globe-orbit orbit-1">
                <div className="globe-node node-1"></div>
                <div className="globe-node node-2"></div>
              </div>
              <div className="globe-orbit orbit-2">
                <div className="globe-node node-3"></div>
                <div className="globe-node node-4"></div>
              </div>
              <div className="globe-sphere-3d">
                <Globe size={100} strokeWidth={1} color="var(--accent)" />
              </div>

              {/* Floating dashboards (Apple/SaaS style glass windows) */}
              <div className="floating-glass-card card-ai-agent">
                <div className="glass-card-header">
                  <span className="dot-pulse"></span>
                  <span>AI Agent Status</span>
                </div>
                <span className="glass-card-title">SAP Sync Operations</span>
                <span className="glass-card-value">Active</span>
              </div>

              <div className="floating-glass-card card-workflow">
                <div className="glass-card-header">
                  <Activity size={12} />
                  <span>Optimization</span>
                </div>
                <span className="glass-card-title">Process Efficiency</span>
                <span className="glass-card-value">+40%</span>
              </div>

              <div className="floating-glass-card card-metrics">
                <div className="glass-card-header">
                  <Cpu size={12} />
                  <span>Telemetry Loop</span>
                </div>
                <span className="glass-card-title">Active IoT Nodes</span>
                <span className="glass-card-value">12.4K</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Trust Indicators */}
      <section className="trust-indicators">
        <div className="container trust-grid">
          <div className="trust-item reveal-element">
            <span className="trust-number">500+</span>
            <span className="trust-label">Projects Delivered</span>
          </div>
          <div className="trust-item reveal-element reveal-delay-1">
            <span className="trust-number">120+</span>
            <span className="trust-label">Enterprise Clients</span>
          </div>
          <div className="trust-item reveal-element reveal-delay-2">
            <span className="trust-number">15+</span>
            <span className="trust-label">Industries Served</span>
          </div>
          <div className="trust-item reveal-element reveal-delay-3">
            <span className="trust-number">98%</span>
            <span className="trust-label">Client Satisfaction</span>
          </div>
        </div>
      </section>

      {/* Section 3: Problem → Solution & Transformation Section */}
      <section id="challenges">
        <div className="container">
          <div className="section-intro reveal-element">
            <span className="badge">Operational Friction</span>
            <h2>Modern Enterprises Face New Challenges</h2>
            <p>Disconnected datasets, manual workloads, and legacy technical debt act as sand in the gears of modern business growth.</p>
          </div>

          <div className="problems-grid">
            <div className="problem-card reveal-element">
              <span className="problem-cost-badge">Annual Waste: High</span>
              <div className="problem-icon-wrapper">
                <Layers size={22} />
              </div>
              <h3>Disconnected Systems</h3>
              <p>Teams work across multiple platform interfaces, forcing manual record duplication and producing systemic data inconsistencies.</p>
              <div className="problem-impact-list">
                <div className="problem-impact-item">
                  <span className="problem-impact-label">Operational Impact:</span>
                  <span className="problem-impact-value">Fragmented communications & tool sprawl.</span>
                </div>
                <div className="problem-impact-item">
                  <span className="problem-impact-label">Business Cost:</span>
                  <span className="problem-impact-value">Up to 20% lost productivity in manual reconciliation.</span>
                </div>
              </div>
            </div>

            <div className="problem-card reveal-element reveal-delay-1">
              <span className="problem-cost-badge">Risk Factor: Critical</span>
              <div className="problem-icon-wrapper">
                <Clock size={22} />
              </div>
              <h3>Slow Decision Making</h3>
              <p>Critical business insights remain buried deep in isolated data silos, requiring days of consolidation before leaders can act.</p>
              <div className="problem-impact-list">
                <div className="problem-impact-item">
                  <span className="problem-impact-label">Operational Impact:</span>
                  <span className="problem-impact-value">Delayed market response & outdated reporting.</span>
                </div>
                <div className="problem-impact-item">
                  <span className="problem-impact-label">Business Cost:</span>
                  <span className="problem-impact-value">Missed product-market opportunities and high executive overhead.</span>
                </div>
              </div>
            </div>

            <div className="problem-card reveal-element">
              <span className="problem-cost-badge">Error Rate: ~12%</span>
              <div className="problem-icon-wrapper">
                <AlertTriangle size={22} />
              </div>
              <h3>Manual Operations</h3>
              <p>Highly repetitive processes consume valuable employee hours, resulting in costly human error and capping organizational throughput.</p>
              <div className="problem-impact-list">
                <div className="problem-impact-item">
                  <span className="problem-impact-label">Operational Impact:</span>
                  <span className="problem-impact-value">High staff fatigue & error propagation.</span>
                </div>
                <div className="problem-impact-item">
                  <span className="problem-impact-label">Business Cost:</span>
                  <span className="problem-impact-value">Inflated direct operational costs and sluggish order-to-cash cycles.</span>
                </div>
              </div>
            </div>

            <div className="problem-card reveal-element reveal-delay-1">
              <span className="problem-cost-badge">Maintenance: Extreme</span>
              <div className="problem-icon-wrapper">
                <Database size={22} />
              </div>
              <h3>Legacy Technology</h3>
              <p>Outdated technological foundations limit horizontal scalability, prevent cloud modernizations, and repel top engineering talent.</p>
              <div className="problem-impact-list">
                <div className="problem-impact-item">
                  <span className="problem-impact-label">Operational Impact:</span>
                  <span className="problem-impact-value">High security risks & integration friction.</span>
                </div>
                <div className="problem-impact-item">
                  <span className="problem-impact-label">Business Cost:</span>
                  <span className="problem-impact-value">Astronomical maintenance budgets with zero competitive value.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="solution-transition-box reveal-element">
            <h3 className="solution-transition-title">How AxionSphere Helps</h3>
            <p className="solution-transition-desc">
              We design intelligent digital ecosystems that connect system data, automate repetitive operations, and empower leadership to scale with absolute confidence.
            </p>
          </div>

          {/* Interactive Before & After Comparison Panel */}
          <div className="before-after-container reveal-element">
            <div className="before-after-tabs">
              <button 
                className={`ba-tab ${beforeAfterTab === 'disconnected' ? 'active' : ''}`}
                onClick={() => setBeforeAfterTab('disconnected')}
              >
                <div className="ba-tab-indicator">
                  {beforeAfterTab === 'disconnected' ? <TrendingDown size={18} /> : 1}
                </div>
                <div className="ba-tab-content">
                  <h4>Before Transformation</h4>
                  <p>Manual, Disconnected, and Reactive operations.</p>
                </div>
              </button>

              <button 
                className={`ba-tab ${beforeAfterTab === 'connected' ? 'active' : ''}`}
                onClick={() => setBeforeAfterTab('connected')}
              >
                <div className="ba-tab-indicator">
                  {beforeAfterTab === 'connected' ? <TrendingUp size={18} /> : 2}
                </div>
                <div className="ba-tab-content">
                  <h4>After Transformation</h4>
                  <p>Automated, Connected, and Predictive ecosystems.</p>
                </div>
              </button>
            </div>

            {/* Simulated Live Architecture Screen */}
            <div className="ba-visual-panel">
              <div className="ba-visual-header">
                <div className="ba-window-controls">
                  <span className="ba-dot ba-dot-red"></span>
                  <span className="ba-dot ba-dot-yellow"></span>
                  <span className="ba-dot ba-dot-green"></span>
                </div>
                <span className="ba-window-title">
                  {beforeAfterTab === 'disconnected' ? 'SYSTEM DIAGRAM: FRAGMENTED INFRA' : 'SYSTEM DIAGRAM: INTELLIGENT ENTERPRISE'}
                </span>
              </div>

              <div className="ba-visual-body">
                {beforeAfterTab === 'disconnected' ? (
                  <div className="visual-state state-manual">
                    <div className="state-manual-nodes">
                      <div className="manual-item-card">
                        <HardDrive size={24} />
                        <h5>ERP DB</h5>
                        <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Isolated Server</p>
                      </div>
                      <div className="manual-item-card">
                        <Layers size={24} />
                        <h5>CRM Data</h5>
                        <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Manual CSV Export</p>
                      </div>
                      <div className="manual-item-card">
                        <FileText size={24} />
                        <h5>Logistics Log</h5>
                        <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Paper Records</p>
                      </div>
                    </div>
                    <div className="state-arrow-flow">
                      <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>Fragmented Workflows</span>
                    </div>
                    <div className="disconnect-indicator">
                      <div className="disconnect-label">CONNECTION FAILED (LATENCY: HIGH)</div>
                    </div>
                  </div>
                ) : (
                  <div className="visual-state state-connected">
                    <div className="state-connected-grid">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="connected-node">
                          <div className="connected-node-icon"><Database size={16} /></div>
                          <div>
                            <h5 style={{ fontSize: '0.875rem' }}>Core SAP</h5>
                            <p style={{ fontSize: '0.6875rem', color: '#10b981' }}>Connected</p>
                          </div>
                        </div>
                        <div className="connected-node">
                          <div className="connected-node-icon"><Cpu size={16} /></div>
                          <div>
                            <h5 style={{ fontSize: '0.875rem' }}>IoT Gateway</h5>
                            <p style={{ fontSize: '0.6875rem', color: '#10b981' }}>Telemetry Active</p>
                          </div>
                        </div>
                      </div>

                      <div className="connected-hub">
                        <div className="connected-hub-pulse"></div>
                        <Globe size={32} />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="connected-node">
                          <div className="connected-node-icon"><Workflow size={16} /></div>
                          <div>
                            <h5 style={{ fontSize: '0.875rem' }}>Workflow Agent</h5>
                            <p style={{ fontSize: '0.6875rem', color: '#10b981' }}>Automating</p>
                          </div>
                        </div>
                        <div className="connected-node">
                          <div className="connected-node-icon"><LineChart size={16} /></div>
                          <div>
                            <h5 style={{ fontSize: '0.875rem' }}>ML Analytics</h5>
                            <p style={{ fontSize: '0.6875rem', color: '#10b981' }}>Predictive Ready</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                      <div className="connected-line"></div>
                      <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--accent)' }}>Unified Orchestration Engine Active</span>
                      <div className="connected-line"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Services Section */}
      <section id="services" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container">
          <div className="section-intro reveal-element">
            <span className="badge">Capabilities</span>
            <h2>Technology Solutions Built Around Business Outcomes</h2>
            <p>We deploy senior engineering pods to construct custom enterprise integrations that scale dynamically to match global objectives.</p>
          </div>

          <div className="services-grid">
            <div className="service-card reveal-element">
              <div className="service-icon-wrapper">
                <Workflow size={28} />
              </div>
              <h3 className="service-title">Software Development</h3>
              <p className="service-desc">Build scalable digital platforms, enterprise applications, and cloud-native software solutions designed for long-term growth and high engineering reliability.</p>
              <div className="service-outcomes">
                <span className="outcome-title">Outcome Targets</span>
                <div className="outcome-item">
                  <Check size={14} className="outcome-check" />
                  <span>99.99% Core System Availability</span>
                </div>
                <div className="outcome-item">
                  <Check size={14} className="outcome-check" />
                  <span>10x Expansion Scalability Room</span>
                </div>
              </div>
            </div>

            <div className="service-card reveal-element reveal-delay-1">
              <div className="service-icon-wrapper">
                <Layers size={28} />
              </div>
              <h3 className="service-title">SAP Integration</h3>
              <p className="service-desc">Connect complex ERP platforms, HR networks, and vendor chains into a unified central business ledger that improves global operational visibility.</p>
              <div className="service-outcomes">
                <span className="outcome-title">Outcome Targets</span>
                <div className="outcome-item">
                  <Check size={14} className="outcome-check" />
                  <span>Unified Operational Ledgers</span>
                </div>
                <div className="outcome-item">
                  <Check size={14} className="outcome-check" />
                  <span>Zero Manual CSV Adjustments</span>
                </div>
              </div>
            </div>

            <div className="service-card reveal-element reveal-delay-2">
              <div className="service-icon-wrapper">
                <Cpu size={28} />
              </div>
              <h3 className="service-title">Data Science & AI</h3>
              <p className="service-desc">Transform legacy data lakes into automated intelligence reports using custom-trained neural networks, machine learning algorithms, and agentic workflows.</p>
              <div className="service-outcomes">
                <span className="outcome-title">Outcome Targets</span>
                <div className="outcome-item">
                  <Check size={14} className="outcome-check" />
                  <span>Automated Trend Prediction</span>
                </div>
                <div className="outcome-item">
                  <Check size={14} className="outcome-check" />
                  <span>90%+ Automated Insight Audits</span>
                </div>
              </div>
            </div>

            <div className="service-card reveal-element">
              <div className="service-icon-wrapper">
                <Globe size={28} />
              </div>
              <h3 className="service-title">IoT Solutions</h3>
              <p className="service-desc">Monitor, analyze, and optimize remote field operations through secure connected edge devices, real-time sensor streams, and centralized operational dashboards.</p>
              <div className="service-outcomes">
                <span className="outcome-title">Outcome Targets</span>
                <div className="outcome-item">
                  <Check size={14} className="outcome-check" />
                  <span>Real-time Operations Telemetry</span>
                </div>
                <div className="outcome-item">
                  <Check size={14} className="outcome-check" />
                  <span>Predictive Maintenance Triggers</span>
                </div>
              </div>
            </div>

            <div className="service-card reveal-element reveal-delay-1">
              <div className="service-icon-wrapper">
                <Settings size={28} />
              </div>
              <h3 className="service-title">Business Process Management</h3>
              <p className="service-desc">Eliminate manual effort bottlenecks and streamline workflows through custom-engineered robotic process automation (RPA) and operational workflow tooling.</p>
              <div className="service-outcomes">
                <span className="outcome-title">Outcome Targets</span>
                <div className="outcome-item">
                  <Check size={14} className="outcome-check" />
                  <span>65% Task Turnaround Reductions</span>
                </div>
                <div className="outcome-item">
                  <Check size={14} className="outcome-check" />
                  <span>Clean End-to-End Task Logging</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Industries Section */}
      <section id="industries">
        <div className="container">
          <div className="section-intro reveal-element">
            <span className="badge">Domain Experience</span>
            <h2>Industry Expertise That Drives Measurable Results</h2>
            <p>Our vertical specialization translates general technical capabilities into localized business advantages across crucial supply and demand sectors.</p>
          </div>

          {/* Horizontally scrollable panel */}
          <div className="industries-scroll-wrapper reveal-element">
            <div className="industry-card">
              <div className="industry-card-header">
                <span className="industry-card-title">Automobile</span>
                <div className="industry-icon-box">
                  <Settings size={20} />
                </div>
              </div>
              <p className="industry-desc">Smart manufacturing, automated quality verification loops, connected logistics, and complex assembly lines data aggregation.</p>
              <div className="industry-visual-container">
                <div className="visual-automobile">
                  <div className="speedometer-bar">
                    <div className="speedometer-fill"></div>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>OEE: 87.2%</span>
                </div>
              </div>
            </div>

            <div className="industry-card">
              <div className="industry-card-header">
                <span className="industry-card-title">Logistics</span>
                <div className="industry-icon-box">
                  <Truck size={20} />
                </div>
              </div>
              <p className="industry-desc">Real-time asset visibility, dynamic routing neural algorithms, dispatch automation, and supply line resilience models.</p>
              <div className="industry-visual-container">
                <div className="visual-logistics-path">
                  <div className="logistic-truck-dot"></div>
                </div>
              </div>
            </div>

            <div className="industry-card">
              <div className="industry-card-header">
                <span className="industry-card-title">Consumer Goods</span>
                <div className="industry-icon-box">
                  <Layers size={20} />
                </div>
              </div>
              <p className="industry-desc">Machine learning retail demand forecasting, automated warehouses, catalog optimizations, and localized stock balancing.</p>
              <div className="industry-visual-container">
                <div className="visual-chart-bars">
                  <div className="chart-bar chart-bar-1"></div>
                  <div className="chart-bar chart-bar-2"></div>
                  <div className="chart-bar chart-bar-3"></div>
                </div>
              </div>
            </div>

            <div className="industry-card">
              <div className="industry-card-header">
                <span className="industry-card-title">Pharmaceutical</span>
                <div className="industry-icon-box">
                  <Shield size={20} />
                </div>
              </div>
              <p className="industry-desc">Regulatory compliance automation, environmental sensors audit logs, and secure chemical process data pipelines.</p>
              <div className="industry-visual-container">
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <CheckCircle2 size={12} /> FDA COMPLIANCE SECURED
                </span>
              </div>
            </div>

            <div className="industry-card">
              <div className="industry-card-header">
                <span className="industry-card-title">Wealth Management</span>
                <div className="industry-icon-box">
                  <TrendingUp size={20} />
                </div>
              </div>
              <p className="industry-desc">Digital portfolio allocation trackers, automated compliance reporting, custom customer analytics dashboards.</p>
              <div className="industry-visual-container">
                <span style={{ fontFamily: 'monospace', fontSize: '0.875rem', fontWeight: 700 }}>
                  AUM: $1.2B | +14.6%
                </span>
              </div>
            </div>

            <div className="industry-card">
              <div className="industry-card-header">
                <span className="industry-card-title">Dairy</span>
                <div className="industry-icon-box">
                  <Activity size={20} />
                </div>
              </div>
              <p className="industry-desc">Real-time cold-chain compliance trackers, quality monitoring telemetry, and automated delivery schedules.</p>
              <div className="industry-visual-container">
                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Cold Chain: 3.8°C (Optimal)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Why Businesses Choose AxionSphere */}
      <section id="why-us" style={{ backgroundColor: 'var(--surface)' }}>
        <div className="container">
          <div className="section-intro reveal-element">
            <span className="badge">Our Edge</span>
            <h2>Why Leading Enterprises Partner With AxionSphere</h2>
            <p>We blend elite software engineering capabilities with a rigorous consulting framework to unlock enterprise value.</p>
          </div>

          <div className="why-grid">
            <div className="why-card reveal-element">
              <div className="why-icon-box">
                <Award size={20} />
              </div>
              <h3 className="why-title">Enterprise Expertise</h3>
              <p className="why-desc">Years of practical experience delivering complex transformation initiatives inside legacy software architectures.</p>
            </div>

            <div className="why-card reveal-element reveal-delay-1">
              <div className="why-icon-box">
                <Cpu size={20} />
              </div>
              <h3 className="why-title">AI-First Innovation</h3>
              <p className="why-desc">We build solutions on modern machine learning APIs and agentic logic to ensure future-ready durability.</p>
            </div>

            <div className="why-card reveal-element reveal-delay-2">
              <div className="why-icon-box">
                <Briefcase size={20} />
              </div>
              <h3 className="why-title">Outcome Focus</h3>
              <p className="why-desc">We measure success by system metrics like latency reductions and margins improvements, not just billable hours.</p>
            </div>

            <div className="why-card reveal-element reveal-delay-3">
              <div className="why-icon-box">
                <Layers size={20} />
              </div>
              <h3 className="why-title">Scalable Architecture</h3>
              <p className="why-desc">All system configurations are designed for modular scaling to handle exponential future request volumes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Digital Transformation Process */}
      <section id="process">
        <div className="container">
          <div className="section-intro reveal-element">
            <span className="badge">Transformation Map</span>
            <h2>From Strategy To Scale</h2>
            <p>We leverage a structured integration framework to guarantee high-performance project success with zero workflow disruptions.</p>
          </div>

          <div className="process-timeline reveal-element">
            <div className="process-step">
              <div className="step-number">01</div>
              <h3 className="step-title">Discover</h3>
              <p className="step-desc">Thorough auditing of current data silos, business bottlenecks, and core processes.</p>
            </div>

            <div className="process-step">
              <div className="step-number">02</div>
              <h3 className="step-title">Design</h3>
              <p className="step-desc">Creating scalable technology architectures and API-first transition blueprints.</p>
            </div>

            <div className="process-step">
              <div className="step-number">03</div>
              <h3 className="step-title">Build</h3>
              <p className="step-desc">Engineering stable digital integrations and deploying specialized AI models.</p>
            </div>

            <div className="process-step">
              <div className="step-number">04</div>
              <h3 className="step-title">Optimize</h3>
              <p className="step-desc">Refining performance metrics, testing latency thresholds, and training teams.</p>
            </div>

            <div className="process-step">
              <div className="step-number">05</div>
              <h3 className="step-title">Scale</h3>
              <p className="step-desc">Handing over unified systems and providing ongoing infrastructure maintenance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Featured Case Studies */}
      <section id="case-studies" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container">
          <div className="section-intro reveal-element">
            <span className="badge">Enterprise Proof</span>
            <h2>Real Business Impact</h2>
            <p>Read about the structural operational results delivered to our key global enterprise partners.</p>
          </div>

          <div className="cases-grid">
            <div className="case-card reveal-element">
              <div className="case-image-wrapper">
                <div className="case-image-inner">
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--secondary-text)' }}>Telemetry Dashboard</span>
                  <div className="case-metric-box">
                    <span className="case-metric-value">35%</span>
                    <span className="case-metric-label">Operational Delay Reduction</span>
                  </div>
                </div>
              </div>
              <div className="case-info">
                <span className="case-category">Logistics Industry</span>
                <h3 className="case-title">Fleet Dispatch Automation</h3>
                <p className="case-desc">We integrated real-time GPS telemetry and weather API models directly into a logistics partner's SAP router, automating scheduling loops.</p>
              </div>
            </div>

            <div className="case-card reveal-element reveal-delay-1">
              <div className="case-image-wrapper">
                <div className="case-image-inner">
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--secondary-text)' }}>Assembly Audit Logs</span>
                  <div className="case-metric-box">
                    <span className="case-metric-value">40%</span>
                    <span className="case-metric-label">Efficiency Increase</span>
                  </div>
                </div>
              </div>
              <div className="case-info">
                <span className="case-category">Manufacturing Industry</span>
                <h3 className="case-title">Predictive Maintenance Pipeline</h3>
                <p className="case-desc">Deployed Edge AI agents onto assembly line machinery sensors to predict part failure risks, triggering automatic SAP parts reordering.</p>
              </div>
            </div>

            <div className="case-card reveal-element reveal-delay-2">
              <div className="case-image-wrapper">
                <div className="case-image-inner">
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--secondary-text)' }}>Demand Analysis Model</span>
                  <div className="case-metric-box">
                    <span className="case-metric-value">25%</span>
                    <span className="case-metric-label">Forecasting Accuracy Lift</span>
                  </div>
                </div>
              </div>
              <div className="case-info">
                <span className="case-category">Retail Industry</span>
                <h3 className="case-title">Neural Inventory Orchestration</h3>
                <p className="case-desc">Connected multi-channel retail transaction histories to a custom neural network, predicting regional stock demands to minimize warehouse wastes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: AI Readiness Assessment (UNIQUE INTERACTIVE COMPONENT) */}
      <section id="readiness">
        <div className="container">
          <div className="section-intro reveal-element">
            <span className="badge">Interactive Evaluator</span>
            <h2>Is Your Business Ready For AI?</h2>
            <p>Answer a few practical questions regarding your business infrastructure and immediately retrieve a customized technology roadmap.</p>
          </div>

          <div className="assessment-container reveal-element">
            {assessmentStep === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <Cpu size={48} color="var(--accent)" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Initiate Infrastructure Evaluation</h3>
                <p style={{ maxWidth: '32rem', margin: '0 auto 2.5rem auto' }}>
                  Analyze how automation, connected telemetry, and unified database layers can reduce your operational friction. Takes 60 seconds.
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
              <div className="assessment-result-dashboard">
                <div className="dashboard-radial-metrics">
                  <div className="score-radial">
                    <svg className="score-circle-svg" width="160" height="160">
                      <circle className="score-circle-bg" cx="80" cy="80" r="70" />
                      <circle 
                        className="score-circle-fill" 
                        cx="80" 
                        cy="80" 
                        r="70" 
                        strokeDasharray="440"
                        strokeDashoffset={strokeDashoffset}
                      />
                    </svg>
                    <div className="score-text-overlay">
                      <span className="score-percentage">{radialScore}%</span>
                      <span className="score-label">Readiness</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'left' }}>
                    <h3 className="assessment-tier">
                      {radialScore <= 45 ? "AI Explorer Tier" : radialScore <= 75 ? "AI Accelerator Tier" : "AI Leader Tier"}
                    </h3>
                    <p className="assessment-tier-desc">
                      {radialScore <= 45 ? 
                        "Your enterprise is at the early research phase. Focus on connecting isolated databases and deploying pilot RPA bots." : 
                        radialScore <= 75 ? 
                        "You have established core databases. Focus on automating cross-system actions and integrating live API telemetry loops." : 
                        "Your enterprise is highly integrated. You are ready to deploy predictive neural intelligence models and cognitive agents."
                      }
                    </p>
                  </div>
                </div>

                <div className="assessment-recommendations">
                  <h4 className="recommendations-title">Recommended Transformation Roadmap</h4>
                  <div className="recommendation-list">
                    <div className="recommendation-item">
                      <CheckCircle2 size={16} className="recommendation-bullet" />
                      <div>
                        <strong>Phase 1: Database Connector setup.</strong> Integrate your core CSV/CRM exports into a unified digital database to enable real-time queries.
                      </div>
                    </div>
                    <div className="recommendation-item">
                      <CheckCircle2 size={16} className="recommendation-bullet" />
                      <div>
                        <strong>Phase 2: Workflow Automation.</strong> Replace recurring manual task allocations with event-driven software agents to bypass team delays.
                      </div>
                    </div>
                    <div className="recommendation-item">
                      <CheckCircle2 size={16} className="recommendation-bullet" />
                      <div>
                        <strong>Phase 3: Consultation Review.</strong> Meet with an AxionSphere analyst to outline a customized architecture plan.
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <a href="#booking" className="btn btn-primary" onClick={() => setAssessmentStep(0)}>Book Architecture Review</a>
                  <button className="btn btn-secondary" onClick={handleAssessmentReset}>Reset Evaluator</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section 10: Interactive Booking & Demos (Consultation & Demo requests) */}
      <section id="booking" style={{ padding: 0 }}>
        <div className="booking-section-wrapper">
          {/* Consultation Form Panel */}
          <div className="booking-panel reveal-element">
            <span className="badge" style={{ alignSelf: 'flex-start' }}>Advisory Call</span>
            <h2 style={{ textAlign: 'left', marginBottom: '1rem' }}>Let's Solve Your Next Business Challenge</h2>
            <p style={{ marginBottom: '2.5rem', fontSize: '1.05rem' }}>
              Schedule a 30-minute architecture workshop with our senior consulting partners. No sales pitches, just pure strategy design.
            </p>

            {consultationSubmitted ? (
              <div className="form-success-overlay">
                <div className="success-icon-box">
                  <Check size={28} />
                </div>
                <h3>Consultation Scheduled Successfully</h3>
                <p>A calendar invitation and strategy agenda has been sent to your business email. We look forward to talking.</p>
              </div>
            ) : (
              <form className="booking-form" onSubmit={handleConsultationSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="consult-name">Full Name</label>
                  <input 
                    type="text" 
                    id="consult-name" 
                    className="form-input" 
                    required 
                    placeholder="Jane Doe"
                    value={consultationForm.name}
                    onChange={(e) => setConsultationForm({ ...consultationForm, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="consult-email">Work Email</label>
                  <input 
                    type="email" 
                    id="consult-email" 
                    className="form-input" 
                    required 
                    placeholder="jane@company.com"
                    value={consultationForm.email}
                    onChange={(e) => setConsultationForm({ ...consultationForm, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="consult-company">Company Name</label>
                  <input 
                    type="text" 
                    id="consult-company" 
                    className="form-input" 
                    required 
                    placeholder="Enterprise Corp"
                    value={consultationForm.company}
                    onChange={(e) => setConsultationForm({ ...consultationForm, company: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="consult-challenge">Primary Focus</label>
                  <select 
                    id="consult-challenge" 
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
                <button type="submit" className="btn btn-primary" disabled={consultationLoading} style={{ marginTop: '0.75rem' }}>
                  {consultationLoading ? "Securing Timeslots..." : "Schedule Strategy Session"}
                </button>
              </form>
            )}
          </div>

          {/* Product Demo Request Panel */}
          <div className="booking-panel-cta reveal-element" id="demo">
            <span className="badge">System Demo</span>
            <h2 style={{ textAlign: 'left', marginBottom: '1rem' }}>See Intelligent Transformation In Action</h2>
            <p style={{ marginBottom: '2.5rem', fontSize: '1.05rem', color: 'var(--secondary-text)' }}>
              Request a live interactive demonstration showcasing our SAP database sync connectors, IoT device streams, and workflow automation interfaces.
            </p>

            {demoSubmitted ? (
              <div className="form-success-overlay" style={{ background: 'var(--surface)', borderRadius: '12px', width: '100%', maxWidth: '28rem', border: '1px solid var(--borders)' }}>
                <div className="success-icon-box">
                  <Check size={28} />
                </div>
                <h3>System Demo Access Approved</h3>
                <p>We've dispatched your digital dashboard environment credentials and an onboarding walkthrough link to your email.</p>
              </div>
            ) : (
              <form className="booking-form" onSubmit={handleDemoSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="demo-name">Full Name</label>
                  <input 
                    type="text" 
                    id="demo-name" 
                    className="form-input" 
                    required 
                    placeholder="John Doe"
                    value={demoForm.name}
                    onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="demo-email">Work Email</label>
                  <input 
                    type="email" 
                    id="demo-email" 
                    className="form-input" 
                    required 
                    placeholder="john@company.com"
                    value={demoForm.email}
                    onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="demo-industry">Your Sector</label>
                  <select 
                    id="demo-industry" 
                    className="form-input form-select"
                    value={demoForm.industry}
                    onChange={(e) => setDemoForm({ ...demoForm, industry: e.target.value })}
                  >
                    <option value="Automobile">Automobile</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Consumer Goods">Consumer Goods</option>
                    <option value="Pharmaceutical">Pharmaceutical</option>
                    <option value="Wealth Management">Wealth Management</option>
                    <option value="Dairy">Dairy</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="demo-size">Enterprise Size</label>
                  <select 
                    id="demo-size" 
                    className="form-input form-select"
                    value={demoForm.size}
                    onChange={(e) => setDemoForm({ ...demoForm, size: e.target.value })}
                  >
                    <option value="1-50">1 - 50 Employees</option>
                    <option value="50-100">51 - 100 Employees</option>
                    <option value="100-500">101 - 500 Employees</option>
                    <option value="500+">500+ Employees</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-secondary" disabled={demoLoading} style={{ marginTop: '0.75rem' }}>
                  {demoLoading ? "Authorizing Dashboard..." : "Request Live Demo"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Section 11: Final CTA */}
      <section className="final-cta-section" id="final-cta">
        <div className="container final-cta-content reveal-element">
          <span className="badge"><Award size={14} /> Ready to Transform</span>
          <h2 className="final-cta-headline text-gradient">Build The Future Of Your Business</h2>
          <p className="final-cta-supporting">
            Transform fragmented data into actionable decisions. Automate repetitive operations. Accelerate engineering innovation.
          </p>
          <div className="final-cta-buttons">
            <a href="#booking" className="btn btn-primary">Book Consultation</a>
            <a href="#demo" className="btn btn-secondary">Request Demo</a>
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
                <li><a href="#booking" className="footer-link">Contact Advisory</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="copyright">
              © {new Date().getFullYear()} AxionSphere. All Rights Reserved. Designed to premium enterprise standards.
            </div>
            
            <div className="social-links">
              <a href="#" className="social-link" aria-label="AxionSphere LinkedIn">
                <Users size={16} />
              </a>
              <a href="#" className="social-link" aria-label="AxionSphere Twitter">
                <Globe size={16} />
              </a>
              <a href="#" className="social-link" aria-label="AxionSphere GitHub">
                <Cpu size={16} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
