import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  ArrowRight,
  Clock,
  Activity,
  Zap,
  BookOpen,
  Waves,
  Move,
  Sparkles,
  Shield,
  Wind,
  Smile,
  Heart,
  ChevronDown,
} from "lucide-react";
import Button from "../../components/ui/Button";
import PulsingCTA from "../../components/ui/PulsingCTA";
import ScrollReveal from "../../components/ScrollReveal";
import { services } from "../../data/mockData";

const iconMap = {
  Brain,
  Zap,
  Activity,
  BookOpen,
  Waves,
  Move,
  Shield,
  Heart,
  Wind,
  Smile,
};

const gradients = [
  "from-indigo-500 to-indigo-600",
  "from-violet-500 to-purple-600",
  "from-teal-500 to-teal-600",
  "from-blue-500 to-blue-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-teal-600",
  "from-cyan-500 to-blue-600",
  "from-fuchsia-500 to-purple-600",
  "from-orange-500 to-red-600",
  "from-sky-500 to-indigo-600",
  "from-lime-500 to-green-600",
  "from-rose-500 to-red-600",
  "from-violet-500 to-fuchsia-600",
  "from-indigo-500 to-cyan-600",
  "from-purple-500 to-pink-600",
];

function AnimatedStat({ end, suffix = "", label, delay }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const totalDuration = 2000;
      const incrementTime = totalDuration / end;

      const interval = setInterval(() => {
        start += 1;
        if (start >= end) {
          setCount(end);
          clearInterval(interval);
        } else {
          setCount(start);
        }
      }, incrementTime);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [end, delay]);

  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-indigo-300 mt-1">{label}</div>
    </div>
  );
}

function ServiceCard({ service, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = iconMap[service.icon] || Brain;

  return (
    <ScrollReveal delay={index * 100}>
      <div
        className="bg-white border border-slate-200 rounded-2xl group p-6 hover:shadow-xl hover:shadow-indigo-200/30 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">{service.duration}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
          {service.title}
        </h3>

        <div
          className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-40 mt-3" : "max-h-0"}`}
        >
          <p className="text-sm text-slate-500 leading-relaxed">
            {service.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span
            className={`text-xs font-medium text-indigo-500 flex items-center gap-1 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          >
            {isExpanded ? "Moins" : "Plus"}
            <ChevronDown className="w-3.5 h-3.5" />
          </span>

          {!isExpanded && (
            <Link
              to="/book"
              className="no-underline"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="secondary"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Réserver
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          )}
        </div>

        {/* Progress bar on hover */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl" />
      </div>
    </ScrollReveal>
  );
}

export default function Services() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950" />
        <div className="absolute inset-0 dot-pattern opacity-[0.05]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px] animate-morph" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 md:py-40">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-semibold text-indigo-200 mb-6 backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                Notre Expertise
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-6">
                Soins neurologiques{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-300 to-violet-300">
                  complets
                </span>
              </h1>
              <p className="text-base md:text-lg text-indigo-200/80 leading-relaxed max-w-2xl mx-auto">
                Plus de 10 ans d’expérience en Neurologie. Une
                expertise à l’échelle nationale et internationale. Une prise en
                charge moderne et un suivi continu. Parce qu’ici, chaque patient
                est unique et au cœur de notre engagement.
              </p>
            </ScrollReveal>

            {/* Animated Stats */}
            <ScrollReveal delay={200}>
              <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-10 pt-8 border-t border-white/10">
                <AnimatedStat
                  end={13}
                  suffix=""
                  label="Années exp"
                  delay={400}
                />
                <AnimatedStat
                  end={1000}
                  suffix="+"
                  label="Patients"
                  delay={600}
                />
                <AnimatedStat
                  end={98}
                  suffix="%"
                  label="Satisfaction"
                  delay={800}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services Introduction */}
      <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-indigo-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-100/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-violet-100/50 rounded-full blur-[80px]" />

        <div className="max-w-3xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Nos Services Spécialisés
            </h2>
            <p className="text-slate-500 text-lg">
              Découvrez notre gamme complète de services neurologiques conçus
              pour votre bien-être. Cliquez sur chaque service pour en savoir
              plus.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gradient-to-br from-white via-slate-50 to-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-indigo-900 via-indigo-800 to-violet-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-violet-500/10 rounded-full blur-[80px]" />

        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
              Pourquoi choisir NeuroClinic ?
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🏥",
                title: "Équipement moderne",
                desc: "Technologie de pointe pour des diagnostics précis",
              },
              {
                icon: "👨‍⚕️",
                title: "Expertise reconnue",
                desc: "Plus de 15 ans d'expérience en neurologie",
              },
              {
                icon: "💙",
                title: "Approche humaine",
                desc: "Un accompagnement personnalisé à chaque étape",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 150}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 hover:scale-105 transition-all duration-300 text-center group">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-indigo-200 text-sm">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-100/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-violet-100/50 rounded-full blur-[80px]" />

        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 rounded-3xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-500/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />

              <div className="relative">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
                  Besoin d'une consultation ?
                </h2>
                <p className="text-slate-300 max-w-md mx-auto mb-8 text-sm md:text-base">
                  Réservez votre rendez-vous aujourd'hui et recevez des soins
                  neurologiques experts.
                </p>
                <Link to="/book" className="no-underline">
                  <PulsingCTA delay={5000} interval={5000}>
                    <Button
                      size="lg"
                      className="bg-white text-slate-900 hover:bg-slate-50 shadow-xl shadow-black/20 border-0 text-[15px] px-8 py-4 hover:scale-105 transition-transform"
                    >
                      Prendre RDV
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </PulsingCTA>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
