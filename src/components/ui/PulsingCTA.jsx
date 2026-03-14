import { useState, useEffect } from 'react'

export default function PulsingCTA({ children, delay = 0, interval = 0 }) {
  const [isVibrating, setIsVibrating] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsVibrating(true)
    }, delay)

    const vibrateInterval = setInterval(() => {
      setIsVibrating(true)
      setTimeout(() => setIsVibrating(false), 0)
    }, delay + interval)

    return () => {
      clearTimeout(startTimer)
      clearInterval(vibrateInterval)
    }
  }, [delay, interval])

  return (
    <span className={`inline-flex rounded-xl ${isVibrating ? 'animate-vibrate' : ''}`}>
      <span className={`rounded-xl ${isVibrating ? 'animate-glow-pulse' : 'glow-cta'}`}>
        {children}
      </span>
    </span>
  )
}
