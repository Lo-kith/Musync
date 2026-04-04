import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Header({ onLoginClick, onLibraryClick }) {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-icon"></span>
          <span className="logo-text">
            Musync
          </span>
        </div>
        <p className="subtitle">Search, play, and explore </p>
      </div>

      <div className="header-right">
        {user && (
          <button className="library-btn" onClick={onLibraryClick} title="Your Library">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            Library
          </button>
        )}

        {user ? (
          <div className="user-menu-wrap" ref={menuRef}>
            <button className="user-avatar-btn" onClick={() => setMenuOpen(!menuOpen)}>
              <span className="avatar-circle">{user.username[0].toUpperCase()}</span>
              <span className="user-name-label">{user.username}</span>
              <span className="chevron-down">▾</span>
            </button>
            {menuOpen && (
              <div className="user-dropdown">
                <div className="dropdown-email">{user.email}</div>
                <button
                  className="dropdown-item"
                  onClick={() => { onLibraryClick(); setMenuOpen(false) }}
                >
                  My Library
                </button>
                <div className="dropdown-divider" />
                <button
                  className="dropdown-item danger"
                  onClick={() => { logout(); setMenuOpen(false) }}
                >
                  ⇥ Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="login-btn" onClick={onLoginClick}>
            Log In
          </button>
        )}
      </div>
    </header>
  )
}