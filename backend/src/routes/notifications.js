import express from 'express'
import { query } from '../config/database.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM notifications ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching notifications:', error)
    res.status(500).json({ error: 'Failed to fetch notifications' })
  }
})

router.put('/:id/read', async (req, res) => {
  try {
    const { id } = req.params
    await query('UPDATE notifications SET read = true WHERE id = $1', [id])
    res.json({ message: 'Notification marked as read' })
  } catch (error) {
    console.error('Error marking notification as read:', error)
    res.status(500).json({ error: 'Failed to update notification' })
  }
})

router.put('/read-all', async (req, res) => {
  try {
    await query('UPDATE notifications SET read = true WHERE read = false')
    res.json({ message: 'All notifications marked as read' })
  } catch (error) {
    console.error('Error marking all notifications as read:', error)
    res.status(500).json({ error: 'Failed to update notifications' })
  }
})

export default router
