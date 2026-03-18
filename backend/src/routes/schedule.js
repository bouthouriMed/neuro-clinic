import express from 'express'
import { query } from '../config/database.js'

const router = express.Router()

// Get full weekly schedule
router.get('/', async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM weekly_schedule WHERE is_active = true ORDER BY day_of_week, time_slot'
    )
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching schedule:', error)
    res.status(500).json({ error: 'Failed to fetch schedule' })
  }
})

// Get slots for a specific day of week (0=Sunday, 1=Monday, ..., 6=Saturday)
router.get('/day/:dayOfWeek', async (req, res) => {
  try {
    const { dayOfWeek } = req.params
    const result = await query(
      'SELECT time_slot FROM weekly_schedule WHERE day_of_week = $1 AND is_active = true ORDER BY time_slot',
      [parseInt(dayOfWeek)]
    )
    res.json(result.rows.map(r => r.time_slot.slice(0, 5)))
  } catch (error) {
    console.error('Error fetching day schedule:', error)
    res.status(500).json({ error: 'Failed to fetch day schedule' })
  }
})

// Replace all slots for a specific day
router.put('/day/:dayOfWeek', async (req, res) => {
  try {
    const { dayOfWeek } = req.params
    const { slots } = req.body // array of time strings like ['08:30', '09:00', ...]

    // Delete existing slots for this day
    await query('DELETE FROM weekly_schedule WHERE day_of_week = $1', [parseInt(dayOfWeek)])

    // Insert new slots
    if (slots && slots.length > 0) {
      const values = slots.map((slot, i) => `($1, $${i + 2})`).join(', ')
      const params = [parseInt(dayOfWeek), ...slots]
      await query(
        `INSERT INTO weekly_schedule (day_of_week, time_slot) VALUES ${values}`,
        params
      )
    }

    res.json({ message: 'Schedule updated successfully' })
  } catch (error) {
    console.error('Error updating schedule:', error)
    res.status(500).json({ error: 'Failed to update schedule' })
  }
})

// Seed default schedule (call once)
router.post('/seed-default', async (req, res) => {
  try {
    const existing = await query('SELECT COUNT(*) FROM weekly_schedule')
    if (parseInt(existing.rows[0].count) > 0) {
      return res.json({ message: 'Schedule already configured' })
    }

    // Mon-Fri (1-5): 08:30-12:00 & 14:00-16:30
    const weekdaySlots = ['08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30']
    // Saturday (6): 09:00-13:30
    const saturdaySlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00']

    for (let day = 1; day <= 5; day++) {
      for (const slot of weekdaySlots) {
        await query('INSERT INTO weekly_schedule (day_of_week, time_slot) VALUES ($1, $2) ON CONFLICT DO NOTHING', [day, slot])
      }
    }
    for (const slot of saturdaySlots) {
      await query('INSERT INTO weekly_schedule (day_of_week, time_slot) VALUES ($1, $2) ON CONFLICT DO NOTHING', [6, slot])
    }

    res.json({ message: 'Default schedule seeded' })
  } catch (error) {
    console.error('Error seeding schedule:', error)
    res.status(500).json({ error: 'Failed to seed schedule' })
  }
})

export default router
