'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Question {
  id: number
  text: string
  level: number
}

interface Result {
  level: number
  title: string
  description: string
  riskProfile: string
  color: string
  recommendations: string[]
}

const questions: Question[] = [
  // Level 1: Unaware
  { id: 1, text: "Can your board name the AI systems currently in use across the organization?", level: 1 },
  { id: 2, text: "Has AI governance been discussed at the board level in the past 12 months?", level: 1 },
  { id: 3, text: "Are employees using AI tools (ChatGPT, Copilot, etc.) without IT or governance oversight?", level: 1 },
  
  // Level 2: Reactive
  { id: 4, text: "Do you have a documented AI incident response process?", level: 2 },
  { id: 5, text: "Has your organization experienced an AI-related issue that required management intervention?", level: 2 },
  { id: 6, text: "Is there a designated individual or team accountable for AI governance?", level: 2 },
  
  // Level 3: Compliant
  { id: 7, text: "Do you maintain an AI inventory with EU AI Act risk classification?", level: 3 },
  { id: 8, text: "Have your high-risk AI systems undergone conformity assessment?", level: 3 },
  { id: 9, text: "Do you have an AI Acceptable Use Policy communicated to employees?", level: 3 },
  
  // Level 4: Governed
  { id: 10, text: "Does AI risk appear in your enterprise risk register with regular board reporting?", level: 4 },
  { id: 11, text: "Do you conduct regular AI risk assessments and vendor due diligence?", level: 4 },
  { id: 12, text: "Is there board-level AI literacy training or education?", level: 4 },
  
  // Level 5: Strategic
  { id: 13, text: "Does your board discuss AI as a strategic opportunity, not just a risk?", level: 5 },
  { id: 14, text: "Do you have AI ethics review processes for new initiatives?", level: 5 },
  { id: 15, text: "Is AI governance integrated into your innovation and digital strategy?", level: 5 },
]

const results: Record<number, Result> = {
  1: {
    level: 1,
    title: "Unaware",
    description: "Your organization has not yet begun systematic AI governance. AI systems are in use but visibility is limited, and the board has not established governance frameworks.",
    riskProfile: "Critical",
    color: "#DC2626",
    recommendations: [
      "Conduct an AI inventory audit to discover shadow AI",
      "Schedule first board discussion on AI governance",
      "Identify an executive sponsor for AI governance initiative",
      "Review EU AI Act applicability to your organization",
    ],
  },
  2: {
    level: 2,
    title: "Reactive",
    description: "AI governance is ad-hoc. Incidents trigger responses, but there is no systematic framework. Some accountability exists but processes are not standardized.",
    riskProfile: "High",
    color: "#EA580C",
    recommendations: [
      "Formalize AI incident response procedures",
      "Create a cross-functional AI governance committee",
      "Develop an AI Acceptable Use Policy",
      "Establish vendor AI assessment criteria",
    ],
  },
  3: {
    level: 3,
    title: "Compliant",
    description: "You have basic AI governance in place. An inventory exists, EU AI Act classifications are documented, and minimum compliance controls are implemented.",
    riskProfile: "Medium",
    color: "#CA8A04",
    recommendations: [
      "Implement regular AI risk reporting to the board",
      "Conduct conformity assessments for high-risk systems",
      "Develop AI vendor management framework",
      "Create board AI literacy program",
    ],
  },
  4: {
    level: 4,
    title: "Governed",
    description: "AI is actively governed with regular board reporting, integrated risk management, and established oversight processes. Your organization meets regulatory requirements.",
    riskProfile: "Low",
    color: "#16A34A",
    recommendations: [
      "Advance board AI literacy and strategic discussion",
      "Implement AI ethics review processes",
      "Develop AI innovation governance framework",
      "Establish AI performance monitoring",
    ],
  },
  5: {
    level: 5,
    title: "Strategic",
    description: "AI governance is mature and strategic. The board views AI as a competitive advantage, ethics are proactive, and innovation is balanced with risk management.",
    riskProfile: "Optimized",
    color: "#059669",
    recommendations: [
      "Share best practices with industry peers",
      "Consider AI governance advisory services",
      "Mentor organizations at lower maturity levels",
      "Continuously evolve governance with technology",
    ],
  },
}

export default function AIAssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, boolean>>({})
  const [showResult, setShowResult] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleAnswer = (yes: boolean) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: yes })
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const calculateLevel = (): number => {
    const levelScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    const levelCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    
    questions.forEach(q => {
      levelCounts[q.level]++
      if (answers[q.id]) {
        levelScores[q.level]++
      }
    })
    
    // Find highest level where majority is answered yes
    let achievedLevel = 1
    for (let level = 5; level >= 1; level--) {
      const ratio = levelScores[level] / levelCounts[level]
      if (ratio >= 0.5) {
        achievedLevel = level
        break
      }
    }
    
    return achievedLevel
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send to your email service
    setSubmitted(true)
  }

  const currentLevel = calculateLevel()
  const result = results[currentLevel]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (showResult) {
    return (
      <>
        <nav className="nav-wrapper">
          <div className="nav-inner">
            <Link href="/" className="nav-logo">Arnaud Wiehe</Link>
            <div className="nav-links">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/ai-assessment" className="nav-link">AI Assessment</Link>
            </div>
          </div>
        </nav>

        <main className="assessment-page">
          <div className="assessment-result">
            <div className="result-header" style={{ borderColor: result.color }}>
              <span className="result-level" style={{ backgroundColor: result.color }}>
                Level {result.level}: {result.title}
              </span>
              <h1>Your AI Governance Maturity</h1>
            </div>

            <div className="result-content">
              <div className="result-description">
                <p>{result.description}</p>
                <div className="risk-badge" style={{ color: result.color, borderColor: result.color }}>
                  Risk Profile: {result.riskProfile}
                </div>
              </div>

              <div className="recommendations">
                <h2>Priority Recommendations</h2>
                <ul>
                  {result.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>

              {!submitted ? (
                <div className="email-capture">
                  <h3>Get Your Full Report</h3>
                  <p>Receive a detailed assessment report with action steps and resources.</p>
                  <form onSubmit={handleEmailSubmit} className="email-form">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="email-input"
                    />
                    <button type="submit" className="btn-primary">
                      Get My Report
                    </button>
                  </form>
                </div>
              ) : (
                <div className="thank-you">
                  <h3>Thank You!</h3>
                  <p>Your detailed report has been sent to {email}.</p>
                  <Link href="/articles" className="btn-ghost">
                    Read Related Articles
                  </Link>
                </div>
              )}
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <nav className="nav-wrapper">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">Arnaud Wiehe</Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/ai-assessment" className="nav-link">AI Assessment</Link>
          </div>
        </div>
      </nav>

      <main className="assessment-page">
        <div className="assessment-container">
          <header className="assessment-header">
            <h1>Board AI Readiness Assessment</h1>
            <p>Discover your organization's AI governance maturity level</p>
          </header>

          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="question-card">
            <span className="question-number">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <h2>{questions[currentQuestion].text}</h2>
            
            <div className="answer-buttons">
              <button 
                onClick={() => handleAnswer(true)}
                className="btn-yes"
              >
                Yes
              </button>
              <button 
                onClick={() => handleAnswer(false)}
                className="btn-no"
              >
                No / Not Sure
              </button>
            </div>
          </div>

          <div className="level-indicators">
            {[1, 2, 3, 4, 5].map((level) => (
              <div 
                key={level}
                className={`level-dot ${level <= Math.ceil((currentQuestion + 1) / 3) ? 'active' : ''}`}
              >
                {level}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
