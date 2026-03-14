import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Phone, Calendar, Play } from 'lucide-react'
import Button from './Button'
import PulsingCTA from './PulsingCTA'

// Lightweight shimmer loader shown before video is ready
function HeroLoader({ isVisible }) {
  return (
    <div
      className={`absolute inset-0 z-10 transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Blurred poster background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: 'url(/hero.png)',
          filter: 'blur(8px) brightness(0.6)',
        }}
      />
      {/* Shimmer overlay */}
      <div className="absolute inset-0 hero-shimmer" />
      {/* Centered loader */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="hero-loader-ring">
          <Play className="w-6 h-6 text-white/90 ml-0.5" />
        </div>
      </div>
    </div>
  )
}

export default function HeroVideo({ onVideoReady }) {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [contentVisible, setContentVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const videoRef = useRef(null)
  const heroRef = useRef(null)

  // Subscribe to resize and reduced motion changes
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', checkMobile)

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches)
    motionQuery.addEventListener('change', handleMotionChange)

    return () => {
      window.removeEventListener('resize', checkMobile)
      motionQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  // Parallax scroll effect
  useEffect(() => {
    if (prefersReducedMotion) return

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prefersReducedMotion])

  // Trigger content entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setContentVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const handleVideoReady = useCallback(() => {
    setVideoLoaded(true)
    onVideoReady?.()
  }, [onVideoReady])

  const handleVideoError = useCallback(() => {
    setVideoError(true)
    setVideoLoaded(true) // hide loader
    onVideoReady?.()
  }, [onVideoReady])

  const shouldShowVideo = !prefersReducedMotion && !videoError

  // Signal ready immediately when video won't be shown
  useEffect(() => {
    if (!shouldShowVideo) {
      onVideoReady?.()
    }
  }, [shouldShowVideo, onVideoReady])
  const showLoader = !videoLoaded && shouldShowVideo
  const parallaxOffset = (prefersReducedMotion || isMobile) ? 0 : scrollY * 0.3

  return (
    <section
      ref={heroRef}
      className="hero-video-section relative overflow-hidden flex items-center"
      style={{ minHeight: '100vh' }}
    >
      {/* ── Video / Fallback Background ── */}
      {shouldShowVideo ? (
        <div
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${parallaxOffset}px)`,
            willChange: 'transform',
          }}
        >
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/hero.png"
            onCanPlayThrough={handleVideoReady}
            onLoadedData={handleVideoReady}
            onError={handleVideoError}
            aria-hidden="true"
            src="/landing_video.mp4"
          />
        </div>
      ) : (
        /* Fallback static image for mobile / reduced-motion / error */
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/hero.png)',
            transform: isMobile ? 'none' : `translateY(${parallaxOffset}px)`,
            willChange: isMobile ? 'auto' : 'transform',
          }}
        />
      )}

      {/* ── Loader ── */}
      <HeroLoader isVisible={showLoader} />

      {/* ── Gradient overlays for readability ── */}
      <div className="absolute inset-0 z-[1] hero-video-overlay" />

      {/* ── Content ── */}
      <div
        className="relative z-[2] max-w-7xl mx-auto px-6 lg:px-8 w-full"
        style={{
          paddingTop: '120px',
          paddingBottom: '100px',
          transform: (prefersReducedMotion || isMobile)
            ? 'none'
            : `translateY(${scrollY * 0.1}px)`,
          willChange: (prefersReducedMotion || isMobile) ? 'auto' : 'transform',
        }}
      >
        <div className="max-w-2xl md:text-left text-center mx-auto md:mx-0">
          {/* Badge */}
          <div
            className={`hero-content-enter ${contentVisible ? 'hero-content-visible' : ''}`}
            style={{ transitionDelay: '0.1s' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-white/90 mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              Cabinet de Neurologie
            </div>
          </div>

          {/* Heading */}
          <div
            className={`hero-content-enter ${contentVisible ? 'hero-content-visible' : ''}`}
            style={{ transitionDelay: '0.25s' }}
          >
            <h1
              className="text-white font-bold leading-[1.1] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              Dr. Abir Bouthouri
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-300 to-violet-300 mt-2">
                Neurologue Spécialiste
              </span>
            </h1>
          </div>

          {/* Tagline */}
          <div
            className={`hero-content-enter ${contentVisible ? 'hero-content-visible' : ''}`}
            style={{ transitionDelay: '0.4s' }}
          >
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Plus de 15 ans d'expérience en neurologie. Membre de l'Académie
              Américaine de Neurologie. Des soins modernes et personnalisés.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`hero-content-enter ${contentVisible ? 'hero-content-visible' : ''}`}
            style={{ transitionDelay: '0.55s' }}
          >
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <PulsingCTA delay={5000} interval={5000}>
                <Link to="/book" className="no-underline">
                  <Button
                    size="lg"
                    className="bg-white text-indigo-700 hover:bg-indigo-50 hover:scale-105 transition-all shadow-xl shadow-black/20 border-0 font-bold"
                  >
                    <Calendar className="w-5 h-5" />
                    Prendre RDV
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </PulsingCTA>
              <Link to="/contact" className="no-underline">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white/90 hover:text-white hover:bg-white/10 border border-white/20 hover:border-white/40 hover:scale-105 transition-all backdrop-blur-sm"
                >
                  <Phone className="w-5 h-5" />
                  Nous Contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] animate-scroll-indicator">
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce-gentle" />
        </div>
      </div>

      {/* ── Bottom fade transition to next section ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-[2]" />
    </section>
  )
}
