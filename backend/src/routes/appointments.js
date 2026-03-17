import express from 'express'
import { query } from '../config/database.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT a.*, u.first_name, u.last_name, u.email as user_email, u.phone as user_phone
      FROM appointments a
      LEFT JOIN users u ON a.user_id = u.id
      ORDER BY a.appointment_date DESC, a.appointment_time DESC
    `)
    res.json(result.rows)
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
    
    const result = await query(
      `SELECT appointment_time FROM appointments 
       WHERE appointment_date = $1 AND status != 'cancelled'`,
      [date]
    )
    
    const bookedTimes = result.rows.map(row => row.appointment_time)
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
    
    // If no userId provided, check if email exists in users
    let linkedUserId = userId
    
    if (!linkedUserId && patientEmail) {
      const existingUser = await query('SELECT id FROM users WHERE email = $1', [patientEmail])
      if (existingUser.rows.length > 0) {
        linkedUserId = existingUser.rows[0].id
      }
    }
    
    const result = await query(
      `INSERT INTO appointments (user_id, patient_name, patient_phone, patient_email, service, appointment_date, appointment_time, notes, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending')
       RETURNING *`,
      [linkedUserId || null, patientName, patientPhone, patientEmail || null, service, date, time, notes || null]
    )
    
    const appointment = result.rows[0]

    // Create notification for new appointment
    const dateStr = new Date(appointment.appointment_date).toLocaleDateString('fr-FR')
    const timeStr = appointment.appointment_time.slice(0, 5)
    await query(
      `INSERT INTO notifications (type, message) VALUES ($1, $2)`,
      ['appointment', `Nouveau rendez-vous de ${appointment.patient_name} le ${dateStr} à ${timeStr} - ${appointment.service}`]
    )

    res.status(201).json({
      message: 'Appointment created successfully',
      appointment: {
        id: appointment.id,
        patientName: appointment.patient_name,
        patientPhone: appointment.patient_phone,
        service: appointment.service,
        date: appointment.appointment_date,
        time: appointment.appointment_time,
        status: appointment.status,
        userId: linkedUserId
      }
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

    const existing = await query('SELECT patient_name FROM appointments WHERE id = $1', [id])
    await query('UPDATE appointments SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [status, id])

    if (existing.rows.length > 0) {
      const statusLabels = { confirmed: 'confirmé', completed: 'terminé', cancelled: 'annulé' }
      const label = statusLabels[status]
      if (label) {
        await query(
          `INSERT INTO notifications (type, message) VALUES ($1, $2)`,
          ['appointment', `Rendez-vous de ${existing.rows[0].patient_name} ${label}`]
        )
      }
    }

    res.json({ message: 'Appointment updated successfully' })
  } catch (error) {
    console.error('Error updating appointment:', error)
    res.status(500).json({ error: 'Failed to update appointment' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    
    await query(`UPDATE appointments SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP WHERE id = $1`, [id])
    
    res.json({ message: 'Appointment cancelled successfully' })
  } catch (error) {
    console.error('Error cancelling appointment:', error)
    res.status(500).json({ error: 'Failed to cancel appointment' })
  }
})

export default router
