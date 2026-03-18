import { useState, useEffect } from 'react'
import { Clock, Save, Plus, X, Check } from 'lucide-react'
import Card, { CardHeader, CardContent } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { scheduleApi } from '../../services/api'

const DAYS = [
  { value: 1, label: 'Lundi' },
  { value: 2, label: 'Mardi' },
  { value: 3, label: 'Mercredi' },
  { value: 4, label: 'Jeudi' },
  { value: 5, label: 'Vendredi' },
  { value: 6, label: 'Samedi' },
]

const ALL_POSSIBLE_SLOTS = [
  '08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30',
  '12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30',
  '16:00','16:30','17:00','17:30',
]

export default function Schedule() {
  const [schedule, setSchedule] = useState({})
  const [activeDay, setActiveDay] = useState(1)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    scheduleApi.getAll().then((rows) => {
      const grouped = {}
      DAYS.forEach(d => { grouped[d.value] = [] })
      rows.forEach((row) => {
        const day = row.day_of_week
        const time = row.time_slot.slice(0, 5)
        if (!grouped[day]) grouped[day] = []
        grouped[day].push(time)
      })
      // Sort each day's slots
      Object.keys(grouped).forEach(d => {
        grouped[d].sort()
      })
      setSchedule(grouped)
    }).catch(console.error)
  }, [])

  const toggleSlot = (slot) => {
    setSchedule((prev) => {
      const daySlots = prev[activeDay] || []
      const updated = daySlots.includes(slot)
        ? daySlots.filter((s) => s !== slot)
        : [...daySlots, slot].sort()
      return { ...prev, [activeDay]: updated }
    })
    setSaved(false)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await scheduleApi.updateDay(activeDay, schedule[activeDay] || [])
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleSaveAll = async () => {
    setSaving(true)
    try {
      for (const day of DAYS) {
        await scheduleApi.updateDay(day.value, schedule[day.value] || [])
      }
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const daySlots = schedule[activeDay] || []

  const getTimeRange = (slots) => {
    if (!slots || slots.length === 0) return 'Fermé'
    const sorted = [...slots].sort()
    // Find morning/afternoon groups
    const morning = sorted.filter(s => s < '13:30')
    const afternoon = sorted.filter(s => s >= '13:30')
    const parts = []
    if (morning.length > 0) parts.push(`${morning[0]} - ${morning[morning.length - 1]}`)
    if (afternoon.length > 0) parts.push(`${afternoon[0]} - ${afternoon[afternoon.length - 1]}`)
    return parts.join(' & ')
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold text-slate-900">Horaires de travail</h1>
          <p className="text-slate-500 text-sm mt-0.5">Gérer les créneaux disponibles pour la prise de rendez-vous</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={handleSaveAll} disabled={saving}>
            <Save className="w-4 h-4 mr-1" />
            {saving ? 'Enregistrement...' : 'Tout enregistrer'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Day selector + summary */}
        <Card>
          <CardHeader>
            <h3 className="text-sm font-semibold text-slate-700">Jours de la semaine</h3>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {DAYS.map((day) => (
                <button
                  key={day.value}
                  onClick={() => { setActiveDay(day.value); setSaved(false) }}
                  className={`w-full px-4 py-3 flex items-center justify-between text-left transition-colors cursor-pointer ${
                    activeDay === day.value
                      ? 'bg-indigo-50 border-l-2 border-indigo-600'
                      : 'hover:bg-slate-50 border-l-2 border-transparent'
                  }`}
                >
                  <div>
                    <div className={`text-sm font-medium ${activeDay === day.value ? 'text-indigo-700' : 'text-slate-700'}`}>
                      {day.label}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {getTimeRange(schedule[day.value])}
                    </div>
                  </div>
                  <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    (schedule[day.value] || []).length > 0
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-slate-100 text-slate-400'
                  }`}>
                    {(schedule[day.value] || []).length} créneaux
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Slot editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-sm font-semibold text-slate-700">
                    {DAYS.find(d => d.value === activeDay)?.label} — Créneaux horaires
                  </h3>
                </div>
                <Button variant={saved ? 'secondary' : 'primary'} size="sm" onClick={handleSave} disabled={saving}>
                  {saved ? <><Check className="w-4 h-4 mr-1" /> Enregistré</> : <><Save className="w-4 h-4 mr-1" /> Enregistrer</>}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="text-xs font-semibold text-slate-500 mb-2">Matin</div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {ALL_POSSIBLE_SLOTS.filter(s => s < '13:30').map((slot) => (
                    <button
                      key={slot}
                      onClick={() => toggleSlot(slot)}
                      className={`py-2 px-1 rounded-xl text-sm font-medium transition-all border-2 cursor-pointer ${
                        daySlots.includes(slot)
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : 'border-slate-200 text-slate-500 hover:border-indigo-300 hover:bg-indigo-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500 mb-2">Après-midi</div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {ALL_POSSIBLE_SLOTS.filter(s => s >= '13:30').map((slot) => (
                    <button
                      key={slot}
                      onClick={() => toggleSlot(slot)}
                      className={`py-2 px-1 rounded-xl text-sm font-medium transition-all border-2 cursor-pointer ${
                        daySlots.includes(slot)
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                          : 'border-slate-200 text-slate-500 hover:border-indigo-300 hover:bg-indigo-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 bg-slate-50 rounded-xl">
                <div className="text-xs font-semibold text-slate-500 mb-2">Créneaux actifs pour {DAYS.find(d => d.value === activeDay)?.label}</div>
                {daySlots.length === 0 ? (
                  <p className="text-sm text-slate-400">Aucun créneau — journée fermée</p>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {daySlots.map((slot) => (
                      <span key={slot} className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600">
                        {slot}
                        <button onClick={() => toggleSlot(slot)} className="text-slate-400 hover:text-red-500 cursor-pointer">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
