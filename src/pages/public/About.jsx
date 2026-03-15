import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Award, Heart, Brain, ArrowRight, CheckCircle2, Sparkles, Star, Clock, Zap, Activity, BookOpen, Waves, Move, Shield, Wind, Smile } from 'lucide-react'
import Button from '../../components/ui/Button'
import ScrollReveal from '../../components/ScrollReveal'
import { doctor, services } from '../../data/mockData'

const iconMap = {
  Brain,
  Zap,
  Activity,
  BookOpen,
  Waves,
  Move,
  Shield,
  Heart,
  Wind,
  Smile,
}

const gradients = [
  'from-indigo-500 to-indigo-600',
  'from-violet-500 to-purple-600',
  'from-teal-500 to-teal-600',
  'from-blue-500 to-blue-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-500',
  'from-emerald-500 to-teal-600',
  'from-cyan-500 to-blue-600',
  'from-fuchsia-500 to-purple-600',
  'from-orange-500 to-red-600',
  'from-sky-500 to-indigo-600',
  'from-lime-500 to-green-600',
  'from-rose-500 to-red-600',
  'from-violet-500 to-fuchsia-600',
  'from-indigo-500 to-cyan-600',
  'from-purple-500 to-pink-600',
]

function AnimatedCounter({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const incrementTime = duration / end
    
    const timer = setInterval(() => {
      start += 1
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, incrementTime)

    return () => clearInterval(timer)
  }, [end, duration])

  return <span>{count}{suffix}</span>
}

function StatCard({ number, suffix, label, delay }) {
  return (
    <ScrollReveal delay={delay}>
      <div className="text-center group">
        <div className="inline-flex items-baseline">
          <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400">
            <AnimatedCounter end={number} suffix={suffix} />
          </span>
        </div>
        <p className="text-sm md:text-base text-emerald-200/70 mt-2 font-medium">{label}</p>
      </div>
    </ScrollReveal>
  )
}

