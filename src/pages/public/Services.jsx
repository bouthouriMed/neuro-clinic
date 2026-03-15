import { Link } from 'react-router-dom'
import { Brain, ArrowRight, Clock, Activity, Zap, BookOpen, Waves, Move, Sparkles, Shield, Wind, Smile, Heart } from 'lucide-react'
import Button from '../../components/ui/Button'
import PulsingCTA from '../../components/ui/PulsingCTA'
import { services } from '../../data/mockData'

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

export default function Services() {
  return (
    <>
      {/* Hero - Enhanced with video-style background */}
      <section className="relative overflow-hidden min-h-[70vh] flex items-center">
        {/* Video-style background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950" />
        <div className="absolute inset-0 dot-pattern opacity-[0.05]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px] animate-morph" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-violet-500/10 rounded-full blur-[100px]" />
        
        {/* Neural pattern overlay */}
        <div className="absolute inset-0 neural-pattern opacity-10" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 md:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-semibold text-indigo-200 mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              Notre Expertise
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight mb-6">
              Soins neurologiques{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-300 to-violet-300">complets</span>
            </h1>
            <p className="text-xl text-indigo-200/80 leading-relaxed max-w-2xl">
              Du diagnostic initial à la gestion à long terme, nous fournissons des soins experts
              pour toutes les conditions neurologiques en utilisant les dernières avancées médicales.
            </p>
            
            {/* Stats row */}
            <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">15+</div>
                <div className="text-sm text-indigo-300">Années exp</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-sm text-indigo-300">Patients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">98%</div>
                <div className="text-sm text-indigo-300">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services grid - Enhanced with gradient background */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-indigo-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-100/50 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-teal-100/40 rounded-full blur-[80px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Brain
              return (
                <div
                  key={service.id}
                  className="bg-white border border-slate-200 rounded-2xl group p-9 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 hover:border-indigo-200 transition-all duration-300 card-3d"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[i]} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium">{service.duration}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[15px] text-slate-500 leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <Link to="/book" className="no-underline">
                    <Button variant="secondary" size="sm" className="group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-200 transition-colors">
                      Réserver ce service
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-500/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
                Besoin d'une consultation ?
              </h2>
              <p className="text-slate-300 max-w-md mx-auto mb-8 text-[16px]">
                Réservez votre rendez-vous aujourd'hui et recevez des soins neurologiques experts du Dr. Bouthouri.
              </p>
              <Link to="/book" className="no-underline">
                <PulsingCTA delay={5000} interval={5000}>
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-50 shadow-xl shadow-black/20 border-0 text-[15px] px-8 py-4 hover:scale-105 transition-transform">
                    Prendre RDV
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </PulsingCTA>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}