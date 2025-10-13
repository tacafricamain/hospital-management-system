import ReactApexChart from 'react-apexcharts'
import type { ApexOptions } from 'apexcharts'

const series = [
  { name: 'Hospitalized', data: [30, 40, 35, 50, 49, 60] },
  { name: 'Outpatients', data: [20, 29, 37, 36, 44, 45] },
]

const options: ApexOptions = {
  chart: { type: 'line', toolbar: { show: false } },
  stroke: { curve: 'smooth' },
  dataLabels: { enabled: false },
  xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
  legend: { position: 'top' },
}

export default function OverviewChart() {
  return (
    <div className="bg-white border rounded p-4">
      <ReactApexChart options={options} series={series} type="line" height={280} />
    </div>
  )
}
