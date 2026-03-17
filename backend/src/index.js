import express from 'express'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import dotenv from 'dotenv'
import { initDatabase } from './config/database.js'
import authRoutes from './routes/auth.js'
import appointmentRoutes from './routes/appointments.js'
import userRoutes from './routes/users.js'

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

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Seed endpoint - call once to create doctor account
app.get('/api/seed', async (req, res) => {
  try {
    const { query } = await import('./config/database.js')
    
    const existing = await query('SELECT id FROM users WHERE email = $1', ['doctor@neuroclinic.tn'])
    if (existing.rows.length > 0) {
      return res.json({ message: 'Doctor account already exists' })
    }
    
    const bcryptModule = await import('bcryptjs')
    const bcrypt = bcryptModule.default
    const hashedPassword = bcrypt.hashSync('doctor123', 10)
    
    await query(
      `INSERT INTO users (email, first_name, last_name, phone, password, provider, role) 
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      ['doctor@neuroclinic.tn', 'Abir', 'Bouthouri', '12345678', hashedPassword, 'local', 'doctor']
    )
    
    res.json({ message: 'Doctor account created', email: 'doctor@neuroclinic.tn', password: 'doctor123' })
  } catch (error) {
    console.error('Seed error:', error)
    res.status(500).json({ error: 'Seed failed' })
  }
})

const startServer = async () => {
  try {
    await initDatabase()
    console.log('Database initialized')
    
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
