import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from './DashboardSidebar'
import { Bell, Search, Menu, X } from 'lucide-react'
import { doctor, notifications } from '../../data/mockData'
import Avatar from '../ui/Avatar'

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardSidebar 
        collapsed={collapsed} 
        mobileOpen={mobileOpen}
        onToggle={() => setCollapsed(!collapsed)}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={`transition-all duration-300 ${
          collapsed ? 'lg:ml-[72px]' : 'lg:ml-[260px]'
        } ml-0`}
      >
        {/* Mobile Header */}
        <header className="sticky top-0 z-20 h-16 bg-white/80 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Rechercher patients, rendez-vous..."
                className="w-64 xl:w-72 pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
              />
            </div>
            {/* Mobile search icon */}
            <button className="sm:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer">
              <Search className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
            <div className="flex items-center gap-3 pl-2 sm:pl-4 border-l border-slate-200">
              <Avatar name={doctor.name} size="sm" />
              <div className="hidden md:block">
                <div className="text-sm font-medium text-slate-800">{doctor.name}</div>
                <div className="text-xs text-slate-400">Neurologue</div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}