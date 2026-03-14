import { useState, useEffect } from 'react'
import { Brain } from 'lucide-react'

export default function SitePreloader({ isLoading }) {
  const [fadeOut, setFadeOut] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      // Start fade-out
      setFadeOut(true)
      // Remove from DOM after animation
      const timer = setTimeout(() => setHidden(true), 800)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  if (hidden) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 transition-opacity duration-700 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/15 rounded-full blur-[120px]" />

      {/* Logo + Spinner */}
      <div className="relative mb-8">
        {/* Spinning ring */}
        <div className="preloader-ring" />
        {/* Logo icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30">
            <Brain className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Brand text */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-white tracking-tight mb-1">
          NeuroClinic
        </h2>
        <p className="text-sm text-indigo-300/60 font-medium">
          Dr. Abir Bouthouri
        </p>
      </div>

      {/* Loading bar */}
      <div className="mt-8 w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
        <div className="preloader-bar" />
      </div>
    </div>
  )
}
