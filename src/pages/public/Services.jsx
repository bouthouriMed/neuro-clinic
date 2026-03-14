import { Link } from 'react-router-dom'
import { Brain, ArrowRight, Clock, Activity, Zap, BookOpen, Waves, Move, Sparkles } from 'lucide-react'
import Button from '../../components/ui/Button'
import PulsingCTA from '../../components/ui/PulsingCTA'
import { services } from '../../data/mockData'

const iconMap = { Brain, Zap, Activity, BookOpen, Waves, Move }

const gradients = [
  'from-indigo-500 to-indigo-600',
  'from-violet-500 to-purple-600',
  'from-teal-500 to-teal-600',
  'from-blue-500 to-blue-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-500',
]

export default function Services() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: '20px' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-indigo-400/10 rounded-full blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-sm text-xs font-semibold text-indigo-600 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Notre Expertise
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-5">
              Soins neurologiques{' '}
              <span className="text-gradient">complets</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
              Du diagnostic initial à la gestion à long terme, nous fournissons des soins experts
              pour toutes les conditions neurologiques en utilisant les dernières avancées médicales.
            </p>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-24 bg-white">
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