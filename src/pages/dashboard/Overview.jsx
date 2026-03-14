import { Calendar, Users, Clock, TrendingUp, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import StatCard from '../../components/ui/StatCard'
import Card, { CardHeader, CardContent } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Avatar from '../../components/ui/Avatar'
import Button from '../../components/ui/Button'
import { appointments, patients, notifications } from '../../data/mockData'

export default function Overview() {
  const todayAppointments = appointments.filter((a) => a.date === '2026-03-14')
  const pendingCount = appointments.filter((a) => a.status === 'pending').length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Bonjour, Dr. Bouthouri</h1>
        <p className="text-slate-500 mt-1">Voici votre programme pour aujourd'hui.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="RDV Aujourd'hui" value={todayAppointments.length} icon={Calendar} color="primary" trend={12} />
        <StatCard label="Total Patients" value={patients.length} icon={Users} color="accent" trend={8} />
        <StatCard label="En attente" value={pendingCount} icon={Clock} color="amber" />
        <StatCard label="Taux de réussite" value="94%" icon={TrendingUp} color="emerald" trend={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-800">Programme du jour</h2>
                <p className="text-xs text-slate-400 mt-0.5">14 Mars 2026</p>
              </div>
              <Link to="/dashboard/appointments">
                <Button variant="ghost" size="sm">
                  Voir tout <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {todayAppointments.map((apt) => (
                  <div key={apt.id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
                    <div className="w-14 text-center shrink-0">
                      <span className="text-sm font-semibold text-slate-800">{apt.time}</span>
                    </div>
                    <Avatar name={apt.patientName} size="sm" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-800 truncate">{apt.patientName}</div>
                      <div className="text-xs text-slate-400 truncate">{apt.reason}</div>
                    </div>
                    <Badge variant={apt.status}>{apt.status === 'confirmed' ? 'confirmé' : apt.status === 'pending' ? 'en attente' : 'annulé'}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Notifications */}
        <div>
          <Card>
            <CardHeader className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-800">Notifications</h2>
              <Link to="/dashboard/notifications">
                <Button variant="ghost" size="sm">Tout</Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {notifications.slice(0, 4).map((notif) => (
                  <div
                    key={notif.id}
                    className={`px-6 py-3.5 hover:bg-slate-50/50 transition-colors ${
                      !notif.read ? 'bg-indigo-50/30' : ''
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {!notif.read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p className="text-sm text-slate-700 leading-snug">{notif.message}</p>
                        <span className="text-xs text-slate-400 mt-1">{notif.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}