import ReactApexChart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'

const series = [35, 25, 20, 15, 5]

const options: ApexOptions = {
  chart: {
    type: 'donut',
    animations: {
      enabled: true,
      speed: 800,
    }
  },
  labels: ['Consultations', 'Surgeries', 'Lab Tests', 'Medications', 'Other'],
  colors: ['#0066CC', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
  legend: {
    position: 'bottom',
    horizontalAlign: 'center',
    fontSize: '13px',
    markers: {
      size: 8
    }
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '12px',
      fontWeight: 'bold'
    },
    dropShadow: {
      enabled: false
    }
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Total Revenue',
            fontSize: '14px',
            fontWeight: 600,
            color: '#374151',
            formatter: () => '$124,300'
          },
          value: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#111827'
          }
        }
      }
    }
  },
  tooltip: {
    y: {
      formatter: (val) => `$${(val * 1243).toFixed(0)}`
    }
  }
}

export default function FinanceChart() {
  return <ReactApexChart options={options} series={series} type="donut" height={320} />
}
