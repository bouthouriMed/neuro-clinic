const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const fetchApi = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`
  
  const config = {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }

  if (options.body && typeof options.body === 'object') {
    config.body = JSON.stringify(options.body)
  }

  const response = await fetch(url, config)
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }))
    throw new Error(error.error || 'Request failed')
  }
  
  return response.json()
}

export const authApi = {
  register: (data) => fetchApi('/api/auth/register', { method: 'POST', body: data }),
  login: (data) => fetchApi('/api/auth/login', { method: 'POST', body: data }),
  logout: () => fetchApi('/api/auth/logout', { method: 'POST' }),
  getUser: () => fetchApi('/api/auth/user'),
  getStatus: () => fetchApi('/api/auth/status'),
  checkEmail: (email) => fetchApi(`/api/auth/check-email/${encodeURIComponent(email)}`),
  upsertFromBooking: (data) => fetchApi('/api/auth/upsert-from-booking', { method: 'POST', body: data }),
  loginWithGoogle: () => window.open(`${API_URL}/api/auth/google`, '_self'),
  loginWithFacebook: () => window.open(`${API_URL}/api/auth/facebook`, '_self'),
}

export const appointmentsApi = {
  getAll: () => fetchApi('/api/appointments'),
  getAvailableSlots: (date) => fetchApi(`/api/appointments/available-slots?date=${date}`),
  create: (data) => fetchApi('/api/appointments', { method: 'POST', body: data }),
  update: (id, data) => fetchApi(`/api/appointments/${id}`, { method: 'PUT', body: data }),
  delete: (id) => fetchApi(`/api/appointments/${id}`, { method: 'DELETE' }),
  sendVerificationCode: (email) => fetchApi('/api/appointments/verify-email', { method: 'POST', body: { email } }),
  verifyCode: (email, code) => fetchApi('/api/appointments/verify-code', { method: 'POST', body: { email, code } }),
}

export const scheduleApi = {
  getAll: () => fetchApi('/api/schedule'),
  getDay: (dayOfWeek) => fetchApi(`/api/schedule/day/${dayOfWeek}`),
  updateDay: (dayOfWeek, slots) => fetchApi(`/api/schedule/day/${dayOfWeek}`, { method: 'PUT', body: { slots } }),
}

export const notificationsApi = {
  getAll: () => fetchApi('/api/notifications'),
  markRead: (id) => fetchApi(`/api/notifications/${id}/read`, { method: 'PUT' }),
  markAllRead: () => fetchApi('/api/notifications/read-all', { method: 'PUT' }),
}

export const usersApi = {
  getAll: () => fetchApi('/api/users'),
  getById: (id) => fetchApi(`/api/users/${id}`),
  create: (data) => fetchApi('/api/users', { method: 'POST', body: data }),
  update: (id, data) => fetchApi(`/api/users/${id}`, { method: 'PUT', body: data }),
  delete: (id) => fetchApi(`/api/users/${id}`, { method: 'DELETE' }),
}

export default API_URL
