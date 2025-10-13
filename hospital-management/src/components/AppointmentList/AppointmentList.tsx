export default function AppointmentList() {
  const items = [
    { id: 1, name: 'John Carter', test: 'Blood Test', time: 'Tomorrow 10:30' },
    { id: 2, name: 'Alice Lee', test: 'X-Ray', time: 'Tomorrow 11:00' },
  ]

  return (
    <div className="bg-white border rounded p-4 max-h-80 overflow-auto">
      <div className="text-sm font-medium mb-3">Upcoming Appointments</div>
      <ul className="space-y-3">
        {items.map((i) => (
          <li key={i.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">{i.name}</div>
              <div className="text-xs text-gray-500">{i.test}</div>
            </div>
            <span className="text-xs px-2 py-1 bg-gray-100 rounded">{i.time}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
