import { useState } from 'react'
import { Bell, Calendar, AlertCircle, Check } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { notifications as initialNotifications } from '../../data/mockData'

const iconMap = {
  appointment: Calendar,
  reminder: AlertCircle,
  system: Bell,
}

export default function Notifications() {
  const [notifs, setNotifs] = useState(initialNotifications)

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markRead = (id) => {
    setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const unreadCount = notifs.filter((n) => !n.read).length

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold text-slate-900">Notifications</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {unreadCount} notification{unreadCount !== 1 ? 's' : ''} non lue{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="secondary" size="sm" onClick={markAllRead} icon={Check}>
            Tout marquer comme lu
          </Button>
        )}
      </div>

      <Card>
        <div className="divide-y divide-slate-100">
          {notifs.map((notif) => {
            const Icon = iconMap[notif.type] || Bell
            return (
              <div
                key={notif.id}
                onClick={() => markRead(notif.id)}
                className={`px-4 lg:px-6 py-4 flex items-start gap-3 lg:gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer ${
                  !notif.read ? 'bg-indigo-50/30' : ''
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    notif.type === 'appointment'
                      ? 'bg-indigo-50 text-indigo-600'
                      : notif.type === 'reminder'
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm leading-relaxed ${!notif.read ? 'text-slate-800 font-medium' : 'text-slate-600'}`}>
                    {notif.message}
                  </p>
                  <span className="text-xs text-slate-400 mt-1 block">{notif.time}</span>
                </div>
                {!notif.read && (
                  <span className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
                )}
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
