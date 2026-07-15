/**
 * context/AuthContext.jsx
 * Menyediakan state autentikasi global (user yang login, status loading,
 * fungsi login/register/logout dsb) ke seluruh aplikasi lewat Context API.
 */

import { createContext, useState, useEffect, useCallback } from 'react'
import { authService } from '../services/authService'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true) // loading saat cek auto-login

  // Auto-login: cek apakah ada session aktif tersimpan di LocalStorage
  useEffect(() => {
    const loggedInUser = authService.getLoggedInUser()
    setCurrentUser(loggedInUser)
    setIsLoading(false)
  }, [])

  const login = useCallback(({ email, password, rememberMe }) => {
    const { user } = authService.login({ email, password, rememberMe })
    setCurrentUser(user)
    return user
  }, [])

  const register = useCallback(({ name, email, password }) => {
    return authService.register({ name, email, password })
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setCurrentUser(null)
  }, [])

  const refreshCurrentUser = useCallback(() => {
    const loggedInUser = authService.getLoggedInUser()
    setCurrentUser(loggedInUser)
  }, [])

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isLoading,
    login,
    register,
    logout,
    refreshCurrentUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
