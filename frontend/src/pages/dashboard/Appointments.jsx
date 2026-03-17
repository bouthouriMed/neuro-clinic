import { useState, useEffect } from 'react'
import { Search, Check, X } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Avatar from '../../components/ui/Avatar'
import Button from '../../components/ui/Button'
import { appointmentsApi } from '../../services/api'

const filters = ['All', 'pending', 'confirmed', 'completed', 'cancelled']

function formatTime(time) {
  if (!time) return ''
  if (typeof time === 'string' && time.includes(':')) {
    const [hours, minutes] = time.split(':')
    return `${hours}:${minutes}`
  }
  return time
}

export default function Appointments() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAppointments()
  }, [])

  const loadAppointments = async () => {
    try {
      const data = await appointmentsApi.getAll()
      setAppointments(data)
    } catch (error) {
      console.error('Error loading appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const filtered = appointments.filter((a) => {
    const matchFilter = activeFilter === 'All' || a.status === activeFilter
    const matchSearch =
      a.patient_name?.toLowerCase().includes(search.toLowerCase()) ||
      a.service?.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const updateStatus = async (id, status) => {
    try {
      await appointmentsApi.update(id, { status })
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      )
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold text-slate-900">Rendez-vous</h1>
          <p className="text-slate-500 text-sm mt-0.5">Gérer les rendez-vous des patients</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher par patient ou motif..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
          />
        </div>
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === f
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {f === 'All' ? 'Tous' : f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-400">Chargement...</div>
      ) : (
        <>
          {/* Table - Desktop */}
          <Card className="hidden lg:block overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Patient</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Heure</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Motif</th>
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Statut</th>
                    <th className="text-right px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={apt.patient_name} size="sm" />
                          <div>
                            <div className="text-sm font-medium text-slate-800">{apt.patient_name}</div>
                            <div className="text-xs text-slate-400">{apt.patient_phone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(apt.appointment_date).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">{formatTime(apt.appointment_time)}</td>
                      <td className="px-6 py-4 text-sm text-slate-500 max-w-[200px] truncate">{apt.service}</td>
                      <td className="px-6 py-4">
                        <Badge variant={apt.status}>{apt.status}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          {apt.status === 'pending' && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateStatus(apt.id, 'confirmed')}
                                className="text-emerald-600 hover:bg-emerald-50"
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateStatus(apt.id, 'cancelled')}
                                className="text-red-500 hover:bg-red-50"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          {apt.status === 'confirmed' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateStatus(apt.id, 'completed')}
                              className="text-indigo-600 hover:bg-indigo-50"
                            >
                              <Check className="w-4 h-4" /> Terminé
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filtered.length === 0 && (
                <div className="py-12 text-center text-slate-400 text-sm">
                  Aucun rendez-vous trouvé.
                </div>
              )}
            </div>
          </Card>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-3">
            {filtered.map((apt) => (
              <Card key={apt.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={apt.patient_name} size="md" />
                    <div>
                      <div className="font-medium text-slate-800">{apt.patient_name}</div>
                      <div className="text-xs text-slate-400">{apt.patient_phone}</div>
                    </div>
                  </div>
                  <Badge variant={apt.status}>{apt.status}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-slate-600">
                    <span>{new Date(apt.appointment_date).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })}</span>
                    <span className="font-medium text-slate-800">{formatTime(apt.appointment_time)}</span>
                  </div>
                </div>
                <div className="text-sm text-slate-500 line-clamp-2">{apt.service}</div>
                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  {apt.status === 'pending' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStatus(apt.id, 'confirmed')}
                        className="flex-1 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                      >
                        <Check className="w-4 h-4 mr-1" /> Confirmer
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStatus(apt.id, 'cancelled')}
                        className="flex-1 text-red-500 border-red-200 hover:bg-red-50"
                      >
                        <X className="w-4 h-4 mr-1" /> Annuler
                      </Button>
                    </>
                  )}
                  {apt.status === 'confirmed' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateStatus(apt.id, 'completed')}
                      className="flex-1 text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                    >
                      <Check className="w-4 h-4 mr-1" /> Terminer
                    </Button>
                  )}
                  {apt.status === 'completed' && (
                    <span className="text-sm text-slate-400 py-2">Terminé</span>
                  )}
                  {apt.status === 'cancelled' && (
                    <span className="text-sm text-slate-400 py-2">Annulé</span>
                  )}
                </div>
              </Card>
            ))}
            {filtered.length === 0 && (
              <Card className="p-8 text-center text-slate-400">
                Aucun rendez-vous trouvé.
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  )
}
