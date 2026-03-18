import express from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import dotenv from 'dotenv'
import { initDatabase } from './config/database.js'
import authRoutes from './routes/auth.js'
import appointmentRoutes from './routes/appointments.js'
import userRoutes from './routes/users.js'
import notificationRoutes from './routes/notifications.js'
import scheduleRoutes from './routes/schedule.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1)
}

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
  secret: process.env.SESSION_SECRET || 'neuroclinic-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/auth', authRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/users', userRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/schedule', scheduleRoutes)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

const startServer = async () => {
  try {
    await initDatabase()
    console.log('Database initialized')

    // Add seq_id column if missing (for reliable ordering)
    const { query } = await import('./config/database.js')
    try {
      await query('ALTER TABLE appointments ADD COLUMN IF NOT EXISTS seq_id SERIAL')
    } catch (e) { /* column already exists */ }

    // Auto-seed default schedule if empty
    const scheduleCount = await query('SELECT COUNT(*) FROM weekly_schedule')
    if (parseInt(scheduleCount.rows[0].count) === 0) {
      const weekdaySlots = ['08:30','09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30']
      const saturdaySlots = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00']
      for (let day = 1; day <= 5; day++) {
        for (const slot of weekdaySlots) {
          await query('INSERT INTO weekly_schedule (day_of_week, time_slot) VALUES ($1, $2) ON CONFLICT DO NOTHING', [day, slot])
        }
      }
      for (const slot of saturdaySlots) {
        await query('INSERT INTO weekly_schedule (day_of_week, time_slot) VALUES ($1, $2) ON CONFLICT DO NOTHING', [6, slot])
      }
      console.log('Default schedule seeded')
    }
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()

export default app
