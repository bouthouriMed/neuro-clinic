import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function PageTransition({ children }) {
  const location = useLocation()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [transitionState, setTransitionState] = useState('enter')

  useEffect(() => {
    setTransitionState('exit')
    const timer = setTimeout(() => {
      setDisplayChildren(children)
      setTransitionState('enter')
    }, 200)
    return () => clearTimeout(timer)
  }, [location.pathname, children])

  return (
    <div
      className={
        transitionState === 'enter'
          ? 'page-enter-active'
          : 'page-exit-active'
      }
      style={{
        opacity: transitionState === 'enter' ? 1 : 0,
        transform: transitionState === 'enter' ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease'
      }}
    >
      {displayChildren}
    </div>
  )
}
