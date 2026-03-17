import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Brain, ChevronRight } from 'lucide-react'
import Button from '../ui/Button'
import PulsingCTA from '../ui/PulsingCTA'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/about', label: 'A propos' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

export default function PublicNavbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { pathname } = useLocation()
  const menuRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && open) {
        setOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [open])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  const closeMenu = () => setOpen(false)

  const isAboutPage = pathname === '/about'

  return (

    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isMobile 
        ? 'bg-gradient-to-b from-black/60 via-black/40 to-black/20 backdrop-blur-xl border-b border-white/10'
        : scrolled 
          ? 'bg-white/95 backdrop-blur-2xl shadow-[0_2px_20px_rgba(0,0,0,0.08),0_8px_30px_rgba(99,102,241,0.08)] border-b border-slate-200/50'
          : 'bg-gradient-to-b from-black/60 via-black/40 to-black/20 backdrop-blur-xl border-b border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
              {/* Premium Crystal Logo */}
              <Link to="/" className="flex items-center gap-2 sm:gap-3 no-underline group">
                <div className="relative">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-400 via-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-400/50 group-hover:scale-105 transition-all duration-300">
                    <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  {/* Crystal shine effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
                  {/* Diamond sparkle */}
                  <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-white/90 rounded-sm rotate-45 shadow-lg" 
                    style={{ boxShadow: '0 0 8px rgba(255,255,255,0.8)' }}
                  />
                </div>
                <div className="flex flex-col">
                  <span className={`text-sm sm:text-base font-bold tracking-tight transition-colors ${isMobile ? 'text-white' : (scrolled ? 'text-slate-900' : 'text-white')}`}>NeuroClinic</span>
                  <span className={`text-[8px] sm:text-[10px] font-medium tracking-wide uppercase transition-colors ${isMobile ? 'text-white/70' : (scrolled ? 'text-slate-400' : 'text-white/70')}`}>Dr. Abir Bouthouri</span>
                </div>
              </Link>

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center gap-1 rounded-2xl px-2 py-1.5 border transition-all duration-500 ${
            scrolled
              ? 'bg-slate-50/80 border-slate-200/40 shadow-sm'
              : 'bg-black/20 border-white/10'
          }`}>
            {links.map((link) => (
              <Link key={link.to} to={link.to}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 no-underline ${
                  pathname === link.to
                    ? scrolled
                      ? 'text-indigo-600 bg-white shadow-md shadow-indigo-100'
                      : 'text-white bg-white/15 shadow-lg shadow-black/10'
                    : scrolled
                      ? 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/dashboard" className="no-underline">
              <Button variant="ghost" size="sm" className={scrolled ? 'text-slate-500 hover:text-indigo-600' : 'text-white/70 hover:text-white hover:bg-white/10'}>
                Espace Medecin
              </Button>
            </Link>
            <PulsingCTA delay={3000} interval={1000}>
              <Link to="/book" className="no-underline">
                <Button size="sm" className={`shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all border-0 ${
                  scrolled
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-indigo-500/25'
                    : 'bg-white text-indigo-700 shadow-white/20 hover:bg-indigo-50'
                }`}>
                  Prendre RDV
                </Button>
              </Link>
            </PulsingCTA>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-colors text-white hover:bg-white/10">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 z-40">
          {/* Backdrop - click to close */}
          <button
            className="absolute inset-0 w-full h-full bg-slate-900/60 backdrop-blur-sm cursor-pointer"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          />
          
          {/* Menu Content - Green for About, Dark for others */}
          <div ref={menuRef} className="absolute left-3 right-3 top-16 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="relative overflow-hidden rounded-2xl"
              style={{
                background: isAboutPage
                  ? 'linear-gradient(180deg, rgba(6,78,59,0.95) 0%, rgba(6,78,59,0.92) 100%)'
                  : 'linear-gradient(180deg, rgba(30,41,59,0.95) 0%, rgba(15,23,42,0.92) 100%)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                border: isAboutPage 
                  ? '1px solid rgba(255,255,255,0.15)'
                  : '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <div className="relative p-3 space-y-2">
                {/* Logo Header */}
                <div className="flex items-center justify-center gap-2 pb-3 border-b"
                  style={{ borderColor: isAboutPage ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)' }}>
                  {/* Premium Crystal Logo */}
                  <div className="relative">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-lg ${
                      isAboutPage 
                        ? 'bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700' 
                        : 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-600'
                    }`}>
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    {/* Crystal shine */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
                    {/* Diamond sparkle */}
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-white/90 rounded-sm rotate-45 shadow-lg" 
                      style={{ boxShadow: '0 0 8px rgba(255,255,255,0.8)' }}
                    />
                  </div>
                  <div className="text-center">
                    <span className={`block text-sm font-bold ${isAboutPage ? 'text-white' : 'text-white'}`}>NeuroClinic</span>
                    <span className={`text-[10px] ${isAboutPage ? 'text-white/70' : 'text-white/70'}`}>Dr. Abir Bouthouri</span>
                  </div>
                </div>

                {/* Navigation Links - High contrast */}
                <div className="space-y-1 pt-2">
                  {links.map((link, index) => (
                    <Link key={link.to} to={link.to} onClick={() => setOpen(false)}
                      className="flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm no-underline transition-all duration-300"
                      style={{ 
                        animationDelay: `${index * 60}ms`,
                        background: pathname === link.to 
                          ? isAboutPage 
                            ? 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.15) 100%)'
                            : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'
                          : (isAboutPage ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)'),
                        color: pathname === link.to ? '#fff' : (isAboutPage ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.7)'),
                        boxShadow: pathname === link.to 
                          ? isAboutPage 
                            ? '0 8px 32px rgba(255,255,255,0.2)' 
                            : '0 8px 32px rgba(79,70,229,0.4)'
                          : 'none',
                        border: isAboutPage ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.05)'
                      }}>
                      <span className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                          pathname === link.to 
                            ? 'bg-white/20' 
                            : (isAboutPage ? 'bg-white/15' : 'bg-white/10')
                        }`}>
                          {pathname === link.to ? (
                            <ChevronRight className="w-3 h-3" />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                          )}
                        </span>
                        {link.label}
                      </span>
                      {pathname === link.to && (
                        <ChevronRight className="w-3 h-3" />
                      )}
                    </Link>
                  ))}
                </div>

                {/* Divider */}
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" style={{ borderColor: isAboutPage ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)' }} />
                  </div>
                  <div className="relative flex justify-center">
                    <span className={`px-3 text-[10px] font-medium uppercase tracking-widest ${
                      isAboutPage 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-slate-800 text-white/40'
                    }`}>
                      Actions
                    </span>
                  </div>
                </div>

                {/* Doctor Login */}
                <Link to="/dashboard" onClick={() => setOpen(false)} 
                  className="flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-sm no-underline transition-all duration-300"
                  style={{ 
                    background: isAboutPage ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)',
                    color: isAboutPage ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.7)',
                    border: isAboutPage ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255,255,255,0.05)'
                  }}>
                  <span className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center ${isAboutPage ? 'bg-white/15' : 'bg-white/10'}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                    </span>
                    Espace Médecin
                  </span>
                  <ChevronRight className="w-3 h-3 opacity-40" />
                </Link>

                {/* Book Appointment CTA */}
                <Link to="/book" onClick={() => setOpen(false)} className="no-underline block pt-1">
                  <div className="relative overflow-hidden rounded-xl">
                    <div className={`absolute inset-0 rounded-xl ${
                      isAboutPage 
                        ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500' 
                        : 'bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500'
                    }`}
                      style={{ animation: 'gradient-shift 3s ease infinite', backgroundSize: '200% 200%' }} />
                    <div className="relative rounded-xl px-4 py-3 font-semibold text-sm flex items-center justify-center gap-2 text-white">
                      <span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                        <ChevronRight className="w-3 h-3" />
                      </span>
                      Prendre Rendez-vous
                    </div>
                  </div>
                </Link>

                {/* Footer */}
                <div className="text-center pt-4">
                  <p className={`text-[10px] ${isAboutPage ? 'text-white/60' : 'text-white/40'}`}>
                    NeuroClinic • Dr. Abir Bouthouri
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
