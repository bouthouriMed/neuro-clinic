import { MapPin, Phone, Mail, Clock, MessageCircle, Sparkles, Send } from 'lucide-react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Input'
import { doctor } from '../../data/mockData'

const contactInfo = [
  { icon: MapPin, label: 'Venez nous voir', value: doctor.contact.address, color: 'from-indigo-500 to-indigo-600' },
  { icon: Phone, label: 'Appelez-nous', value: doctor.contact.whatsapp, color: 'from-teal-500 to-teal-600' },
  { icon: Mail, label: 'Email', value: doctor.contact.email, color: 'from-violet-500 to-purple-600' },
  { icon: Clock, label: 'Horaires', value: 'Lun - Sam: 9h00 - 18h00', color: 'from-amber-500 to-orange-500' },
]

export default function Contact() {
  const phoneNumber = doctor.contact.whatsapp.replace(/\s+/g, '').replace(/\+/g, '')
  const defaultMessage = "Bonjour Dr. Abir Bouthouri, je souhaiterais prendre rendez-vous pour une consultation neurologique."
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`

  return (
    <>
      {/* Hero - Enhanced with modern background */}
      <section className="relative overflow-hidden min-h-[60vh] flex items-center">
        {/* Video-style background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950" />
        <div className="absolute inset-0 dot-pattern opacity-[0.05]" />
        <div className="absolute top-0 right-0 md:w-[600px] w-[250px] md:h-[600px] h-[250px] bg-teal-500/20 rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 md:w-[500px] w-[200px] md:h-[500px] h-[200px] bg-indigo-500/15 rounded-full blur-[120px] animate-morph" />
        <div className="absolute top-1/3 right-1/4 md:w-[300px] w-[150px] md:h-[300px] h-[150px] bg-cyan-500/10 rounded-full blur-[100px]" />
        
        {/* Neural pattern overlay */}
        <div className="absolute inset-0 neural-pattern opacity-10" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 md:py-40">
          <div className="max-w-3xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-semibold text-teal-200 mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              Contactez-nous
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight mb-6">
              Nous{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-indigo-300">contacter</span>
            </h1>
            <p className="text-lg sm:text-xl text-indigo-200/80 leading-relaxed max-w-2xl mx-auto md:mx-0">
              Des questions ou besoin de nous joindre ? Nous sommes là pour vous aider avec tous vos besoins en soins neurologiques.
            </p>
          </div>
        </div>
      </section>

      {/* Content - Enhanced with gradient background */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-teal-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-100/50 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Left — Contact info */}
            <div className="lg:col-span-2 space-y-6">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">{item.label}</div>
                    <div className="text-[13px] text-slate-500 mt-1 leading-relaxed">{item.value}</div>
                  </div>
                </div>
              ))}

              {/* WhatsApp Button - Smaller & Elegant */}
              <div className="flex gap-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline flex-1"
                >
                  <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5 transition-all">
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </div>
                </a>
                
                <a
                  href={`tel:${doctor.contact.phone2}`}
                  className="no-underline flex-1"
                >
                  <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <Phone className="w-4 h-4" />
                    Appeler
                  </div>
                </a>
              </div>

              {/* Map */}
              <div className="mt-4 w-full h-72 rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
                <iframe
                  src={doctor.contact.googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(20%) contrast(1.05)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation - Cabinet de Neurologie Dr Abir Bouthouri"
                />
              </div>
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(doctor.contact.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
              >
                <MapPin className="w-4 h-4" />
                Itinéraire vers le cabinet
              </a>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-slate-200 rounded-2xl p-9 md:p-10">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Envoyez-nous un message</h3>
                <p className="text-sm text-slate-400 mb-8">Remplissez le formulaire ci-dessous et nous vous répondrons dans les 24 heures.</p>

                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input label="Nom complet" placeholder="Votre nom" />
                    <Input label="Téléphone" placeholder="+216 XX XXX XXX" />
                  </div>
                  <Input label="Email" type="email" placeholder="votre@email.com" />
                  <Input label="Sujet" placeholder="Comment pouvons-nous vous aider ?" />
                  <Textarea label="Message" placeholder="Écrivez votre message ici..." />
                  <Button type="submit" size="lg" className="w-full sm:w-auto shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/30 hover:-translate-y-1 transition-all">
                    <Send className="w-4 h-4" />
                    Envoyer le message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}