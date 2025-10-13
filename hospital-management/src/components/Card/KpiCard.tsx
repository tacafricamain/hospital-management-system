import { ReactNode } from 'react'

interface KpiCardProps {
  title: string
  value: string | number
  change?: string
  icon?: ReactNode
  colorClass?: string
}

export default function KpiCard({ title, value, change, icon, colorClass = 'bg-white' }: KpiCardProps) {
  return (
    <div className={`p-4 rounded border ${colorClass}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">{title}</div>
          <div className="text-2xl font-semibold text-gray-900">{value}</div>
        </div>
        {icon}
      </div>
      {change && <div className="text-xs mt-2 text-gray-500">{change}</div>}
    </div>
  )
}
