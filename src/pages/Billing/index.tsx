import Sidebar from '../../components/Sidebar/Sidebar'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import KpiCard from '../../components/Card/KpiCard'
import { DollarSign, TrendingUp, Clock, AlertCircle, FileText, X, Plus, Trash2, Download, Eye, Filter, Search, CreditCard, Calendar, PieChart, Send, CheckCircle, XCircle, Edit, Printer, ArrowUpRight, ArrowDownRight, TrendingDown, RefreshCw, Mail, Phone, MapPin } from 'lucide-react'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

interface Service {
  description: string
  quantity: number
  rate: number
  amount: number
}

interface Invoice {
  id: string
  patientName: string
  patientId: string
  date: string
  dueDate: string
  amount: number
  paidAmount: number
  status: 'paid' | 'pending' | 'overdue' | 'partial'
  paymentMethod?: string
  services?: Service[]
  patientEmail?: string
  patientPhone?: string
  patientAddress?: string
  notes?: string
}

interface Transaction {
  id: string
  date: string
  time: string
  type: 'payment' | 'refund' | 'adjustment'
  invoiceId: string
  patientName: string
  patientId: string
  amount: number
  paymentMethod: string
  processedBy: string
  status: 'completed' | 'pending' | 'failed'
  transactionRef?: string
  notes?: string
}

interface PaymentData {
  invoiceId: string
  amount: number
  paymentMethod: string
  transactionId: string
  notes: string
}

