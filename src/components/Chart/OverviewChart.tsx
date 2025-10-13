import ReactApexChart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'

const series = [
  { name: 'Hospitalized', data: [30, 40, 35, 50, 49, 60] },
  { name: 'Outpatients', data: [20, 29, 37, 36, 44, 45] },
]

const options: ApexOptions = {
  chart: { 
    type: 'line', 
    toolbar: { show: false },
    zoom: { enabled: false },
    animations: {
      enabled: true,
      speed: 800,
    }
  },
  stroke: { 
    curve: 'smooth',
    width: 3
  },
  colors: ['#3b82f6', '#a855f7'],
  dataLabels: { enabled: false },
  xaxis: { 
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    labels: {
      style: {
        colors: '#6b7280',
        fontSize: '12px'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: '#6b7280',
        fontSize: '12px'
      }
    }
  },
  legend: { 
    position: 'top',
    horizontalAlign: 'left',
    fontSize: '13px',
    markers: {
      size: 10
    }
  },
  grid: {
    borderColor: '#f3f4f6',
    strokeDashArray: 4,
  },
  tooltip: {
    theme: 'light',
    style: {
      fontSize: '12px',
    }
  }
}

export default function OverviewChart() {
  return <ReactApexChart options={options} series={series} type="line" height={280} />
}
