import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Brain, Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { doctor } from '../../data/mockData'
import { scheduleApi } from '../../services/api'

const DAY_LABELS = { 1: 'Lun', 2: 'Mar', 3: 'Mer', 4: 'Jeu', 5: 'Ven', 6: 'Sam' }

function formatHoursFromSchedule(schedule) {
  // Group days by their time ranges
  const dayRanges = {}
  for (let day = 1; day <= 6; day++) {
    const slots = (schedule[day] || []).sort()
    if (slots.length === 0) continue
    const morning = slots.filter(s => s < '13:30')
    const afternoon = slots.filter(s => s >= '13:30')
    const parts = []
    if (morning.length > 0) parts.push(`${morning[0].replace(':', 'h')} - ${morning[morning.length - 1].replace(':', 'h')}`)
    if (afternoon.length > 0) parts.push(`${afternoon[0].replace(':', 'h')} - ${afternoon[afternoon.length - 1].replace(':', 'h')}`)
    const range = parts.join(' & ')
    dayRanges[day] = range
  }

  // Group consecutive days with same range
  const lines = []
  let i = 1
  while (i <= 6) {
    if (!dayRanges[i]) { i++; continue }
    const range = dayRanges[i]
    let j = i
    while (j + 1 <= 6 && dayRanges[j + 1] === range) j++
    const label = i === j ? DAY_LABELS[i] : `${DAY_LABELS[i]} - ${DAY_LABELS[j]}`
    lines.push({ label, range })
    i = j + 1
  }

  return lines
}

export default function PublicFooter() {
  const [hours, setHours] = useState([
    { label: 'Lun - Ven', range: '8h30 - 12h00 & 14h00 - 16h30' },
    { label: 'Sam', range: '9h00 - 13h30' },
  ])

  useEffect(() => {
    scheduleApi.getAll().then((rows) => {
      const grouped = {}
      rows.forEach((row) => {
        const day = row.day_of_week
        const time = row.time_slot.slice(0, 5)
        if (!grouped[day]) grouped[day] = []
        grouped[day].push(time)
      })
      const lines = formatHoursFromSchedule(grouped)
      if (lines.length > 0) setHours(lines)
    }).catch(console.error)
  }, [])

  return (
    <footer className="bg-slate-900 text-slate-300 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-bold">NeuroClinic</div>
                <div className="text-slate-500 text-xs">Dr. Abir Bouthouri</div>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              Soins neurologiques modernes avec une touche personnelle. Diagnostic expert et traitement pour toutes les conditions neurologiques.
            </p>
            <div className="flex gap-3">
              {(() => {
                const phone = doctor.contact.whatsapp.replace(/\s+/g, '').replace(/\+/g, '')
                const msg = encodeURIComponent("Bonjour Dr. Abir Bouthouri, je souhaiterais prendre rendez-vous pour une consultation neurologique.")
                return (
                  <a href={`https://wa.me/${phone}?text=${msg}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-green-600 flex items-center justify-center transition-all hover:scale-110">
                    <MessageCircle className="w-4 h-4" />
                  </a>
                )
              })()}
              <a href={`mailto:${doctor.contact.email}`} className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-all hover:scale-110">
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <div className="flex items-start gap-2 mt-4 text-sm text-slate-500">
              <Clock className="w-4 h-4 text-teal-500 mt-0.5 shrink-0" />
              <div>
                {hours.map((h, i) => (
                  <div key={i}><span className="font-semibold text-slate-300">{h.label}:</span> {h.range}</div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Liens Rapides</h4>
            <div className="space-y-2">
              {[{ to: '/', label: 'Accueil' }, { to: '/about', label: 'À propos' }, { to: '/services', label: 'Services' }, { to: '/book', label: 'Prendre RDV' }, { to: '/contact', label: 'Contact' }].map((link) => (
                <Link key={link.to} to={link.to} className="block text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all no-underline">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <div className="space-y-2">
              {['Consultation Neurologique', 'Céphalées & Migraines', 'Suivi Épilepsie', 'Troubles de Mémoire', 'Traitement Douleurs Nerveuses'].map((s) => (
                <span key={s} className="block text-sm text-slate-400">{s}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-indigo-400 shrink-0" />
                <span className="text-sm">{doctor.contact.address}</span>
              </div>
              <div className="flex gap-3">
                <Phone className="w-4 h-4 text-indigo-400" />
                <span className="text-sm">{doctor.contact.whatsapp}</span>
              </div>
              <div className="flex gap-3">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span className="text-sm">{doctor.contact.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} NeuroClinic – Dr. Abir Bouthouri. Tous droits réservés.</p>
          <div className="flex gap-4 text-sm text-slate-600">
            <Link to="/data-deletion" className="hover:text-slate-400 transition-colors no-underline">Politique de suppression des données</Link>
            <Link to="/terms" className="hover:text-slate-400 transition-colors no-underline">Conditions d'utilisation</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
