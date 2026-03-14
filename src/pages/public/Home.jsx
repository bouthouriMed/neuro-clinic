import { useState, useEffect } from 'react'
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
  Stethoscope,
  Globe,
  BadgeCheck,
  Users,
} from 'lucide-react'
import Button from '../../components/ui/Button'
import { services, testimonials, insurances, doctor } from '../../data/mockData'

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [statsAnimated, setStatsAnimated] = useState(false)

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
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

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const trustBadges = [
    { icon: BadgeCheck, text: "Membre de l'Académie Américaine de Neurologie", type: 'gold' },
    { icon: Shield, text: 'Board Saoudien de Neurologie', type: 'indigo' },
    { icon: Stethoscope, text: '15+ Années d\'expérience', type: 'teal' },
  ]

  const hospitalAffiliations = [
    { name: 'Hôpital Militaire Tunis', years: 'Ancien' },
    { name: 'Institut National de Neurologie', years: 'Ancien' },
    { name: 'Hôpital Mouwasat Riyad', years: '6+ ans' },
  ]

  const stats = [
    { value: '15+', label: "Années d'expérience", suffix: '' },
    { value: '10K+', label: 'Patients traités', suffix: '' },
    { value: '98%', label: 'Taux de satisfaction', suffix: '%' },
    { value: '8', label: 'Spécialisations', suffix: '' },
  ]

  const trustSignals = [
    { icon: Shield, title: 'Certifié', desc: "Membre de l'Académie Américaine de Neurologie. Board Saoudien de Neurologie.", gradient: 'from-indigo-500 to-indigo-600' },
    { icon: Calendar, title: 'RDV Facile', desc: 'Prenez rendez-vous en ligne en quelques clics, 24h/24.', gradient: 'from-cyan-500 to-teal-500' },
    { icon: Award, title: 'Hôpital Mouwasat', desc: "Plus de 6 ans d'expérience à l'hôpital Mouwasat de Riyad.", gradient: 'from-violet-500 to-purple-600' },
  ]

  const serviceColors = [
    'bg-indigo-500', 'bg-violet-500', 'bg-teal-500', 'bg-blue-500',
    'bg-rose-500', 'bg-amber-500', 'bg-emerald-500', 'bg-cyan-500',
  ]

  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/40" />
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="absolute inset-0 neural-pattern" />

        {/* Animated blobs */}
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-indigo-200/25 rounded-full blur-[100px] animate-pulse-glow" style={{ pointerEvents: 'none' }} />
        <div className="absolute bottom-20 left-[5%] w-[400px] h-[400px] bg-cyan-200/20 rounded-full blur-[80px] animate-morph" style={{ pointerEvents: 'none' }} />
        <div className="absolute top-1/3 left-1/3 w-[250px] h-[250px] bg-violet-200/15 rounded-full blur-[60px] animate-float-reverse" style={{ pointerEvents: 'none' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 w-full relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Content */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-indigo-100 shadow-lg shadow-indigo-500/5 text-sm font-medium text-indigo-600 mb-8">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                Neurologue Expérimenté
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}>
                Le Dr. Abir Bouthouri
                <span className="block text-gradient-animated mt-2">à votre service</span>
              </h1>

              <p className="text-lg text-slate-500 mb-6 max-w-lg leading-relaxed">
                Plus de 15 ans d'expérience en neurologie. Ancien de l'Institut National de Neurologie Mongi Ben Hamida et Hôpital Mouwasat Riyad.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                {trustBadges.map((badge, i) => (
                  <div 
                    key={i} 
                    className={`trust-badge ${badge.type === 'gold' ? 'trust-badge-gold' : badge.type === 'teal' ? 'trust-badge-teal' : ''}`}
                  >
                    <div className={`trust-badge-icon ${badge.type === 'gold' ? 'gold' : badge.type === 'teal' ? 'teal' : ''}`}>
                      <badge.icon className="w-3.5 h-3.5" />
                    </div>
                    {badge.text}
                  </div>
                ))}
              </div>

              {/* Hospital Affiliations */}
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="text-xs font-medium text-slate-400 py-1">Ancien:</span>
                {hospitalAffiliations.map((hospital, i) => (
                  <div 
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-sm text-xs font-medium text-slate-600 hover:border-indigo-200 hover:text-indigo-600 transition-all cursor-default"
                  >
                    <Building className="w-3 h-3 text-slate-400" />
                    {hospital.name}
                    {hospital.years !== 'Ancien' && (
                      <span className="text-slate-300">•</span>
                    )}
                    {hospital.years !== 'Ancien' && (
                      <span className="text-emerald-500 font-semibold">{hospital.years}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/book" className="no-underline">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white border-0 shadow-xl shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/30 hover:-translate-y-1 transition-all group">
                    Prendre RDV
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
                <Link to="/about" className="no-underline">
                  <Button variant="secondary" size="lg" className="hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all">
                    En savoir plus
                  </Button>
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-6">
                <div className="flex -space-x-2.5">
                  {['SA', 'FT', 'KJ', 'LM'].map((initials, i) => (
                    <div key={i} className={`w-9 h-9 rounded-full border-[2.5px] border-white flex items-center justify-center text-white text-[10px] font-bold shadow-sm ${['bg-indigo-500', 'bg-teal-500', 'bg-amber-500', 'bg-rose-500'][i]} hover:scale-110 hover:z-10 transition-transform cursor-pointer`}>
                      {initials}
                    </div>
                  ))}
                </div>
                <div className="border-l border-slate-200 pl-5">
                  <div className="flex items-center gap-1 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-sm font-bold text-slate-800 ml-1">4.9</span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">Confiance de 10 000+ patients</p>
                </div>
              </div>
            </div>

            {/* Right: Doctor Card with Photo */}
            <div className="lg:block animate-fade-in-up-delay">
              <div className="relative" style={{ padding: '20px' }}>
                {/* Floating card: Appointment confirmed */}
                <div className="absolute -top-4 -left-4 z-10 animate-float">
                  <div className="glass rounded-2xl shadow-xl shadow-slate-200/50 p-4 flex items-center gap-3 border border-white/60 hover:scale-105 transition-transform cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">RDV Confirmé</p>
                      <p className="text-xs text-slate-400">Aujourd'hui à 09:30</p>
                    </div>
                  </div>
                </div>

                {/* Floating card: Review */}
                <div className="absolute -bottom-4 -right-4 z-10 animate-float-delay">
                  <div className="glass rounded-2xl shadow-xl shadow-slate-200/50 p-4 border border-white/60 hover:scale-105 transition-transform cursor-pointer">
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-slate-800">"Excellent médecin!"</p>
                    <p className="text-xs text-slate-400 mt-0.5">— Mohamed B.</p>
                  </div>
                </div>

                {/* Main doctor card with gradient border */}
                <div className="hero-frame">
                  <div className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 rounded-3xl p-10 shadow-2xl shadow-indigo-900/20 overflow-hidden card-shine">
                    {/* Doctor photo */}
                    <div className="flex flex-col items-center justify-center mb-6">
                      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-lg mb-4">
                        <img 
                          src="/dr.jpg" 
                          alt="Dr. Abir Bouthouri" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-indigo-300" />
                        <span className="text-sm text-indigo-200">Tunisie • Arabie Saoudite</span>
                      </div>
                    </div>

                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                    <div className="absolute top-1/2 right-10 w-16 h-16 bg-cyan-400/10 rounded-full blur-xl" />

                    <div className="relative">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-white">Dr. Abir Bouthouri</h3>
                        <p className="text-indigo-200 font-medium">Spécialiste en Neurologie</p>
                        <p className="text-indigo-300/70 text-xs mt-1 font-medium">Membre de l'Académie Américaine de Neurologie</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: 'Expérience', value: '15+ Ans' },
                          { label: 'Patients', value: '10,000+' },
                          { label: 'Hôpitaux', value: '8+' },
                          { label: 'Certification', value: 'Board SA' },
                        ].map((item) => (
                          <div key={item.label} className="bg-white/[0.08] backdrop-blur-sm rounded-xl p-4 hover:bg-white/[0.14] transition-all border border-white/[0.06]">
                            <p className="text-[10px] text-indigo-300/70 uppercase tracking-widest font-semibold">{item.label}</p>
                            <p className="text-lg font-bold text-white mt-1">{item.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS WITH ANIMATED COUNTERS ===== */}
      <section id="stats-section" className="bg-white py-16 border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center group cursor-default hover-lift">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-50 mb-4 group-hover:bg-indigo-100 transition-colors">
                  {i === 0 && <Award className="w-5 h-5 text-indigo-500" />}
                  {i === 1 && <Users className="w-5 h-5 text-indigo-500" />}
                  {i === 2 && <Heart className="w-5 h-5 text-indigo-500" />}
                  {i === 3 && <Brain className="w-5 h-5 text-indigo-500" />}
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
      <section className="py-24 bg-slate-50/50 relative overflow-hidden">
        <div className="absolute inset-0 neural-pattern" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[120px]" style={{ pointerEvents: 'none' }} />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-100/30 rounded-full blur-[100px]" style={{ pointerEvents: 'none' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 shadow-sm text-sm font-semibold text-indigo-600 mb-5">
              <Activity className="w-4 h-4" />
              Notre Expertise
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Services neurologiques specialises</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Soins complets pour le spectre complet des conditions neurologiques, du diagnostic a la gestion a long terme.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.slice(0, 8).map((service, i) => (
              <Link key={service.id} to="/book" className="group no-underline">
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 hover:shadow-xl hover:shadow-indigo-500/[0.06] hover:border-indigo-200/60 transition-all duration-300 h-full hover:-translate-y-1.5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-50 transition-colors" />
                  <div className="relative">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-white transition-all group-hover:scale-110 group-hover:shadow-lg ${serviceColors[i]}`}>
                      <Brain className="w-5 h-5" />
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
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-30" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 shadow-sm text-sm font-semibold text-indigo-600 mb-5">
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
      <section className="py-24 bg-slate-50/50 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-100/40 rounded-full blur-[100px]" style={{ pointerEvents: 'none' }} />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-amber-100/40 rounded-full blur-[100px]" style={{ pointerEvents: 'none' }} />

        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 shadow-sm text-sm font-semibold text-amber-600 mb-5">
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 shadow-sm text-sm font-semibold text-teal-600 mb-5">
              <Building className="w-4 h-4" />
              Partenaires Assurance
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Nous acceptons les principales assurances tunisiennes</h2>
            <p className="text-slate-500 mt-2"> Consultez-nous pour les détails de votre couverture</p>
          </div>

          {/* Insurance Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="trust-badge-teal">
              <div className="trust-badge-icon teal">
                <Shield className="w-3.5 h-3.5" />
              </div>
              Acceptation CNAM
            </div>
            <div className="trust-badge-teal">
              <div className="trust-badge-icon teal">
                <Shield className="w-3.5 h-3.5" />
              </div>
              Acceptation CNRPS
            </div>
            <div className="trust-badge">
              <div className="trust-badge-icon">
                <CheckCircle className="w-3.5 h-3.5" />
              </div>
              Remboursement rapide
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'CNAM', logo: '/cnam_logo.png' },
              { name: 'CNRPS', logo: '/CNRPS_logo.png' },
              { name: 'MAE', logo: '/mae_logo.png' },
              { name: 'Generali', logo: '/la_mutuelle_generale_blocmarque_rgb_logo.png' },
              { name: 'BIAT', logo: '/biat_logo.png' },
              { name: 'STAR', logo: '/star_logo.png' },
            ].map((insurance) => (
              <div key={insurance.name} className="group bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 hover:border-indigo-200/60 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center cursor-default premium-card">
                <div className="text-center">
                  <div className="h-12 flex items-center justify-center mb-2">
                    <img 
                      src={insurance.logo} 
                      alt={insurance.name}
                      className="max-h-10 max-w-full object-contain grayscale group-hover:grayscale-0 transition-all"
                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-800 transition-colors">{insurance.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950" />
        <div className="absolute inset-0 dot-pattern opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />

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
                <Link to="/book" className="no-underline">
                  <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 hover:scale-105 transition-all shadow-xl shadow-black/20 border-0 font-bold">
                    <Calendar className="w-5 h-5" />
                    Prendre RDV
                  </Button>
                </Link>
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
