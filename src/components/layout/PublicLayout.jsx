import { Outlet } from 'react-router-dom'
import PublicNavbar from './PublicNavbar'
import PublicFooter from './PublicFooter'
import FloatingWhatsApp from '../ui/FloatingWhatsApp'

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PublicNavbar />
      <main className="flex-1 pt-[50px]">
        <Outlet />
      </main>
      <PublicFooter />
      <FloatingWhatsApp />
    </div>
  )
}