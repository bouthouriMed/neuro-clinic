import { Outlet, useLocation } from 'react-router-dom'
import PublicNavbar from './PublicNavbar'
import PublicFooter from './PublicFooter'
import FloatingWhatsApp from '../ui/FloatingWhatsApp'
import BackToTop from '../ui/BackToTop'

export default function PublicLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />
      <main className={`flex-1 ${isHome ? '' : 'pt-[50px]'}`}>
        <Outlet />
      </main>
      <PublicFooter />
      <FloatingWhatsApp />
      <BackToTop />
    </div>
  )
}