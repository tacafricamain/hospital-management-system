import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, User, Lock, Stethoscope, UserCog, ClipboardList, DollarSign } from 'lucide-react'

interface PrivilegeTier {
  id: string
  name: string
  role: string
  icon: JSX.Element
  color: string
  bgColor: string
  borderColor: string
}

const privilegeTiers: PrivilegeTier[] = [
  {
    id: 'admin',
    name: 'Administrator',
    role: 'Full System Access',
    icon: <UserCog size={32} />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200 hover:border-purple-400'
  },
  {
    id: 'doctor',
    name: 'Doctor',
    role: 'Clinical & Patient Access',
    icon: <Stethoscope size={32} />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200 hover:border-blue-400'
  },
  {
    id: 'nurse',
    name: 'Nurse',
    role: 'Patient Care Access',
    icon: <ClipboardList size={32} />,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200 hover:border-green-400'
  },
  {
    id: 'receptionist',
    name: 'Receptionist',
    role: 'Appointments & Registration',
    icon: <User size={32} />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200 hover:border-orange-400'
  },
  {
    id: 'billing',
    name: 'Billing Staff',
    role: 'Financial & Billing Access',
    icon: <DollarSign size={32} />,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200 hover:border-teal-400'
  }
]

export default function Login() {
  const navigate = useNavigate()
  const [selectedTier, setSelectedTier] = useState<string | null>(null)

  const handleQuickLogin = (tierId: string) => {
    setSelectedTier(tierId)
    // Simulate login and redirect to dashboard
    setTimeout(() => {
      localStorage.setItem('userRole', tierId)
      navigate('/')
    }, 300)
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-12 flex-col justify-between text-white">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Building2 size={40} />
            <h1 className="text-3xl font-bold">Hospital Management</h1>
          </div>
          <p className="text-lg text-blue-100 max-w-md">
            A comprehensive healthcare management system designed for modern medical practices.
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <User size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Patient Management</h3>
              <p className="text-blue-100">Comprehensive patient records and history</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <ClipboardList size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Smart Scheduling</h3>
              <p className="text-blue-100">Efficient appointment and resource management</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <DollarSign size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Billing & Claims</h3>
              <p className="text-blue-100">Streamlined financial operations</p>
            </div>
          </div>
        </div>

        <div className="text-sm text-blue-200">
          © 2025 Hospital Management System. All rights reserved.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Lock className="text-blue-600" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Select your role to sign in quickly</p>
          </div>

          {/* Quick Login Privilege Tiers */}
          <div className="space-y-3 mb-8">
            {privilegeTiers.map((tier) => (
              <button
                key={tier.id}
                onClick={() => handleQuickLogin(tier.id)}
                className={`w-full p-4 border-2 rounded-xl transition-all duration-200 transform hover:scale-[1.02] ${
                  selectedTier === tier.id ? 'scale-[0.98] opacity-70' : ''
                } ${tier.borderColor} ${tier.bgColor}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`${tier.color} flex-shrink-0`}>
                    {tier.icon}
                  </div>
                  <div className="text-left flex-1">
                    <div className={`font-semibold text-lg ${tier.color}`}>{tier.name}</div>
                    <div className="text-sm text-gray-600">{tier.role}</div>
                  </div>
                  <div className={`text-2xl ${tier.color}`}>→</div>
                </div>
              </button>
            ))}
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or sign in with credentials</span>
            </div>
          </div>

          {/* Traditional Login Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="doctor@hospital.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Need help? <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  )
}
