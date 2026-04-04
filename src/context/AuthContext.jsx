import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // { username, email }
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('muse_session')
    if (saved) setUser(JSON.parse(saved))
  }, [])

  const getUsersDb = () => {
    const db = localStorage.getItem('muse_users')
    return db ? JSON.parse(db) : {}
  }

  const saveUsersDb = (db) => {
    localStorage.setItem('muse_users', JSON.stringify(db))
  }

  const signup = (username, email, password) => {
    const db = getUsersDb()
    if (db[email]) {
      setAuthError('Account already exists with this email.')
      return false
    }
    db[email] = { username, email, password, data: { favorites: [], playlists: [] } }
    saveUsersDb(db)
    const session = { username, email }
    setUser(session)
    localStorage.setItem('muse_session', JSON.stringify(session))
    setAuthError('')
    return true
  }

  const login = (email, password) => {
    const db = getUsersDb()
    const account = db[email]
    if (!account || account.password !== password) {
      setAuthError('Invalid email or password.')
      return false
    }
    const session = { username: account.username, email }
    setUser(session)
    localStorage.setItem('muse_session', JSON.stringify(session))
    setAuthError('')
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('muse_session')
  }

  // Read/write user-specific data
  const getUserData = () => {
    if (!user) return { favorites: [], playlists: [] }
    const db = getUsersDb()
    return db[user.email]?.data || { favorites: [], playlists: [] }
  }

  const saveUserData = (data) => {
    if (!user) return
    const db = getUsersDb()
    if (db[user.email]) {
      db[user.email].data = data
      saveUsersDb(db)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, authError, setAuthError, getUserData, saveUserData }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}