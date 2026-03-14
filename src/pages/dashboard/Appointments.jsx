import { useState } from 'react'
import { Search, Filter, Check, X, MoreHorizontal } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Avatar from '../../components/ui/Avatar'
import Button from '../../components/ui/Button'
import { appointments as initialAppointments } from '../../data/mockData'

const filters = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled']

export default function Appointments() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [appointmentList, setAppointmentList] = useState(initialAppointments)

  const filtered = appointmentList.filter((a) => {
    const matchFilter = activeFilter === 'All' || a.status === activeFilter.toLowerCase()
    const matchSearch =
      a.patientName.toLowerCase().includes(search.toLowerCase()) ||
      a.reason.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const updateStatus = (id, status) => {
    setAppointmentList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-surface-900">Appointments</h1>
          <p className="text-surface-500 text-sm mt-0.5">Manage patient appointments</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input
            type="text"
            placeholder="Search by patient name or reason..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-[10px] bg-white border border-surface-200 text-sm text-surface-700 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500"
          />
        </div>
        <div className="flex gap-1 bg-surface-100 rounded-[10px] p-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeFilter === f
                  ? 'bg-white text-surface-800 shadow-sm'
                  : 'text-surface-500 hover:text-surface-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-100">
                <th className="text-left px-6 py-3 text-xs font-medium text-surface-400 uppercase tracking-wider">Patient</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-surface-400 uppercase tracking-wider">Date</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-surface-400 uppercase tracking-wider">Time</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-surface-400 uppercase tracking-wider">Reason</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-surface-400 uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-surface-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100">
              {filtered.map((apt) => (
                <tr key={apt.id} className="hover:bg-surface-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={apt.patientName} size="sm" />
                      <div>
                        <div className="text-sm font-medium text-surface-800">{apt.patientName}</div>
                        <div className="text-xs text-surface-400">{apt.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-surface-600">
                    {new Date(apt.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-surface-800">{apt.time}</td>
                  <td className="px-6 py-4 text-sm text-surface-500 max-w-[200px] truncate">{apt.reason}</td>
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
                          className="text-primary-600 hover:bg-primary-50"
                        >
                          <Check className="w-4 h-4" /> Done
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-surface-400 text-sm">
              No appointments found.
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
