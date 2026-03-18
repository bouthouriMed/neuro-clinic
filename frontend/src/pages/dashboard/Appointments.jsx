import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Check, X, Plus, Calendar, Trash2, Phone, MessageCircle, Pencil, MoreVertical, UserX } from 'lucide-react'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import Avatar from '../../components/ui/Avatar'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'
import { appointmentsApi } from '../../services/api'

const filters = ['All', 'confirmed', 'completed', 'no_show', 'cancelled']

const statusLabels = {
  All: 'Tous',
  confirmed: 'Confirmé',
  completed: 'Terminé',
  no_show: 'Absent',
  cancelled: 'Annulé',
  pending: 'En attente',
}

const services = [
  'Consultation neurologique',
  'Suivi neurologique',
  'Électromyographie (EMG)',
  'Électroencéphalographie (EEG)',
  'Échographie Doppler',
  'IRM',
  'Scanner cérébral',
  'Autre'
]

function formatTime(time) {
  if (!time) return ''
  if (typeof time === 'string' && time.includes(':')) {
    const [hours, minutes] = time.split(':')
    return `${hours}:${minutes}`
  }
  return time
}

export default function Appointments() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeFilter, setActiveFilter] = useState(searchParams.get('filter') || 'All')
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [dateFilter, setDateFilter] = useState(searchParams.get('date') || '')
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState(null)
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  })
  const [saving, setSaving] = useState(false)
  const [availableSlots, setAvailableSlots] = useState([])
  const [openMenuId, setOpenMenuId] = useState(null)
  const menuRef = useRef(null)

  useEffect(() => {
    loadAppointments()
  }, [])

  useEffect(() => {
    if (formData.date) {
      loadAvailableSlots(formData.date)
    }
  }, [formData.date])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
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

  const loadAvailableSlots = async (date) => {
    try {
      const data = await appointmentsApi.getAvailableSlots(date)
      setAvailableSlots(data.slots)
    } catch (error) {
      console.error('Error loading slots:', error)
    }
  }

  const filtered = appointments.filter((a) => {
    const matchFilter = activeFilter === 'All' || a.status === activeFilter
    const matchSearch =
      a.patient_name?.toLowerCase().includes(search.toLowerCase()) ||
      a.service?.toLowerCase().includes(search.toLowerCase()) ||
      a.patient_phone?.includes(search)
    const matchDate = !dateFilter || (a.appointment_date && a.appointment_date.split('T')[0] === dateFilter)
    return matchFilter && matchSearch && matchDate
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

  const deleteAppointment = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous?')) return
    try {
      await appointmentsApi.delete(id)
      setAppointments((prev) => prev.filter((a) => a.id !== id))
    } catch (error) {
      console.error('Error deleting appointment:', error)
    }
  }

  const formatPhoneForWhatsApp = (phone) => {
    if (!phone) return ''
    let cleaned = phone.replace(/[\s\-()]/g, '')
    if (!cleaned.startsWith('+') && !cleaned.startsWith('216')) {
      cleaned = '216' + cleaned
    }
    return cleaned.replace('+', '')
  }

  const sendWhatsApp = (apt) => {
    const phone = formatPhoneForWhatsApp(apt.patient_phone)
    const date = new Date(apt.appointment_date + 'T00:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
    const time = formatTime(apt.appointment_time)
    const msg = encodeURIComponent(
      `Bonjour ${apt.patient_name},\n\nNous confirmons votre rendez-vous au cabinet de neurologie Dr. Abir Bouthouri :\n\n📅 ${date}\n🕐 ${time}\n📍 Avenue Ibn Eljazzar, Centre médical 'Le carré Blanc', 8ème étage, bureau B82\n\nMerci de nous contacter en cas d'empêchement.\nCordialement, Cabinet de Neurologie`
    )
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank')
  }

  const callPatient = (apt) => {
    window.open(`tel:${apt.patient_phone}`, '_self')
  }

  const openCreateModal = () => {
    setEditingAppointment(null)
    setFormData({
      patientName: '',
      patientPhone: '',
      patientEmail: '',
      service: '',
      date: '',
      time: '',
      notes: ''
    })
    setShowModal(true)
  }

  const openEditModal = (apt) => {
    setEditingAppointment(apt)
    setFormData({
      patientName: apt.patient_name || '',
      patientPhone: apt.patient_phone || '',
      patientEmail: apt.patient_email || '',
      service: apt.service || '',
      date: apt.appointment_date || '',
      time: apt.appointment_time ? formatTime(apt.appointment_time) : '',
      notes: apt.notes || ''
    })
    setShowModal(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    
    try {
      if (editingAppointment) {
        await appointmentsApi.update(editingAppointment.id, {
          patientName: formData.patientName,
          patientPhone: formData.patientPhone,
          patientEmail: formData.patientEmail,
          service: formData.service,
          date: formData.date,
          time: formData.time,
          notes: formData.notes
        })
      } else {
        await appointmentsApi.create(formData)
      }
      await loadAppointments()
      setShowModal(false)
    } catch (error) {
      console.error('Error saving appointment:', error)
      alert(error.message)
    } finally {
      setSaving(false)
    }
  }

  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold text-slate-900">Rendez-vous</h1>
          <p className="text-slate-500 text-sm mt-0.5">Gérer les rendez-vous des patients</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={openCreateModal}>
          Nouveau RDV
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher par patient, service ou téléphone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
          />
        </div>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="pl-10 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
          />
          {dateFilter && (
            <button
              onClick={() => setDateFilter('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
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
              {statusLabels[f] || f}
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
                    <th className="text-left px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Service</th>
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
                        {new Date(apt.appointment_date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-800">{formatTime(apt.appointment_time)}</td>
                      <td className="px-6 py-4 text-sm text-slate-500 max-w-[200px] truncate">{apt.service}</td>
                      <td className="px-6 py-4">
                        <Badge variant={apt.status}>{statusLabels[apt.status] || apt.status}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          {/* Quick contact actions always visible */}
                          <button
                            onClick={() => sendWhatsApp(apt)}
                            title="Envoyer WhatsApp"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-green-600 bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => callPatient(apt)}
                            title="Appeler"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
                          >
                            <Phone className="w-4 h-4" />
                          </button>

                          {/* More actions dropdown */}
                          <div className="relative" ref={openMenuId === apt.id ? menuRef : null}>
                            <button
                              onClick={() => setOpenMenuId(openMenuId === apt.id ? null : apt.id)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            {openMenuId === apt.id && (
                              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-50 animate-fade-in-up">
                                {apt.status === 'confirmed' && (
                                  <>
                                    <button
                                      onClick={() => { updateStatus(apt.id, 'completed'); setOpenMenuId(null) }}
                                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                                    >
                                      <Check className="w-4 h-4" /> Terminé
                                    </button>
                                    <button
                                      onClick={() => { updateStatus(apt.id, 'no_show'); setOpenMenuId(null) }}
                                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-orange-600 hover:bg-orange-50 transition-colors cursor-pointer"
                                    >
                                      <UserX className="w-4 h-4" /> Absent
                                    </button>
                                    <button
                                      onClick={() => { updateStatus(apt.id, 'cancelled'); setOpenMenuId(null) }}
                                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                    >
                                      <X className="w-4 h-4" /> Annuler
                                    </button>
                                    <div className="h-px bg-slate-100 my-1" />
                                  </>
                                )}
                                <button
                                  onClick={() => { deleteAppointment(apt.id); setOpenMenuId(null) }}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" /> Supprimer
                                </button>
                              </div>
                            )}
                          </div>
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
                  <Badge variant={apt.status}>{statusLabels[apt.status] || apt.status}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-slate-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(apt.appointment_date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                    </span>
                    <span className="font-medium text-slate-800">{formatTime(apt.appointment_time)}</span>
                  </div>
                </div>
                <div className="text-sm text-slate-500 line-clamp-2">{apt.service}</div>
                {/* Contact actions */}
                <div className="flex gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => sendWhatsApp(apt)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 active:scale-95 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </button>
                  <button
                    onClick={() => callPatient(apt)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 active:scale-95 transition-all cursor-pointer"
                  >
                    <Phone className="w-4 h-4" /> Appeler
                  </button>
                </div>

                {/* Status & edit actions */}
                <div className="flex gap-2">
                  {apt.status === 'confirmed' && (
                    <>
                      <Button variant="outline" size="sm" onClick={() => updateStatus(apt.id, 'completed')} className="flex-1 text-emerald-600 border-emerald-200 hover:bg-emerald-50">
                        <Check className="w-4 h-4 mr-1" /> Terminé
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => updateStatus(apt.id, 'no_show')} className="flex-1 text-orange-600 border-orange-200 hover:bg-orange-50">
                        <UserX className="w-4 h-4 mr-1" /> Absent
                      </Button>
                    </>
                  )}
                  {apt.status === 'completed' && (
                    <span className="text-sm text-slate-400 py-2">Terminé</span>
                  )}
                  {apt.status === 'no_show' && (
                    <span className="text-sm text-orange-500 py-2">Absent</span>
                  )}
                  {apt.status === 'cancelled' && (
                    <span className="text-sm text-slate-400 py-2">Annulé</span>
                  )}
                  <button
                    onClick={() => openEditModal(apt)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteAppointment(apt.id)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
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

      {/* Create/Edit Modal */}
      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        title={editingAppointment ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nom du patient"
              value={formData.patientName}
              onChange={(e) => setFormData({...formData, patientName: e.target.value})}
              placeholder="Nom complet"
              required
              disabled={!!editingAppointment}
            />
            <Input
              label="Téléphone"
              value={formData.patientPhone}
              onChange={(e) => setFormData({...formData, patientPhone: e.target.value})}
              placeholder="XX XXX XXX"
              required
              disabled={!!editingAppointment}
            />
          </div>
          
          <Input
            label="Email (optionnel)"
            type="email"
            value={formData.patientEmail}
            onChange={(e) => setFormData({...formData, patientEmail: e.target.value})}
            placeholder="email@exemple.com"
            disabled={!!editingAppointment}
          />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Service</label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({...formData, service: e.target.value})}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
              required
            >
              <option value="">Sélectionner un service</option>
              {services.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              min={getTodayDate()}
              required
            />
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Heure</label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
                required
              >
                <option value="">Sélectionner</option>
                {availableSlots.length > 0 ? availableSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                )) : (
                  <>
                    <option value="08:30">08:30</option>
                    <option value="09:00">09:00</option>
                    <option value="09:30">09:30</option>
                    <option value="10:00">10:00</option>
                    <option value="10:30">10:30</option>
                    <option value="11:00">11:00</option>
                    <option value="11:30">11:30</option>
                    <option value="14:00">14:00</option>
                    <option value="14:30">14:30</option>
                    <option value="15:00">15:00</option>
                    <option value="15:30">15:30</option>
                    <option value="16:00">16:00</option>
                    <option value="16:30">16:30</option>
                    <option value="17:00">17:00</option>
                  </>
                )}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Notes (optionnel)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Observations..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setShowModal(false)} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" variant="primary" disabled={saving} className="flex-1">
              {saving ? 'Enregistrement...' : editingAppointment ? 'Mettre à jour' : 'Créer le RDV'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