export default function About() {
  const [bioExpanded, setBioExpanded] = useState(false)

  const bioParts = [
    "Avec plus de 15 ans d'expérience en neurologie, le Dr. Abir Bouthouri offre des soins neurologiques complets utilisant les dernières techniques diagnostiques et traitements basés sur les preuves.",
    "Diplômé de la Faculté de Médecine de Monastir avec une spécialisation en neurologie, il a perfectionné ses compétences dans les plus grands hôpitaux de Tunisie.",
    "Il a travaillé à l'Hôpital Militaire de Tunis, l'Institut National de Neurologie Mongi Ben Hamida, l'Hôpital Universitaire Sahloul, l'Hôpital Farhat Hachad, et en Arabie Saoudite à l'Hôpital Mouwasat de Riyad.",
    "Membre de l'Académie Américaine de Neurologie, il est spécialisé dans le diagnostic et le traitement des troubles neurologiques, l'épilepsie, la maladie de Parkinson, et la gestion des accidents vasculaires cérébraux."
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-900" />
        <div className="absolute inset-0 dot-pattern opacity-[0.05]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-[120px] animate-morph" />
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 md:py-40">
          <div className="grid lg:grid-cols-12 gap-12 lg:items-start items-center">
            {/* Left - Doctor Info - Center on mobile */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <ScrollReveal>
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl text-center">
                  <div className="flex flex-col items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{doctor.name}</h3>
                      <p className="text-emerald-300 text-sm">{doctor.title}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-left">
                    {doctor.specializations.slice(0, 4).map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                        <span className="text-emerald-100 text-sm">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right - Bio - Center on mobile */}
            <div className="lg:col-span-7 order-1 lg:order-2 text-center lg:text-left">
              <ScrollReveal delay={150}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-sm font-semibold text-emerald-200 mb-6 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4" />
                  Votre Neurologue de Confiance
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-8 px-6 sm:px-10 md:px-16">
                  Expertise neurologique au service de votre{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300">bien-être</span>
                </h1>

                {/* Bio Box - Expandable */}
                <div 
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/10 mb-8 cursor-pointer"
                  onClick={() => setBioExpanded(!bioExpanded)}
                >
                  <div className={`space-y-4 ${!bioExpanded ? 'max-h-40 overflow-hidden' : ''}`}
                    style={{ 
                      maskImage: !bioExpanded ? 'linear-gradient(to bottom, black 60%, transparent 100%)' : 'none',
                      WebkitMaskImage: !bioExpanded ? 'linear-gradient(to bottom, black 60%, transparent 100%)' : 'none',
                    }}
                  >
                    {bioParts.map((part, index) => (
                      <p key={index} className="text-base md:text-lg leading-relaxed text-emerald-100/90">
                        {part}
                      </p>
                    ))}
                  </div>
                  
                  {/* Read more/less button */}
                  <div className="flex justify-center mt-4">
                    <button 
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-sm font-medium transition-all duration-300"
                    >
                      {bioExpanded ? (
                        <>
                          <span>Voir moins</span>
                          <ArrowRight className="w-4 h-4 rotate-90" />
                        </>
                      ) : (
                        <>
                          <span>Lire la suite</span>
                          <ArrowRight className="w-4 h-4 -rotate-90" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Quick Stats Row - Center on mobile */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-200 text-sm">15+ années</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-200 text-sm">10K+ patients</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-200 text-sm">98% satisfaction</span>
                  </div>
                </div>

                <div className="text-center lg:text-left">
                  <Link to="/book" className="no-underline inline-flex">
                    <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-xl shadow-emerald-900/20 hover:shadow-emerald-900/30 hover:-translate-y-1 transition-all border-0">
                      Réserver une consultation
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/5" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number={15} suffix="+" label="Années d'expérience" delay={0} />
            <StatCard number={10} suffix="K+" label="Patients traités" delay={100} />
            <StatCard number={98} suffix="%" label="Taux de satisfaction" delay={200} />
            <StatCard number={50} suffix="+" label="Publications" delay={300} />
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-100/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-100/50 rounded-full blur-[80px]" />
        
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Formation & Parcours</h2>
                <p className="text-slate-500 text-sm mt-1">Les étapes clés de votre parcours médical</p>
              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {doctor.education.map((edu, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5 transition-all duration-300 group">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-lg font-bold text-indigo-600">{edu.year}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-800">{edu.degree}</h3>
                      <p className="text-slate-500 mt-1">{edu.institution}</p>
                    </div>
                    <Award className="w-5 h-5 text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-100/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-100/50 rounded-full blur-[80px]" />
        
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-4">
                <Sparkles className="w-4 h-4" />
                Nos Services
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Spécialités Neurologiques</h2>
              <p className="text-slate-500 mt-2 max-w-2xl mx-auto">
                Une gamme complète de services pour répondre à tous vos besoins neurologiques
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Brain
              return (
                <ScrollReveal key={service.id} delay={i * 50}>
                  <div className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-xl hover:shadow-emerald-200/20 hover:-translate-y-1 transition-all duration-300 group">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center shadow-lg shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-slate-800 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                          {service.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 mb-2">
                          {service.description}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                          <Clock className="w-3 h-3" />
                          {service.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>

          <div className="text-center mt-10">
            <Link to="/services" className="no-underline inline-flex">
              <Button variant="secondary" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                Voir tous les services
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-100/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-violet-100/50 rounded-full blur-[80px]" />
        
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-12">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Nos Valeurs</h2>
                <p className="text-slate-500 text-sm mt-1">Les principes qui guident notre pratique</p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Soins centrés sur le patient',
                desc: 'Chaque plan de traitement est adapté à vos besoins spécifiques. Votre confort est notre priorité absolue.',
                gradient: 'from-indigo-500 to-indigo-600',
                icon: '🤝'
              },
              {
                title: 'Médecine basée sur les preuves',
                desc: 'Utilisation des dernières recherches pour un diagnostic précis et les meilleurs traitements.',
                gradient: 'from-teal-500 to-teal-600',
                icon: '🔬'
              },
              {
                title: 'Support compatissant',
                desc: 'Une communication claire et empathique tout au long de votre parcours de soins.',
                gradient: 'from-emerald-500 to-emerald-600',
                icon: '💚'
              },
            ].map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 150}>
                <div className="bg-white rounded-2xl p-8 border border-slate-100 hover:shadow-xl hover:shadow-slate-200/40 hover:-translate-y-1 transition-all duration-300 group h-full">
                  <div className="text-3xl mb-4">{value.icon}</div>
                  <div className={`w-12 h-1.5 rounded-full bg-gradient-to-r ${value.gradient} mb-5`} />
                  <h3 className="text-lg font-bold text-slate-800 mb-3">{value.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{value.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[80px]" />
        
        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Prêt à commencer votre parcours de soins ?
            </h2>
            <p className="text-emerald-200/80 mb-8 text-lg">
              Réservez votre consultation dès aujourd'hui et faites confiance à notre expertise neurologique.
            </p>
            <Link to="/book" className="no-underline inline-block">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-xl border-0 px-8">
                Prendre RDV
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
