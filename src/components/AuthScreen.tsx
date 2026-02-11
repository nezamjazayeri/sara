import { useState } from 'react'

const CORRECT_ANSWERS = ['poop', 'me', 'sara']

export default function AuthScreen({ onSuccess }: { onSuccess: () => void }) {
  const [answer, setAnswer] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (CORRECT_ANSWERS.includes(answer.trim().toLowerCase())) {
      onSuccess()
    } else {
      setShowHint(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className="screen auth-screen">
      <div className={`auth-card ${shake ? 'shake' : ''}`}>
        <div className="auth-icon">🔐</div>
        <h1>Identity Verification Required</h1>
        <p className="auth-subtitle">
          Please answer the following security question to verify your identity.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="auth-label">
            What is Nezam's favorite thing to eat?
          </label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer..."
            className="auth-input"
            autoFocus
          />
          <button type="submit" className="auth-button">
            Verify Identity
          </button>
        </form>

        {showHint && (
          <p className="auth-hint">
            Hint: most people would not consider this a food
          </p>
        )}
      </div>
    </div>
  )
}
