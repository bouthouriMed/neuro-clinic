import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Brain,
  LayoutDashboard,
  Calendar,
  Users,
  Bell,
  LogOut,
  ChevronLeft,
  X,
} from 'lucide-react'
import { notifications } from '../../data/mockData'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Tableau de bord', exact: true },
  { to: '/dashboard/appointments', icon: Calendar, label: 'Rendez-vous' },
  { to: '/dashboard/patients', icon: Users, label: 'Patients' },
  { to: '/dashboard/calendar', icon: Calendar, label: 'Calendrier' },
  { to: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
]

export default function DashboardSidebar({ collapsed, mobileOpen, onToggle, onMobileClose }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const unreadCount = notifications.filter((n) => !n.read).length

  const isActive = (item) =>
    item.exact ? pathname === item.to : pathname.startsWith(item.to)

  const handleLogout = () => {
    localStorage.removeItem('neuroclinic_auth')
    navigate('/login')
  }

  const handleNavClick = () => {
    if (mobileOpen) onMobileClose()
  }

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 z-50 ${
        collapsed ? 'w-[72px]' : 'w-[260px]'
      } ${
        mobileOpen 
          ? 'translate-x-0' 
          : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="h-16 flex items-center px-5 border-b border-slate-800 gap-3">
        <button 
          onClick={onMobileClose}
          className="lg:hidden absolute top-4 right-4 p-1 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shrink-0 hover:scale-105 transition-transform shadow-lg shadow-indigo-500/25">
          <Brain className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-white truncate">NeuroClinic</span>
            <span className="text-[11px] text-slate-500 truncate">Espace Médecin</span>
          </div>
        )}
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={handleNavClick}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors no-underline relative ${
              isActive(item)
                ? 'bg-indigo-600/15 text-indigo-400'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
            title={collapsed ? item.label : undefined}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
            {item.label === 'Notifications' && unreadCount > 0 && (
              <span
                className={`flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full ${
                  collapsed
                    ? 'absolute -top-0.5 -right-0.5 w-4 h-4'
                    : 'ml-auto w-5 h-5'
                }`}
              >
                {unreadCount}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-800 space-y-1">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors w-full cursor-pointer"
          title={collapsed ? 'Déconnexion' : undefined}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Déconnexion</span>}
        </button>
        <button
          onClick={onToggle}
          className="hidden lg:flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors w-full cursor-pointer"
        >
          <ChevronLeft
            className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
              collapsed ? 'rotate-180' : ''
            }`}
          />
          {!collapsed && <span>Réduire</span>}
        </button>
      </div>
    </aside>
  )
}