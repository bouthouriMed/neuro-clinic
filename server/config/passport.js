import pool from './database.js'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import GoogleStrategy from 'passport-google-oauth20'
import FacebookStrategy from 'passport-facebook'
import InstagramStrategy from 'passport-instagram'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id])
    done(null, rows[0])
  } catch (error) {
    done(error, null)
  }
})

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email])
      const user = rows[0]
      
      if (!user) {
        return done(null, false, { message: 'User not found' })
      }
      
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return done(null, false, { message: 'Invalid credentials' })
      }
      
      return done(null, user)
    } catch (error) {
      return done(error)
    }
  }
))

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const [rows] = await pool.execute('SELECT * FROM users WHERE provider_id = ? AND provider = ?', [profile.id, 'google'])
      
      if (rows[0]) {
        return done(null, rows[0])
      }
      
      const newUser = {
        id: uuidv4(),
        email: profile.emails[0].value,
        first_name: profile.name.givenName || 'User',
        last_name: profile.name.familyName || '',
        provider: 'google',
        provider_id: profile.id,
        avatar_url: profile.photos[0]?.value
      }
      
      await pool.execute(
        'INSERT INTO users (id, email, first_name, last_name, provider, provider_id, avatar_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [newUser.id, newUser.email, newUser.first_name, newUser.last_name, newUser.provider, newUser.provider_id, newUser.avatar_url]
      )
      
      return done(null, newUser)
    } catch (error) {
      return done(error)
    }
  }))
}

if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/api/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails', 'photos']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const [rows] = await pool.execute('SELECT * FROM users WHERE provider_id = ? AND provider = ?', [profile.id, 'facebook'])
      
      if (rows[0]) {
        return done(null, rows[0])
      }
      
      const nameParts = profile.displayName ? profile.displayName.split(' ') : ['User', '']
      const newUser = {
        id: uuidv4(),
        email: profile.emails?.[0]?.value || `${profile.id}@facebook.local`,
        first_name: nameParts[0] || 'User',
        last_name: nameParts.slice(1).join(' ') || '',
        provider: 'facebook',
        provider_id: profile.id,
        avatar_url: profile.photos?.[0]?.value
      }
      
      await pool.execute(
        'INSERT INTO users (id, email, first_name, last_name, provider, provider_id, avatar_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [newUser.id, newUser.email, newUser.first_name, newUser.last_name, newUser.provider, newUser.provider_id, newUser.avatar_url]
      )
      
      return done(null, newUser)
    } catch (error) {
      return done(error)
    }
  }))
}

if (process.env.INSTAGRAM_CLIENT_ID && process.env.INSTAGRAM_CLIENT_SECRET) {
  passport.use(new InstagramStrategy({
    clientID: process.env.INSTAGRAM_CLIENT_ID,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    callbackURL: '/api/auth/instagram/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const [rows] = await pool.execute('SELECT * FROM users WHERE provider_id = ? AND provider = ?', [profile.id, 'instagram'])
      
      if (rows[0]) {
        return done(null, rows[0])
      }
      
      const newUser = {
        id: uuidv4(),
        email: `${profile.username}@instagram.local`,
        first_name: profile.displayName || profile.username,
        last_name: '',
        provider: 'instagram',
        provider_id: profile.id,
        avatar_url: profile.photos?.[0]?.value
      }
      
      await pool.execute(
        'INSERT INTO users (id, email, first_name, last_name, provider, provider_id, avatar_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [newUser.id, newUser.email, newUser.first_name, newUser.last_name, newUser.provider, newUser.provider_id, newUser.avatar_url]
      )
      
      return done(null, newUser)
    } catch (error) {
      return done(error)
    }
  }))
}

export default passport
