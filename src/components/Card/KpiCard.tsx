import { ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface KpiCardProps {
  title: string
  value: string | number
  change?: string
  trend?: 'up' | 'down'
  icon?: ReactNode
  colorClass?: string
  gradientFrom?: string
  gradientTo?: string
}

export default function KpiCard({ 
  title, 
  value, 
  change, 
  trend = 'up',
  icon, 
  colorClass = 'from-blue-500 to-blue-600',
  gradientFrom = 'from-blue-50',
  gradientTo = 'to-blue-100'
}: KpiCardProps) {
  const isPositive = trend === 'up'
  
  return (
    <div className={`group relative overflow-hidden bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer`}>
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Content */}
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{value}</h3>
          </div>
          {icon && (
            <div className={`p-2 bg-gradient-to-br ${colorClass} rounded-lg`}>
              <div className="text-white">
                {icon}
              </div>
            </div>
          )}
        </div>
        
        {change && (
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
              isPositive 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {change}
            </div>
            <span className="text-xs text-gray-500">vs last week</span>
          </div>
        )}
      </div>
    </div>
  )
}
