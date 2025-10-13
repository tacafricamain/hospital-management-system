import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users2, Calendar, CreditCard, Settings } from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col w-64 min-h-screen border-r bg-white">
      <div className="px-6 py-4 text-xl font-bold">Hospital</div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        <NavLink to="/" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100">
          <LayoutDashboard size={18} /> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/patients" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100">
          <Users2 size={18} /> <span>Patients</span>
        </NavLink>
        <NavLink to="/appointments" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100">
          <Calendar size={18} /> <span>Appointments</span>
        </NavLink>
        <div className="flex items-center gap-3 px-3 py-2 rounded text-gray-400">
          <CreditCard size={18} /> <span>Billing</span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2 rounded text-gray-400">
          <Settings size={18} /> <span>Settings</span>
        </div>
      </nav>
    </aside>
  )
}
