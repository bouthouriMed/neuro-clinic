import { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const userData = await authApi.getUser()
      setUser(userData)
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const data = await authApi.login({ email, password })
    setUser(data.user)
    return data
  }

  const register = async (userData) => {
    const data = await authApi.register(userData)
    return data
  }

  const loginWithGoogle = () => {
    window.open(`${import.meta.env.VITE_API_URL}/api/auth/google`, '_self')
  }

  const loginWithFacebook = () => {
    window.open(`${import.meta.env.VITE_API_URL}/api/auth/facebook`, '_self')
  }

  const loginWithInstagram = () => {
    window.open(`${import.meta.env.VITE_API_URL}/api/auth/instagram`, '_self')
  }

  const logout = async () => {
    try {
      await authApi.logout()
      setUser(null)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      login,
      register, 
      loginWithGoogle, 
      loginWithFacebook, 
      loginWithInstagram,
      logout,
      setUser,
      checkAuth
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
