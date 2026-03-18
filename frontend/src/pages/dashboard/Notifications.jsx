import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, Calendar, AlertCircle, Check, Clock } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { notificationsApi } from '../../services/api'

const iconMap = {
  appointment: Calendar,
  reminder: AlertCircle,
  system: Bell,
}

export default function Notifications() {
  const navigate = useNavigate()
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

  const markReadAndNavigate = async (notif) => {
    try {
      if (!notif.read) {
        await notificationsApi.markRead(notif.id)
        setNotifs((prev) => prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n)))
      }
      if (notif.type === 'appointment') {
        navigate('/dashboard/appointments')
      }
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
    if (diffMin < 60) return `Il y a ${diffMin} min`
    const diffHours = Math.floor(diffMin / 60)
    if (diffHours < 24) return `Il y a ${diffHours}h`
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays === 1) return 'Hier'
    if (diffDays < 7) return `Il y a ${diffDays} jours`
    return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  }

  const formatFullDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Group notifications by date
  const groupByDate = (notifications) => {
    const groups = {}
    notifications.forEach((n) => {
      const date = new Date(n.created_at)
      const today = new Date()
      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)

      let label
      if (date.toDateString() === today.toDateString()) {
        label = "Aujourd'hui"
      } else if (date.toDateString() === yesterday.toDateString()) {
        label = 'Hier'
      } else {
        label = date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
      }

      if (!groups[label]) groups[label] = []
      groups[label].push(n)
    })
    return groups
  }

  const grouped = groupByDate(notifs)

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold text-slate-900">Notifications</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {unreadCount > 0
              ? `${unreadCount} notification${unreadCount !== 1 ? 's' : ''} non lue${unreadCount !== 1 ? 's' : ''}`
              : 'Toutes les notifications sont lues'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="secondary" size="sm" onClick={markAllRead} icon={Check}>
            Tout marquer comme lu
          </Button>
        )}
      </div>

      {notifs.length === 0 ? (
        <Card>
          <div className="px-6 py-16 text-center">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Bell className="w-7 h-7 text-slate-300" />
            </div>
            <p className="text-slate-500 text-sm">Aucune notification pour le moment</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {Object.entries(grouped).map(([dateLabel, groupNotifs]) => (
            <div key={dateLabel}>
              <div className="flex items-center gap-3 mb-2 px-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{dateLabel}</span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>
              <Card>
                <div className="divide-y divide-slate-100">
                  {groupNotifs.map((notif) => {
                    const Icon = iconMap[notif.type] || Bell
                    return (
                      <div
                        key={notif.id}
                        onClick={() => markReadAndNavigate(notif)}
                        className={`px-4 lg:px-6 py-4 flex items-start gap-3 lg:gap-4 hover:bg-slate-50/50 transition-colors cursor-pointer ${
                          !notif.read ? 'bg-indigo-50/30' : ''
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            notif.type === 'appointment'
                              ? 'bg-indigo-100 text-indigo-600'
                              : notif.type === 'reminder'
                              ? 'bg-amber-100 text-amber-600'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm leading-relaxed ${!notif.read ? 'text-slate-800 font-medium' : 'text-slate-600'}`}>
                            {notif.message}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <Clock className="w-3 h-3 text-slate-300" />
                            <span className="text-xs text-slate-400">{timeAgo(notif.created_at)}</span>
                            <span className="text-xs text-slate-300">·</span>
                            <span className="text-xs text-slate-300">{formatFullDate(notif.created_at)}</span>
                          </div>
                        </div>
                        {!notif.read && (
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 mt-2 shrink-0 ring-2 ring-indigo-500/20" />
                        )}
                      </div>
                    )
                  })}
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
