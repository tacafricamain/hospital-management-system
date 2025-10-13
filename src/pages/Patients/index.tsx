import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import Avatar from '../../components/Avatar/Avatar'
import Toast from '../../components/Toast/Toast'
import { Search, Filter, Download, Plus, X, User, Calendar, Phone, Mail, MapPin, FileText, Activity, AlertCircle } from 'lucide-react'
import { useState } from 'react'

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [showAddPatient, setShowAddPatient] = useState(false)
  const [editingPatient, setEditingPatient] = useState<any>(null)
  const [formData, setFormData] = useState<any>({})
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportFormat, setExportFormat] = useState('csv')
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null)
  const [filters, setFilters] = useState({
    status: 'all',
    department: 'all',
    gender: 'all',
    ageRange: 'all'
  })

  const patients = [
    { id: 'P-001', name: 'Jane Doe', gender: 'Female', dob: '1990-05-12', age: 34, phone: '+1 (555) 123-4567', email: 'jane.doe@email.com', address: '123 Main St, City', dept: 'Cardiology', status: 'Active', lastVisit: '2024-01-15', diagnosis: 'Hypertension', bloodType: 'A+' },
    { id: 'P-002', name: 'Mark Smith', gender: 'Male', dob: '1985-03-01', age: 39, phone: '+1 (555) 234-5678', email: 'mark.smith@email.com', address: '456 Oak Ave, City', dept: 'Surgery', status: 'Active', lastVisit: '2024-01-20', diagnosis: 'Post-op recovery', bloodType: 'O+' },
    { id: 'P-003', name: 'Emily Johnson', gender: 'Female', dob: '1992-08-15', age: 32, phone: '+1 (555) 345-6789', email: 'emily.j@email.com', address: '789 Elm St, City', dept: 'General', status: 'Discharged', lastVisit: '2023-12-10', diagnosis: 'Routine checkup', bloodType: 'B+' },
    { id: 'P-004', name: 'Robert Brown', gender: 'Male', dob: '1978-11-22', age: 46, phone: '+1 (555) 456-7890', email: 'robert.b@email.com', address: '321 Pine Rd, City', dept: 'Neurology', status: 'Active', lastVisit: '2024-01-18', diagnosis: 'Migraine', bloodType: 'AB+' },
    { id: 'P-005', name: 'Sarah Wilson', gender: 'Female', dob: '1995-02-28', age: 29, phone: '+1 (555) 567-8901', email: 'sarah.w@email.com', address: '654 Maple Dr, City', dept: 'Pediatrics', status: 'Active', lastVisit: '2024-01-22', diagnosis: 'Allergies', bloodType: 'A-' },
    { id: 'P-006', name: 'Michael Davis', gender: 'Male', dob: '1988-07-10', age: 36, phone: '+1 (555) 678-9012', email: 'michael.d@email.com', address: '987 Cedar Ln, City', dept: 'Orthopedics', status: 'Active', lastVisit: '2024-01-19', diagnosis: 'Fracture', bloodType: 'O-' },
  ]

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(p => {
    // Apply status filter
    if (filters.status !== 'all' && p.status !== filters.status) return false
    
    // Apply department filter
    if (filters.department !== 'all' && p.dept !== filters.department) return false
    
    // Apply gender filter
    if (filters.gender !== 'all' && p.gender !== filters.gender) return false
    
    // Apply age range filter
    if (filters.ageRange !== 'all') {
      if (filters.ageRange === '0-18' && (p.age < 0 || p.age > 18)) return false
      if (filters.ageRange === '19-35' && (p.age < 19 || p.age > 35)) return false
      if (filters.ageRange === '36-50' && (p.age < 36 || p.age > 50)) return false
      if (filters.ageRange === '51+' && p.age < 51) return false
    }
    
    return true
  })

  const statusColors = {
    Active: 'bg-green-100 text-green-700 border-green-200',
    Discharged: 'bg-gray-100 text-gray-700 border-gray-200',
    Critical: 'bg-red-100 text-red-700 border-red-200'
  }

  const handleEditPatient = (patient: any) => {
    setEditingPatient(patient)
    setFormData({ ...patient })
    setSelectedPatient(null)
  }

  const handleSavePatient = () => {
    // Here you would normally save to backend
    console.log('Saving patient:', formData)
    setEditingPatient(null)
    setFormData({})
    setToast({ message: 'Patient information updated successfully!', type: 'success' })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleExport = () => {
    // Simulate export functionality
    const dataToExport = filteredPatients.map(p => ({
      ID: p.id,
      Name: p.name,
      Gender: p.gender,
      Age: p.age,
      Phone: p.phone,
      Email: p.email,
      Department: p.dept,
      Status: p.status,
      'Last Visit': p.lastVisit
    }))

    let exportSuccess = false
    let fileName = ''

    if (exportFormat === 'csv') {
      // Convert to CSV
      const headers = Object.keys(dataToExport[0]).join(',')
      const rows = dataToExport.map(row => Object.values(row).join(',')).join('\n')
      const csv = `${headers}\n${rows}`
      
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      fileName = `patients_${new Date().toISOString().split('T')[0]}.csv`
      a.download = fileName
      a.click()
      exportSuccess = true
    } else if (exportFormat === 'json') {
      // Export as JSON
      const json = JSON.stringify(dataToExport, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      fileName = `patients_${new Date().toISOString().split('T')[0]}.json`
      a.download = fileName
      a.click()
      exportSuccess = true
    } else if (exportFormat === 'pdf') {
      // Simulate PDF export
      console.log('PDF export would be generated here')
      exportSuccess = true
      fileName = 'PDF document'
    }

    setShowExportModal(false)
    
    if (exportSuccess) {
      setToast({ 
        message: `Successfully exported ${filteredPatients.length} patient records as ${exportFormat.toUpperCase()}!`, 
        type: 'success' 
      })
    }
  }

  const handleApplyFilters = () => {
    setShowFilterModal(false)
    setToast({ message: `${activeFilterCount} filter${activeFilterCount > 1 ? 's' : ''} applied successfully!`, type: 'info' })
  }

  const handleResetFilters = () => {
    setFilters({
      status: 'all',
      department: 'all',
      gender: 'all',
      ageRange: 'all'
    })
  }

  const activeFilterCount = Object.values(filters).filter(v => v !== 'all').length

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6 overflow-auto ml-64">
        <Navbar />
        
        {/* Header */}
        <div className="flex items-center justify-between animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Patients Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage patient records and medical history</p>
          </div>
          <button 
            onClick={() => setShowAddPatient(true)}
            className="px-6 py-2.5 bg-[#0066CC] hover:bg-[#0052A3] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          >
            <Plus size={18} />
            Add New Patient
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">1,245</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <User size={24} className="text-[#0066CC]" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Today</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">86</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Activity size={24} className="text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Critical Cases</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertCircle size={24} className="text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Discharged</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">24</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <FileText size={24} className="text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by name, ID, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowFilterModal(true)}
                className="relative flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter size={18} />
                <span className="font-medium">Filters</span>
                {activeFilterCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#0066CC] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setShowExportModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Download size={18} />
                <span className="font-medium">Export</span>
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button className="px-3 py-1.5 bg-[#0066CC] text-white rounded-lg text-sm font-medium">All</button>
            <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Active</button>
            <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Critical</button>
            <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors">Discharged</button>
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-white rounded-xl border border-gray-200 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Age</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Last Visit</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPatients.map((patient, index) => (
                  <tr 
                    key={patient.id} 
                    className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={patient.name} size={40} style="micah" className="ring-2 ring-blue-100 shadow-sm" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{patient.name}</p>
                          <p className="text-xs text-gray-500">{patient.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="text-gray-900 flex items-center gap-1">
                          <Phone size={12} className="text-gray-400" />
                          {patient.phone}
                        </p>
                        <p className="text-gray-500 flex items-center gap-1 mt-1">
                          <Mail size={12} className="text-gray-400" />
                          {patient.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">{patient.age}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{patient.dept}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">{patient.lastVisit}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${statusColors[patient.status as keyof typeof statusColors]}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedPatient(patient)
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

          {/* Pagination */}
          <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">{filteredPatients.length}</span> of <span className="font-semibold">{patients.length}</span> patients
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">Previous</button>
              <button className="px-3 py-2 bg-[#0066CC] text-white rounded-lg text-sm">1</button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">2</button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">Next</button>
            </div>
          </div>
        </div>
      </main>

      {/* Patient Details Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-auto animate-fadeIn">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-4">
                <Avatar name={selectedPatient.name} size={60} style="micah" className="ring-4 ring-blue-100" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedPatient.name}</h2>
                  <p className="text-sm text-gray-500">{selectedPatient.id} • {selectedPatient.gender}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPatient(null)}
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Date of Birth</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedPatient.dob}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Age</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedPatient.age} years</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Blood Type</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedPatient.bloodType}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Gender</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedPatient.gender}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Phone size={16} className="text-[#0066CC]" />
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Phone Number</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedPatient.phone}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Email Address</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedPatient.email}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedPatient.address}</p>
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity size={16} className="text-[#0066CC]" />
                  Medical Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Department</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedPatient.dept}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Last Visit</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedPatient.lastVisit}</p>
                  </div>
                  <div className="col-span-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Current Diagnosis</p>
                    <p className="text-sm font-medium text-gray-900 mt-1">{selectedPatient.diagnosis}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
              <button 
                onClick={() => setSelectedPatient(null)}
                className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => handleEditPatient(selectedPatient)}
                className="px-6 py-2.5 bg-[#0066CC] hover:bg-[#0052A3] text-white rounded-lg font-medium transition-colors"
              >
                Edit Patient
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Patient Modal */}
      {editingPatient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto animate-fadeIn">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Edit Patient Information</h2>
                <p className="text-sm text-gray-500">{editingPatient.name} • {editingPatient.id}</p>
              </div>
              <button 
                onClick={() => setEditingPatient(null)}
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.name || ''}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input 
                      type="date" 
                      value={formData.dob || ''}
                      onChange={(e) => handleInputChange('dob', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select 
                      value={formData.gender || ''}
                      onChange={(e) => handleInputChange('gender', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
                    <select 
                      value={formData.bloodType || ''}
                      onChange={(e) => handleInputChange('bloodType', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    >
                      <option value="">Select Blood Type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Phone size={16} className="text-[#0066CC]" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      value={formData.phone || ''}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="patient@email.com"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input 
                      type="text" 
                      value={formData.address || ''}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="123 Main St, City, State, ZIP"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Medical Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity size={16} className="text-[#0066CC]" />
                  Medical Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select 
                      value={formData.dept || ''}
                      onChange={(e) => handleInputChange('dept', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    >
                      <option value="">Select Department</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Surgery">Surgery</option>
                      <option value="General">General</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Orthopedics">Orthopedics</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select 
                      value={formData.status || ''}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    >
                      <option value="Active">Active</option>
                      <option value="Discharged">Discharged</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Diagnosis</label>
                    <textarea 
                      value={formData.diagnosis || ''}
                      onChange={(e) => handleInputChange('diagnosis', e.target.value)}
                      rows={3}
                      placeholder="Enter diagnosis details..."
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText size={16} className="text-[#0066CC]" />
                  Additional Notes
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Medical History & Notes</label>
                  <textarea 
                    value={formData.notes || ''}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    rows={4}
                    placeholder="Add any additional medical history, allergies, or important notes..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between rounded-b-2xl">
              <button 
                className="px-4 py-2.5 border-2 border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
              >
                Delete Patient
              </button>
              <div className="flex gap-3">
                <button 
                  onClick={() => setEditingPatient(null)}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSavePatient}
                  className="px-6 py-2.5 bg-[#0066CC] hover:bg-[#0052A3] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn">
            {/* Modal Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Export Patient Data</h2>
                <p className="text-sm text-gray-500">Choose your preferred format</p>
              </div>
              <button 
                onClick={() => setShowExportModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Export Summary */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Total Records</span>
                  <span className="text-lg font-bold text-[#0066CC]">{filteredPatients.length}</span>
                </div>
                <p className="text-xs text-gray-600">
                  {searchTerm ? 'Exporting filtered results' : 'Exporting all patient records'}
                </p>
              </div>

              {/* Format Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Select Export Format</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 has-[:checked]:border-[#0066CC] has-[:checked]:bg-blue-50">
                    <input
                      type="radio"
                      name="export-format"
                      value="csv"
                      checked={exportFormat === 'csv'}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="w-4 h-4 text-[#0066CC]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <FileText size={18} className="text-[#0066CC]" />
                        <span className="font-semibold text-gray-900">CSV File</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Best for Excel and data analysis</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 has-[:checked]:border-[#0066CC] has-[:checked]:bg-blue-50">
                    <input
                      type="radio"
                      name="export-format"
                      value="json"
                      checked={exportFormat === 'json'}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="w-4 h-4 text-[#0066CC]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <FileText size={18} className="text-green-600" />
                        <span className="font-semibold text-gray-900">JSON File</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Best for developers and APIs</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50 has-[:checked]:border-[#0066CC] has-[:checked]:bg-blue-50">
                    <input
                      type="radio"
                      name="export-format"
                      value="pdf"
                      checked={exportFormat === 'pdf'}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="w-4 h-4 text-[#0066CC]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <FileText size={18} className="text-red-600" />
                        <span className="font-semibold text-gray-900">PDF Document</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Best for printing and reports</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Export Options */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Export Options</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-[#0066CC] rounded" />
                    <span className="text-gray-700">Include contact information</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-[#0066CC] rounded" />
                    <span className="text-gray-700">Include medical history</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="w-4 h-4 text-[#0066CC] rounded" />
                    <span className="text-gray-700">Include timestamps</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
              <button 
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleExport}
                className="px-6 py-2.5 bg-[#0066CC] hover:bg-[#0052A3] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Download size={18} />
                Export Data
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fadeIn">
            {/* Modal Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Filter Patients</h2>
                <p className="text-sm text-gray-500">Apply filters to narrow down results</p>
              </div>
              <button 
                onClick={() => setShowFilterModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
                <select 
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Discharged">Discharged</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              {/* Department Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Department</label>
                <select 
                  value={filters.department}
                  onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                >
                  <option value="all">All Departments</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Surgery">Surgery</option>
                  <option value="General">General</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Orthopedics">Orthopedics</option>
                </select>
              </div>

              {/* Gender Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Gender</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setFilters({ ...filters, gender: 'all' })}
                    className={`px-4 py-2.5 rounded-lg border-2 font-medium transition-all ${
                      filters.gender === 'all'
                        ? 'border-[#0066CC] bg-blue-50 text-[#0066CC]'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilters({ ...filters, gender: 'Male' })}
                    className={`px-4 py-2.5 rounded-lg border-2 font-medium transition-all ${
                      filters.gender === 'Male'
                        ? 'border-[#0066CC] bg-blue-50 text-[#0066CC]'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setFilters({ ...filters, gender: 'Female' })}
                    className={`px-4 py-2.5 rounded-lg border-2 font-medium transition-all ${
                      filters.gender === 'Female'
                        ? 'border-[#0066CC] bg-blue-50 text-[#0066CC]'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Age Range Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Age Range</label>
                <select 
                  value={filters.ageRange}
                  onChange={(e) => setFilters({ ...filters, ageRange: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0066CC] focus:border-transparent"
                >
                  <option value="all">All Ages</option>
                  <option value="0-18">0-18 years (Pediatric)</option>
                  <option value="19-35">19-35 years (Young Adult)</option>
                  <option value="36-50">36-50 years (Adult)</option>
                  <option value="51+">51+ years (Senior)</option>
                </select>
              </div>

              {/* Active Filters Summary */}
              {activeFilterCount > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Active Filters</p>
                      <p className="text-xs text-gray-600 mt-1">{activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} applied</p>
                    </div>
                    <button 
                      onClick={handleResetFilters}
                      className="text-sm text-[#0066CC] hover:text-[#0052A3] font-medium"
                    >
                      Reset All
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
              <button 
                onClick={() => setShowFilterModal(false)}
                className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleApplyFilters}
                className="px-6 py-2.5 bg-[#0066CC] hover:bg-[#0052A3] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Filter size={18} />
                Apply Filters
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
