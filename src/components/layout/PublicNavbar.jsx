import { useState, useEffect } from 'react'
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

const darkHeroPages = ['/services', '/contact', '/about']

export default function PublicNavbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  const isHome = pathname === '/'
  const hasDarkHero = darkHeroPages.includes(pathname)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // On homepage: transparent with light text before scrolling
  // On dark hero pages (services, contact): dark background
  // When scrolled: white bg with dark text
  const isTransparent = isHome && !scrolled
  const hasDarkBackground = hasDarkHero && !scrolled

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_8px_24px_rgba(99,102,241,0.06)]'
        : isHome
          ? 'bg-gradient-to-b from-black/40 via-black/15 to-transparent backdrop-blur-[2px]'
          : hasDarkHero
            ? 'bg-slate-900/90 backdrop-blur-xl'
            : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 no-underline group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all duration-300">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 ${hasDarkBackground || isTransparent ? 'border-transparent' : 'border-white'}`} />
            </div>
            <div className="flex flex-col">
              <span className={`text-base font-bold tracking-tight transition-colors duration-500 ${hasDarkBackground ? 'text-white' : 'text-slate-900'}`}>NeuroClinic</span>
              <span className={`text-[10px] font-medium tracking-wide uppercase transition-colors duration-500 ${hasDarkBackground ? 'text-white/60' : 'text-slate-400'}`}>Dr. Abir Bouthouri</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className={`hidden md:flex items-center gap-1 backdrop-blur-sm rounded-full px-1.5 py-1 border transition-all duration-500 ${
            hasDarkBackground
              ? 'bg-white/10 border-white/15'
              : isTransparent
                ? 'bg-white/10 border-white/15'
                : 'bg-slate-100/80 border-slate-200/60'
          }`}>
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 no-underline relative ${
                  pathname === link.to
                    ? hasDarkBackground
                      ? 'text-white bg-white/20 shadow-sm'
                      : isTransparent
                        ? 'text-white bg-white/20 shadow-sm'
                        : 'text-indigo-700 bg-white shadow-sm shadow-indigo-100'
                    : hasDarkBackground
                      ? 'text-white/70 hover:text-white hover:bg-white/10'
                      : isTransparent
                        ? 'text-white/70 hover:text-white hover:bg-white/10'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/dashboard" className="no-underline">
              <Button variant="ghost" size="sm" className={`transition-colors duration-500 ${hasDarkBackground || isTransparent ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-indigo-600'}`}>
                Espace Medecin
              </Button>
            </Link>
            <PulsingCTA delay={3000} interval={1000}>
              <Link to="/book" className="no-underline">
                <Button size="sm" className={`shadow-lg hover:-translate-y-0.5 transition-all border-0 ${
                  hasDarkBackground || isTransparent
                    ? 'bg-white text-indigo-700 shadow-black/15 hover:bg-indigo-50'
                    : 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40'
                }`}>
                  Prendre RDV
                </Button>
              </Link>
            </PulsingCTA>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className={`md:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${
              hasDarkBackground || isTransparent
                ? 'text-white hover:bg-white/10'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-400 ${
        open ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white/95 backdrop-blur-xl border-t border-slate-100 px-6 py-4 space-y-1 shadow-xl shadow-slate-200/50">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium no-underline transition-all ${
                pathname === link.to
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {link.label}
              <ChevronRight className={`w-4 h-4 ${pathname === link.to ? 'text-indigo-400' : 'text-slate-300'}`} />
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 mt-2">
            <PulsingCTA delay={5000} interval={5000}>
              <Link to="/book" onClick={() => setOpen(false)} className="no-underline">
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white border-0 shadow-lg shadow-indigo-500/20">
                  Prendre RDV
                </Button>
              </Link>
            </PulsingCTA>
          </div>
        </div>
      </div>
    </nav>
  )
}
