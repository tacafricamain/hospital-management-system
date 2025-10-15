import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import Appointments from './pages/Appointments'
import Settings from './pages/Settings'
import Doctors from './pages/Staff/Doctors'
import Nurses from './pages/Staff/Nurses'
import Receptionists from './pages/Staff/Receptionists'
import Cleaners from './pages/Staff/Cleaners'
import Billing from './pages/Billing/index'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/staff/doctors" element={<Doctors />} />
        <Route path="/staff/nurses" element={<Nurses />} />
        <Route path="/staff/receptionists" element={<Receptionists />} />
        <Route path="/staff/cleaners" element={<Cleaners />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
