import Sidebar from '../../../components/Sidebar/Sidebar'
import Navbar from '../../../components/Navbar/Navbar'
import Avatar from '../../../components/Avatar/Avatar'
import Toast from '../../../components/Toast/Toast'
import { Search, Filter, Download, Plus, X, User, Phone, Mail, Calendar, Clock, UserCheck, UserX, Briefcase, Award, IdCard, Users } from 'lucide-react'
import { useState } from 'react'

export default function Doctors() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null)
  const [showAddDoctor, setShowAddDoctor] = useState(false)
  const [showAssignPatient, setShowAssignPatient] = useState(false)
  const [showSchedule, setShowSchedule] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null)
  const [formData, setFormData] = useState<any>({})
  const [statusFilter, setStatusFilter] = useState('all')

  const doctors = [
    { id: 'DOC-001', name: 'Dr. Sarah Smith', specialty: 'Cardiologist', phone: '+1 (555) 100-1001', email: 'sarah.smith@hospital.com', status: 'active', patients: 45, experience: '15 years', department: 'Cardiology', schedule: 'Mon-Fri, 9AM-5PM', vacation: [], offDays: ['2024-02-10', '2024-02-11'], attendance: '98%', joinDate: '2015-03-20', qualification: 'MD, FACC', licenseNo: 'MED-12345' },
    { id: 'DOC-002', name: 'Dr. Michael Johnson', specialty: 'Surgeon', phone: '+1 (555) 100-1002', email: 'michael.j@hospital.com', status: 'active', patients: 32, experience: '12 years', department: 'Surgery', schedule: 'Mon-Sat, 8AM-4PM', vacation: [], offDays: [], attendance: '95%', joinDate: '2018-06-15', qualification: 'MD, FACS', licenseNo: 'MED-12346' },
    { id: 'DOC-003', name: 'Dr. Emily Davis', specialty: 'Pediatrician', phone: '+1 (555) 100-1003', email: 'emily.davis@hospital.com', status: 'on-leave', patients: 28, experience: '8 years', department: 'Pediatrics', schedule: 'Mon-Fri, 10AM-6PM', vacation: ['2024-01-25', '2024-01-26'], offDays: [], attendance: '92%', joinDate: '2020-01-10', qualification: 'MD, FAAP', licenseNo: 'MED-12347' },
    { id: 'DOC-004', name: 'Dr. Robert Wilson', specialty: 'Neurologist', phone: '+1 (555) 100-1004', email: 'robert.w@hospital.com', status: 'active', patients: 38, experience: '20 years', department: 'Neurology', schedule: 'Tue-Sat, 9AM-5PM', vacation: [], offDays: [], attendance: '97%', joinDate: '2012-09-01', qualification: 'MD, FAAN', licenseNo: 'MED-12348' },
    { id: 'DOC-005', name: 'Dr. Lisa Anderson', specialty: 'Dentist', phone: '+1 (555) 100-1005', email: 'lisa.a@hospital.com', status: 'active', patients: 52, experience: '10 years', department: 'Dentistry', schedule: 'Mon-Fri, 9AM-5PM', vacation: [], offDays: [], attendance: '96%', joinDate: '2017-04-12', qualification: 'DDS', licenseNo: 'MED-12349' },
  ]

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusColors = {
    active: 'bg-green-100 text-green-700 border-green-200',
    'on-leave': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    inactive: 'bg-gray-100 text-gray-700 border-gray-200'
  }

  const stats = {
    totalDoctors: doctors.length,
    active: doctors.filter(d => d.status === 'active').length,
    onLeave: doctors.filter(d => d.status === 'on-leave').length,
    totalPatients: doctors.reduce((sum, d) => sum + d.patients, 0)
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleAddDoctor = () => {
    const newId = `DOC-${String(doctors.length + 1).padStart(3, '0')}`
    console.log('Adding doctor:', { ...formData, id: newId })
    setShowAddDoctor(false)
    setFormData({})
    setToast({ message: `Doctor added successfully! ID: ${newId}`, type: 'success' })
  }

  const handleAssignPatient = () => {
    console.log('Assigning patient:', formData)
    setShowAssignPatient(false)
    setFormData({})
    setToast({ message: 'Patient assigned successfully!', type: 'success' })
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6 overflow-auto ml-64">
        <Navbar />
        
        {/* Header */}
        <div className="flex items-center justify-between animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Doctors Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage medical staff, schedules, and assignments</p>
          </div>
          <button 
            onClick={() => setShowAddDoctor(true)}
            className="px-6 py-2.5 bg-[#0066CC] hover:bg-[#0052A3] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            <Plus size={18} />
            Add Doctor
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Doctors</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalDoctors}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users size={24} className="text-[#0066CC]" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Today</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.active}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <UserCheck size={24} className="text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">On Leave</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.onLeave}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <UserX size={24} className="text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalPatients}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Briefcase size={24} className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by name, specialty, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === 'all' ? 'bg-[#0066CC] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('active')}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === 'active' ? 'bg-[#0066CC] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setStatusFilter('on-leave')}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === 'on-leave' ? 'bg-[#0066CC] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                On Leave
              </button>
            </div>
          </div>
        </div>

        {/* Doctors Table */}
        <div className="bg-white rounded-xl border border-gray-200 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Doctor</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Specialty</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Patients</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Attendance</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDoctors.map((doctor) => (
                  <tr 
                    key={doctor.id}
                    className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={doctor.name} size={40} style="micah" className="ring-2 ring-blue-100 shadow-sm" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{doctor.name}</p>
                          <p className="text-xs text-gray-500">{doctor.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Award size={16} className="text-[#0066CC]" />
                        <span className="text-sm font-medium text-gray-900">{doctor.specialty}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-gray-900 flex items-center gap-1">
                          <Phone size={12} className="text-gray-400" />
                          {doctor.phone}
                        </p>
                        <p className="text-gray-500 flex items-center gap-1 mt-1">
                          <Mail size={12} className="text-gray-400" />
                          {doctor.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-gray-900">{doctor.patients}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-green-600">{doctor.attendance}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${statusColors[doctor.status as keyof typeof statusColors]}`}>
                        {doctor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedDoctor(doctor)
                        }}
                        className="text-[#0066CC] hover:text-[#0052A3] text-sm font-medium"
                      >
                        View Details →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Doctor Details Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto animate-fadeIn">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-4">
                <Avatar name={selectedDoctor.name} size={60} style="micah" className="ring-4 ring-blue-100" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedDoctor.name}</h2>
                  <p className="text-sm text-gray-500">{selectedDoctor.id} • {selectedDoctor.specialty}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedDoctor(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Professional Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Award size={16} className="text-[#0066CC]" />
                  Professional Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">License Number</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedDoctor.licenseNo}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Qualification</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedDoctor.qualification}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Experience</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedDoctor.experience}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Join Date</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedDoctor.joinDate}</p>
                  </div>
                </div>
              </div>

              {/* Contact & Schedule */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Phone size={16} className="text-[#0066CC]" />
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">{selectedDoctor.phone}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">{selectedDoctor.email}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock size={16} className="text-[#0066CC]" />
                    Schedule & Attendance
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Working Hours</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">{selectedDoctor.schedule}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Attendance Rate</p>
                      <p className="text-sm font-medium text-green-600 mt-1">{selectedDoctor.attendance}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase size={16} className="text-[#0066CC]" />
                  Performance Metrics
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
                    <p className="text-2xl font-bold text-[#0066CC]">{selectedDoctor.patients}</p>
                    <p className="text-xs text-gray-600 mt-1">Assigned Patients</p>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">{selectedDoctor.attendance}</p>
                    <p className="text-xs text-gray-600 mt-1">Attendance</p>
                  </div>
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg text-center">
                    <p className="text-2xl font-bold text-purple-600">{selectedDoctor.offDays.length}</p>
                    <p className="text-xs text-gray-600 mt-1">Off Days This Month</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
              <button 
                onClick={() => setSelectedDoctor(null)}
                className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => {
                  setShowAssignPatient(true)
                }}
                className="px-6 py-2.5 bg-[#0066CC] hover:bg-[#0052A3] text-white rounded-lg font-medium transition-colors"
              >
                Assign Patient
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Doctor Modal */}
      {showAddDoctor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-auto animate-fadeIn">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Add New Doctor</h2>
                <p className="text-sm text-gray-500">Fill in the doctor's details</p>
              </div>
              <button 
                onClick={() => setShowAddDoctor(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Dr. John Doe"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                  <select 
                    value={formData.specialty || ''}
                    onChange={(e) => handleInputChange('specialty', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  >
                    <option value="">Select Specialty</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Surgeon">Surgeon</option>
                    <option value="Pediatrician">Pediatrician</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Dentist">Dentist</option>
                    <option value="Orthopedic">Orthopedic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input 
                    type="tel" 
                    value={formData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    value={formData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="doctor@hospital.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
                  <input 
                    type="text" 
                    value={formData.licenseNo || ''}
                    onChange={(e) => handleInputChange('licenseNo', e.target.value)}
                    placeholder="MED-12345"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                  <input 
                    type="text" 
                    value={formData.qualification || ''}
                    onChange={(e) => handleInputChange('qualification', e.target.value)}
                    placeholder="MD, FACC"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
              <button 
                onClick={() => setShowAddDoctor(false)}
                className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddDoctor}
                className="px-6 py-2.5 bg-[#0066CC] hover:bg-[#0052A3] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
              >
                Add Doctor
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
