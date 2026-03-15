import { Link } from 'react-router-dom'
import { GraduationCap, Award, Heart, Brain, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import Button from '../../components/ui/Button'
import { doctor } from '../../data/mockData'

export default function About() {
  return (
    <>
      {/* Hero - Different color scheme (emerald/teal) */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center">
        {/* Different color scheme - emerald/teal instead of indigo/violet */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-900" />
        <div className="absolute inset-0 dot-pattern opacity-[0.05]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-[120px] animate-morph" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px]" />
        
        {/* Neural pattern overlay */}
        <div className="absolute inset-0 neural-pattern opacity-10" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 md:py-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-semibold text-emerald-200 mb-6 backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                À propos du médecin
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight mb-6">
                Dédié à l'excellence{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300">neurologique</span>
              </h1>
              <p className="text-xl text-emerald-200/80 leading-relaxed max-w-xl mb-8">
                {doctor.bio}
              </p>
              <Link to="/book" className="no-underline">
                <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-xl shadow-emerald-900/20 hover:shadow-emerald-900/30 hover:-translate-y-1 transition-all border-0">
                  Réserver une consultation
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Doctor card - emerald themed */}
            <div className="hidden lg:block">
              <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-3xl p-10 shadow-2xl shadow-emerald-900/30 relative overflow-hidden hover:shadow-emerald-500/20 transition-shadow">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-8 hover:scale-110 transition-transform">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{doctor.name}</h3>
                  <p className="text-emerald-200 font-medium mb-6">{doctor.title}</p>

                  <div className="space-y-3">
                    {doctor.specializations.map((spec) => (
                      <div key={spec} className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-teal-300 shrink-0" />
                        <span className="text-emerald-100 text-sm">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Timeline - Enhanced with gradient */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-100/50 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="flex items-center gap-4 mb-14">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Formation & Parcours</h2>
              <p className="text-slate-500 text-sm mt-0.5">Formation académique et développement professionnel</p>
            </div>
          </div>

          <div className="space-y-5">
            {doctor.education.map((edu, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-2xl flex flex-col md:flex-row md:items-center gap-6 p-8 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5 hover:border-slate-300 transition-all duration-300"
              >
                <div className="shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-indigo-600">{edu.year}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{edu.degree}</h3>
                  <p className="text-slate-500 mt-1">{edu.institution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations - Enhanced with gradient */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-100/50 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="flex items-center gap-4 mb-14">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/25">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Spécialisations</h2>
              <p className="text-slate-500 text-sm mt-0.5">Domaines d'expertise clinique</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {doctor.specializations.map((spec, i) => {
              const colors = [
                'from-indigo-500 to-indigo-600',
                'from-violet-500 to-purple-600',
                'from-teal-500 to-teal-600',
                'from-blue-500 to-blue-600',
                'from-rose-500 to-pink-600',
                'from-amber-500 to-orange-500',
              ]
              return (
                <div key={spec} className="bg-white rounded-2xl p-6 border border-slate-100 flex items-center gap-4 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5 transition-all duration-300">
                  <div className={`w-3 h-10 rounded-full bg-gradient-to-b ${colors[i]} shrink-0`} />
                  <span className="text-[15px] font-semibold text-slate-700">{spec}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values - Enhanced with gradient */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-indigo-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-100/50 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="flex items-center gap-4 mb-14">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Nos Valeurs</h2>
              <p className="text-slate-500 text-sm mt-0.5">Les principes qui guident notre pratique</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Soins centrés sur le patient',
                desc: 'Chaque plan de traitement est adapté aux besoins et circonstances individuels de chaque patient. Votre confort et votre compréhension sont notre priorité.',
                gradient: 'from-indigo-500 to-indigo-600',
              },
              {
                title: 'Médecine basée sur les preuves',
                desc: "Utilisation des dernières recherches et techniques diagnostiques pour un diagnostic précis et les protocoles de traitement les plus efficaces.",
                gradient: 'from-teal-500 to-teal-600',
              },
              {
                title: 'Support compatissant',
                desc: 'Fournir des soins empathiques et une communication claire tout au long de votre parcours neurologique.',
                gradient: 'from-emerald-500 to-emerald-600',
              },
            ].map((value) => (
              <div
                key={value.title}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:bg-white hover:shadow-lg hover:shadow-slate-200/40 transition-all duration-300"
              >
                <div className={`w-1.5 h-10 rounded-full bg-gradient-to-b ${value.gradient} mb-6`} />
                <h3 className="text-lg font-bold text-slate-800 mb-3">{value.title}</h3>
                <p className="text-[14px] text-slate-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}