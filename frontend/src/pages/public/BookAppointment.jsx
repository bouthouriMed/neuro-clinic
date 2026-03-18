import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Shield,
  CalendarCheck,
  MapPin,
  Bell,
  UserPlus,
} from 'lucide-react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Input'
import { doctor } from '../../data/mockData'
import { appointmentsApi, authApi, scheduleApi } from '../../services/api'

const steps = ['Date & Heure', 'Vos Informations', 'Confirmé']

export default function BookAppointment() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [step, setStep] = useState(0)
  const [oauthUser, setOauthUser] = useState(null)
  const [createAccount, setCreateAccount] = useState(true)
  const [form, setForm] = useState({
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    reason: '',
  })
  const [success, setSuccess] = useState(null)
  const [availableSlots, setAvailableSlots] = useState([])
  const [loadingSlots, setLoadingSlots] = useState(false)

  const timeSectionRef = useRef(null)
  const continueButtonRef = useRef(null)
  const step2Ref = useRef(null)
  const step3Ref = useRef(null)

  // Handle OAuth callback
  useEffect(() => {
    const oauth = searchParams.get('oauth')
    if (oauth === 'success') {
      const email = searchParams.get('email')
      const firstName = searchParams.get('firstName')
      const lastName = searchParams.get('lastName')
      const userId = searchParams.get('userId')
      const provider = searchParams.get('provider')
      
      // Restore booking data from localStorage
      const savedBooking = localStorage.getItem('neuroclinic_booking')
      let savedDate = ''
      let savedTime = ''
      
      if (savedBooking) {
        const booking = JSON.parse(savedBooking)
        savedDate = booking.date || ''
        savedTime = booking.time || ''
        localStorage.removeItem('neuroclinic_booking')
      }
      
      if (email) {
        setOauthUser({ email, firstName, lastName, id: userId, provider })
        setForm(prev => ({
          ...prev,
          email: email,
          name: firstName && lastName ? `${firstName} ${lastName}` : firstName || '',
          date: savedDate || prev.date,
          time: savedTime || prev.time,
        }))
        setCreateAccount(true)
        // Go to step 1 (user info) with filled data
        setStep(1)
      }
      
      // Clear URL params
      setSearchParams({})
    }
  }, [searchParams, setSearchParams])

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))

    if (field === 'date' && value) {
      // Reset time when date changes
      setForm((f) => ({ ...f, time: '' }))
      setLoadingSlots(true)
      appointmentsApi.getAvailableSlots(value)
        .then((data) => setAvailableSlots(data.slots || []))
        .catch(console.error)
        .finally(() => setLoadingSlots(false))

      setTimeout(() => {
        const element = timeSectionRef.current
        if (element) {
          const rect = element.getBoundingClientRect()
          const offset = rect.top - 150
          window.scrollTo({ top: window.scrollY + offset, behavior: 'smooth' })
        }
      }, 200)
    }
    if (field === 'time' && value) {
      setTimeout(() => {
        const element = continueButtonRef.current
        if (element) {
          const rect = element.getBoundingClientRect()
          const offset = rect.top - 200
          window.scrollTo({ top: window.scrollY + offset, behavior: 'smooth' })
        }
      }, 200)
    }
  }

  const toLocalDateStr = (date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }

  const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 0; i <= 21; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() + i)
      if (d.getDay() !== 0) {
        dates.push({
          value: toLocalDateStr(d),
          day: d.toLocaleDateString('fr', { weekday: 'short' }),
          date: d.getDate(),
          month: d.toLocaleDateString('fr', { month: 'short' }),
          fullDate: d
        })
      }
    }
    return dates
  }

  const dates = generateDates()

  const handleOAuth = (provider) => {
    // Save booking data before redirect
    localStorage.setItem('neuroclinic_booking', JSON.stringify({
      date: form.date,
      time: form.time,
      step: 1
    }))
    
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001'
    const redirectUrl = provider === 'google' 
      ? `${baseUrl}/api/auth/google`
      : `${baseUrl}/api/auth/facebook`
    window.location.href = redirectUrl
  }

  const handleContinue = () => {
    setStep(1)
    setTimeout(() => {
      const element = step2Ref.current
      if (element) {
        const offset = element.getBoundingClientRect().top - 180
        window.scrollTo({ top: window.scrollY + offset, behavior: 'smooth' })
      }
    }, 200)
  }

  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // Try to create/update user first (lead or patient)
      let userId = oauthUser?.id
      let firstName = ''
      let lastName = ''
      
      // Parse name
      const nameParts = form.name.trim().split(' ')
      firstName = nameParts[0] || ''
      lastName = nameParts.slice(1).join(' ') || ''
      
      // Upsert user (create lead or upgrade to patient if createAccount is true)
      const userResult = await authApi.upsertFromBooking({
        email: form.email,
        firstName,
        lastName,
        phone: form.phone,
        createAccount,
        provider: oauthUser ? oauthUser.provider || 'google' : 'local'
      })
      
      if (userResult.userId) {
        userId = userResult.userId
      }
      
      // Create appointment with linked user
      const result = await appointmentsApi.create({
        patientName: form.name,
        patientPhone: form.phone,
        patientEmail: form.email,
        service: 'Consultation neurologique',
        date: form.date,
        time: form.time,
        notes: form.reason,
        userId
      })
      
      setSuccess({
        id: result.appointment?.id || Date.now(),
        date: form.date,
        time: form.time,
        service: 'Consultation neurologique',
        patientName: form.name,
        createAccount,
        email: form.email
      })
      setStep(2)
      setTimeout(() => {
        const el = step3Ref.current
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 40
          window.scrollTo({ top: y, behavior: 'smooth' })
        }
      }, 200)
    } catch (error) {
      console.error('Error creating appointment:', error)
      alert('Erreur lors de la création du rendez-vous. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setStep(0)
    setForm({ date: '', time: '', name: '', phone: '', email: '', reason: '' })
    setSuccess(null)
  }

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden min-h-[40vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950" />
        <div className="absolute inset-0 dot-pattern opacity-[0.03]" />
        <div className="absolute top-0 right-0 md:w-[700px] w-[300px] md:h-[700px] h-[300px] bg-indigo-500/15 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 left-0 md:w-[600px] w-[250px] md:h-[600px] h-[250px] bg-cyan-500/10 rounded-full blur-[120px] animate-morph" />

        <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-semibold text-indigo-200 mb-6 backdrop-blur-sm">
            <CalendarCheck className="w-4 h-4" />
            Réservation en ligne
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Prenez rendez-vous en{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-300 to-violet-300">
              quelques clics
            </span>
          </h1>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-white/80 text-sm">Confirmation immédiate</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span className="text-white/80 text-sm">Au cabinet</span>
            </div>
          </div>

          {/* Stepper */}
          <div className="mt-8 flex items-center justify-center max-w-lg mx-auto">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                    i < step || (i === step && step === 2)
                      ? 'bg-emerald-500 text-white'
                      : i === step
                      ? 'bg-white text-indigo-700'
                      : 'bg-white/20 text-white/50'
                  }`}>
                    {i < step || (i === step && step === 2) ? <CheckCircle className="w-5 h-5" /> : i + 1}
                  </div>
                  <span className={`text-xs mt-1.5 ${i === step || i < step ? 'text-white' : 'text-white/50'}`}>{s}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-16 sm:w-24 h-0.5 mx-2 rounded ${i < step || (step === 2 && i === 1) ? 'bg-emerald-500' : 'bg-white/20'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 bg-gradient-to-br from-slate-50 via-white to-indigo-50 relative overflow-x-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-100/40 rounded-full blur-[80px]" />

        <div className="max-w-3xl mx-auto px-6 relative">
          {/* Step 1: Date & Time */}
          {step === 0 && (
            <div className="space-y-8">
              <div ref={timeSectionRef} className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  Choisir une date
                </h3>
                <p className="text-sm text-slate-400 mb-4">Sélectionnez la date souhaitée</p>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1 sm:gap-2 overflow-x-hidden">
                  {dates.slice(0, 14).map((d) => (
                    <button key={d.value} onClick={() => update('date', d.value)}
                      className={`p-1.5 sm:p-2.5 rounded-xl text-center transition-all border-2 ${
                        form.date === d.value
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg'
                          : 'border-slate-100 hover:border-indigo-200 hover:bg-indigo-50'
                      }`}>
                      <div className="text-[9px] sm:text-[10px] uppercase font-bold">{d.day}</div>
                      <div className="text-base sm:text-lg font-bold">{d.date}</div>
                      <div className="text-[9px] sm:text-[10px]">{d.month}</div>
                    </button>
                  ))}
                </div>
              </div>

              {form.date && (
                <div ref={continueButtonRef} className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 animate-fade-in-up">
                  <h3 className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-cyan-600" />
                    Choisir un horaire
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    {new Date(form.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                  {loadingSlots ? (
                    <div className="flex justify-center py-8">
                      <div className="w-6 h-6 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    </div>
                  ) : availableSlots.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-sm">
                      Aucun créneau disponible pour cette date
                    </div>
                  ) : (() => {
                    const morningSlots = availableSlots.filter(s => s < '13:30')
                    const afternoonSlots = availableSlots.filter(s => s >= '13:30')
                    return (
                      <div className="space-y-4">
                        {morningSlots.length > 0 && (
                          <div>
                            <div className="text-xs font-semibold text-slate-600 mb-2">Matin</div>
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                              {morningSlots.map((slot) => (
                                <button key={slot} onClick={() => update('time', slot)}
                                  className={`py-2.5 px-1 rounded-xl text-xs sm:text-sm font-semibold transition-all border-2 ${
                                    form.time === slot
                                      ? 'bg-cyan-500 text-white border-cyan-500 shadow-lg'
                                      : 'border-slate-100 hover:border-cyan-200 hover:bg-cyan-50 text-slate-700'
                                  }`}>
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        {afternoonSlots.length > 0 && (
                          <div>
                            <div className="text-xs font-semibold text-slate-600 mb-2">Après-midi</div>
                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                              {afternoonSlots.map((slot) => (
                                <button key={slot} onClick={() => update('time', slot)}
                                  className={`py-2.5 px-1 rounded-xl text-xs sm:text-sm font-semibold transition-all border-2 ${
                                    form.time === slot
                                      ? 'bg-cyan-500 text-white border-cyan-500 shadow-lg'
                                      : 'border-slate-100 hover:border-cyan-200 hover:bg-cyan-50 text-slate-700'
                                  }`}>
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })()}
                </div>
              )}

              <div className="flex justify-end">
                <Button onClick={handleContinue} disabled={!form.date || !form.time} size="lg" variant="primary" className="px-8">
                  Continuer <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: User Info */}
          {step === 1 && (
            <div ref={step2Ref} className="space-y-6 animate-fade-in-up">
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-violet-600" />
                  Vos informations
                </h3>

                {/* OAuth */}
                <div className="bg-gradient-to-br from-slate-50 to-indigo-50 rounded-2xl p-4 border border-slate-200 mb-5">
                  <p className="text-sm text-slate-600 mb-3 text-center">Connexion rapide</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <button onClick={() => handleOAuth('google')} className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 font-medium text-xs sm:text-sm text-slate-700">
                      <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                      <span className="hidden sm:inline">Google</span>
                    </button>
                    <button onClick={() => handleOAuth('facebook')} className="flex items-center gap-1.5 px-3 py-2 bg-[#1877F2] rounded-lg font-medium text-xs sm:text-sm text-white">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      <span className="hidden sm:inline">Facebook</span>
                    </button>
                    <button onClick={() => handleOAuth('instagram')} className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-lg font-medium text-xs sm:text-sm text-white">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                      <span className="hidden sm:inline">Instagram</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 text-center mt-2">ou remplissez le formulaire</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Nom complet" icon={User} placeholder="Votre nom" value={form.name} onChange={(e) => update('name', e.target.value)} />
                  <Input label="Téléphone" icon={Phone} placeholder="+216 XX XXX XXX" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
                </div>
                <div className="mt-4">
                  <Input label="Email" icon={Mail} type="email" placeholder="votre@email.com" value={form.email} onChange={(e) => update('email', e.target.value)} />
                </div>
                <div className="mt-4">
                  <Textarea label="Motif de la consultation" placeholder="Symptômes, motif de visite..." value={form.reason} onChange={(e) => update('reason', e.target.value)} />
                </div>

                {/* Create Account Option */}
                {!oauthUser && (
                  <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={createAccount}
                        onChange={(e) => setCreateAccount(e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <div>
                        <div className="flex items-center gap-2 text-sm font-medium text-indigo-900">
                          <UserPlus className="w-4 h-4" />
                          Créer un compte patient
                        </div>
                        <p className="text-xs text-indigo-700 mt-1">
                          Gérez vos rendez-vous en ligne et recevez des notifications
                        </p>
                      </div>
                    </label>
                  </div>
                )}

                {oauthUser && (
                  <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <div className="flex items-center gap-2 text-sm font-medium text-emerald-800">
                      <CheckCircle className="w-4 h-4" />
                      Connecté via {oauthUser.provider || 'Google'}
                    </div>
                    <p className="text-xs text-emerald-700 mt-1">
                      Veuillez compléter votre numéro de téléphone ci-dessous
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 flex items-start gap-3">
                <Shield className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-700">Vos données sont sécurisées et utilisées uniquement pour vos rendez-vous.</p>
              </div>

              <div className="flex justify-between gap-4">
                <Button variant="secondary" onClick={() => setStep(0)} className="px-5">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Retour
                </Button>
                <Button onClick={handleSubmit} disabled={!form.name || !form.phone || !form.email || loading} size="lg" variant="primary" className="px-8">
                  {loading ? 'Enregistrement...' : 'Confirmer'} <CheckCircle className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 2 && success && (
            <div ref={step3Ref} className="animate-fade-in-up max-w-sm mx-auto">
              {/* Success header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-1">Rendez-vous confirmé !</h3>
                <p className="text-slate-500 text-sm">Votre rendez-vous a bien été enregistré et confirmé.</p>
              </div>

              {/* Appointment details card */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 text-left mb-4">
                <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">{success.service}</div>
                    <div className="text-sm text-slate-500">Dr. Abir Bouthouri</div>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">Date</span><span className="font-medium">{new Date(success.date + 'T00:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Heure</span><span className="font-medium">{success.time}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Patient</span><span className="font-medium">{success.patientName}</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-500">Statut</span><span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">Confirmé</span></div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-3xl p-4 shadow-xl border border-slate-100 mb-4 overflow-hidden">
                <div className="w-full h-40 rounded-xl overflow-hidden mb-3">
                  <iframe src={doctor.contact.googleMapsEmbed} width="100%" height="100%" style={{ border: 0, filter: 'grayscale(20%)' }} allowFullScreen loading="lazy" title="Map" />
                </div>
                <div className="flex items-center gap-2 text-slate-600 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  {doctor.contact.address}
                </div>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(doctor.contact.address)}`} target="_blank" rel="noopener" className="text-indigo-600 text-sm font-medium flex items-center justify-center gap-1">
                  Itinéraire <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
