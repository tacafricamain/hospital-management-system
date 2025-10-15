import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Monitor, Smartphone } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import Appointments from './pages/Appointments'
import Settings from './pages/Settings'
import Doctors from './pages/Staff/Doctors'
import Nurses from './pages/Staff/Nurses'
import Receptionists from './pages/Staff/Receptionists'
import Cleaners from './pages/Staff/Cleaners'
import students from './pages/Staff/Cleaners'
import Billing from './pages/Billing/index'

const MobileWarning = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center space-y-6 animate-fadeInUp">
        <div className="relative">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <Monitor size={48} className="text-white" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <Smartphone size={24} className="text-white" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Oops! 📱
          </h1>
          <h2 className="text-xl font-semibold text-gray-800">
            Desktop Experience Required
          </h2>
        </div>

        <div className="space-y-4 text-gray-600">
          <p className="text-base leading-relaxed">
            Our <span className="font-semibold text-blue-600">Hospital Management System</span> is designed for the best experience on desktop devices.
          </p>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800 font-medium">
              💡 <span className="font-bold">Pro Tip:</span> Please open this application on a computer or laptop for full functionality and optimal performance.
            </p>
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Responsive Design</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Desktop Optimized</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 italic">
            Thank you for your understanding! 💙
          </p>
        </div>
      </div>
    </div>
  )
}

const App = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      const smallScreen = window.innerWidth < 1024 // Less than 1024px (tablet/mobile)
      setIsMobile(mobile || smallScreen)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile) {
    return <MobileWarning />
  }

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
