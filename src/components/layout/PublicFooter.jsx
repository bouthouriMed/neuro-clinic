import { Link } from 'react-router-dom'
import { Brain, Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { doctor } from '../../data/mockData'

export default function PublicFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
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
            <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
              <Clock className="w-4 h-4 text-teal-500" />
              <span>Lun - Sam: 9h00 - 18h00</span>
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
                <span className="text-sm">{doctor.contact.phone}</span>
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
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Politique de confidentialité</span>
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Conditions d'utilisation</span>
          </div>
        </div>
      </div>
    </footer>
  )
}