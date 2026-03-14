import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { appointments, timeSlots } from '../../data/mockData'

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function CalendarView() {
  const [weekOffset, setWeekOffset] = useState(0)

  const getWeekDates = () => {
    const today = new Date(2026, 2, 14) // March 14, 2026
    const monday = new Date(today)
    monday.setDate(today.getDate() - today.getDay() + 1 + weekOffset * 7)

    return weekDays.map((day, i) => {
      const date = new Date(monday)
      date.setDate(monday.getDate() + i)
      return {
        day,
        date: date.getDate(),
        month: date.toLocaleDateString('en', { month: 'short' }),
        full: date.toISOString().split('T')[0],
        isToday: date.toISOString().split('T')[0] === '2026-03-14',
      }
    })
  }

  const week = getWeekDates()

  const getAppointmentsForSlot = (date, time) =>
    appointments.filter((a) => a.date === date && a.time === time)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-surface-900">Calendar</h1>
          <p className="text-surface-500 text-sm mt-0.5">Weekly schedule overview</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => setWeekOffset((o) => o - 1)}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setWeekOffset(0)}>
            Today
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
            <div className="grid grid-cols-[80px_repeat(6,1fr)] border-b border-surface-100">
              <div className="px-3 py-3 text-xs font-medium text-surface-400">Time</div>
              {week.map((d) => (
                <div
                  key={d.full}
                  className={`px-3 py-3 text-center border-l border-surface-100 ${
                    d.isToday ? 'bg-primary-50/50' : ''
                  }`}
                >
                  <div className="text-xs text-surface-400 font-medium">{d.day}</div>
                  <div
                    className={`text-lg font-semibold mt-0.5 ${
                      d.isToday ? 'text-primary-600' : 'text-surface-800'
                    }`}
                  >
                    {d.date}
                  </div>
                  <div className="text-[10px] text-surface-400">{d.month}</div>
                </div>
              ))}
            </div>

            {/* Time Slots */}
            {timeSlots.map((time) => (
              <div key={time} className="grid grid-cols-[80px_repeat(6,1fr)] border-b border-surface-50 last:border-0">
                <div className="px-3 py-3 text-xs text-surface-400 font-medium flex items-start">
                  {time}
                </div>
                {week.map((d) => {
                  const slotAppointments = getAppointmentsForSlot(d.full, time)
                  return (
                    <div
                      key={`${d.full}-${time}`}
                      className={`px-2 py-2 border-l border-surface-100 min-h-[52px] ${
                        d.isToday ? 'bg-primary-50/30' : ''
                      }`}
                    >
                      {slotAppointments.map((apt) => (
                        <div
                          key={apt.id}
                          className={`px-2 py-1.5 rounded-lg text-xs mb-1 ${
                            apt.status === 'confirmed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : apt.status === 'pending'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-primary-50 text-primary-700 border border-primary-200'
                          }`}
                        >
                          <div className="font-medium truncate">{apt.patientName}</div>
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
