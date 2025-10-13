import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users2, Calendar, CreditCard, Settings, ChevronDown, Building2, Home } from 'lucide-react'
import { useState } from 'react'

export default function Sidebar() {
  const [isDashboardOpen, setIsDashboardOpen] = useState(true)

  return (
    <aside className="hidden md:flex md:flex-col w-64 min-h-screen border-r bg-white fixed left-0 top-0 bottom-0">
      <div className="px-6 py-5 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-lg flex items-center justify-center">
            <Building2 size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">Hospital</span>
        </div>
      </div>
      
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {/* Dashboard Section - Collapsible */}
        <div>
          <button
            onClick={() => setIsDashboardOpen(!isDashboardOpen)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-gradient-to-r from-[#0066CC] to-[#0052A3] text-white font-medium text-sm hover:from-[#0052A3] hover:to-[#004080] transition-all"
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </div>
            <ChevronDown size={16} className={`transition-transform ${isDashboardOpen ? '' : '-rotate-90'}`} />
          </button>
          
          {isDashboardOpen && (
            <div className="ml-3 mt-1 space-y-1 border-l-2 border-gray-200 pl-3">
              <NavLink 
                to="/" 
                className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive ? 'bg-blue-50 text-[#0066CC] font-medium' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#0066CC]"></div>
                <span>Home</span>
              </NavLink>
            </div>
          )}
        </div>

        {/* Other Menu Items */}
        <NavLink 
          to="/patients" 
          className={({ isActive }) => `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
            isActive ? 'bg-blue-50 text-[#0066CC] font-medium' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <Users2 size={18} />
            <span>Patients</span>
          </div>
          <ChevronDown size={16} className="-rotate-90 text-gray-400" />
        </NavLink>

        <NavLink 
          to="/appointments" 
          className={({ isActive }) => `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
            isActive ? 'bg-blue-50 text-[#0066CC] font-medium' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <Calendar size={18} />
            <span>Appointments</span>
          </div>
          <ChevronDown size={16} className="-rotate-90 text-gray-400" />
        </NavLink>

        <div className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-gray-400 cursor-not-allowed">
          <div className="flex items-center gap-3">
            <CreditCard size={18} />
            <span>Billing</span>
          </div>
          <ChevronDown size={16} className="-rotate-90 text-gray-300" />
        </div>

        <NavLink 
          to="/settings" 
          className={({ isActive }) => `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
            isActive ? 'bg-blue-50 text-[#0066CC] font-medium' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <Settings size={18} />
            <span>Settings</span>
          </div>
          <ChevronDown size={16} className="-rotate-90 text-gray-400" />
        </NavLink>
      </nav>
    </aside>
  )
}