export default function Billing() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isViewInvoiceModalOpen, setIsViewInvoiceModalOpen] = useState(false)
  const [isViewTransactionModalOpen, setIsViewTransactionModalOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')
  const [activeTab, setActiveTab] = useState<'invoices' | 'transactions' | 'analytics'>('invoices')
  const [transactionFilter, setTransactionFilter] = useState('all')
  const [transactionSearch, setTransactionSearch] = useState('')

  const [formData, setFormData] = useState({
    patientName: '',
    patientId: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    services: [{ description: '', quantity: 1, rate: 0, amount: 0 }] as Service[],
    notes: ''
  })

  const [paymentData, setPaymentData] = useState<PaymentData>({
    invoiceId: '',
    amount: 0,
    paymentMethod: 'cash',
    transactionId: '',
    notes: ''
  })

  const [invoices, setInvoices] = useState<Invoice[]>(
    [
      { 
        id: 'INV-001', 
        patientName: 'John Smith', 
        patientId: 'P-1234', 
        date: '2024-01-15', 
        dueDate: '2024-01-30', 
        amount: 1250.00, 
        paidAmount: 1250.00, 
        status: 'paid', 
        paymentMethod: 'Credit Card',
        patientEmail: 'john.smith@email.com',
        patientPhone: '+1 (555) 123-4567',
        patientAddress: '123 Main St, New York, NY 10001',
        services: [
          { description: 'General Consultation', quantity: 1, rate: 150.00, amount: 150.00 },
          { description: 'Blood Test (Complete)', quantity: 1, rate: 200.00, amount: 200.00 },
          { description: 'X-Ray Chest', quantity: 1, rate: 300.00, amount: 300.00 },
          { description: 'Medication', quantity: 2, rate: 300.00, amount: 600.00 },
        ],
        notes: 'Follow-up appointment scheduled for next month.'
      },
      { 
        id: 'INV-002', 
        patientName: 'Sarah Johnson', 
        patientId: 'P-1235', 
        date: '2024-01-16', 
        dueDate: '2024-01-31', 
        amount: 890.50, 
        paidAmount: 0, 
        status: 'pending',
        patientEmail: 'sarah.j@email.com',
        patientPhone: '+1 (555) 234-5678',
        patientAddress: '456 Oak Ave, Brooklyn, NY 11201',
        services: [
          { description: 'Physical Examination', quantity: 1, rate: 120.00, amount: 120.00 },
          { description: 'Lab Tests', quantity: 1, rate: 350.50, amount: 350.50 },
          { description: 'Prescription', quantity: 1, rate: 420.00, amount: 420.00 },
        ],
        notes: 'Insurance claim pending.'
      },
      { id: 'INV-003', patientName: 'Michael Brown', patientId: 'P-1236', date: '2024-01-10', dueDate: '2024-01-25', amount: 2150.00, paidAmount: 0, status: 'overdue' },
      { id: 'INV-004', patientName: 'Emily Davis', patientId: 'P-1237', date: '2024-01-18', dueDate: '2024-02-02', amount: 1540.00, paidAmount: 500.00, status: 'partial' },
      { id: 'INV-005', patientName: 'David Wilson', patientId: 'P-1238', date: '2024-01-19', dueDate: '2024-02-03', amount: 750.00, paidAmount: 0, status: 'pending' },
    ]
  )

  // Sample transactions data
  const [transactions] = useState<Transaction[]>([
    { 
      id: 'TXN-001', 
      date: '2024-01-20', 
      time: '10:30 AM', 
      type: 'payment', 
      invoiceId: 'INV-001', 
      patientName: 'John Smith', 
      patientId: 'P-1234', 
      amount: 1250.00, 
      paymentMethod: 'Credit Card', 
      processedBy: 'Admin', 
      status: 'completed',
      transactionRef: 'CC-2024012010301234',
      notes: 'Full payment received via Visa ending in 4242.'
    },
    { 
      id: 'TXN-002', 
      date: '2024-01-20', 
      time: '11:15 AM', 
      type: 'payment', 
      invoiceId: 'INV-004', 
      patientName: 'Emily Davis', 
      patientId: 'P-1237', 
      amount: 500.00, 
      paymentMethod: 'Cash', 
      processedBy: 'Receptionist', 
      status: 'completed',
      transactionRef: 'CASH-2024012011155678',
      notes: 'Partial payment received in cash.'
    },
    { 
      id: 'TXN-003', 
      date: '2024-01-19', 
      time: '02:45 PM', 
      type: 'refund', 
      invoiceId: 'INV-002', 
      patientName: 'Sarah Johnson', 
      patientId: 'P-1235', 
      amount: -150.00, 
      paymentMethod: 'Credit Card', 
      processedBy: 'Admin', 
      status: 'completed',
      transactionRef: 'REF-2024011914459012',
      notes: 'Refund for cancelled lab test. Processed to original payment method.'
    },
    { id: 'TXN-004', date: '2024-01-19', time: '03:20 PM', type: 'payment', invoiceId: 'INV-005', patientName: 'David Wilson', patientId: 'P-1238', amount: 750.00, paymentMethod: 'Insurance', processedBy: 'Finance', status: 'pending' },
    { id: 'TXN-005', date: '2024-01-18', time: '09:00 AM', type: 'adjustment', invoiceId: 'INV-003', patientName: 'Michael Brown', patientId: 'P-1236', amount: -200.00, paymentMethod: 'N/A', processedBy: 'Manager', status: 'completed' },
  ])

  // Calculate financial metrics
  const calculateMetrics = () => {
    const totalRevenue = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0)
    const outstanding = invoices.filter(inv => inv.status !== 'paid').reduce((sum, inv) => sum + (inv.amount - inv.paidAmount), 0)
    const overdue = invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0)
    const paidToday = invoices.filter(inv => inv.status === 'paid' && inv.date === new Date().toISOString().split('T')[0]).reduce((sum, inv) => sum + inv.amount, 0)
    
    return { totalRevenue, outstanding, overdue, paidToday }
  }

  const metrics = calculateMetrics()

  // Calculate analytics data
  const calculateAnalytics = () => {
    const completedTransactions = transactions.filter(t => t.status === 'completed')
    
    const totalInflow = completedTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)
    const totalOutflow = Math.abs(completedTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0))
    const netFlow = totalInflow - totalOutflow
    
    const paymentMethodBreakdown = completedTransactions.reduce((acc, t) => {
      if (t.amount > 0) {
        acc[t.paymentMethod] = (acc[t.paymentMethod] || 0) + t.amount
      }
      return acc
    }, {} as Record<string, number>)

    const monthlyData = [
      { month: 'Jan', revenue: 124500, expenses: 45200 },
      { month: 'Feb', revenue: 135600, expenses: 48900 },
      { month: 'Mar', revenue: 142800, expenses: 51200 },
      { month: 'Apr', revenue: 138900, expenses: 49800 },
      { month: 'May', revenue: 156700, expenses: 54300 },
      { month: 'Jun', revenue: 165400, expenses: 57800 },
    ]

    return { totalInflow, totalOutflow, netFlow, paymentMethodBreakdown, monthlyData }
  }

  const analytics = calculateAnalytics()

  // Filter invoices
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter
    const matchesDate = dateFilter === 'all' || 
                       (dateFilter === 'today' && invoice.date === new Date().toISOString().split('T')[0]) ||
                       (dateFilter === 'week' && new Date(invoice.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
                       (dateFilter === 'month' && new Date(invoice.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    
    return matchesSearch && matchesStatus && matchesDate
  })

  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.patientName.toLowerCase().includes(transactionSearch.toLowerCase()) ||
                         transaction.patientId.toLowerCase().includes(transactionSearch.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(transactionSearch.toLowerCase()) ||
                         transaction.invoiceId.toLowerCase().includes(transactionSearch.toLowerCase())
    const matchesFilter = transactionFilter === 'all' || 
                         transaction.type === transactionFilter ||
                         transaction.status === transactionFilter
    
    return matchesSearch && matchesFilter
  })

  const addService = () => {
    setFormData({
      ...formData,
      services: [...formData.services, { description: '', quantity: 1, rate: 0, amount: 0 }]
    })
    toast.success('Service line added')
  }

  const removeService = (index: number) => {
    if (formData.services.length === 1) {
      toast.error('Invoice must have at least one service')
      return
    }
    const newServices = formData.services.filter((_, i) => i !== index)
    setFormData({ ...formData, services: newServices })
    toast.success('Service line removed')
  }

  const updateService = (index: number, field: string, value: any) => {
    const newServices = [...formData.services]
    newServices[index] = { ...newServices[index], [field]: value }
    
    if (field === 'quantity' || field === 'rate') {
      newServices[index].amount = newServices[index].quantity * newServices[index].rate
    }
    
    setFormData({ ...formData, services: newServices })
  }

  const calculateTotal = () => {
    return formData.services.reduce((sum, service) => sum + service.amount, 0)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.patientName.trim()) {
      toast.error('Please enter patient name')
      return
    }
    if (!formData.patientId.trim()) {
      toast.error('Please enter patient ID')
      return
    }
    if (!formData.dueDate) {
      toast.error('Please select due date')
      return
    }
    
    const hasValidService = formData.services.some(s => s.description.trim() && s.amount > 0)
    if (!hasValidService) {
      toast.error('Please add at least one valid service')
      return
    }

    toast.loading('Creating invoice...', { duration: 1000 })
    
    setTimeout(() => {
      const newInvoice: Invoice = {
        id: `INV-${String(invoices.length + 1).padStart(3, '0')}`,
        patientName: formData.patientName,
        patientId: formData.patientId,
        date: formData.date,
        dueDate: formData.dueDate,
        amount: calculateTotal(),
        paidAmount: 0,
        status: 'pending'
      }
      
      setInvoices([newInvoice, ...invoices])
      toast.success(`Invoice ${newInvoice.id} created successfully! Total: $${calculateTotal().toFixed(2)}`, {
        duration: 4000,
        icon: '✅'
      })
      setIsModalOpen(false)
      setFormData({
        patientName: '',
        patientId: '',
        date: new Date().toISOString().split('T')[0],
        dueDate: '',
        services: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
        notes: ''
      })
    }, 1000)
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!paymentData.amount || paymentData.amount <= 0) {
      toast.error('Please enter a valid payment amount')
      return
    }

    if (selectedInvoice && paymentData.amount > (selectedInvoice.amount - selectedInvoice.paidAmount)) {
      toast.error('Payment amount exceeds outstanding balance')
      return
    }

    toast.loading('Processing payment...', { duration: 1500 })

    setTimeout(() => {
      if (selectedInvoice) {
        const updatedInvoices = invoices.map(inv => {
          if (inv.id === selectedInvoice.id) {
            const newPaidAmount = inv.paidAmount + paymentData.amount
            const newStatus = newPaidAmount >= inv.amount ? 'paid' : 'partial'
            return {
              ...inv,
              paidAmount: newPaidAmount,
              status: newStatus as 'paid' | 'pending' | 'overdue' | 'partial',
              paymentMethod: paymentData.paymentMethod
            }
          }
          return inv
        })
        
        setInvoices(updatedInvoices)
        toast.success(`Payment of $${paymentData.amount.toFixed(2)} processed successfully!`, {
          icon: '💰',
          duration: 4000
        })
      }
      
      setIsPaymentModalOpen(false)
      setSelectedInvoice(null)
      setPaymentData({
        invoiceId: '',
        amount: 0,
        paymentMethod: 'cash',
        transactionId: '',
        notes: ''
      })
    }, 1500)
  }

  const openPaymentModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setPaymentData({
      ...paymentData,
      invoiceId: invoice.id,
      amount: invoice.amount - invoice.paidAmount
    })
    setIsPaymentModalOpen(true)
    toast('Opening payment form...', { icon: '💳', duration: 1500 })
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    toast('Invoice creation cancelled', { icon: 'ℹ️' })
    setFormData({
      patientName: '',
      patientId: '',
      date: new Date().toISOString().split('T')[0],
      dueDate: '',
      services: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
      notes: ''
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'partial':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle size={14} />
      case 'overdue':
        return <XCircle size={14} />
      case 'partial':
        return <Clock size={14} />
      default:
        return <Clock size={14} />
    }
  }

  const handleExport = (format: 'csv' | 'pdf') => {
    toast.loading(`Exporting to ${format.toUpperCase()}...`, { duration: 1500 })
    setTimeout(() => {
      toast.success(`Invoice report exported successfully as ${format.toUpperCase()}!`, {
        icon: '📄',
        duration: 3000
      })
    }, 1500)
  }

  const handleSendEmail = (invoice: Invoice) => {
    toast.loading('Sending invoice via email...', { duration: 1500 })
    setTimeout(() => {
      toast.success(`Invoice ${invoice.id} sent to patient email!`, {
        icon: '📧',
        duration: 3000
      })
    }, 1500)
  }

  const handlePrint = (invoice: Invoice) => {
    toast.success(`Printing invoice ${invoice.id}...`, { icon: '🖨️' })
  }

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'payment':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'refund':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'adjustment':
        return 'text-orange-600 bg-orange-50 border-orange-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <ArrowDownRight size={16} className="text-green-600" />
      case 'refund':
        return <ArrowUpRight size={16} className="text-red-600" />
      case 'adjustment':
        return <RefreshCw size={16} className="text-orange-600" />
      default:
        return null
    }
  }

  const openViewInvoiceModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setIsViewInvoiceModalOpen(true)
    toast('Loading invoice details...', { icon: '📄', duration: 1000 })
  }

  const openViewTransactionModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsViewTransactionModalOpen(true)
    toast('Loading transaction details...', { icon: '📋', duration: 1000 })
  }

  const handlePrintInvoice = (invoice: Invoice) => {
    toast.success(`Printing invoice ${invoice.id}...`, { icon: '🖨️' })
    // Implement print logic
  }

  const handleDownloadInvoice = (invoice: Invoice) => {
    toast.loading('Generating PDF...', { duration: 1000 })
    setTimeout(() => {
      toast.success(`Invoice ${invoice.id} downloaded successfully!`, { icon: '📥' })
    }, 1000)
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#363636',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Sidebar />
      <main className="flex-1 p-6 space-y-8 overflow-auto ml-64">
        <Navbar />
        
        {/* Page Header */}
        <div className="flex items-center justify-between animate-fadeInUp">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Billing & Invoices</h1>
            <p className="text-gray-600 mt-1">Manage payments and financial records</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => {
                toast.success('Opening analytics dashboard...', { icon: '📊' })
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <PieChart size={20} />
              Analytics
            </button>
            <button 
              onClick={() => {
                setIsModalOpen(true)
                toast('Opening invoice form...', { icon: '📝', duration: 1500 })
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              New Invoice
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <KpiCard 
              title="Total Revenue" 
              value={`$${metrics.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              change="+12.5%" 
              trend="up"
              icon={<DollarSign size={24} />}
              colorClass="from-blue-500 to-blue-600"
              gradientFrom="from-blue-50"
              gradientTo="to-blue-100"
            />
          </div>
          <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <KpiCard 
              title="Outstanding" 
              value={`$${metrics.outstanding.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              change="-8.2%"
              trend="down"
              icon={<Clock size={24} />}
              colorClass="from-orange-500 to-orange-600"
              gradientFrom="from-orange-50"
              gradientTo="to-orange-100"
            />
          </div>
          <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <KpiCard 
              title="Paid Today" 
              value={`$${metrics.paidToday.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              change="+18.7%"
              trend="up"
              icon={<TrendingUp size={24} />}
              colorClass="from-green-500 to-green-600"
              gradientFrom="from-green-50"
              gradientTo="to-green-100"
            />
          </div>
          <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <KpiCard 
              title="Overdue" 
              value={`$${metrics.overdue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              change="+5.4%"
              trend="up"
              icon={<AlertCircle size={24} />}
              colorClass="from-red-500 to-red-600"
              gradientFrom="from-red-50"
              gradientTo="to-red-100"
            />
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-white rounded-2xl border border-gray-200 p-1 animate-fadeInUp" style={{ animationDelay: '0.45s' }}>
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('invoices')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'invoices'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FileText size={20} className="inline mr-2" />
              Invoices
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'transactions'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <CreditCard size={20} className="inline mr-2" />
              Transactions
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'analytics'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <PieChart size={20} className="inline mr-2" />
              Analytics
            </button>
          </div>
        </section>

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <>
            {/* Quick Actions & Filters */}
            <section className="bg-white rounded-2xl border border-gray-200 p-4 animate-fadeInUp" style={{ animationDelay: '0.45s' }}>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex-1 min-w-[300px]">
                  <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by patient name, ID, or invoice number..." 
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Filter size={20} />
                  Filters
                  {(statusFilter !== 'all' || dateFilter !== 'all') && (
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  )}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleExport('csv')}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <Download size={20} />
                    Export CSV
                  </button>
                  <button
                    onClick={() => handleExport('pdf')}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <FileText size={20} />
                    Export PDF
                  </button>
                </div>
              </div>

              {/* Filter Panel */}
              {isFilterOpen && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select 
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                      <option value="partial">Partial</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                    <select 
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">Last 7 Days</option>
                      <option value="month">Last 30 Days</option>
                    </select>
                  </div>

                  <div className="flex items-end gap-2">
                    <button
                      onClick={() => {
                        setStatusFilter('all')
                        setDateFilter('all')
                        toast.success('Filters cleared')
                      }}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* Invoices Table */}
            <section className="bg-white rounded-2xl border border-gray-200 p-6 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Invoices</h3>
                  <p className="text-sm text-gray-500">Showing {filteredInvoices.length} of {invoices.length} invoices</p>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredInvoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{invoice.patientName}</div>
                          <div className="text-xs text-gray-500">{invoice.patientId}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.dueDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">${invoice.amount.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">${invoice.paidAmount.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-orange-600">${(invoice.amount - invoice.paidAmount).toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border flex items-center gap-1 w-fit ${getStatusColor(invoice.status)}`}>
                            {getStatusIcon(invoice.status)}
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => openViewInvoiceModal(invoice)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="View"
                            >
                              <Eye size={18} />
                            </button>
                            {invoice.status !== 'paid' && (
                              <button 
                                onClick={() => openPaymentModal(invoice)}
                                className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                                title="Record Payment"
                              >
                                <CreditCard size={18} />
                              </button>
                            )}
                            <button 
                              onClick={() => handleSendEmail(invoice)}
                              className="p-1 text-purple-600 hover:bg-purple-50 rounded transition-colors"
                              title="Send Email"
                            >
                              <Send size={18} />
                            </button>
                            <button 
                              onClick={() => handlePrint(invoice)}
                              className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                              title="Print"
                            >
                              <Printer size={18} />
                            </button>
                            <button 
                              onClick={() => handleDownloadInvoice(invoice)}
                              className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                              title="Download"
                            >
                              <Download size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredInvoices.length === 0 && (
                <div className="text-center py-12">
                  <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">No invoices found</p>
                  <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or search query</p>
                </div>
              )}
            </section>
          </>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <>
            {/* Transaction Filters */}
            <section className="bg-white rounded-2xl border border-gray-200 p-4 animate-fadeInUp">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex-1 min-w-[300px]">
                  <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text"
                      value={transactionSearch}
                      onChange={(e) => setTransactionSearch(e.target.value)}
                      placeholder="Search transactions..." 
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <select 
                  value={transactionFilter}
                  onChange={(e) => setTransactionFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Transactions</option>
                  <option value="payment">Payments</option>
                  <option value="refund">Refunds</option>
                  <option value="adjustment">Adjustments</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>

                <button
                  onClick={() => handleExport('csv')}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Download size={20} />
                  Export
                </button>
              </div>
            </section>

            {/* Transactions Summary Cards */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeInUp">
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <ArrowDownRight size={24} className="text-green-600" />
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12.5%</span>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">Total Inflow</h3>
                <p className="text-3xl font-bold text-gray-900">${analytics.totalInflow.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                <p className="text-xs text-gray-500 mt-2">From {transactions.filter(t => t.amount > 0).length} payments</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <ArrowUpRight size={24} className="text-red-600" />
                  </div>
                  <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">-3.2%</span>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">Total Outflow</h3>
                <p className="text-3xl font-bold text-gray-900">${analytics.totalOutflow.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                <p className="text-xs text-gray-500 mt-2">From {transactions.filter(t => t.amount < 0).length} refunds/adjustments</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <TrendingUp size={24} className="text-blue-600" />
                  </div>
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">+18.7%</span>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">Net Flow</h3>
                <p className="text-3xl font-bold text-gray-900">${analytics.netFlow.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                <p className="text-xs text-gray-500 mt-2">Positive cash flow</p>
              </div>
            </section>

            {/* Transactions Table */}
            <section className="bg-white rounded-2xl border border-gray-200 p-6 animate-fadeInUp">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
                  <p className="text-sm text-gray-500">Showing {filteredTransactions.length} of {transactions.length} transactions</p>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Processed By</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{transaction.date}</div>
                          <div className="text-xs text-gray-500">{transaction.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border flex items-center gap-1 w-fit ${getTransactionTypeColor(transaction.type)}`}>
                            {getTransactionIcon(transaction.type)}
                            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                          {transaction.invoiceId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{transaction.patientName}</div>
                          <div className="text-xs text-gray-500">{transaction.patientId}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-bold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.amount >= 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.paymentMethod}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.processedBy}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                            transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => openViewTransactionModal(transaction)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="View Details"
                            >
                              <Eye size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredTransactions.length === 0 && (
                <div className="text-center py-12">
                  <CreditCard size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">No transactions found</p>
                  <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or search query</p>
                </div>
              )}
            </section>
          </>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <>
            {/* Revenue vs Expenses Chart */}
            <section className="bg-white rounded-2xl border border-gray-200 p-6 animate-fadeInUp">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Revenue vs Expenses</h3>
                  <p className="text-sm text-gray-500">6-month trend analysis</p>
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                  <option>Last 6 Months</option>
                  <option>Last 3 Months</option>
                  <option>Last Year</option>
                </select>
              </div>
              
              <div className="space-y-4">
                {analytics.monthlyData.map((month) => (
                  <div key={month.month} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-700">{month.month}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-green-600 font-semibold">${month.revenue.toLocaleString()}</span>
                        <span className="text-red-600 font-semibold">${month.expenses.toLocaleString()}</span>
                        <span className="text-blue-600 font-bold">${(month.revenue - month.expenses).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div className="h-full flex">
                        <div 
                          className="bg-green-500" 
                          style={{ width: `${(month.revenue / (month.revenue + month.expenses)) * 100}%` }}
                        />
                        <div 
                          className="bg-red-500" 
                          style={{ width: `${(month.expenses / (month.revenue + month.expenses)) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Expenses</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Net Profit</span>
                </div>
              </div>
            </section>

            {/* Payment Method Distribution */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-fadeInUp">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Method Distribution</h3>
                <div className="space-y-4">
                  {Object.entries(analytics.paymentMethodBreakdown).map(([method, amount], index) => {
                    const percentage = (amount / analytics.totalInflow) * 100
                    const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500']
                    return (
                      <div key={method}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">{method}</span>
                          <div className="text-right">
                            <span className="text-sm font-bold text-gray-900">${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                            <span className="text-xs text-gray-500 ml-2">({percentage.toFixed(1)}%)</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div 
                            className={`h-full ${colors[index % colors.length]} transition-all duration-500`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Key Financial Metrics */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-fadeInUp">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Key Financial Metrics</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-900">Average Transaction Value</span>
                      <TrendingUp size={20} className="text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold text-blue-900">
                      ${(analytics.totalInflow / transactions.filter(t => t.amount > 0).length).toFixed(2)}
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-900">Collection Rate</span>
                      <CheckCircle size={20} className="text-green-600" />
                    </div>
                    <p className="text-2xl font-bold text-green-900">96.5%</p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-purple-900">Avg Days to Payment</span>
                      <Clock size={20} className="text-purple-600" />
                    </div>
                    <p className="text-2xl font-bold text-purple-900">12 days</p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-orange-900">Refund Rate</span>
                      <TrendingDown size={20} className="text-orange-600" />
                    </div>
                    <p className="text-2xl font-bold text-orange-900">2.3%</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        <Footer />
      </main>

      {/* New Invoice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText size={24} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Create New Invoice</h2>
                  <p className="text-sm text-gray-500">Fill in the details below</p>
                </div>
              </div>
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Patient Information */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                  Patient Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Patient Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter patient name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Patient ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.patientId}
                      onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., P-1234"
                    />
                  </div>
                </div>
              </div>

              {/* Invoice Dates */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                  Invoice Dates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Invoice Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Due Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
                    Services & Charges
                  </h3>
                  <button
                    type="button"
                    onClick={addService}
                    className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                  >
                    <Plus size={16} />
                    Add Service
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.services.map((service, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-12 md:col-span-5">
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Service Description
                          </label>
                          <input
                            type="text"
                            value={service.description}
                            onChange={(e) => updateService(index, 'description', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="e.g., Consultation, Lab Test"
                          />
                        </div>
                        <div className="col-span-4 md:col-span-2">
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Quantity
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={service.quantity}
                            onChange={(e) => updateService(index, 'quantity', parseInt(e.target.value) || 1)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </div>
                        <div className="col-span-4 md:col-span-2">
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Rate ($)
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={service.rate}
                            onChange={(e) => updateService(index, 'rate', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </div>
                        <div className="col-span-3 md:col-span-2">
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Amount
                          </label>
                          <input
                            type="text"
                            value={`$${service.amount.toFixed(2)}`}
                            disabled
                            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm font-semibold text-gray-900"
                          />
                        </div>
                        <div className="col-span-1 flex items-end">
                          <button
                            type="button"
                            onClick={() => removeService(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove service"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex justify-end pt-3 border-t border-gray-300">
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="text-3xl font-bold text-gray-900">${calculateTotal().toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">4</span>
                  Additional Notes
                </h3>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add any additional notes or payment terms..."
                />
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Create Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {isPaymentModalOpen && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Record Payment</h2>
                    <p className="text-sm text-green-100">Invoice: {selectedInvoice.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsPaymentModalOpen(false)
                    setSelectedInvoice(null)
                  }}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <form onSubmit={handlePayment} className="p-6 space-y-6">
              {/* Invoice Summary */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Patient:</span>
                  <span className="font-medium text-gray-900">{selectedInvoice.patientName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-bold text-gray-900">${selectedInvoice.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Already Paid:</span>
                  <span className="font-medium text-green-600">${selectedInvoice.paidAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg pt-2 border-t border-gray-300">
                  <span className="font-semibold text-gray-900">Outstanding:</span>
                  <span className="font-bold text-orange-600">${(selectedInvoice.amount - selectedInvoice.paidAmount).toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Amount <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={paymentData.amount}
                    onChange={(e) => setPaymentData({ ...paymentData, amount: parseFloat(e.target.value) || 0 })}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg font-semibold"
                    placeholder="0.00"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setPaymentData({ ...paymentData, amount: selectedInvoice.amount - selectedInvoice.paidAmount })}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Pay full balance
                </button>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['cash', 'credit card', 'debit card', 'insurance'].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentData({ ...paymentData, paymentMethod: method })}
                      className={`p-3 border-2 rounded-lg transition-all ${
                        paymentData.paymentMethod === method
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-center">
                        <CreditCard size={24} className="mx-auto mb-1" />
                        <span className="text-xs font-medium capitalize">{method}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Transaction ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction ID (Optional)
                </label>
                <input
                  type="text"
                  value={paymentData.transactionId}
                  onChange={(e) => setPaymentData({ ...paymentData, transactionId: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., TXN123456789"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Notes (Optional)
                </label>
                <textarea
                  value={paymentData.notes}
                  onChange={(e) => setPaymentData({ ...paymentData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Add any additional notes about this payment..."
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsPaymentModalOpen(false)
                    setSelectedInvoice(null)
                  }}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} />
                  Process Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Invoice Modal */}
      {isViewInvoiceModalOpen && selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-2xl z-10">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                    <FileText size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Invoice Details</h2>
                    <p className="text-sm text-blue-100">{selectedInvoice.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsViewInvoiceModalOpen(false)
                    setSelectedInvoice(null)
                  }}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Status Banner */}
              <div className={`p-4 rounded-lg border-2 ${
                selectedInvoice.status === 'paid' ? 'bg-green-50 border-green-200' :
                selectedInvoice.status === 'pending' ? 'bg-yellow-50 border-yellow-200' :
                selectedInvoice.status === 'partial' ? 'bg-blue-50 border-blue-200' :
                'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {selectedInvoice.status === 'paid' ? <CheckCircle size={24} className="text-green-600" /> :
                     selectedInvoice.status === 'overdue' ? <XCircle size={24} className="text-red-600" /> :
                     <Clock size={24} className="text-yellow-600" />}
                    <div>
                      <p className="font-semibold text-gray-900 capitalize">Status: {selectedInvoice.status}</p>
                      <p className="text-sm text-gray-600">
                        {selectedInvoice.status === 'paid' ? 'Payment completed successfully' :
                         selectedInvoice.status === 'pending' ? 'Awaiting payment' :
                         selectedInvoice.status === 'partial' ? `$${(selectedInvoice.amount - selectedInvoice.paidAmount).toFixed(2)} remaining` :
                         'Payment overdue - please contact patient'}
                      </p>
                    </div>
                  </div>
                  {selectedInvoice.paymentMethod && (
                    <span className="px-3 py-1 bg-white rounded-full text-sm font-medium">
                      {selectedInvoice.paymentMethod}
                    </span>
                  )}
                </div>
              </div>

              {/* Patient & Invoice Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Patient Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Full Name</p>
                      <p className="text-sm font-medium text-gray-900">{selectedInvoice.patientName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Patient ID</p>
                      <p className="text-sm font-medium text-gray-900">{selectedInvoice.patientId}</p>
                    </div>
                    {selectedInvoice.patientEmail && (
                      <div>
                        <p className="text-xs text-gray-500 uppercase flex items-center gap-1">
                          <Mail size={12} /> Email
                        </p>
                        <p className="text-sm font-medium text-blue-600">{selectedInvoice.patientEmail}</p>
                      </div>
                    )}
                    {selectedInvoice.patientPhone && (
                      <div>
                        <p className="text-xs text-gray-500 uppercase flex items-center gap-1">
                          <Phone size={12} /> Phone
                        </p>
                        <p className="text-sm font-medium text-gray-900">{selectedInvoice.patientPhone}</p>
                      </div>
                    )}
                    {selectedInvoice.patientAddress && (
                      <div>
                        <p className="text-xs text-gray-500 uppercase flex items-center gap-1">
                          <MapPin size={12} /> Address
                        </p>
                        <p className="text-sm font-medium text-gray-900">{selectedInvoice.patientAddress}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Invoice Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Invoice Number</p>
                      <p className="text-sm font-medium text-gray-900">{selectedInvoice.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Issue Date</p>
                      <p className="text-sm font-medium text-gray-900">{selectedInvoice.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Due Date</p>
                      <p className="text-sm font-medium text-gray-900">{selectedInvoice.dueDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase">Total Amount</p>
                      <p className="text-2xl font-bold text-gray-900">${selectedInvoice.amount.toFixed(2)}</p>
                    </div>
                    {selectedInvoice.paidAmount > 0 && (
                      <>
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Amount Paid</p>
                          <p className="text-lg font-semibold text-green-600">${selectedInvoice.paidAmount.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase">Balance Due</p>
                          <p className="text-lg font-semibold text-orange-600">${(selectedInvoice.amount - selectedInvoice.paidAmount).toFixed(2)}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Services Table */}
              {selectedInvoice.services && selectedInvoice.services.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Services Provided</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedInvoice.services.map((service, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900">{service.description}</td>
                            <td className="px-4 py-3 text-sm text-center text-gray-900">{service.quantity}</td>
                            <td className="px-4 py-3 text-sm text-right text-gray-900">${service.rate.toFixed(2)}</td>
                            <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">${service.amount.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td colSpan={3} className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Subtotal:</td>
                          <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                            ${selectedInvoice.services.reduce((sum, s) => sum + s.amount, 0).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td colSpan={3} className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Tax (0%):</td>
                          <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">$0.00</td>
                        </tr>
                        <tr className="bg-blue-50">
                          <td colSpan={3} className="px-4 py-4 text-right text-lg font-bold text-gray-900">Total:</td>
                          <td className="px-4 py-4 text-right text-lg font-bold text-blue-600">${selectedInvoice.amount.toFixed(2)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedInvoice.notes && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Additional Notes:</h4>
                  <p className="text-sm text-gray-700">{selectedInvoice.notes}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handlePrintInvoice(selectedInvoice)}
                  className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Printer size={20} />
                  Print Invoice
                </button>
                <button
                  onClick={() => handleDownloadInvoice(selectedInvoice)}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Download size={20} />
                  Download PDF
                </button>
                <button
                  onClick={() => handleSendEmail(selectedInvoice)}
                  className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Email to Patient
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Transaction Modal */}
      {isViewTransactionModalOpen && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl">
            {/* Modal Header */}
            <div className={`sticky top-0 p-6 rounded-t-2xl ${
              selectedTransaction.type === 'payment' ? 'bg-gradient-to-r from-green-600 to-green-700' :
              selectedTransaction.type === 'refund' ? 'bg-gradient-to-r from-red-600 to-red-700' :
              'bg-gradient-to-r from-orange-600 to-orange-700'
            }`}>
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                    <CreditCard size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Transaction Details</h2>
                    <p className="text-sm opacity-90">{selectedTransaction.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsViewTransactionModalOpen(false)
                    setSelectedTransaction(null)
                  }}
                  className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Transaction Type Banner */}
              <div className={`p-4 rounded-lg border-2 flex items-center gap-3 ${
                selectedTransaction.type === 'payment' ? 'bg-green-50 border-green-200' :
                selectedTransaction.type === 'refund' ? 'bg-red-50 border-red-200' :
                'bg-orange-50 border-orange-200'
              }`}>
                {selectedTransaction.type === 'payment' && <ArrowDownRight size={32} className="text-green-600" />}
                {selectedTransaction.type === 'refund' && <ArrowUpRight size={32} className="text-red-600" />}
                {selectedTransaction.type === 'adjustment' && <RefreshCw size={32} className="text-orange-600" />}
                <div className="flex-1">
                  <p className="text-lg font-bold text-gray-900 capitalize">{selectedTransaction.type}</p>
                  <p className="text-sm text-gray-600">
                    {selectedTransaction.type === 'payment' ? 'Money received from patient' :
                     selectedTransaction.type === 'refund' ? 'Money returned to patient' :
                     'Account adjustment or correction'}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-3xl font-bold ${
                    selectedTransaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {selectedTransaction.amount >= 0 ? '+' : ''}${Math.abs(selectedTransaction.amount).toFixed(2)}
                  </p>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    selectedTransaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                    selectedTransaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedTransaction.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Transaction Details Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Transaction Date</p>
                    <p className="text-sm font-medium text-gray-900">{selectedTransaction.date}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Transaction Time</p>
                    <p className="text-sm font-medium text-gray-900">{selectedTransaction.time}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Reference Number</p>
                    <p className="text-sm font-medium text-gray-900 font-mono">{selectedTransaction.transactionRef || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Payment Method</p>
                    <p className="text-sm font-medium text-gray-900">{selectedTransaction.paymentMethod}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Related Invoice</p>
                    <p className="text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-800">
                      {selectedTransaction.invoiceId}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Patient Name</p>
                    <p className="text-sm font-medium text-gray-900">{selectedTransaction.patientName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Patient ID</p>
                    <p className="text-sm font-medium text-gray-900">{selectedTransaction.patientId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Processed By</p>
                    <p className="text-sm font-medium text-gray-900">{selectedTransaction.processedBy}</p>
                  </div>
                </div>
              </div>

              {/* Transaction Notes */}
              {selectedTransaction.notes && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <FileText size={16} />
                    Transaction Notes:
                  </h4>
                  <p className="text-sm text-gray-700">{selectedTransaction.notes}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => toast.success('Transaction receipt printed!')}
                  className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Printer size={20} />
                  Print Receipt
                </button>
                <button
                  onClick={() => toast.success('Transaction receipt downloaded!')}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Download size={20} />
                  Download Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}