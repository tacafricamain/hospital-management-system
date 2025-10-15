import Sidebar from '../../../components/Sidebar/Sidebar'
import Navbar from '../../../components/Navbar/Navbar'
import Footer from '../../../components/Footer/Footer'
import KpiCard from '../../../components/Card/KpiCard'
import { Users, UserCheck, Clock, Calendar, Activity, UserPlus, AlertCircle, CheckCircle, Sparkles, AlertTriangle } from 'lucide-react'

export default function Cleaners() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Sidebar />
      <main className="flex-1 p-6 space-y-8 overflow-auto ml-64">
        <Navbar />
        
        {/* Page Header */}
        <div className="flex items-center justify-between animate-fadeInUp">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cleaning Staff</h1>
            <p className="text-gray-600 mt-1">Manage and monitor housekeeping personnel</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <UserPlus size={20} />
            Add New Cleaner
          </button>
        </div>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <KpiCard 
              title="Total Cleaners" 
              value="64" 
              change="+2.3%" 
              trend="up"
              icon={<Users size={24} />}
              colorClass="from-blue-500 to-blue-600"
              gradientFrom="from-blue-50"
              gradientTo="to-blue-100"
            />
          </div>
          <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <KpiCard 
              title="On Duty Now" 
              value="38" 
              change="+5.6%"
              trend="up"
              icon={<UserCheck size={24} />}
              colorClass="from-green-500 to-green-600"
              gradientFrom="from-green-50"
              gradientTo="to-green-100"
            />
          </div>
          <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            <KpiCard 
              title="Avg Hours/Week" 
              value="38.5" 
              change="+1.2%"
              trend="up"
              icon={<Clock size={24} />}
              colorClass="from-purple-500 to-purple-600"
              gradientFrom="from-purple-50"
              gradientTo="to-purple-100"
            />
          </div>
          <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <KpiCard 
              title="Rooms Cleaned Today" 
              value="156" 
              change="+8.9%"
              trend="up"
              icon={<Sparkles size={24} />}
              colorClass="from-orange-500 to-orange-600"
              gradientFrom="from-orange-50"
              gradientTo="to-orange-100"
            />
          </div>
        </section>

        {/* Quick Stats Row */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-100 rounded-lg">
                <CheckCircle size={20} className="text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Tasks Completed</p>
                <p className="text-2xl font-bold text-gray-900">142</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle size={20} className="text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Absent Today</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Tasks</p>
                <p className="text-2xl font-bold text-gray-900">18</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Deep Cleaning</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>
        </section>

        {/* Area Assignment & Shift Schedule */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Area Assignment</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Activity size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">Patient Rooms</span>
                    <p className="text-xs text-gray-500">Floors 2-6</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">18</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <Activity size={20} className="text-red-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">Operating Rooms</span>
                    <p className="text-xs text-gray-500">Surgical Suite</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">8</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Activity size={20} className="text-green-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">Common Areas</span>
                    <p className="text-xs text-gray-500">Lobbies & Corridors</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">12</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Activity size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">Emergency Dept</span>
                    <p className="text-xs text-gray-500">24/7 Priority</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">10</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <Activity size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">Restrooms</span>
                    <p className="text-xs text-gray-500">All Floors</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">16</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Shift Schedule</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-blue-900">Morning Shift (6AM - 2PM)</span>
                  <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-900">22 Staff</span>
                  <span className="text-xs text-blue-700">100% Staffed</span>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-purple-900">Afternoon Shift (2PM - 10PM)</span>
                  <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">Upcoming</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-900">20 Staff</span>
                  <span className="text-xs text-purple-700">100% Staffed</span>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900">Night Shift (10PM - 6AM)</span>
                  <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full">Scheduled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">16 Staff</span>
                  <span className="text-xs text-gray-700">94% Staffed</span>
                </div>
              </div>

              <div className="p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-green-700" />
                    <span className="text-sm font-medium text-green-900">Deep Clean Team</span>
                  </div>
                  <span className="text-lg font-bold text-green-900">6 Staff</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Performance & Quality Metrics */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeInUp" style={{ animationDelay: '0.75s' }}>
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Metrics</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Hygiene Score</span>
                <span className="text-sm font-bold text-green-600">98.5%</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Task Completion</span>
                <span className="text-sm font-bold text-blue-600">96.2%</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Response Time</span>
                <span className="text-sm font-bold text-purple-600">8.4 min</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">Satisfaction Rate</span>
                <span className="text-sm font-bold text-orange-600">95.8%</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                  MJ
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Maria Johnson</p>
                  <p className="text-xs text-gray-500">68 rooms cleaned</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold">
                  DL
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">David Lee</p>
                  <p className="text-xs text-gray-500">62 rooms cleaned</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 bg-purple-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
                  SK
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Sofia Khan</p>
                  <p className="text-xs text-gray-500">58 rooms cleaned</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Alerts</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-2 bg-red-50 rounded-lg border border-red-200">
                <AlertCircle size={18} className="text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Urgent Cleanup</p>
                  <p className="text-xs text-gray-600">Room 305 - Spill incident</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertTriangle size={18} className="text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Supply Low</p>
                  <p className="text-xs text-gray-600">Floor 4 - Restock needed</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 bg-blue-50 rounded-lg border border-blue-200">
                <Calendar size={18} className="text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Scheduled Deep Clean</p>
                  <p className="text-xs text-gray-600">OR Suite - Tomorrow 6AM</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cleaners Table */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Cleaning Staff Directory</h3>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Search staff..." 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Areas</option>
                <option>Patient Rooms</option>
                <option>Operating Rooms</option>
                <option>Common Areas</option>
                <option>Emergency Dept</option>
                <option>Restrooms</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area Assignment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                        MJ
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Maria Johnson</div>
                        <div className="text-sm text-gray-500">Team Lead</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">C-1024</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Patient Rooms</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Morning</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">7 years</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">On Duty</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                    <button className="text-gray-600 hover:text-gray-800">Edit</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
                        DL
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">David Lee</div>
                        <div className="text-sm text-gray-500">Cleaner</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">C-1156</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Operating Rooms</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Morning</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">5 years</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">On Duty</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                    <button className="text-gray-600 hover:text-gray-800">Edit</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold">
                        SK
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Sofia Khan</div>
                        <div className="text-sm text-gray-500">Cleaner</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">C-1289</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Common Areas</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">Afternoon</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">4 years</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Break</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                    <button className="text-gray-600 hover:text-gray-800">Edit</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-semibold">
                        JR
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">James Rodriguez</div>
                        <div className="text-sm text-gray-500">Cleaner</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">C-1445</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Emergency Dept</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Morning</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">6 years</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">On Duty</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                    <button className="text-gray-600 hover:text-gray-800">Edit</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-semibold">
                        AN
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Anna Nguyen</div>
                        <div className="text-sm text-gray-500">Cleaner</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">C-1578</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Restrooms</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">Afternoon</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">3 years</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Scheduled</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                    <button className="text-gray-600 hover:text-gray-800">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-600">Showing 1 to 5 of 64 staff members</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">Previous</button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">2</button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">3</button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">Next</button>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  )
}
