import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import Avatar from '../../components/Avatar/Avatar'
import Toast from '../../components/Toast/Toast'
import { Calendar as CalendarIcon, List, Plus, Search, Filter, X, Clock, User, Phone, Mail, MapPin, CheckCircle, XCircle, AlertCircle as AlertIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function Appointments() {
  const [view, setView] = useState<'calendar' | 'list'>('list')
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
  const [showNewAppointment, setShowNewAppointment] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [formData, setFormData] = useState<any>({})

  const appointments = [
    { id: 'APT-001', patientName: 'Jane Doe', patientId: 'P-001', doctor: 'Dr. Smith', department: 'Cardiology', date: '2024-01-25', time: '09:00 AM', duration: '30 min', type: 'Consultation', status: 'confirmed', phone: '+1 (555) 123-4567', email: 'jane.doe@email.com', notes: 'Regular checkup' },
    { id: 'APT-002', patientName: 'Mark Smith', patientId: 'P-002', doctor: 'Dr. Johnson', department: 'Surgery', date: '2024-01-25', time: '10:30 AM', duration: '45 min', type: 'Follow-up', status: 'pending', phone: '+1 (555) 234-5678', email: 'mark.smith@email.com', notes: 'Post-surgery checkup' },
    { id: 'APT-003', patientName: 'Emily Johnson', patientId: 'P-003', doctor: 'Dr. Williams', department: 'General', date: '2024-01-25', time: '11:00 AM', duration: '30 min', type: 'Consultation', status: 'confirmed', phone: '+1 (555) 345-6789', email: 'emily.j@email.com', notes: 'Routine examination' },
    { id: 'APT-004', patientName: 'Robert Brown', patientId: 'P-004', doctor: 'Dr. Davis', department: 'Neurology', date: '2024-01-25', time: '02:00 PM', duration: '60 min', type: 'Treatment', status: 'confirmed', phone: '+1 (555) 456-7890', email: 'robert.b@email.com', notes: 'Migraine treatment session' },
    { id: 'APT-005', patientName: 'Sarah Wilson', patientId: 'P-005', doctor: 'Dr. Martinez', department: 'Pediatrics', date: '2024-01-26', time: '09:30 AM', duration: '30 min', type: 'Consultation', status: 'pending', phone: '+1 (555) 567-8901', email: 'sarah.w@email.com', notes: 'Allergy consultation' },
    { id: 'APT-006', patientName: 'Michael Davis', patientId: 'P-006', doctor: 'Dr. Anderson', department: 'Orthopedics', date: '2024-01-26', time: '03:00 PM', duration: '45 min', type: 'Follow-up', status: 'cancelled', phone: '+1 (555) 678-9012', email: 'michael.d@email.com', notes: 'Fracture follow-up' },
  ]

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.doctor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusColors = {
    confirmed: 'bg-green-100 text-green-700 border-green-200',
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    cancelled: 'bg-red-100 text-red-700 border-red-200',
    completed: 'bg-blue-100 text-blue-700 border-blue-200'
  }

  const statusIcons = {
    confirmed: <CheckCircle size={16} />,
    pending: <Clock size={16} />,
    cancelled: <XCircle size={16} />,
    completed: <CheckCircle size={16} />
  }

  const stats = {
    total: appointments.length,
    today: appointments.filter(a => a.date === '2024-01-25').length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length
  }

  const handleStatusChange = (appointmentId: string, newStatus: string) => {
    // Here you would update the backend
    console.log('Changing status:', appointmentId, newStatus)
    setToast({ message: `Appointment ${newStatus} successfully!`, type: 'success' })
    setSelectedAppointment(null)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleCreateAppointment = () => {
    console.log('Creating appointment:', formData)
    setShowNewAppointment(false)
    setFormData({})
    setToast({ message: 'Appointment scheduled successfully!', type: 'success' })
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6 overflow-auto ml-64">
        <Navbar />
        
        {/* Header */}
        <div className="flex items-center justify-between animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and schedule patient appointments</p>
          </div>
          <div className="flex gap-3">
            <div className="flex bg-white border border-gray-200 rounded-lg p-1">
              <button 
                onClick={() => setView('list')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  view === 'list' ? 'bg-[#0066CC] text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List size={18} />
                List
              </button>
              <button 
                onClick={() => setView('calendar')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  view === 'calendar' ? 'bg-[#0066CC] text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <CalendarIcon size={18} />
                Calendar
              </button>
            </div>
            <button 
              onClick={() => setShowNewAppointment(true)}
              className="px-6 py-2.5 bg-[#0066CC] hover:bg-[#0052A3] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
            >
              <Plus size={18} />
              New Appointment
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Appointments</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <CalendarIcon size={24} className="text-[#0066CC]" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Today</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.today}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Clock size={24} className="text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.pending}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <AlertIcon size={24} className="text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Confirmed</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.confirmed}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle size={24} className="text-green-600" />
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
                  placeholder="Search by patient name, ID, or doctor..."
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
                onClick={() => setStatusFilter('confirmed')}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === 'confirmed' ? 'bg-[#0066CC] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Confirmed
              </button>
              <button
                onClick={() => setStatusFilter('pending')}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === 'pending' ? 'bg-[#0066CC] text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                Pending
              </button>
            </div>
          </div>
        </div>

        {/* Appointments List View */}
        {view === 'list' && (
          <div className="bg-white rounded-xl border border-gray-200 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Scheduled Appointments</h2>
              <p className="text-sm text-gray-500 mt-1">View and manage all appointments</p>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredAppointments.map((apt, index) => (
                <div 
                  key={apt.id}
                  className="p-6 hover:bg-blue-50/30 transition-colors cursor-pointer"
                  onClick={() => setSelectedAppointment(apt)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <Avatar name={apt.patientName} size={48} style="micah" className="ring-2 ring-blue-100 shadow-sm" />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-base font-semibold text-gray-900">{apt.patientName}</h3>
                          <span className="text-xs text-gray-500">{apt.patientId}</span>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${statusColors[apt.status as keyof typeof statusColors]}`}>
                            {statusIcons[apt.status as keyof typeof statusIcons]}
                            {apt.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <User size={14} />
                            {apt.doctor}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {apt.date} • {apt.time}
                          </span>
                          <span className="text-gray-400">•</span>
                          <span>{apt.department}</span>
                          <span className="text-gray-400">•</span>
                          <span className="font-medium text-[#0066CC]">{apt.type}</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-[#0066CC] hover:text-[#0052A3] text-sm font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Calendar View */}
        {view === 'calendar' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">January 2024</h2>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <button className="px-4 py-2 bg-[#0066CC] text-white rounded-lg text-sm font-medium">Today</button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-semibold text-gray-600 pb-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const dayNum = i - 4 + 1
                const hasAppointments = dayNum === 25 || dayNum === 26
                return (
                  <div 
                    key={i}
                    className={`aspect-square border rounded-lg p-2 transition-colors ${
                      dayNum > 0 && dayNum <= 31
                        ? hasAppointments
                          ? 'bg-blue-50 border-[#0066CC] cursor-pointer hover:bg-blue-100'
                          : 'border-gray-200 hover:bg-gray-50 cursor-pointer'
                        : 'bg-gray-50 border-gray-100'
                    }`}
                  >
                    {dayNum > 0 && dayNum <= 31 && (
                      <>
                        <div className="text-sm font-medium text-gray-900">{dayNum}</div>
                        {hasAppointments && (
                          <div className="mt-1">
                            <div className="w-1.5 h-1.5 bg-[#0066CC] rounded-full"></div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </main>

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto animate-fadeIn">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Appointment Details</h2>
                <p className="text-sm text-gray-500">{selectedAppointment.id}</p>
              </div>
              <button 
                onClick={() => setSelectedAppointment(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Patient Info */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User size={16} className="text-[#0066CC]" />
                  Patient Information
                </h3>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <Avatar name={selectedAppointment.patientName} size={60} style="micah" className="ring-4 ring-blue-100" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{selectedAppointment.patientName}</h4>
                    <p className="text-sm text-gray-500">{selectedAppointment.patientId}</p>
                    <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Phone size={12} />
                        {selectedAppointment.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail size={12} />
                        {selectedAppointment.email}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CalendarIcon size={16} className="text-[#0066CC]" />
                  Appointment Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedAppointment.date}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedAppointment.time}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedAppointment.duration}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedAppointment.type}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Doctor</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedAppointment.doctor}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Department</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedAppointment.department}</p>
                  </div>
                  <div className="col-span-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Status</p>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border mt-2 ${statusColors[selectedAppointment.status as keyof typeof statusColors]}`}>
                      {statusIcons[selectedAppointment.status as keyof typeof statusIcons]}
                      {selectedAppointment.status}
                    </span>
                  </div>
                  <div className="col-span-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Notes</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedAppointment.notes}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between rounded-b-2xl">
              <button 
                onClick={() => handleStatusChange(selectedAppointment.id, 'cancelled')}
                className="px-4 py-2.5 border-2 border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
              >
                Cancel Appointment
              </button>
              <div className="flex gap-3">
                <button 
                  onClick={() => setSelectedAppointment(null)}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Close
                </button>
                {selectedAppointment.status === 'pending' && (
                  <button 
                    onClick={() => handleStatusChange(selectedAppointment.id, 'confirmed')}
                    className="px-6 py-2.5 bg-[#0066CC] hover:bg-[#0052A3] text-white rounded-lg font-medium transition-colors"
                  >
                    Confirm Appointment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Appointment Modal */}
      {showNewAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-auto animate-fadeIn">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Schedule New Appointment</h2>
                <p className="text-sm text-gray-500">Fill in the appointment details</p>
              </div>
              <button 
                onClick={() => setShowNewAppointment(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Patient</label>
                  <select 
                    value={formData.patientId || ''}
                    onChange={(e) => handleInputChange('patientId', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  >
                    <option value="">Select Patient</option>
                    <option value="P-001">Jane Doe (P-001)</option>
                    <option value="P-002">Mark Smith (P-002)</option>
                    <option value="P-003">Emily Johnson (P-003)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Doctor</label>
                  <select 
                    value={formData.doctor || ''}
                    onChange={(e) => handleInputChange('doctor', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  >
                    <option value="">Select Doctor</option>
                    <option value="Dr. Smith">Dr. Smith</option>
                    <option value="Dr. Johnson">Dr. Johnson</option>
                    <option value="Dr. Williams">Dr. Williams</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select 
                    value={formData.department || ''}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  >
                    <option value="">Select Department</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Surgery">Surgery</option>
                    <option value="General">General</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Pediatrics">Pediatrics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type</label>
                  <select 
                    value={formData.type || ''}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  >
                    <option value="">Select Type</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Treatment">Treatment</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input 
                    type="date" 
                    value={formData.date || ''}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input 
                    type="time" 
                    value={formData.time || ''}
                    onChange={(e) => handleInputChange('time', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea 
                    value={formData.notes || ''}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={3}
                    placeholder="Add any special instructions or notes..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
              <button 
                onClick={() => setShowNewAppointment(false)}
                className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateAppointment}
                className="px-6 py-2.5 bg-[#0066CC] hover:bg-[#0052A3] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
              >
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  )
}
