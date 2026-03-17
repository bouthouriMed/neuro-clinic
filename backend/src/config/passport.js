import LocalStrategy from 'passport-local'
import { query } from './database.js'

export default function configurePassport(passport) {
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const result = await query('SELECT * FROM users WHERE email = $1', [email])
        
        if (result.rows.length === 0) {
          return done(null, false, { message: 'No user found with this email' })
        }
        
        const user = result.rows[0]
        
        if (user.provider !== 'local') {
          return done(null, false, { message: 'Please use social login' })
        }
        
        const bcrypt = await import('bcryptjs')
        const isMatch = await bcrypt.default.compare(password, user.password)
        
        if (!isMatch) {
          return done(null, false, { message: 'Password incorrect' })
        }
        
        return done(null, user)
      } catch (error) {
        return done(error)
      }
    }
  ))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const result = await query('SELECT * FROM users WHERE id = $1', [id])
      done(null, result.rows[0])
    } catch (error) {
      done(error)
    }
  })
}
