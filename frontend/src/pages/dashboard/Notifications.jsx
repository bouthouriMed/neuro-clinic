import { useState, useEffect } from 'react'
import { Bell, Calendar, AlertCircle, Check } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { notificationsApi } from '../../services/api'

const iconMap = {
  appointment: Calendar,
  reminder: AlertCircle,
  system: Bell,
}

export default function Notifications() {
  const [notifs, setNotifs] = useState([])

  useEffect(() => {
    notificationsApi.getAll().then(setNotifs).catch(console.error)
  }, [])

  const markAllRead = async () => {
    try {
      await notificationsApi.markAllRead()
      setNotifs((prev) => prev.map((n) => ({ ...n, read: true })))
    } catch (err) {
      console.error(err)
    }
  }

  const markRead = async (id) => {
    try {
      await notificationsApi.markRead(id)
      setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    } catch (err) {
      console.error(err)
    }
  }

  const unreadCount = notifs.filter((n) => !n.read).length

  const timeAgo = (dateStr) => {
    const now = new Date()
    const date = new Date(dateStr)
    const diffMs = now - date
    const diffMin = Math.floor(diffMs / 60000)
    if (diffMin < 1) return "À l'instant"
    if (diffMin < 60) return `${diffMin} min`
    const diffHours = Math.floor(diffMin / 60)
    if (diffHours < 24) return `${diffHours} heure${diffHours > 1 ? 's' : ''}`
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays} jour${diffDays > 1 ? 's' : ''}`
  }

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
          {notifs.length === 0 && (
            <div className="px-6 py-12 text-center text-slate-400 text-sm">
              Aucune notification
            </div>
          )}
          {notifs.map((notif) => {
            const Icon = iconMap[notif.type] || Bell
            return (
              <div
                key={notif.id}
                onClick={() => !notif.read && markRead(notif.id)}
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
                  <span className="text-xs text-slate-400 mt-1 block">{timeAgo(notif.created_at)}</span>
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
