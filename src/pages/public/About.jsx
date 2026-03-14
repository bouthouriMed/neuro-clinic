import { Link } from 'react-router-dom'
import { GraduationCap, Award, Heart, Brain, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import Button from '../../components/ui/Button'
import { doctor } from '../../data/mockData'

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: '100px' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] bg-indigo-400/10 rounded-full blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-sm text-xs font-semibold text-indigo-600 mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                À propos du médecin
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
                Dédié à l'excellence{' '}
                <span className="text-gradient">neurologique</span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed mb-8">
                {doctor.bio}
              </p>
              <Link to="/book" className="no-underline">
                <Button size="lg" className="shadow-xl shadow-indigo-600/25 hover:shadow-xl hover:shadow-indigo-600/30 hover:-translate-y-1 transition-all">
                  Réserver une consultation
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Doctor card */}
            <div className="hidden lg:block">
              <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-800 rounded-3xl p-10 shadow-2xl shadow-indigo-900/30 relative overflow-hidden hover:shadow-indigo-500/20 transition-shadow">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-8 hover:scale-110 transition-transform">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{doctor.name}</h3>
                  <p className="text-indigo-200 font-medium mb-6">{doctor.title}</p>

                  <div className="space-y-3">
                    {doctor.specializations.map((spec) => (
                      <div key={spec} className="flex items-center gap-3">
                        <CheckCircle2 className="w-4 h-4 text-teal-300 shrink-0" />
                        <span className="text-indigo-100 text-sm">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Timeline */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
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

      {/* Specializations */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
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

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
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