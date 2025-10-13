import { Search, Filter, Download, UserCircle } from 'lucide-react'
import Avatar from '../Avatar/Avatar'

export default function PatientTable() {
  const rows = [
    { id: 'P-001', name: 'Jane Doe', gender: 'F', dob: '1990-05-12', age: 34, dept: 'General', status: 'Active', avatar: 'JD' },
    { id: 'P-002', name: 'Mark Smith', gender: 'M', dob: '1985-03-01', age: 39, dept: 'Surgery', status: 'Active', avatar: 'MS' },
    { id: 'P-003', name: 'Emily Johnson', gender: 'F', dob: '1992-08-15', age: 32, dept: 'Cardiology', status: 'Discharged', avatar: 'EJ' },
    { id: 'P-004', name: 'Robert Brown', gender: 'M', dob: '1978-11-22', age: 46, dept: 'Neurology', status: 'Active', avatar: 'RB' },
    { id: 'P-005', name: 'Sarah Wilson', gender: 'F', dob: '1995-02-28', age: 29, dept: 'Pediatrics', status: 'Active', avatar: 'SW' },
  ]

  const statusColors = {
    Active: 'bg-green-100 text-green-700 border-green-200',
    Discharged: 'bg-gray-100 text-gray-700 border-gray-200'
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Recent Patients</h2>
          <p className="text-sm text-gray-500">Manage and track patient records</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2">
            <Search size={18} className="text-gray-400" />
            <input 
              className="outline-none text-sm w-48" 
              placeholder="Search patients..." 
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
            <Filter size={18} />
            <span className="text-sm font-medium">Filter</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download size={18} />
            <span className="text-sm font-medium">Export</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Gender</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date of Birth</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Age</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Patient ID</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row, index) => (
              <tr 
                key={row.id} 
                className="hover:bg-blue-50/50 transition-colors cursor-pointer"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <Avatar name={row.name} size={40} style="micah" className="ring-2 ring-blue-100 shadow-sm" />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{row.name}</div>
                      <div className="text-xs text-gray-500">{row.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{row.gender}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{row.dob}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">{row.age}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{row.dept}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-mono text-gray-600">{row.id}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${statusColors[row.status as keyof typeof statusColors]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Details →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4">
        <p className="text-sm text-gray-600">Showing <span className="font-semibold">1-5</span> of <span className="font-semibold">245</span> patients</p>
        <div className="flex gap-2">
          <button className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-50 transition-colors">Previous</button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">1</button>
          <button className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-50 transition-colors">2</button>
          <button className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-50 transition-colors">3</button>
          <button className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-50 transition-colors">Next</button>
        </div>
      </div>
    </div>
  )
}
