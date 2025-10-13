import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Patients from '../pages/Patients'
import Appointments from '../pages/Appointments'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </BrowserRouter>
  )
}
