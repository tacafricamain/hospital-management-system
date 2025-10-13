import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import Avatar from '../../components/Avatar/Avatar'
import Toast from '../../components/Toast/Toast'
import { DollarSign, Search, Download, Plus, X, Clock, CheckCircle, Receipt, AlertCircle, TrendingUp } from 'lucide-react'
import { useState } from 'react'

export default function Billing() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)
  const [showNewInvoice, setShowNewInvoice] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null)
  const [formData, setFormData] = useState<any>({})

  const invoices = [
    { id: 'INV-001', patientName: 'Jane Doe', patientId: 'P-001', date: '2024-01-20', dueDate: '2024-02-20', services: [{ name: 'Consultation', amount: 150 }, { name: 'Blood Test', amount: 80 }], total: 230, paid: 230, status: 'paid', paymentMethod: 'Credit Card', insurance: 'Blue Cross' },
    { id: 'INV-002', patientName: 'Mark Smith', patientId: 'P-002', date: '2024-01-22', dueDate: '2024-02-22', services: [{ name: 'Surgery', amount: 3500 }], total: 3950, paid: 0, status: 'pending', insurance: 'Aetna' },
    { id: 'INV-003', patientName: 'Emily Johnson', patientId: 'P-003', date: '2024-01-18', dueDate: '2024-02-18', services: [{ name: 'X-Ray', amount: 120 }], total: 270, paid: 270, status: 'paid', paymentMethod: 'Insurance', insurance: 'United Healthcare' },
    { id: 'INV-004', patientName: 'Robert Brown', patientId: 'P-004', date: '2024-01-15', dueDate: '2024-02-15', services: [{ name: 'MRI Scan', amount: 800 }], total: 950, paid: 0, status: 'overdue', insurance: 'None' },
  ]

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.patientName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusColors = {
    paid: 'bg-green-100 text-green-700 border-green-200',
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    overdue: 'bg-red-100 text-red-700 border-red-200',
    partial: 'bg-blue-100 text-blue-700 border-blue-200'
  }

  const stats = {
    totalRevenue: invoices.reduce((sum, inv) => sum + inv.paid, 0),
    pending: invoices.filter(i => i.status === 'pending').reduce((sum, inv) => sum + inv.total, 0),
    overdue: invoices.filter(i => i.status === 'overdue').reduce((sum, inv) => sum + inv.total, 0),
    thisMonth: invoices.reduce((sum, inv) => sum + inv.total, 0)
  }

  const handlePayment = () => {
    setShowPaymentModal(false)
    setSelectedInvoice(null)
    setToast({ message: 'Payment processed successfully!', type: 'success' })
  }

  const handleCreateInvoice = () => {
    setShowNewInvoice(false)
    setToast({ message: 'Invoice created successfully!', type: 'success' })
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6 overflow-auto ml-64">
        <Navbar />
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Billing & Invoices</h1>
            <p className="text-sm text-gray-500 mt-1">Manage payments and financial records</p>
          </div>
          <button 
            onClick={() => setShowNewInvoice(true)}
            className="px-6 py-2.5 bg-[#0066CC] hover:bg-[#0052A3] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus size={18} />
            New Invoice
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold mt-1">${stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign size={24} className="text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#0066CC]"
              />
            </div>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2.5 rounded-lg ${statusFilter === 'all' ? 'bg-[#0066CC] text-white' : 'bg-gray-100'}`}
            >
              All
            </button>
          </div>

          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Invoice</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Patient</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-blue-50/30 cursor-pointer" onClick={() => setSelectedInvoice(invoice)}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Receipt size={18} className="text-gray-400" />
                      <span className="font-semibold">{invoice.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={invoice.patientName} size={36} style="micah" />
                      <div>
                        <p className="font-medium">{invoice.patientName}</p>
                        <p className="text-xs text-gray-500">{invoice.patientId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold">${invoice.total}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border ${statusColors[invoice.status as keyof typeof statusColors]}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-[#0066CC] hover:text-[#0052A3] text-sm font-medium">
                      View →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedInvoice && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-auto">
              <div className="border-b px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Invoice Details</h2>
                  <p className="text-sm text-gray-500">{selectedInvoice.id}</p>
                </div>
                <button onClick={() => setSelectedInvoice(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold mb-3">Patient</h3>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Avatar name={selectedInvoice.patientName} size={48} style="micah" />
                      <div>
                        <p className="font-semibold">{selectedInvoice.patientName}</p>
                        <p className="text-sm text-gray-500">{selectedInvoice.patientId}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-3">Invoice Info</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Date:</span>
                        <span className="font-medium">{selectedInvoice.date}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Due:</span>
                        <span className="font-medium">{selectedInvoice.dueDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-3">Services</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold">Service</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {selectedInvoice.services.map((service: any, idx: number) => (
                          <tr key={idx}>
                            <td className="px-4 py-3 text-sm">{service.name}</td>
                            <td className="px-4 py-3 text-sm font-medium text-right">${service.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td className="px-4 py-3 text-sm font-semibold">Total</td>
                          <td className="px-4 py-3 text-sm font-bold text-right">${selectedInvoice.total}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border-t px-6 py-4 flex justify-between">
                <button className="px-4 py-2.5 border rounded-lg hover:bg-gray-100 flex items-center gap-2">
                  <Download size={18} />
                  Download PDF
                </button>
                {selectedInvoice.status !== 'paid' && (
                  <button 
                    onClick={() => setShowPaymentModal(true)}
                    className="px-6 py-2.5 bg-[#0066CC] hover:bg-[#0052A3] text-white rounded-lg"
                  >
                    Record Payment
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </main>
    </div>
  )
}