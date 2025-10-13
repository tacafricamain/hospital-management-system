import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import KpiCard from '../../components/Card/KpiCard';
import OverviewChart from '../../components/Chart/OverviewChart';
import AppointmentList from '../../components/AppointmentList/AppointmentList';
import PatientTable from '../../components/Table/PatientTable';
import { Users, Calendar, UserPlus, DollarSign, Activity, Clock, AlertCircle, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Sidebar />
      <main className="flex-1 p-6 space-y-8 overflow-auto ml-64">
        <Navbar />
        
        {/* KPI Cards with animations */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <KpiCard 
              title="Total Patients" 
              value="1,245" 
              change="+12.5%" 
              trend="up"
              icon={<Users size={24} />}
              colorClass="from-blue-500 to-blue-600"
              gradientFrom="from-blue-50"
              gradientTo="to-blue-100"
            />
          </div>
          <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <KpiCard 
              title="Appointments Today" 
              value="86" 
              change="+8.2%"
              trend="up"
              icon={<Calendar size={24} />}
              colorClass="from-purple-500 to-purple-600"
              gradientFrom="from-purple-50"
              gradientTo="to-purple-100"
            />
          </div>
          <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <KpiCard 
              title="New Admissions" 
              value="24" 
              change="-2.4%"
              trend="down"
              icon={<UserPlus size={24} />}
              colorClass="from-green-500 to-green-600"
              gradientFrom="from-green-50"
              gradientTo="to-green-100"
            />
          </div>
          <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <KpiCard 
              title="Revenue Today" 
              value="$12,430" 
              change="+18.7%"
              trend="up"
              icon={<DollarSign size={24} />}
              colorClass="from-orange-500 to-orange-600"
              gradientFrom="from-orange-50"
              gradientTo="to-orange-100"
            />
          </div>
        </section>

        {/* Quick Stats Row */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Activity size={20} className="text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Operations</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Wait Time</p>
                <p className="text-2xl font-bold text-gray-900">15 min</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle size={20} className="text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Critical Alerts</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>
        </section>

        {/* Charts and Lists */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Patient Overview</h2>
                <p className="text-sm text-gray-500">Last 6 months performance</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp size={16} />
                  <span className="font-semibold">+24%</span>
                </div>
              </div>
            </div>
            <OverviewChart />
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
            <AppointmentList />
          </div>
        </section>

        {/* Patient Table */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
          <PatientTable />
        </section>
      </main>
    </div>
  );
}