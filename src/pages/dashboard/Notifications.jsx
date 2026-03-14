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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-surface-900">Notifications</h1>
          <p className="text-surface-500 text-sm mt-0.5">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="secondary" size="sm" onClick={markAllRead} icon={Check}>
            Mark all as read
          </Button>
        )}
      </div>

      <Card>
        <div className="divide-y divide-surface-100">
          {notifs.map((notif) => {
            const Icon = iconMap[notif.type] || Bell
            return (
              <div
                key={notif.id}
                onClick={() => markRead(notif.id)}
                className={`px-6 py-4 flex items-start gap-4 hover:bg-surface-50/50 transition-colors cursor-pointer ${
                  !notif.read ? 'bg-primary-50/20' : ''
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0 ${
                    notif.type === 'appointment'
                      ? 'bg-primary-50 text-primary-600'
                      : notif.type === 'reminder'
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-surface-100 text-surface-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm leading-relaxed ${!notif.read ? 'text-surface-800 font-medium' : 'text-surface-600'}`}>
                    {notif.message}
                  </p>
                  <span className="text-xs text-surface-400 mt-1">{notif.time}</span>
                </div>
                {!notif.read && (
                  <span className="w-2 h-2 rounded-full bg-primary-500 mt-2 shrink-0" />
                )}
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
