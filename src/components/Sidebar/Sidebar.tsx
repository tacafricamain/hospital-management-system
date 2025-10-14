import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Calendar, DollarSign, Settings, ChevronDown, UserCog, Stethoscope } from 'lucide-react'
import { useState } from 'react'

export default function Sidebar() {
  const location = useLocation()
  const [staffOpen, setStaffOpen] = useState(true)
  
  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/patients', icon: Users, label: 'Patients' },
    { path: '/appointments', icon: Calendar, label: 'Appointments' },
    { path: '/billing', icon: DollarSign, label: 'Billing' },
    { 
      path: '/staff', 
      icon: UserCog, 
      label: 'Staff Management',
      isDropdown: true,
      subItems: [
        { path: '/staff/doctors', icon: Stethoscope, label: 'Doctors' },
        { path: '/staff/nurses', icon: Users, label: 'Nurses' },
        { path: '/staff/receptionists', icon: Users, label: 'Receptionists' },
        { path: '/staff/cleaners', icon: Users, label: 'Cleaners' },
      ]
    },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col z-40">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Hospital</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            if (item.isDropdown) {
              const isActive = location.pathname.startsWith('/staff')
              return (
                <li key={item.path}>
                  <button
                    onClick={() => setStaffOpen(!staffOpen)}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isActive ? 'bg-[#0066CC] text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown size={16} className={`transition-transform ${staffOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {staffOpen && (
                    <ul className="mt-1 ml-4 space-y-1">
                      {item.subItems?.map((subItem) => {
                        const isSubActive = location.pathname === subItem.path
                        return (
                          <li key={subItem.path}>
                            <Link
                              to={subItem.path}
                              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                isSubActive ? 'bg-blue-50 text-[#0066CC]' : 'text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              <subItem.icon size={18} />
                              <span>{subItem.label}</span>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </li>
              )
            }

            const isActive = location.pathname === item.path
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive ? 'bg-[#0066CC] text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-br from-[#0066CC] to-[#0052A3] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">AD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
            <p className="text-xs text-gray-500 truncate">admin@hospital.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
