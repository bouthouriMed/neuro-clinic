import express from 'express'
import bcrypt from 'bcryptjs'
import { query } from '../config/database.js'

const router = express.Router()

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone, role } = req.body
    
    const existing = await query('SELECT id FROM users WHERE email = $1', [email])
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' })
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const result = await query(
      `INSERT INTO users (email, first_name, last_name, phone, password, provider, role) 
       VALUES ($1, $2, $3, $4, $5, 'local', $6) 
       RETURNING id, email, first_name, last_name, phone, role`,
      [email, firstName, lastName, phone || null, hashedPassword, role || 'patient']
    )
    
    const user = result.rows[0]
    req.session.userId = user.id
    
    res.status(201).json({ 
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Failed to register user' })
  }
})

// Login with email/password
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    
    const result = await query('SELECT * FROM users WHERE email = $1', [email])
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    
    const user = result.rows[0]
    
    if (user.provider !== 'local' || !user.password) {
      return res.status(401).json({ error: 'Please use social login' })
    }
    
    const isValid = await bcrypt.compare(password, user.password)
    
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    
    req.session.userId = user.id
    
    res.json({ 
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        role: user.role,
        avatarUrl: user.avatar_url
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Login failed' })
  }
})

// Check if email exists and return user info (for booking)
router.get('/check-email/:email', async (req, res) => {
  try {
    const { email } = req.params
    
    const result = await query(
      'SELECT id, email, first_name, last_name, phone, role, provider FROM users WHERE email = $1',
      [email]
    )
    
    if (result.rows.length === 0) {
      return res.json({ exists: false })
    }
    
    const user = result.rows[0]
    res.json({
      exists: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        role: user.role,
        provider: user.provider
      }
    })
  } catch (error) {
    console.error('Check email error:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

// Create or update user from booking (lead or patient)
router.post('/upsert-from-booking', async (req, res) => {
  try {
    const { email, firstName, lastName, phone, createAccount, provider = 'local' } = req.body
    
    // Check if user exists
    const existing = await query('SELECT id, role FROM users WHERE email = $1', [email])
    
    if (existing.rows.length > 0) {
      // User exists - update if needed
      const user = existing.rows[0]
      
      // Update user info
      await query(
        `UPDATE users SET 
          first_name = COALESCE($1, first_name),
          last_name = COALESCE($2, last_name),
          phone = COALESCE($3, phone),
          updated_at = CURRENT_TIMESTAMP
         WHERE id = $4`,
        [firstName, lastName, phone, user.id]
      )
      
      // If they want to create account and have lead role, upgrade to patient
      if (createAccount && user.role === 'lead') {
        await query('UPDATE users SET role = $1 WHERE id = $2', ['patient', user.id])
      }
      
      return res.json({ 
        message: 'User updated',
        userId: user.id,
        isNew: false
      })
    }
    
    // Create new user
    const userRole = createAccount ? 'patient' : 'lead'
    const password = createAccount ? await bcrypt.hash(Math.random().toString(36).slice(-8), 10) : null
    
    const result = await query(
      `INSERT INTO users (email, first_name, last_name, phone, password, provider, role) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING id`,
      [email, firstName, lastName, phone, password, provider, userRole]
    )
    
    res.json({ 
      message: 'User created',
      userId: result.rows[0].id,
      isNew: true,
      role: userRole
    })
  } catch (error) {
    console.error('Upsert from booking error:', error)
    res.status(500).json({ error: 'Failed to process user' })
  }
})

// OAuth callbacks - redirect to frontend with user data
router.get('/oauth/callback', async (req, res) => {
  try {
    const { code, provider: queryProvider, state, error } = req.query

    if (error) {
      return res.redirect(`${process.env.CLIENT_URL}/book?oauth=error&message=${error}`)
    }

    if (!code) {
      return res.redirect(`${process.env.CLIENT_URL}/book?oauth=error&message=No+code+received`)
    }

    let email = ''
    let firstName = ''
    let lastName = ''
    let provider = queryProvider || state || 'google'
    
    // Exchange code for tokens and get user info
    if (provider === 'google') {
      const redirectUri = `${process.env.API_URL}/api/auth/oauth/callback`
      
      // Exchange code for tokens
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          code,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri
        })
      })
      
      const tokens = await tokenResponse.json()
      
      if (!tokens.access_token) {
        return res.redirect(`${process.env.CLIENT_URL}/book?oauth=error&message=Token+exchange+failed`)
      }
      
      // Get user info
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${tokens.access_token}` }
      })
      
      const userInfo = await userInfoResponse.json()
      email = userInfo.email
      firstName = userInfo.given_name || ''
      lastName = userInfo.family_name || ''
      
    } else if (provider === 'facebook') {
      // Facebook token exchange
      const redirectUri = encodeURIComponent(`${process.env.API_URL}/api/auth/oauth/callback`)
      const tokenResponse = await fetch(`https://graph.facebook.com/v18.0/oauth/access_token?client_id=${process.env.FACEBOOK_APP_ID}&client_secret=${process.env.FACEBOOK_APP_SECRET}&redirect_uri=${redirectUri}&code=${code}`)
      const tokens = await tokenResponse.json()
      
      if (!tokens.access_token) {
        return res.redirect(`${process.env.CLIENT_URL}/book?oauth=error&message=Token+exchange+failed`)
      }
      
      // Get user info
      const userInfoResponse = await fetch(`https://graph.facebook.com/me?fields=email,first_name,last_name&access_token=${tokens.access_token}`)
      const userInfo = await userInfoResponse.json()
      email = userInfo.email
      firstName = userInfo.first_name || ''
      lastName = userInfo.last_name || ''
    }
    
    if (!email) {
      return res.redirect(`${process.env.CLIENT_URL}/book?oauth=error&message=No+email+received`)
    }
    
    // Check if user exists
    let user = await query('SELECT * FROM users WHERE email = $1', [email])
    
    if (user.rows.length === 0) {
      // Create new lead user
      const result = await query(
        `INSERT INTO users (email, first_name, last_name, provider, role) 
         VALUES ($1, $2, $3, $4, 'lead') 
         RETURNING *`,
        [email, firstName, lastName, provider]
      )
      user = result
    }
    
    // Redirect to frontend with user data
    const redirectUrl = new URL(`${process.env.CLIENT_URL}/book`)
    redirectUrl.searchParams.set('oauth', 'success')
    redirectUrl.searchParams.set('email', email)
    redirectUrl.searchParams.set('firstName', firstName)
    redirectUrl.searchParams.set('lastName', lastName)
    redirectUrl.searchParams.set('provider', provider)
    redirectUrl.searchParams.set('userId', user.rows[0].id)
    
    res.redirect(redirectUrl.toString())
  } catch (error) {
    console.error('OAuth callback error:', error)
    res.redirect(`${process.env.CLIENT_URL}/book?oauth=error&message=${encodeURIComponent(error.message)}`)
  }
})

