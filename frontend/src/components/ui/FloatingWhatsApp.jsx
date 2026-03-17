import { MessageCircle, Phone, X, MessageSquare } from 'lucide-react'
import { useState } from 'react'
import { doctor } from '../../data/mockData'

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false)

  const phoneNumber = doctor.contact.whatsapp.replace(/\s+/g, '').replace(/\+/g, '')
  const defaultMessage = "Bonjour Dr. Abir Bouthouri, je souhaiterais prendre rendez-vous pour une consultation neurologique."
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Options - Elegant & Smaller */}
      {isOpen && (
        <div className="absolute bottom-14 right-0 flex flex-col gap-2 animate-fade-in-up">
          <a
            href={`tel:${doctor.contact.phone}`}
            className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-md border border-slate-100 hover:bg-white hover:shadow-lg transition-all group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-500 flex items-center justify-center shadow-sm">
              <Phone className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-xs font-semibold text-slate-700">Appeler</span>
          </a>
          
          <a
            href={`mailto:${doctor.contact.email}`}
            className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full shadow-md border border-slate-100 hover:bg-white hover:shadow-lg transition-all group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-violet-500 flex items-center justify-center shadow-sm">
              <MessageSquare className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-xs font-semibold text-slate-700">Email</span>
          </a>
        </div>
      )}

      {/* Main Button - Premium Crystal Style */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 transition-all group"
        onClick={(e) => {
          if (isOpen) {
            e.preventDefault()
            setIsOpen(false)
          }
        }}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageCircle className="w-5 h-5" />
        )}
        {/* Shine effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
      </a>
    </div>
  )
}
