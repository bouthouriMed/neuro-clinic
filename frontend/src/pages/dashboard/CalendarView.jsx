import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { appointmentsApi } from '../../services/api'

const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']

const timeSlots = [
  '08:30', '09:00', '09:30', '10:00', '10:30', '11:00',
  '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
]

function toLocalDateStr(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export default function CalendarView() {
  const navigate = useNavigate()
  const [weekOffset, setWeekOffset] = useState(0)
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    appointmentsApi.getAll().then(setAppointments).catch(console.error)
  }, [])

  const todayStr = toLocalDateStr(new Date())

  const getWeekDates = () => {
    const today = new Date()
    const monday = new Date(today)
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7) + weekOffset * 7)

    return weekDays.map((day, i) => {
      const date = new Date(monday)
      date.setDate(monday.getDate() + i)
      const full = toLocalDateStr(date)
      return {
        day,
        date: date.getDate(),
        month: date.toLocaleDateString('fr', { month: 'short' }),
        full,
        isToday: full === todayStr,
      }
    })
  }

  const week = getWeekDates()

  const getAppointmentsForSlot = (date, time) =>
    appointments.filter((a) => {
      const aptDate = a.appointment_date ? a.appointment_date.split('T')[0] : ''
      const aptTime = a.appointment_time ? a.appointment_time.slice(0, 5) : ''
      return aptDate === date && aptTime === time && a.status !== 'cancelled'
    })

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold text-slate-900">Calendrier</h1>
          <p className="text-slate-500 text-sm mt-0.5">Aperçu hebdomadaire</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => setWeekOffset((o) => o - 1)}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setWeekOffset(0)}>
            Aujourd'hui
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setWeekOffset((o) => o + 1)}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="grid grid-cols-[80px_repeat(6,1fr)] border-b border-slate-100">
              <div className="px-3 py-3 text-xs font-medium text-slate-400">Heure</div>
              {week.map((d) => (
                <div
                  key={d.full}
                  className={`px-3 py-3 text-center border-l border-slate-100 ${
                    d.isToday ? 'bg-indigo-50/50' : ''
                  }`}
                >
                  <div className="text-xs text-slate-400 font-medium">{d.day}</div>
                  <div
                    className={`text-lg font-semibold mt-0.5 ${
                      d.isToday ? 'text-indigo-600' : 'text-slate-800'
                    }`}
                  >
                    {d.date}
                  </div>
                  <div className="text-[10px] text-slate-400">{d.month}</div>
                </div>
              ))}
            </div>

            {/* Time Slots */}
            {timeSlots.map((time) => (
              <div key={time} className="grid grid-cols-[80px_repeat(6,1fr)] border-b border-slate-50 last:border-0">
                <div className="px-3 py-3 text-xs text-slate-400 font-medium flex items-start">
                  {time}
                </div>
                {week.map((d) => {
                  const slotAppointments = getAppointmentsForSlot(d.full, time)
                  return (
                    <div
                      key={`${d.full}-${time}`}
                      className={`px-2 py-2 border-l border-slate-100 min-h-[52px] ${
                        d.isToday ? 'bg-indigo-50/30' : ''
                      }`}
                    >
                      {slotAppointments.map((apt) => (
                        <div
                          key={apt.id}
                          onClick={() => navigate(`/dashboard/appointments?search=${encodeURIComponent(apt.patient_name)}`)}
                          className={`px-2 py-1.5 rounded-lg text-xs mb-1 cursor-pointer hover:shadow-sm transition-shadow ${
                            apt.status === 'confirmed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                              : apt.status === 'pending'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                              : 'bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100'
                          }`}
                        >
                          <div className="font-medium truncate">{apt.patient_name}</div>
                        </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
