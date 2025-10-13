import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import KpiCard from '../../components/Card/KpiCard';
import OverviewChart from '../../components/Chart/OverviewChart';
import AppointmentList from '../../components/AppointmentList/AppointmentList';
import PatientTable from '../../components/Table/PatientTable';

export default function Dashboard() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 space-y-6">
        <Navbar />
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Total Patients" value="1,245" change="+4.5% vs last week" />
          <KpiCard title="Appointments" value="86" change="+2.1%" />
          <KpiCard title="Admissions" value="24" change="-0.9%" />
          <KpiCard title="Revenue" value="$12,430" change="+6.3%" />
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2"><OverviewChart /></div>
          <div><AppointmentList /></div>
        </section>
        <section>
          <PatientTable />
        </section>
      </main>
    </div>
  );
}