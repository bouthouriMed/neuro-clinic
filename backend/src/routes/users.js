import express from 'express'
import bcrypt from 'bcryptjs'
import { query } from '../config/database.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone, role } = req.body
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }
    
    const existing = await query('SELECT id FROM users WHERE email = $1', [email])
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Email already registered' })
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const result = await query(
      `INSERT INTO users (email, first_name, last_name, phone, password, provider, role) 
       VALUES ($1, $2, $3, $4, $5, 'local', $6) 
       RETURNING id, email, first_name, last_name, phone, role`,
      [email, firstName || '', lastName || '', phone || null, hashedPassword, role || 'patient']
    )
    
    const user = result.rows[0]
    res.status(201).json({ 
      message: 'User created successfully',
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
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'Failed to create user' })
  }
})

router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT id, email, first_name, last_name, phone, role, avatar_url, created_at
      FROM users
      ORDER BY created_at DESC
    `)
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const result = await query(`
      SELECT id, email, first_name, last_name, phone, role, avatar_url, created_at
      FROM users WHERE id = $1
    `, [id])
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    res.json(result.rows[0])
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { firstName, lastName, phone, avatarUrl } = req.body
    
    const result = await query(`
      UPDATE users 
      SET first_name = COALESCE($1, first_name),
          last_name = COALESCE($2, last_name),
          phone = COALESCE($3, phone),
          avatar_url = COALESCE($4, avatar_url),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING id, email, first_name, last_name, phone, role, avatar_url
    `, [firstName, lastName, phone, avatarUrl, id])
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' })
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
    console.error('Error updating user:', error)
    res.status(500).json({ error: 'Failed to update user' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    
    await query('DELETE FROM users WHERE id = $1', [id])
    
    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    res.status(500).json({ error: 'Failed to delete user' })
  }
})

export default router
