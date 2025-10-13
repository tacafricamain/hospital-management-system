import { Bell, MessageSquare, Bed, Search, ChevronDown, User, Settings, LogOut, HelpCircle, AlertCircle, Calendar, DollarSign, X } from 'lucide-react'
import { useState } from 'react'
import Avatar from '../Avatar/Avatar'

export default function Navbar() {
  const [notifications] = useState(5)
  const [messages] = useState(3)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showMessages, setShowMessages] = useState(false)
  const [showNewPatientModal, setShowNewPatientModal] = useState(false)
  const userRole = localStorage.getItem('userRole') || 'doctor'
  
  const userName = {
    admin: 'Admin User',
    doctor: 'Dr. Robert Johnson',
    nurse: 'Nurse Sarah Williams',
    receptionist: 'Emily Davis',
    billing: 'Michael Chen'
  }[userRole] || 'Dr. Robert Johnson'

  const greeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  const closeAllDropdowns = () => {
    setShowProfileDropdown(false)
    setShowNotifications(false)
    setShowMessages(false)
  }

  const toggleMessages = () => {
    closeAllDropdowns()
    setShowMessages(true)
  }

  const toggleNotifications = () => {
    closeAllDropdowns()
    setShowNotifications(true)
  }

  const toggleProfile = () => {
    closeAllDropdowns()
    setShowProfileDropdown(true)
  }

  return (
    <header className="flex items-center justify-between py-4 px-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Left: Greeting & Search */}
      <div className="flex items-center gap-4 flex-1">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">{greeting()}, {userName.split(' ')[1]}! 👋</h1>
          <p className="text-sm text-gray-500">Here's what's happening today</p>
        </div>
        <div className="hidden lg:flex items-center gap-2 bg-white border rounded-lg px-4 py-2 ml-4 flex-1 max-w-md">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search patients, appointments..." 
            className="flex-1 outline-none text-sm"
          />
        </div>
      </div>

      {/* Right: Icons & Profile */}
      <div className="flex items-center gap-3">
        {/* Bed Status */}
        <div className="hidden md:flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          <Bed size={18} className="text-green-600" />
          <div className="text-sm">
            <span className="font-semibold text-green-700">24</span>
            <span className="text-green-600 ml-1">Beds Available</span>
          </div>
        </div>

        {/* Messages */}
        <div className="relative">
          <button 
            onClick={toggleMessages}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MessageSquare size={20} className="text-gray-600" />
            {messages > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                {messages}
              </span>
            )}
          </button>

          {/* Messages Dropdown */}
          {showMessages && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-fadeIn">
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">Messages</h3>
              </div>
              <div className="max-h-96 overflow-auto">
                <a href="#" className="flex items-start gap-3 px-4 py-3 hover:bg-blue-50 transition-colors">
                  <Avatar name="Sarah Wilson" size={40} style="micah" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">Sarah Wilson</p>
                    <p className="text-xs text-gray-500 truncate">Need to reschedule appointment...</p>
                    <p className="text-xs text-gray-400 mt-1">5 min ago</p>
                  </div>
                </a>
                <a href="#" className="flex items-start gap-3 px-4 py-3 hover:bg-blue-50 transition-colors">
                  <Avatar name="Dr. Michael Chen" size={40} style="micah" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">Dr. Michael Chen</p>
                    <p className="text-xs text-gray-500 truncate">Patient records updated</p>
                    <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                  </div>
                </a>
                <a href="#" className="flex items-start gap-3 px-4 py-3 hover:bg-blue-50 transition-colors">
                  <Avatar name="Emily Davis" size={40} style="micah" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">Emily Davis</p>
                    <p className="text-xs text-gray-500 truncate">Insurance claim approved</p>
                    <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
                  </div>
                </a>
              </div>
              <div className="border-t border-gray-100 px-4 py-2">
                <a href="#" className="text-sm text-[#0066CC] hover:text-[#0052A3] font-medium">View all messages</a>
              </div>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={toggleNotifications}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bell size={20} className="text-gray-600" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold animate-pulse">
                {notifications}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-fadeIn">
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-auto">
                <a href="#" className="flex items-start gap-3 px-4 py-3 hover:bg-blue-50 transition-colors border-l-4 border-red-500">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertCircle size={16} className="text-red-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">Critical Alert</p>
                    <p className="text-xs text-gray-500">Patient John Doe requires immediate attention</p>
                    <p className="text-xs text-gray-400 mt-1">Just now</p>
                  </div>
                </a>
                <a href="#" className="flex items-start gap-3 px-4 py-3 hover:bg-blue-50 transition-colors border-l-4 border-blue-500">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar size={16} className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">New Appointment</p>
                    <p className="text-xs text-gray-500">Alice Lee booked for tomorrow 10:30</p>
                    <p className="text-xs text-gray-400 mt-1">10 min ago</p>
                  </div>
                </a>
                <a href="#" className="flex items-start gap-3 px-4 py-3 hover:bg-blue-50 transition-colors border-l-4 border-green-500">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign size={16} className="text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">Payment Received</p>
                    <p className="text-xs text-gray-500">$450 payment from John Carter</p>
                    <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                  </div>
                </a>
              </div>
              <div className="border-t border-gray-100 px-4 py-2">
                <a href="#" className="text-sm text-[#0066CC] hover:text-[#0052A3] font-medium">View all notifications</a>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-300 hidden sm:block"></div>

        {/* Profile */}
        <div className="relative">
          <button 
            onClick={toggleProfile}
            className="flex items-center gap-3 hover:bg-gray-100 rounded-lg pl-2 pr-3 py-2 transition-colors"
          >
            <Avatar name={userName} size={36} style="micah" className="ring-2 ring-blue-100 transition-all" />
            <div className="hidden sm:block text-left">
              <div className="text-sm font-semibold text-gray-900">{userName}</div>
              <div className="text-xs text-gray-500 capitalize">{userRole}</div>
            </div>
            <ChevronDown size={16} className={`text-gray-400 hidden sm:block transition-transform ${showProfileDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-fadeIn">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500">{userRole}@hospital.com</p>
              </div>
              <a href="#" className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors text-gray-700 text-sm">
                <User size={16} className="text-gray-400" />
                <span>My Profile</span>
              </a>
              <a href="/settings" className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors text-gray-700 text-sm">
                <Settings size={16} className="text-gray-400" />
                <span>Settings</span>
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors text-gray-700 text-sm">
                <HelpCircle size={16} className="text-gray-400" />
                <span>Help & Support</span>
              </a>
              <div className="border-t border-gray-100 mt-2 pt-2">
                <a href="/login" className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-red-600 text-sm">
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <button 
          onClick={() => setShowNewPatientModal(true)}
          className="hidden lg:flex px-4 py-2 bg-[#0066CC] hover:bg-[#0052A3] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
        >
          + New Patient
        </button>
      </div>

      {/* New Patient Modal */}
      {showNewPatientModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto animate-fadeIn">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Add New Patient</h2>
                <p className="text-sm text-gray-500">Enter basic information to create patient record</p>
              </div>
              <button 
                onClick={() => setShowNewPatientModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User size={16} className="text-[#0066CC]" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input 
                      type="text" 
                      placeholder="John" 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input 
                      type="text" 
                      placeholder="Doe" 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MessageSquare size={16} className="text-[#0066CC]" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 123-4567" 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      placeholder="john.doe@email.com" 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input 
                      type="text" 
                      placeholder="123 Main Street, City, State, ZIP" 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertCircle size={16} className="text-[#0066CC]" />
                  Emergency Contact (Optional)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe" 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 987-6543" 
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Info Note */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Additional details like medical history, insurance information, and more can be added after saving this basic information.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
              <button 
                onClick={() => setShowNewPatientModal(false)}
                className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button className="px-6 py-2.5 bg-[#0066CC] hover:bg-[#0052A3] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all">
                Save Patient
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
