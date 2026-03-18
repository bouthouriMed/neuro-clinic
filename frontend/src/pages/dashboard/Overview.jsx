import { useState, useEffect } from 'react'
import { Calendar, Users, CheckCircle, UserX, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import StatCard from '../../components/ui/StatCard'
import Card, { CardHeader, CardContent } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Avatar from '../../components/ui/Avatar'
import Button from '../../components/ui/Button'
import { appointmentsApi, usersApi } from '../../services/api'

function toLocalDateStr(date) {
  const d = new Date(date)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function formatTime(time) {
  if (!time) return ''
  if (typeof time === 'string' && time.includes(':')) {
    const [hours, minutes] = time.split(':')
    return `${hours}:${minutes}`
  }
  return time
}

export default function Overview() {
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsData, patientsData] = await Promise.all([
          appointmentsApi.getAll(),
          usersApi.getAll()
        ])
        setAppointments(appointmentsData)
        setPatients(patientsData.filter(p => p.role === 'patient'))
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const today = toLocalDateStr(new Date())
  const todayAppointments = appointments.filter((a) => {
    const aptDate = a.appointment_date ? a.appointment_date.split('T')[0] : ''
    return aptDate === today
  })
  const completedCount = appointments.filter((a) => a.status === 'completed').length
  const noShowCount = appointments.filter((a) => a.status === 'no_show').length

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 p-6 lg:p-8 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] opacity-30" />
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-indigo-400/20 rounded-full blur-3xl" />
        <div className="relative">
          <h1 className="text-xl lg:text-2xl font-semibold">Bonjour, Dr. Bouthouri</h1>
          <p className="text-indigo-100 mt-1 text-sm lg:text-base">Voici votre programme pour aujourd'hui.</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4">
        <div onClick={() => navigate(`/dashboard/appointments?date=${today}`)} className="cursor-pointer">
          <StatCard label="RDV Aujourd'hui" value={todayAppointments.length} icon={Calendar} color="primary" trend={12} />
        </div>
        <div onClick={() => navigate('/dashboard/patients')} className="cursor-pointer">
          <StatCard label="Total patients" value={patients.length} icon={Users} color="accent" trend={8} />
        </div>
        <div onClick={() => navigate('/dashboard/appointments?filter=completed')} className="cursor-pointer">
          <StatCard label="Terminés" value={completedCount} icon={CheckCircle} color="emerald" />
        </div>
        <div onClick={() => navigate('/dashboard/appointments?filter=no_show')} className="cursor-pointer">
          <StatCard label="Absents" value={noShowCount} icon={UserX} color="amber" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-slate-800">Programme du jour</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
              <Link to={`/dashboard/appointments?date=${today}`}>
                <Button variant="ghost" size="sm" className="text-indigo-600">
                  Voir tout <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="px-6 py-8 text-center text-slate-400 text-sm">Chargement...</div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {todayAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      onClick={() => navigate(`/dashboard/appointments?date=${today}`)}
                      className="px-4 lg:px-6 py-3 lg:py-4 flex items-center gap-3 lg:gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
                    >
                      <div className="w-12 lg:w-14 text-center shrink-0">
                        <span className="text-sm font-semibold text-slate-800">{formatTime(apt.appointment_time)}</span>
                      </div>
                      <Avatar name={apt.patient_name} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-800 truncate">{apt.patient_name}</div>
                        <div className="text-xs text-slate-400 truncate hidden sm:block">{apt.service}</div>
                      </div>
                      <Badge variant={apt.status} className="shrink-0">
                        {apt.status === 'confirmed' ? 'confirmé' : apt.status === 'completed' ? 'terminé' : apt.status === 'no_show' ? 'absent' : apt.status === 'cancelled' ? 'annulé' : apt.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
              {!loading && todayAppointments.length === 0 && (
                <div className="px-6 py-8 text-center text-slate-400 text-sm">
                  Aucun rendez-vous prévu aujourd'hui
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card className="overflow-hidden">
            <CardHeader className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-800">Activité récente</h2>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="px-6 py-4 text-center text-slate-400 text-sm">Chargement...</div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {appointments.slice(0, 4).map((apt) => (
                    <div
                      key={apt.id}
                      onClick={() => navigate(`/dashboard/appointments?search=${encodeURIComponent(apt.patient_name)}`)}
                      className="px-4 lg:px-6 py-3 hover:bg-slate-50/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm text-slate-700 leading-snug truncate">{apt.patient_name}</p>
                          <span className="text-xs text-slate-400 block">
                            {new Date(apt.appointment_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} à {formatTime(apt.appointment_time)}
                          </span>
                        </div>
                        <Badge variant={apt.status} className="shrink-0 text-[10px]">
                          {apt.status === 'confirmed' ? 'confirmé' : apt.status === 'completed' ? 'terminé' : apt.status === 'no_show' ? 'absent' : apt.status === 'cancelled' ? 'annulé' : apt.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
