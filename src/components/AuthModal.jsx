import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function AuthModal({ onClose }) {
  const { login, signup, authError, setAuthError } = useAuth()
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const switchMode = (m) => {
    setMode(m)
    setAuthError('')
    setEmail('')
    setPassword('')
    setUsername('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (mode === 'login') {
      const ok = login(email, password)
      if (ok) onClose()
    } else {
      if (!username.trim()) { setAuthError('Username is required.'); return }
      const ok = signup(username.trim(), email, password)
      if (ok) onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="auth-header">
          <div className="auth-logo">🎵</div>
          <h2 className="auth-title">
            {mode === 'login' ? 'Welcome back' : 'Join Muse'}
          </h2>
          <p className="auth-sub">
            {mode === 'login'
              ? 'Sign in to access your library & playlists'
              : 'Create an account to save music your way'}
          </p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => switchMode('login')}
          >
            Log In
          </button>
          <button
            className={`auth-tab ${mode === 'signup' ? 'active' : ''}`}
            onClick={() => switchMode('signup')}
          >
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="auth-field">
              <label>Username</label>
              <input
                type="text"
                placeholder="Your display name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {authError && <p className="auth-error">{authError}</p>}

          <button type="submit" className="auth-submit">
            {mode === 'login' ? 'Log In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )
}
export default AuthModal