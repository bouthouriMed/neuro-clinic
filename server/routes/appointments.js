import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import pool from '../config/database.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT a.*, u.first_name, u.last_name, u.email as user_email, u.phone as user_phone
      FROM appointments a
      LEFT JOIN users u ON a.user_id = u.id
      ORDER BY a.appointment_date DESC, a.appointment_time DESC
    `)
    res.json(rows)
  } catch (error) {
    console.error('Error fetching appointments:', error)
    res.status(500).json({ error: 'Failed to fetch appointments' })
  }
})

router.get('/available-slots', async (req, res) => {
  try {
    const { date } = req.query
    
    const allSlots = [
      '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
    ]
    
    const [bookedSlots] = await pool.execute(
      'SELECT appointment_time FROM appointments WHERE appointment_date = ? AND status != "cancelled"',
      [date]
    )
    
    const bookedTimes = bookedSlots.map(slot => slot.appointment_time)
    const availableSlots = allSlots.filter(slot => !bookedTimes.includes(slot))
    
    res.json({ date, slots: availableSlots })
  } catch (error) {
    console.error('Error fetching slots:', error)
    res.status(500).json({ error: 'Failed to fetch available slots' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { patientName, patientPhone, patientEmail, service, date, time, notes, userId } = req.body
    
    if (!patientName || !patientPhone || !service || !date || !time) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    
    const id = uuidv4()
    
    await pool.execute(
      `INSERT INTO appointments (id, user_id, patient_name, patient_phone, patient_email, service, appointment_date, appointment_time, notes, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [id, userId || null, patientName, patientPhone, patientEmail || null, service, date, time, notes || null]
    )
    
    res.status(201).json({ 
      id,
      message: 'Appointment created successfully',
      appointment: { id, patientName, patientPhone, service, date, time, status: 'pending' }
    })
  } catch (error) {
    console.error('Error creating appointment:', error)
    res.status(500).json({ error: 'Failed to create appointment' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    
    await pool.execute('UPDATE appointments SET status = ? WHERE id = ?', [status, id])
    
    res.json({ message: 'Appointment updated successfully' })
  } catch (error) {
    console.error('Error updating appointment:', error)
    res.status(500).json({ error: 'Failed to update appointment' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    
    await pool.execute('UPDATE appointments SET status = "cancelled" WHERE id = ?', [id])
    
    res.json({ message: 'Appointment cancelled successfully' })
  } catch (error) {
    console.error('Error cancelling appointment:', error)
    res.status(500).json({ error: 'Failed to cancel appointment' })
  }
})

export default router
