import { MapPin, Phone, Mail, Clock, MessageCircle, Sparkles, Send } from 'lucide-react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Input'
import { doctor } from '../../data/mockData'

const contactInfo = [
  { icon: MapPin, label: 'Venez nous voir', value: doctor.contact.address, color: 'from-indigo-500 to-indigo-600' },
  { icon: Phone, label: 'Appelez-nous', value: doctor.contact.phone, color: 'from-teal-500 to-teal-600' },
  { icon: Mail, label: 'Email', value: doctor.contact.email, color: 'from-violet-500 to-purple-600' },
  { icon: Clock, label: 'Horaires', value: 'Lun - Sam: 9h00 - 18h00', color: 'from-amber-500 to-orange-500' },
]

export default function Contact() {
  const phoneNumber = doctor.contact.whatsapp.replace(/\s+/g, '').replace(/\+/g, '')
  const defaultMessage = "Bonjour Dr. Abir Bouthouri, je souhaiterais prendre rendez-vous pour une consultation neurologique."
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: '20px' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30" />
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-indigo-400/10 rounded-full blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-sm text-xs font-semibold text-indigo-600 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Contactez-nous
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-5">
              Nous{' '}
              <span className="text-gradient">contacter</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Des questions ou besoin de nous joindre ? Nous sommes là pour vous aider avec tous vos besoins en soins neurologiques.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Left — Contact info */}
            <div className="lg:col-span-2 space-y-6">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-lg hover:shadow-slate-200/40 transition-all duration-300 group"
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

              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline"
                >
                  <Button variant="whatsapp" size="lg" className="w-full shadow-lg shadow-green-500/25 hover:shadow-green-500/30 hover:-translate-y-1 transition-all">
                    <MessageCircle className="w-5 h-5" />
                    Discuter sur WhatsApp
                  </Button>
                </a>
              </div>

              {/* Additional contact option */}
              <div className="pt-2">
                <a
                  href={`tel:${doctor.contact.phone2}`}
                  className="no-underline"
                >
                  <Button variant="secondary" size="lg" className="w-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                    <Phone className="w-5 h-5" />
                    Appel direct: {doctor.contact.phone2}
                  </Button>
                </a>
              </div>

              {/* Map placeholder */}
              <div className="mt-4 w-full h-56 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <span className="text-sm text-slate-400 font-medium">Intégration Google Maps</span>
                  <p className="text-xs text-slate-300 mt-1">La carte interactive apparaîtra ici</p>
                </div>
              </div>
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