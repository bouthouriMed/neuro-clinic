import { createContext, useState, useCallback, useEffect } from 'react'

export const HeroVideoContext = createContext()

export function HeroVideoProvider({ children }) {
  const [heroVideoLoaded, setHeroVideoLoaded] = useState(() => {
    // Check localStorage on initial load
    try {
      return localStorage.getItem('heroVideoLoaded') === 'true'
    } catch {
      return false
    }
  })

  const markVideoLoaded = useCallback(() => {
    setHeroVideoLoaded(true)
    try {
      localStorage.setItem('heroVideoLoaded', 'true')
    } catch {
      // Silently fail if localStorage is unavailable
    }
  }, [])

  return (
    <HeroVideoContext.Provider value={{ heroVideoLoaded, markVideoLoaded }}>
      {children}
    </HeroVideoContext.Provider>
  )
}

