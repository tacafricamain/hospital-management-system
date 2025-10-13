import { User, Building2, Bell, Shield, Database, Palette, Save } from 'lucide-react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import Avatar from '../../components/Avatar/Avatar'

export default function Settings() {
  const userName = 'Dr. Robert Johnson'
  
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Sidebar />
      <main className="flex-1 p-6 space-y-8 overflow-auto ml-64">
        <Navbar />
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your account and preferences</p>
          </div>
          <button className="px-6 py-2.5 bg-[#0066CC] hover:bg-[#0052A3] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2">
            <Save size={18} />
            Save All Changes
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <User className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Profile Settings</h2>
                <p className="text-sm text-gray-500">Update your personal information</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
              <Avatar name={userName} size={80} style="micah" className="ring-4 ring-white shadow-lg" />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{userName}</p>
                <p className="text-sm text-gray-500">Click to change avatar</p>
                <button className="mt-2 text-sm text-[#0066CC] hover:text-[#0052A3] font-medium">
                  Upload New Photo
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" defaultValue="Dr. Robert Johnson" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" defaultValue="robert.j@hospital.com" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                <Building2 className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Practice Information</h2>
                <p className="text-sm text-gray-500">Manage hospital details</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Practice Name</label>
                <input type="text" defaultValue="City General Hospital" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input type="text" defaultValue="123 Medical Center Blvd" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                <input type="tel" defaultValue="+1 (555) 100-2000" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent transition-all" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg">
                <Bell className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                <p className="text-sm text-gray-500">Choose what you want to be notified about</p>
              </div>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <span className="text-sm text-gray-700">Email notifications</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-[#0066CC] rounded" />
              </label>
              <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <span className="text-sm text-gray-700">SMS reminders</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-[#0066CC] rounded" />
              </label>
              <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <span className="text-sm text-gray-700">Desktop notifications</span>
                <input type="checkbox" className="w-5 h-5 text-[#0066CC] rounded" />
              </label>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
                <Shield className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Security</h2>
                <p className="text-sm text-gray-500">Manage your account security</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input type="password" placeholder="Enter new password" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input type="password" placeholder="Confirm password" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent" />
              </div>
              <label className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <input type="checkbox" defaultChecked className="w-5 h-5 text-[#0066CC] rounded" />
                <span className="text-sm text-gray-700">Enable two-factor authentication</span>
              </label>
              <button className="w-full px-4 py-2.5 bg-[#0066CC] hover:bg-[#0052A3] text-white rounded-lg font-medium">
                Update Security
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
