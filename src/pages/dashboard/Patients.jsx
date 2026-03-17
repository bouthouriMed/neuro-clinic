import { useState, useEffect } from 'react'
import { Search, Phone, Mail, Plus, Trash2, User, Calendar } from 'lucide-react'
import Card from '../../components/ui/Card'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import { usersApi, appointmentsApi } from '../../services/api'

export default function Patients() {
  const [search, setSearch] = useState('')
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingPatient, setEditingPatient] = useState(null)
  const [showAppointments, setShowAppointments] = useState(null)
  const [patientAppointments, setPatientAppointments] = useState([])
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  })
  const [saving, setSaving] = useState(false)

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
      p.email?.toLowerCase().includes(search.toLowerCase()) ||
      p.phone?.includes(search)
  )

  const getFullName = (patient) => {
    return `${patient.first_name || ''} ${patient.last_name || ''}`.trim() || patient.email
  }

  const deletePatient = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce patient?')) return
    try {
      await usersApi.delete(id)
      setPatients((prev) => prev.filter((p) => p.id !== id))
    } catch (error) {
      console.error('Error deleting patient:', error)
    }
  }

  const openCreateModal = () => {
    setEditingPatient(null)
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: ''
    })
    setShowModal(true)
  }

  const openEditModal = (patient) => {
    setEditingPatient(patient)
    setFormData({
      firstName: patient.first_name || '',
      lastName: patient.last_name || '',
      email: patient.email || '',
      phone: patient.phone || '',
      password: ''
    })
    setShowModal(true)
  }

  const viewPatientAppointments = async (patient) => {
    setShowAppointments(patient)
    try {
      const allAppointments = await appointmentsApi.getAll()
      const filtered = allAppointments.filter(a => 
        a.patient_name?.toLowerCase().includes(getFullName(patient).toLowerCase()) ||
        a.patient_phone === patient.phone
      )
      setPatientAppointments(filtered)
    } catch (error) {
      console.error('Error loading appointments:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      if (editingPatient) {
        await usersApi.update(editingPatient.id, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone
        })
      } else {
        await usersApi.create({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          role: 'patient'
        })
      }
      await loadPatients()
      setShowModal(false)
    } catch (error) {
      console.error('Error saving patient:', error)
      alert(error.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold text-slate-900">Patients</h1>
          <p className="text-slate-500 text-sm mt-0.5">{patients.length} patients enregistrés</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={openCreateModal}>
          Nouveau patient
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Rechercher par nom, email ou téléphone..."
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
            <Card key={patient.id} className="p-4 lg:p-6">
              <div className="flex items-start gap-3 lg:gap-4">
                <Avatar name={getFullName(patient)} size="lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-800 truncate">{getFullName(patient)}</h3>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => viewPatientAppointments(patient)}
                        className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                        title="Voir les RDV"
                      >
                        <Calendar className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => openEditModal(patient)}
                        className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => deletePatient(patient.id)}
                        className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
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

      {/* Create/Edit Modal */}
      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        title={editingPatient ? 'Modifier le patient' : 'Nouveau patient'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Prénom"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              placeholder="Prénom"
              required
            />
            <Input
              label="Nom"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              placeholder="Nom"
              required
            />
          </div>

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="email@exemple.com"
            required={!editingPatient}
            disabled={editingPatient}
          />

          <Input
            label="Téléphone"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            placeholder="XX XXX XXX"
          />

          {!editingPatient && (
            <Input
              label="Mot de passe"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="Mot de passe"
              required={!editingPatient}
            />
          )}

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setShowModal(false)} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" variant="primary" disabled={saving} className="flex-1">
              {saving ? 'Enregistrement...' : editingPatient ? 'Mettre à jour' : 'Créer le patient'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Patient Appointments Modal */}
      <Modal
        isOpen={!!showAppointments}
        onClose={() => setShowAppointments(null)}
        title={`Rendez-vous de ${showAppointments ? getFullName(showAppointments) : ''}`}
        size="lg"
      >
        {patientAppointments.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            Aucun rendez-vous pour ce patient
          </div>
        ) : (
          <div className="space-y-3">
            {patientAppointments.map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div>
                  <div className="font-medium text-slate-800">{apt.service}</div>
                  <div className="text-sm text-slate-500">
                    {new Date(apt.appointment_date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })} à {apt.appointment_time}
                  </div>
                </div>
                <Badge variant={apt.status}>{apt.status}</Badge>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  )
}
