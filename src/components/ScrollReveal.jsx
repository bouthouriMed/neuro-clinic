import { useEffect, useRef, useState } from 'react'

export default function ScrollReveal({ 
  children, 
  direction = 'up', 
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = true
}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) {
            observer.unobserve(element)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, once])

  const transforms = {
    up: 'translateY(40px)',
    down: 'translateY(-40px)',
    left: 'translateX(40px)',
    right: 'translateX(-40px)',
    scale: 'scale(0.9)'
  }

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : transforms[direction],
        transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  )
}

export function AnimatedSection({ children, className = '' }) {
  return <div className={className}>{children}</div>
}
