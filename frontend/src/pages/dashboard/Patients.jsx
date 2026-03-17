import { useState, useEffect } from 'react'
import { Search, Phone, Mail } from 'lucide-react'
import Card from '../../components/ui/Card'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import { usersApi } from '../../services/api'

export default function Patients() {
  const [search, setSearch] = useState('')
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPatients()
  }, [])

  const loadPatients = async () => {
    try {
      const data = await usersApi.getAll()
      setPatients(data.filter(p => p.role === 'patient'))
    } catch (error) {
      console.error('Error loading patients:', error)
    } finally {
      setLoading(false)
    }
  }

  const filtered = patients.filter(
    (p) =>
      p.first_name?.toLowerCase().includes(search.toLowerCase()) ||
      p.last_name?.toLowerCase().includes(search.toLowerCase()) ||
      p.email?.toLowerCase().includes(search.toLowerCase())
  )

  const getFullName = (patient) => {
    return `${patient.first_name || ''} ${patient.last_name || ''}`.trim() || patient.email
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      <div>
        <h1 className="text-xl lg:text-2xl font-semibold text-slate-900">Patients</h1>
        <p className="text-slate-500 text-sm mt-0.5">{patients.length} patients enregistrés</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Rechercher patients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
        />
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-400">Chargement...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((patient) => (
            <Card key={patient.id} hover className="p-4 lg:p-6">
              <div className="flex items-start gap-3 lg:gap-4">
                <Avatar name={getFullName(patient)} size="lg" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-800 truncate">{getFullName(patient)}</h3>
                  <Badge variant="default" className="mt-1">Patient</Badge>

                  <div className="mt-3 lg:mt-4 space-y-2">
                    {patient.phone && (
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{patient.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Mail className="w-3.5 h-3.5" />
                      <span className="truncate">{patient.email}</span>
                    </div>
                  </div>

                  <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-slate-100">
                    <div className="text-xs text-slate-400">
                      Membre depuis {new Date(patient.created_at).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="py-12 text-center text-slate-400 text-sm">
          Aucun patient trouvé.
        </div>
      )}
    </div>
  )
}
