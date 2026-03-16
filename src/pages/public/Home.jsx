import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Brain,
  Shield,
  Clock,
  Star,
  Activity,
  Phone,
  Calendar,
  CheckCircle,
  Award,
  ChevronLeft,
  ChevronRight,
  Building,
  Sparkles,
  Heart,
  Users,
  Zap,
  BookOpen,
  Move,
  Waves,
  Wind,
  Smile,
} from 'lucide-react'
import Button from '../../components/ui/Button'
import PulsingCTA from '../../components/ui/PulsingCTA'
import HeroVideo from '../../components/ui/HeroVideo'
import SitePreloader from '../../components/ui/SitePreloader'
import { services, testimonials } from '../../data/mockData'
import { HeroVideoContext } from '../../contexts/HeroVideoContext'

// Map icon names to lucide-react components
const iconMap = {
  Brain,
  Zap,
  Activity,
  BookOpen,
  Move,
  Waves,
  Heart,
  Shield,
  Wind,
  Smile,
}

export default function Home() {
  const { heroVideoLoaded, markVideoLoaded } = useContext(HeroVideoContext)

  // Check localStorage directly for immediate value
  const [shouldShowPreloader, setShouldPreloader] = useState(() => {
    try {
      return localStorage.getItem('heroVideoLoaded') !== 'true'
    } catch {
      return true
    }
  })

  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [statsAnimated, setStatsAnimated] = useState(false)
  const [revealedSections, setRevealedSections] = useState({})

  // Update preloader state when context changes
  useEffect(() => {
    if (heroVideoLoaded) {
      setShouldPreloader(false)
    }
  }, [heroVideoLoaded])

  // Fallback: hide preloader after 5 seconds (in case video fails to load)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldPreloader(false)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 20000)
    return () => clearInterval(timer)
  }, [])

  // Animate stats on scroll
  useEffect(() => {
    const handleScroll = () => {
      const statsSection = document.getElementById('stats-section')
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.8) {
          setStatsAnimated(true)
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !revealedSections[entry.target.id]) {
            setRevealedSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }))
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const stats = [
    { value: '13', label: "Années d'expérience", suffix: '' },
    { value: '1000', label: 'Patients traités', suffix: '+' },
    { value: '98', label: 'Taux de satisfaction', suffix: '%' },
    { value: '16', label: 'Spécialisations', suffix: '' },
  ]

  const trustSignals = [
    { icon: Award, title: 'Expertise Reconnue', desc: "Plus de 10 ans d'expérience en neurologie avec des centimes de patients traités.", gradient: 'from-indigo-500 to-indigo-600' },
    { icon: Calendar, title: 'RDV Facile', desc: 'Prenez rendez-vous en ligne en quelques clics, 24h/24.', gradient: 'from-cyan-500 to-teal-500' },
    { icon: Heart, title: 'Soins Personnalisés', desc: 'Une approche humaine et attentive pour chaque patient.', gradient: 'from-violet-500 to-purple-600' },
  ]

  const serviceColors = [
    'bg-indigo-500', 'bg-violet-500', 'bg-teal-500', 'bg-blue-500',
    'bg-rose-500', 'bg-amber-500', 'bg-emerald-500', 'bg-cyan-500',
  ]

  return (
    <div>
      {/* ===== SITE PRELOADER ===== */}
      {shouldShowPreloader && <SitePreloader isLoading={shouldShowPreloader} />}

      {/* ===== HERO VIDEO ===== */}
      <HeroVideo onVideoReady={() => markVideoLoaded()} />

      {/* ===== STATS WITH ANIMATED COUNTERS ===== */}
      <section id="stats-section" className="py-16 bg-gradient-to-r from-indigo-50 via-white to-violet-50 border-y border-indigo-100/50 relative reveal-on-scroll" style={{ opacity: revealedSections['stats-section'] ? 1 : 0, transform: revealedSections['stats-section'] ? 'none' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-100/50 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-violet-100/50 rounded-full blur-[80px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center group cursor-default hover-lift">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-indigo-500/25">
                  {i === 0 && <Award className="w-6 h-6 text-white" />}
                  {i === 1 && <Users className="w-6 h-6 text-white" />}
                  {i === 2 && <Heart className="w-6 h-6 text-white" />}
                  {i === 3 && <Brain className="w-6 h-6 text-white" />}
                </div>
                <div className={`stat-counter ${statsAnimated ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: `${i * 100}ms` }}>
                  <span className="stat-number">{stat.value}</span>
                  {stat.suffix && <span className="stat-suffix">{stat.suffix}</span>}
                </div>
                <p className="text-sm text-slate-400 mt-1 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services-section" className="py-24 bg-slate-50/50 relative overflow-hidden reveal-on-scroll" style={{ opacity: revealedSections['services-section'] ? 1 : 0, transform: revealedSections['services-section'] ? 'none' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <div className="absolute inset-0 neural-pattern" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[120px]" style={{ pointerEvents: 'none' }} />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-100/30 rounded-full blur-[100px]" style={{ pointerEvents: 'none' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 shadow-sm text-sm font-semibold text-indigo-600 mb-5">
              <Activity className="w-4 h-4" />
              Notre Expertise
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Services neurologiques spécialisés</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Soins complets pour le spectre complet des conditions neurologiques, du diagnostic à la gestion à long terme.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.slice(0, 8).map((service, i) => (
              <Link key={service.id} to="/book" className="group no-underline">
                <div 
                  className="bg-white border border-slate-200/80 rounded-2xl p-6 hover:shadow-xl hover:shadow-indigo-500/[0.06] hover:border-indigo-200/60 transition-all duration-300 h-full hover:-translate-y-1.5 relative overflow-hidden hover-3d card-3d"
                  style={{ 
                    opacity: revealedSections['services-section'] ? 1 : 0, 
                    transform: revealedSections['services-section'] ? 'none' : 'translateY(20px)', 
                    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s` 
                  }}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-50 transition-colors" />
                  <div className="relative">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-white transition-all group-hover:scale-110 group-hover:shadow-lg ${serviceColors[i]} animate-tilt`}>
                      {(() => {
                        const IconComponent = iconMap[service.icon] || Brain
                        return <IconComponent className="w-5 h-5" />
                      })()}
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">{service.description}</p>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {service.duration}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="no-underline">
              <Button variant="secondary" size="lg" className="hover:border-indigo-200 hover:text-indigo-600 group">
                Voir tous les services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-indigo-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-100/40 rounded-full blur-[80px]" />
        <div className="absolute inset-0 dot-pattern opacity-20" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-200/60 shadow-lg shadow-indigo-500/10 text-sm font-semibold text-indigo-600 mb-5">
              <Sparkles className="w-4 h-4" />
              Pourquoi Nous
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Pourquoi nos patients nous choisissent</h2>
            <p className="text-lg text-slate-500">Des soins neurologiques exceptionnels avec commodite moderne.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {trustSignals.map((signal, i) => (
              <div key={signal.title} className="group bg-white rounded-2xl p-8 border border-slate-200/80 hover:shadow-xl hover:shadow-indigo-500/[0.06] hover:border-indigo-200/60 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${signal.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <signal.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{signal.title}</h3>
                <p className="text-slate-500 leading-relaxed">{signal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS CAROUSEL ===== */}
      <section id="testimonials-section" className="py-24 bg-gradient-to-br from-amber-50 via-white to-indigo-50 relative overflow-hidden reveal-on-scroll" style={{ opacity: revealedSections['testimonials-section'] ? 1 : 0, transform: revealedSections['testimonials-section'] ? 'none' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-200/40 rounded-full blur-[100px] animate-pulse-glow" style={{ pointerEvents: 'none' }} />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-amber-200/40 rounded-full blur-[100px] animate-morph" style={{ pointerEvents: 'none' }} />

        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-amber-200/60 shadow-lg shadow-amber-500/10 text-sm font-semibold text-amber-600 mb-5">
              <Star className="w-4 h-4 fill-amber-500" />
              Temoignages Patients
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Ce que disent nos patients</h2>
          </div>

          <div className="relative">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/80 shadow-xl shadow-slate-200/30 relative overflow-hidden">
              {/* Decorative quote mark */}
              <div className="absolute top-6 left-8 text-8xl text-indigo-100 font-serif leading-none select-none">"</div>

              <div className="relative">
                <div className="flex gap-1 mb-6 justify-center">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xl md:text-2xl text-slate-600 text-center italic mb-8 leading-relaxed max-w-2xl mx-auto">
                  "{testimonials[currentTestimonial].text}"
                </p>

                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-lg font-bold mx-auto mb-3 shadow-lg shadow-indigo-500/20">
                    {testimonials[currentTestimonial].name[0]}
                  </div>
                  <p className="font-bold text-slate-800 text-lg">{testimonials[currentTestimonial].name}</p>
                  <p className="text-indigo-500 text-sm font-medium">{testimonials[currentTestimonial].condition}</p>
                </div>
              </div>
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-11 h-11 rounded-full bg-white shadow-lg shadow-slate-200/50 border border-slate-200/80 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:shadow-xl hover:border-indigo-200 hover:scale-105 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-11 h-11 rounded-full bg-white shadow-lg shadow-slate-200/50 border border-slate-200/80 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:shadow-xl hover:border-indigo-200 hover:scale-105 transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentTestimonial ? 'bg-indigo-600 w-8' : 'bg-slate-300 w-2 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== INSURANCE PARTNERS WITH TRUST BADGES ===== */}
      <section id="insurance-section" className="py-20 bg-gradient-to-br from-slate-50 via-white to-teal-50 relative reveal-on-scroll" style={{ opacity: revealedSections['insurance-section'] ? 1 : 0, transform: revealedSections['insurance-section'] ? 'none' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-100/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[80px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-teal-200/60 shadow-lg shadow-teal-500/10 text-sm font-semibold text-teal-600 mb-5">
              <Building className="w-4 h-4" />
              Partenaires Assurance
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Nous acceptons les principales assurances tunisiennes</h2>
            <p className="text-slate-500 mt-2"> Consultez-nous pour les détails de votre couverture</p>
          </div>

          {/* Insurance Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="trust-badge-teal px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl shadow-lg shadow-emerald-500/25 hover:scale-105 transition-transform cursor-pointer">
              <div className="trust-badge-icon teal bg-white/20 mr-2">
                <Shield className="w-3.5 h-3.5" />
              </div>
              Acceptation CNAM
            </div>
            <div className="trust-badge-teal px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl shadow-lg shadow-emerald-500/25 hover:scale-105 transition-transform cursor-pointer">
              <div className="trust-badge-icon teal bg-white/20 mr-2">
                <Shield className="w-3.5 h-3.5" />
              </div>
              Acceptation CNRPS
            </div>
            <div className="trust-badge px-5 py-3 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-xl shadow-lg shadow-indigo-500/25 hover:scale-105 transition-transform cursor-pointer">
              <div className="trust-badge-icon bg-white/20 mr-2">
                <CheckCircle className="w-3.5 h-3.5" />
              </div>
              Remboursement rapide
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'CNAM', logo: '/cnam_logo.png' },
              { name: 'CNRPS', logo: '/CNRPS_logo.png' },
              { name: 'MAE', logo: '/mae_logo.png' },
              { name: 'Generali', logo: '/la_mutuelle_generale_blocmarque_rgb_logo.png' },
              { name: 'BIAT', logo: '/biat_logo.png' },
              { name: 'STAR', logo: '/star_logo.png' },
            ].map((insurance) => (
              <div key={insurance.name} className="insurance-grid-item group bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-slate-200/50 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-200/60 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center cursor-default">
                <div className="text-center">
                  <div className="h-12 flex items-center justify-center mb-2">
                    <img 
                      src={insurance.logo} 
                      alt={insurance.name}
                      loading="lazy"
                      className="max-h-10 max-w-full object-contain md:grayscale md:group-hover:grayscale-0 md:transition-all md:duration-300"
                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-600 md:group-hover:text-slate-800 md:transition-colors">{insurance.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="cta-section" className="py-24 relative overflow-hidden reveal-on-scroll" style={{ opacity: revealedSections['cta-section'] ? 1 : 0, transform: revealedSections['cta-section'] ? 'none' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950" />
        <div className="absolute inset-0 dot-pattern opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] animate-morph" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-3xl p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-500/15 rounded-full blur-[60px]" />

            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-medium text-indigo-200 mb-8">
                <Sparkles className="w-4 h-4" />
                Reservation en ligne
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Prenez rendez-vous en{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">seulement 3 clics</span>
              </h2>
              <p className="text-lg text-indigo-200/80 mb-10 max-w-2xl mx-auto leading-relaxed">
                Planifiez votre consultation en ligne. Creneaux disponibles mis a jour en temps reel.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <PulsingCTA delay={0} interval={0}>
                  <Link to="/book" className="no-underline">
                    <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 hover:scale-105 transition-all shadow-xl shadow-black/20 border-0 font-bold">
                      <Calendar className="w-5 h-5" />
                      Prendre RDV
                    </Button>
                  </Link>
                </PulsingCTA>
                <Link to="/contact" className="no-underline">
                  <Button variant="ghost" size="lg" className="text-white/90 hover:text-white hover:bg-white/10 border border-white/15 hover:border-white/25 hover:scale-105 transition-all">
                    <Phone className="w-5 h-5" />
                    Nous Contacter
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
