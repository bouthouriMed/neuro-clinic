import pg from 'pg'

const { Pool } = pg

let poolConfig = {}

if (process.env.DATABASE_URL) {
  poolConfig.connectionString = process.env.DATABASE_URL
  poolConfig.ssl = { rejectUnauthorized: false }
} else {
  poolConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'neuroclinic',
    ssl: false,
  }
}

const pool = new Pool({
  ...poolConfig,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
})

export const query = (text, params) => pool.query(text, params)

export const initDatabase = async () => {
  const client = await pool.connect()
  
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        password VARCHAR(255),
        provider VARCHAR(20) NOT NULL DEFAULT 'local',
        provider_id VARCHAR(255),
        avatar_url VARCHAR(500),
        role VARCHAR(20) DEFAULT 'patient',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    await client.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID,
        patient_name VARCHAR(200) NOT NULL,
        patient_phone VARCHAR(20) NOT NULL,
        patient_email VARCHAR(255),
        service VARCHAR(200) NOT NULL,
        appointment_date DATE NOT NULL,
        appointment_time TIME NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `)

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date)
    `)
    
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status)
    `)

    console.log('Database tables created successfully')
  } finally {
    client.release()
  }
}

export default pool
