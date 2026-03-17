import { useState, useEffect, useRef, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Calendar, Play } from "lucide-react";
import Button from "./Button";
import PulsingCTA from "./PulsingCTA";
import { HeroVideoContext } from "../../contexts/HeroVideoContext";

// Lightweight shimmer loader shown before video is ready
function HeroLoader({ isVisible }) {
  return (
    <div
      className={`absolute inset-0 z-10 transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Blurred poster background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: "url(/hero.png)",
          filter: "blur(8px) brightness(0.6)",
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
  );
}

export default function HeroVideo({ onVideoReady }) {
  const { heroVideoLoaded, markVideoLoaded } = useContext(HeroVideoContext);
  const [videoError, setVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [contentVisible, setContentVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const videoRef = useRef(null);
  const heroRef = useRef(null);
  const retryCountRef = useRef(0);

  // Subscribe to resize and reduced motion changes
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", checkMobile);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    if (prefersReducedMotion) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion]);

  // Trigger content entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setContentVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoReady = useCallback(() => {
    markVideoLoaded();
    retryCountRef.current = 0;
    onVideoReady?.();
  }, [markVideoLoaded, onVideoReady]);

  const handleVideoError = useCallback(() => {
    // Retry up to 2 times before showing fallback
    if (retryCountRef.current < 2) {
      retryCountRef.current += 1;
      // Retry by resetting and reloading the video
      if (videoRef.current) {
        videoRef.current.load();
      }
    } else {
      // After 2 retries, accept the error
      setVideoError(true);
      onVideoReady?.();
    }
  }, [onVideoReady]);

  const shouldShowVideo = !prefersReducedMotion && !videoError;

  // Signal ready immediately when video won't be shown
  useEffect(() => {
    if (!shouldShowVideo && !heroVideoLoaded) {
      markVideoLoaded();
      onVideoReady?.();
    }
  }, [shouldShowVideo, heroVideoLoaded, markVideoLoaded, onVideoReady]);
  const showLoader = !heroVideoLoaded && shouldShowVideo;
  const parallaxOffset = prefersReducedMotion || isMobile ? 0 : scrollY * 0.3;

  return (
    <section
      ref={heroRef}
      className="hero-video-section relative overflow-hidden flex items-center"
      style={{ minHeight: "100vh" }}
    >
      {/* ── Video / Fallback Background ── */}
      {shouldShowVideo ? (
        <div
          className="absolute inset-0 z-0"
          style={{
            transform: `translateY(${parallaxOffset}px)`,
            willChange: "transform",
          }}
        >
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              heroVideoLoaded ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            crossOrigin="anonymous"
            onCanPlayThrough={handleVideoReady}
            onLoadedData={handleVideoReady}
            onError={handleVideoError}
            aria-hidden="true"
          >
            <source src="/landing_video.mp4" type="video/mp4" />
          </video>
        </div>
      ) : (
        /* Fallback static image for mobile / reduced-motion / error */
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/hero.png)",
            transform: isMobile ? "none" : `translateY(${parallaxOffset}px)`,
            willChange: isMobile ? "auto" : "transform",
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
          paddingTop: "120px",
          paddingBottom: "100px",
          transform:
            prefersReducedMotion || isMobile
              ? "none"
              : `translateY(${scrollY * 0.1}px)`,
          willChange: prefersReducedMotion || isMobile ? "auto" : "transform",
        }}
      >
        <div className="max-w-2xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`hero-content-enter ${contentVisible ? "hero-content-visible" : ""}`}
            style={{ transitionDelay: "0.1s" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-white/90 mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
              </span>
              Cabinet de Neurologie
            </div>
          </div>

          {/* Heading - Premium Crystal Style */}
          <div
            className={`hero-content-enter ${contentVisible ? "hero-content-visible" : ""}`}
            style={{ transitionDelay: "0.25s" }}
          >
            {/* Doctor Name - Crystal Premium */}
            <div className="relative mb-8">
              {/* Outer glow effect */}
              <div className="absolute -inset-6 bg-gradient-to-r from-cyan-500/20 via-white/10 to-violet-500/20 rounded-2xl blur-2xl" />

              {/* Inner subtle glow */}
              <div className="absolute -inset-3 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-xl" />

              <h1
                className="relative text-white font-bold leading-[1.1]"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  textShadow:
                    "0 0 40px rgba(255,255,255,0.3), 0 0 80px rgba(255,255,255,0.1)",
                }}
              >
                {/* Main name with subtle inner shine */}
                <span className="block relative">
                  <span className="relative bg-gradient-to-b from-white via-white to-white/80 bg-clip-text text-transparent">
                    Dr. Abir Bouthouri
                  </span>
                </span>

                {/* Title with elegant gradient */}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-indigo-200 to-violet-200 mt-4 text-2xl md:text-3xl font-semibold">
                  Neurologue
                </span>
              </h1>

              {/* Elegant accent line */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-amber-300/80 to-transparent" />
            </div>
          </div>

          {/* Tagline */}
          <div
            className={`hero-content-enter ${contentVisible ? "hero-content-visible" : ""}`}
            style={{ transitionDelay: "0.4s" }}
          >
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-lg mx-auto leading-relaxed">
              Plus de 10 ans d’expérience en Neurologie. Une expertise à
              l’échelle nationale et internationale. Une prise en charge moderne
              et un suivi continu. Parce qu’ici, chaque patient est unique et au
              cœur de notre engagement.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`hero-content-enter ${contentVisible ? "hero-content-visible" : ""}`}
            style={{ transitionDelay: "0.55s" }}
          >
            <div className="flex flex-wrap gap-4 justify-center">
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
  );
}
