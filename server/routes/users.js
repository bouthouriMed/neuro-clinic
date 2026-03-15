import express from 'express'
import bcrypt from 'bcryptjs'
import pool from '../config/database.js'

const router = express.Router()

router.get('/', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  
  try {
    const [rows] = await pool.execute('SELECT id, email, first_name, last_name, phone, provider, avatar_url, created_at FROM users ORDER BY created_at DESC')
    res.json(rows)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

router.get('/:id', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  
  try {
    const [rows] = await pool.execute('SELECT id, email, first_name, last_name, phone, provider, avatar_url, created_at FROM users WHERE id = ?', [req.params.id])
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    res.json(rows[0])
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

router.put('/:id', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  
  try {
    const { id } = req.params
    const { firstName, lastName, phone } = req.body
    
    await pool.execute(
      'UPDATE users SET first_name = ?, last_name = ?, phone = ? WHERE id = ?',
      [firstName, lastName, phone, id]
    )
    
    res.json({ message: 'Profile updated successfully' })
  } catch (error) {
    console.error('Error updating user:', error)
    res.status(500).json({ error: 'Failed to update user' })
  }
})

router.put('/:id/password', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  
  try {
    const { id } = req.params
    const { currentPassword, newPassword } = req.body
    
    const [rows] = await pool.execute('SELECT password FROM users WHERE id = ?', [id])
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    const isMatch = await bcrypt.compare(currentPassword, rows[0].password)
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' })
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await pool.execute('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id])
    
    res.json({ message: 'Password updated successfully' })
  } catch (error) {
    console.error('Error updating password:', error)
    res.status(500).json({ error: 'Failed to update password' })
  }
})

export default router
