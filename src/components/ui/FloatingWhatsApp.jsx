import { MessageCircle, Phone, X, MessageSquare } from 'lucide-react'
import { useState } from 'react'
import { doctor } from '../../data/mockData'

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false)

  const phoneNumber = doctor.contact.whatsapp.replace(/\s+/g, '')
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Options */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 flex flex-col gap-3 animate-fade-in-up">
          <a
            href={`tel:${doctor.contact.phone}`}
            className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-3 rounded-full shadow-lg shadow-slate-200/50 border border-white/50 hover:bg-white transition-all group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-700">Appeler</span>
          </a>
          
          <a
            href={`mailto:${doctor.contact.email}`}
            className="flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-3 rounded-full shadow-lg shadow-slate-200/50 border border-white/50 hover:bg-white transition-all group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-700">Email</span>
          </a>
        </div>
      )}

      {/* Main Button - Round & Transparent */}
      <a
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-110 transition-all group"
        onClick={(e) => {
          if (isOpen) {
            e.preventDefault()
            setIsOpen(false)
          }
        }}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </a>
    </div>
  )
}