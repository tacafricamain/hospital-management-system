export default function PatientTable() {
  const rows = [
    { id: 'P-001', name: 'Jane Doe', gender: 'F', dob: '1990-05-12', age: 34, dept: 'General' },
    { id: 'P-002', name: 'Mark Smith', gender: 'M', dob: '1985-03-01', age: 39, dept: 'Surgery' },
  ]

  return (
    <div className="bg-white border rounded p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium">Patients</div>
        <input className="border rounded px-2 py-1 text-sm" placeholder="Search patients" />
      </div>
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="sticky top-0 bg-gray-50">
            <tr className="text-left text-gray-500">
              <th className="p-2">Name</th>
              <th className="p-2">Gender</th>
              <th className="p-2">DOB</th>
              <th className="p-2">Age</th>
              <th className="p-2">Department</th>
              <th className="p-2">Patient ID</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-2">{r.name}</td>
                <td className="p-2">{r.gender}</td>
                <td className="p-2">{r.dob}</td>
                <td className="p-2">{r.age}</td>
                <td className="p-2">{r.dept}</td>
                <td className="p-2">{r.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
