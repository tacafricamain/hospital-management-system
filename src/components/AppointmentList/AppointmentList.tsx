import { Clock, User } from 'lucide-react'
import Avatar from '../Avatar/Avatar'

export default function AppointmentList() {
  const items = [
    { id: 1, name: 'John Carter', test: 'Blood Test', time: 'Tomorrow 10:30', status: 'confirmed', avatar: 'JC' },
    { id: 2, name: 'Alice Lee', test: 'X-Ray', time: 'Tomorrow 11:00', status: 'pending', avatar: 'AL' },
    { id: 3, name: 'Michael Brown', test: 'Consultation', time: 'Tomorrow 14:30', status: 'confirmed', avatar: 'MB' },
    { id: 4, name: 'Sarah Davis', test: 'Follow-up', time: 'Tomorrow 16:00', status: 'confirmed', avatar: 'SD' },
  ]

  const statusColors = {
    confirmed: 'bg-green-100 text-green-700 border-green-200',
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200'
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-auto">
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className="p-4 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <Avatar name={item.name} size={48} style="micah" className="flex-shrink-0 ring-2 ring-white shadow-md" />
              
              {/* Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 text-sm truncate">{item.name}</h4>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                  <User size={12} />
                  {item.test}
                </p>
              </div>
              
              {/* Time Badge */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-1 text-xs text-gray-600 bg-white px-2 py-1 rounded-lg border">
                  <Clock size={12} />
                  <span className="font-medium">{item.time}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusColors[item.status as keyof typeof statusColors]}`}>
                  {item.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