// Google OAuth
router.get('/google', (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const redirectUri = `${process.env.API_URL}/api/auth/oauth/callback`
  
  if (!clientId) {
    return res.redirect(`${process.env.CLIENT_URL}/book?oauth=error&message=Google+not+configured`)
  }
  
  const scope = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}&access_type=offline&prompt=consent`
  
  res.redirect(authUrl)
})

// Facebook OAuth
router.get('/facebook', (req, res) => {
  const appId = process.env.FACEBOOK_APP_ID
  const redirectUri = `${process.env.API_URL}/api/auth/oauth/callback`
  
  if (!appId) {
    return res.redirect(`${process.env.CLIENT_URL}/book?oauth=error&message=Facebook+not+configured`)
  }
  
  const scope = 'email,public_profile'
  const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code&state=facebook`
  
  res.redirect(authUrl)
})

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' })
    }
    res.json({ message: 'Logged out successfully' })
  })
})

// Get current user
router.get('/user', async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: 'Not authenticated' })
    }
    
    const result = await query('SELECT id, email, first_name, last_name, phone, role, avatar_url FROM users WHERE id = $1', [req.session.userId])
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' })
    }
    
    const user = result.rows[0]
    res.json({
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      role: user.role,
      avatarUrl: user.avatar_url
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

// Auth status
router.get('/status', (req, res) => {
  res.json({ authenticated: !!req.session.userId })
})

export default router
