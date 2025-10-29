import { createContext, useContext, useEffect, useState } from 'react'
import { apiFetch } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function fetchMe() {
    try {
      setLoading(true)
      const resp = await apiFetch('/me')
      if (resp.ok) {
        const data = await resp.json()
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (e) {
      setError(e.message)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  async function login({ email, password }) {
    const resp = await apiFetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if (!resp.ok) throw new Error('Login failed')
    await fetchMe()
  }

  async function register({ email, password, firstName, lastName, role }) {
    const resp = await apiFetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, firstName, lastName, role })
    })
    if (!resp.ok) throw new Error('Register failed')
    await fetchMe()
  }

  async function logout() {
    await apiFetch('/logout')
    setUser(null)
  }

  useEffect(() => { fetchMe() }, [])

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, refresh: fetchMe }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() { return useContext(AuthContext) }
