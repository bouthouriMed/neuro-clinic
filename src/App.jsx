import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicLayout from './components/layout/PublicLayout'
import DashboardLayout from './components/layout/DashboardLayout'

import Home from './pages/public/Home'
import About from './pages/public/About'
import Services from './pages/public/Services'
import BookAppointment from './pages/public/BookAppointment'
import Contact from './pages/public/Contact'

import Overview from './pages/dashboard/Overview'
import Appointments from './pages/dashboard/Appointments'
import Patients from './pages/dashboard/Patients'
import CalendarView from './pages/dashboard/CalendarView'
import Notifications from './pages/dashboard/Notifications'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/book" element={<BookAppointment />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Doctor Dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="patients" element={<Patients />} />
          <Route path="calendar" element={<CalendarView />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
