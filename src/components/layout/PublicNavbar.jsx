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

export default function PublicNavbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_8px_24px_rgba(99,102,241,0.06)]'
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
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-slate-900 tracking-tight">NeuroClinic</span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">Dr. Abir Bouthouri</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/80 backdrop-blur-sm rounded-full px-1.5 py-1 border border-slate-200/60">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 no-underline relative ${
                  pathname === link.to
                    ? 'text-indigo-700 bg-white shadow-sm shadow-indigo-100'
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
              <Button variant="ghost" size="sm" className="text-slate-500 hover:text-indigo-600">
                Espace Medecin
              </Button>
            </Link>
            <PulsingCTA delay={5000} interval={5000}>
              <Link to="/book" className="no-underline">
                <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all border-0">
                  Prendre RDV
                </Button>
              </Link>
            </PulsingCTA>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
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
