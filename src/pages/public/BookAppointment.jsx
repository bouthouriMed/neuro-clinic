import { useState } from 'react'
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CalendarDays,
  Shield,
} from 'lucide-react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Input'
import { timeSlots } from '../../data/mockData'

const steps = ['Date & Heure', 'Vos Informations', 'Confirmé']

export default function BookAppointment() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    reason: '',
  })

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }))

  const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() + i)
      if (d.getDay() !== 0) {
        dates.push({
          value: d.toISOString().split('T')[0],
          day: d.toLocaleDateString('fr', { weekday: 'short' }),
          date: d.getDate(),
          month: d.toLocaleDateString('fr', { month: 'short' }),
        })
      }
    }
    return dates
  }

  const dates = generateDates()

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden" style={{ paddingTop: '20px' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30" />
        <div className="absolute inset-0 grid-pattern opacity-50" />

        <div className="relative max-w-3xl mx-auto px-6 py-16 md:py-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-sm text-xs font-semibold text-indigo-600 mb-5">
            <CalendarDays className="w-3.5 h-3.5" />
            Réservation en ligne
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Réserver votre rendez-vous
          </h1>
          <p className="text-slate-500 text-[16px]">
            Planifiez votre consultation en seulement 3 étapes simples.
          </p>

          {/* Stepper */}
          <div className="mt-10 flex items-center">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center flex-1 last:flex-initial">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      i < step
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                        : i === step
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                  </div>
                  <span
                    className={`text-sm font-medium hidden sm:inline ${
                      i <= step ? 'text-slate-800' : 'text-slate-400'
                    }`}
                  >
                    {s}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 mx-5">
                    <div className="h-[2px] rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full bg-indigo-500 transition-all duration-500 ${
                          i < step ? 'w-full' : 'w-0'
                        }`}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          {/* Step 1: Date & Time */}
          {step === 0 && (
            <div className="space-y-10 animate-fade-in-up">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-1.5 flex items-center gap-2.5">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  Choisir une date
                </h3>
                <p className="text-sm text-slate-400">Sélectionnez la date de rendez-vous souhaitée</p>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5 mt-5">
                  {dates.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => update('date', d.value)}
                      className={`p-3 rounded-2xl text-center transition-all duration-200 cursor-pointer border-2 ${
                        form.date === d.value
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/25 scale-[1.02]'
                          : 'bg-white border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50'
                      }`}
                    >
                      <div className={`text-[10px] uppercase font-bold tracking-wider ${form.date === d.value ? 'text-indigo-200' : 'text-slate-400'}`}>
                        {d.day}
                      </div>
                      <div className="text-xl font-bold mt-0.5">{d.date}</div>
                      <div className={`text-[10px] font-medium ${form.date === d.value ? 'text-indigo-200' : 'text-slate-400'}`}>
                        {d.month}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {form.date && (
                <div className="animate-fade-in-up">
                  <h3 className="text-xl font-bold text-slate-800 mb-1.5 flex items-center gap-2.5">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    Choisir un horaire
                  </h3>
                  <p className="text-sm text-slate-400">Créneaux disponibles pour la date sélectionnée</p>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 mt-5">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => update('time', slot)}
                        className={`py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer border-2 ${
                          form.time === slot
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/25'
                            : 'bg-white border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50 text-slate-700'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-6 border-t border-slate-100">
                <Button
                  onClick={() => setStep(1)}
                  disabled={!form.date || !form.time}
                  size="lg"
                  className="px-8 hover:shadow-lg hover:shadow-indigo-600/25 hover:-translate-y-1 transition-all"
                >
                  Continuer
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in-up">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-1.5 flex items-center gap-2.5">
                  <User className="w-5 h-5 text-indigo-600" />
                  Vos informations
                </h3>
                <p className="text-sm text-slate-400">Veuillez remplir vos coordonnées pour finaliser la réservation</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
                <Input
                  label="Nom complet"
                  icon={User}
                  placeholder="Votre nom complet"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                />
                <Input
                  label="Numéro de téléphone"
                  icon={Phone}
                  placeholder="+216 XX XXX XXX"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                />
              </div>

              <Input
                label="Adresse email"
                icon={Mail}
                type="email"
                placeholder="votre@email.com"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
              />

              <Textarea
                label="Motif de la consultation"
                placeholder="Décrivez brièvement vos symptômes ou motif de consultation..."
                value={form.reason}
                onChange={(e) => update('reason', e.target.value)}
              />

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex items-start gap-3">
                <Shield className="w-5 h-5 text-indigo-500 mt-0.5 shrink-0" />
                <p className="text-[13px] text-slate-500 leading-relaxed">
                  Vos informations sont sécurisées et ne seront utilisées que pour la planification des rendez-vous.
                  Nous respectons votre vie privée.
                </p>
              </div>

              <div className="flex justify-between pt-6 border-t border-slate-100">
                <Button variant="secondary" onClick={() => setStep(0)} size="lg">
                  <ArrowLeft className="w-4 h-4" />
                  Retour
                </Button>
                <Button
                  onClick={() => setStep(2)}
                  disabled={!form.name || !form.phone || !form.email}
                  size="lg"
                  className="px-8 hover:shadow-lg hover:shadow-indigo-600/25 hover:-translate-y-1 transition-all"
                >
                  Confirmer la réservation
                  <CheckCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 2 && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/30 hover:scale-110 transition-transform">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Rendez-vous confirmé !</h3>
                <p className="text-slate-500 text-[16px]">
                  Vous recevrez une confirmation par email et SMS sous peu.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                {[
                  { label: 'Date', value: new Date(form.date).toLocaleDateString('fr', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) },
                  { label: 'Heure', value: form.time },
                  { label: 'Nom', value: form.name },
                  { label: 'Téléphone', value: form.phone },
                  { label: 'Email', value: form.email },
                  { label: 'Motif', value: form.reason || '—' },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className={`flex justify-between items-center px-7 py-4 ${
                      i < 5 ? 'border-b border-slate-100' : ''
                    }`}
                  >
                    <span className="text-sm text-slate-400 font-medium">{item.label}</span>
                    <span className="text-sm font-semibold text-slate-800 text-right max-w-[60%]">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  size="lg"
                  onClick={() => {
                    setStep(0)
                    setForm({ date: '', time: '', name: '', phone: '', email: '', reason: '' })
                  }}
                  className="hover:shadow-lg hover:shadow-indigo-600/25 hover:-translate-y-1 transition-all"
                >
                  Réserver un autre RDV
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}