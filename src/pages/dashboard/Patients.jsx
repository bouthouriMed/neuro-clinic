import { useState } from 'react'
import { Search, Phone, Mail } from 'lucide-react'
import Card from '../../components/ui/Card'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import { patients } from '../../data/mockData'

export default function Patients() {
  const [search, setSearch] = useState('')

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.condition.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-surface-900">Patients</h1>
        <p className="text-surface-500 text-sm mt-0.5">{patients.length} registered patients</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
        <input
          type="text"
          placeholder="Search patients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-[10px] bg-white border border-surface-200 text-sm text-surface-700 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((patient) => (
          <Card key={patient.id} hover className="p-6">
            <div className="flex items-start gap-4">
              <Avatar name={patient.name} size="lg" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-surface-800 truncate">{patient.name}</h3>
                <Badge variant="default" className="mt-1">{patient.condition}</Badge>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-surface-500">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-surface-500">
                    <Mail className="w-3.5 h-3.5" />
                    <span className="truncate">{patient.email}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-surface-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-surface-400">Total Visits</div>
                    <div className="text-sm font-semibold text-surface-800">{patient.totalVisits}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-surface-400">Last Visit</div>
                    <div className="text-sm font-medium text-surface-600">
                      {new Date(patient.lastVisit).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-surface-400 text-sm">
          No patients found.
        </div>
      )}
    </div>
  )
}
