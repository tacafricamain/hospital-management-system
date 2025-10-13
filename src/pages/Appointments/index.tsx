import Sidebar from '../../components/Sidebar/Sidebar'

export default function Appointments() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Sidebar />
      <main className="flex-1 p-6 ml-64">
        <h1 className="text-2xl font-semibold text-gray-900">Appointments</h1>
        {/* TODO: Appointment list, calendar, filters */}
      </main>
    </div>
  )
}
