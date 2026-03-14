import { useState } from 'react'
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
} from 'lucide-react'
import Button from '../../components/ui/Button'
import { services, testimonials, insurances } from '../../data/mockData'

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const stats = [
    { value: '15+', label: "Années d'expérience" },
    { value: '10K+', label: 'Patients traités' },
    { value: '98%', label: 'Taux de satisfaction' },
    { value: '8', label: 'Spécialisations' },
  ]

  const trustSignals = [
    { icon: Shield, title: 'Certifié', desc: "Membre de l'Académie Américaine de Neurologie. Board Saoudien de Neurologie." },
    { icon: Calendar, title: 'RDV du jour', desc: 'Prenez rendez-vous en ligne en quelques clics.' },
    { icon: Award, title: 'Hôpital Mouwasat', desc: 'Plus de 6 ans d\'expérience à l\'hôpital Mouwasat de Riyad.' },
  ]

  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/30" style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
        <div className="absolute inset-0 grid-pattern opacity-50" />
        
        <div className="absolute top-20 right-10 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-pulse-glow" style={{ pointerEvents: 'none' }} />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl animate-float" style={{ pointerEvents: 'none' }} />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-purple-200/20 rounded-full blur-2xl animate-float-delay" style={{ pointerEvents: 'none' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-200 shadow-lg shadow-indigo-500/10 text-sm font-medium text-indigo-600 mb-8">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Neurologue Expérimenté
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
                Le Dr. Abir Bouthouri<span className="text-gradient"> à votre service</span>
              </h1>

              <p className="text-xl text-slate-600 mb-6 max-w-lg">
                Plus de 15 ans d'expérience en neurologie. Ancien de l'Institut National de Neurologie Mongi Ben Hamida et Hôpital Mouwasat Riyad.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {['Épilepsie', 'Maladie de Parkinson', 'AVC', 'Sclérose en Plaques', 'Migraines'].map((spec) => (
                  <span key={spec} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                    {spec}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/book" className="no-underline">
                  <Button size="lg" className="shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-1 transition-all">
                    Prendre RDV
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/about" className="no-underline">
                  <Button variant="secondary" size="lg" className="hover:border-indigo-300 hover:text-indigo-600 transition-all">
                    En savoir plus
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {['SA', 'FT', 'KJ', 'LM'].map((initials, i) => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold ${['bg-indigo-500', 'bg-teal-500', 'bg-amber-500', 'bg-rose-500'][i]} hover:scale-110 hover:z-10 transition-transform cursor-pointer`}>
                      {initials}
                    </div>
                  ))}
                </div>
                <div className="border-l border-slate-200 pl-5">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-sm font-bold text-slate-800 ml-1">4.9</span>
                  </div>
                  <p className="text-sm text-slate-500">Confiance de 10 000+ patients</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block animate-fade-in-up-delay">
              <div className="relative" style={{ padding: '20px' }}>
                <div className="absolute -top-6 -left-6 z-10 animate-float">
                  <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3 border border-slate-100 hover:scale-105 transition-transform cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">RDV Confirmé</p>
                      <p className="text-xs text-slate-500">Aujourd'hui à 09:30</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 z-10 animate-float-delay">
                  <div className="bg-white rounded-2xl shadow-lg p-4 border border-slate-100 hover:scale-105 transition-transform cursor-pointer">
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-slate-800">"Excellent médecin!"</p>
                    <p className="text-xs text-slate-500">— Mohamed B.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-10 shadow-2xl hover:shadow-indigo-500/25 transition-shadow">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center hover:scale-110 transition-transform">
                      <Brain className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Dr. Abir Bouthouri</h3>
                      <p className="text-indigo-200 font-medium">Spécialiste en Neurologie</p>
                      <p className="text-indigo-300 text-sm mt-1">Membre de l'Académie Américaine de Neurologie</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Expérience', value: '15+ Ans' },
                      { label: 'Patients', value: '10,000+' },
                      { label: 'Hôpitaux', value: '8+' },
                      { label: 'Certification', value: 'Board SA' },
                    ].map((item) => (
                      <div key={item.label} className="bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-all">
                        <p className="text-xs text-indigo-200 uppercase tracking-wide">{item.label}</p>
                        <p className="text-lg font-bold text-white mt-1">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-white py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center md:text-left hover:bg-slate-50 p-4 rounded-xl transition-all cursor-pointer">
                <p className="text-4xl font-bold text-indigo-600">{stat.value}</p>
                <p className="text-slate-500 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-3xl" style={{ pointerEvents: 'none' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-100/30 rounded-full blur-3xl" style={{ pointerEvents: 'none' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-4">
              <Activity className="w-4 h-4" />
              Notre Expertise
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Services neurologiques spécialisés</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Soins complets pour le spectre complet des conditions neurologiques, du diagnostic à la gestion à long terme.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.slice(0, 8).map((service, i) => (
              <Link key={service.id} to="/book" className="group no-underline">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-200 transition-all duration-300 h-full hover:-translate-y-2">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-white transition-transform group-hover:scale-110 ${
                    ['bg-indigo-500', 'bg-violet-500', 'bg-teal-500', 'bg-blue-500', 'bg-rose-500', 'bg-amber-500', 'bg-emerald-500', 'bg-orange-500'][i]
                  }`}>
                    <Brain className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Clock className="w-4 h-4" />
                    {service.duration}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Pourquoi nos patients nous choisissent</h2>
            <p className="text-lg text-slate-600">Des soins neurologiques exceptionnels avec commodité moderne.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {trustSignals.map((signal, i) => (
              <div key={signal.title} className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-xl hover:border-indigo-200 hover:-translate-y-2 transition-all duration-300">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  ['bg-indigo-500', 'bg-teal-500', 'bg-amber-500'][i]
                }`}>
                  <signal.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{signal.title}</h3>
                <p className="text-slate-600">{signal.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS CAROUSEL ===== */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl" style={{ pointerEvents: 'none' }} />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-amber-100/50 rounded-full blur-3xl" style={{ pointerEvents: 'none' }} />

        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-600 text-sm font-medium mb-4">
              <Star className="w-4 h-4 fill-amber-500" />
              Témoignages Patients
            </div>
            <h2 className="text-4xl font-bold text-slate-900">Ce que disent nos patients</h2>
          </div>

          <div className="relative">
            <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl">
              <div className="flex gap-1 mb-6 justify-center">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, j) => (
                  <Star key={j} className="w-6 h-6 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              <p className="text-xl md:text-2xl text-slate-700 text-center italic mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </p>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                  {testimonials[currentTestimonial].name[0]}
                </div>
                <p className="font-bold text-slate-800 text-lg">{testimonials[currentTestimonial].name}</p>
                <p className="text-indigo-600 text-sm">{testimonials[currentTestimonial].condition}</p>
              </div>
            </div>

            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:scale-110 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:scale-110 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === currentTestimonial ? 'bg-indigo-600 w-8' : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== INSURANCE PARTNERS ===== */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-600 text-sm font-medium mb-4">
              <Building className="w-4 h-4" />
              Partenaires Assurance
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Nous acceptons les principales assurances tunisiennes</h2>
            <p className="text-slate-600 mt-2">Consultez-nous pour les détails de votre couverture</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {insurances.map((insurance) => (
              <div key={insurance.name} className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg hover:border-indigo-200 transition-all flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mx-auto mb-2">
                    <Building className="w-6 h-6 text-slate-400" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{insurance.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-violet-900" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl" />

            <div className="relative text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Prenez rendez-vous en seulement 3 clics
              </h2>
              <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
                Planifiez votre consultation en ligne. Créneaux disponibles mis à jour en temps réel.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/book" className="no-underline">
                  <Button size="lg" className="bg-white text-indigo-600 hover:bg-slate-100 hover:scale-105 transition-all">
                    <Calendar className="w-5 h-5" />
                    Prendre RDV
                  </Button>
                </Link>
                <Link to="/contact" className="no-underline">
                  <Button variant="ghost" size="lg" className="text-white hover:bg-white/10 border border-white/20 hover:scale-105 transition-all">
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