import express from 'express'
import passport from 'passport'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'
import pool from '../config/database.js'

const router = express.Router()

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login?error=oauth_failed' }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL || 'https://www.drabirneuroclinic.tn')
  }
)

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }))

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login?error=oauth_failed' }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL || 'https://www.drabirneuroclinic.tn')
  }
)

router.get('/instagram', passport.authenticate('instagram'))

router.get('/instagram/callback',
  passport.authenticate('instagram', { failureRedirect: '/login?error=oauth_failed' }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL || 'https://www.drabirneuroclinic.tn')
  }
)

router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body
    
    const [existing] = await pool.execute('SELECT id FROM users WHERE email = ?', [email])
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Email already registered' })
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)
    const id = uuidv4()
    
    await pool.execute(
      'INSERT INTO users (id, email, first_name, last_name, phone, password, provider) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, email, firstName, lastName, phone || null, hashedPassword, 'local']
    )
    
    res.status(201).json({ message: 'User registered successfully' })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Failed to register user' })
  }
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Server error' })
    }
    if (!user) {
      return res.status(401).json({ error: info?.message || 'Invalid credentials' })
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Login failed' })
      }
      return res.json({ 
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          phone: user.phone,
          avatarUrl: user.avatar_url
        }
      })
    })
  })(req, res, next)
})

router.post('/logout', (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logged out successfully' })
  })
})

router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user
    return res.json({
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      avatarUrl: user.avatar_url
    })
  }
  res.status(401).json({ error: 'Not authenticated' })
})

router.get('/status', (req, res) => {
  res.json({ authenticated: req.isAuthenticated() })
})

export default router
