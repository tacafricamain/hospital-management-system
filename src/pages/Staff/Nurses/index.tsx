import Sidebar from '../../../components/Sidebar/Sidebar'
import Navbar from '../../../components/Navbar/Navbar'
import Footer from '../../../components/Footer/Footer'
import KpiCard from '../../../components/Card/KpiCard'
import { Users, UserCheck, Clock, Calendar, Activity, UserPlus, AlertCircle, Award } from 'lucide-react'

export default function Nurses() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Sidebar />
      <main className="flex-1 p-6 space-y-8 overflow-auto ml-64">
        <Navbar />
        
        {/* Page Header */}
        <div className="flex items-center justify-between animate-fadeInUp">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nursing Staff</h1>
            <p className="text-gray-600 mt-1">Manage and monitor nursing personnel</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <UserPlus size={20} />
            Add New Nurse
          </button>
        </div>

        {/* KPI Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <KpiCard 
              title="Total Nurses" 
              value="148" 
              change="+5.2%" 
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
              value="92" 
              change="+2.1%"
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
              value="42.5" 
              change="-1.8%"
              trend="down"
              icon={<Clock size={24} />}
              colorClass="from-purple-500 to-purple-600"
              gradientFrom="from-purple-50"
              gradientTo="to-purple-100"
            />
          </div>
          <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <KpiCard 
              title="Scheduled Today" 
              value="95" 
              change="+3.4%"
              trend="up"
              icon={<Calendar size={24} />}
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
                <Activity size={20} className="text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">ICU Staff</p>
                <p className="text-2xl font-bold text-gray-900">28</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle size={20} className="text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Call-outs Today</p>
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
                <p className="text-sm text-gray-600">Overtime Hours</p>
                <p className="text-2xl font-bold text-gray-900">124</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Award size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Certified</p>
                <p className="text-2xl font-bold text-gray-900">142</p>
              </div>
            </div>
          </div>
        </section>

        {/* Department Distribution & Shift Schedule */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Distribution</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Activity size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">Emergency</span>
                    <p className="text-xs text-gray-500">24/7 Coverage</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">32</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <Activity size={20} className="text-red-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">ICU</span>
                    <p className="text-xs text-gray-500">Critical Care</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">28</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Activity size={20} className="text-green-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">General Ward</span>
                    <p className="text-xs text-gray-500">In-patient Care</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">45</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Activity size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">Pediatrics</span>
                    <p className="text-xs text-gray-500">Child Care</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">22</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <Activity size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900">Surgery</span>
                    <p className="text-xs text-gray-500">Operating Room</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">21</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6 animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Shift Schedule</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-blue-900">Morning Shift (7AM - 3PM)</span>
                  <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-900">48 Nurses</span>
                  <span className="text-xs text-blue-700">100% Staffed</span>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-purple-900">Evening Shift (3PM - 11PM)</span>
                  <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">Upcoming</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-purple-900">44 Nurses</span>
                  <span className="text-xs text-purple-700">98% Staffed</span>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900">Night Shift (11PM - 7AM)</span>
                  <span className="text-xs bg-gray-200 text-gray-800 px-2 py-1 rounded-full">Scheduled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">35 Nurses</span>
                  <span className="text-xs text-gray-700">95% Staffed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nurses Table */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Nursing Staff Directory</h3>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Search nurses..." 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Departments</option>
                <option>Emergency</option>
                <option>ICU</option>
                <option>General Ward</option>
                <option>Pediatrics</option>
                <option>Surgery</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nurse</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
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
                        SM
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Sarah Mitchell</div>
                        <div className="text-sm text-gray-500">RN, BSN</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">N-2451</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Emergency</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Morning</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">8 years</td>
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
                        JC
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">John Cooper</div>
                        <div className="text-sm text-gray-500">RN, MSN</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">N-1892</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">ICU</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Morning</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">12 years</td>
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
                        EP
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Emily Parker</div>
                        <div className="text-sm text-gray-500">RN, BSN</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">N-3105</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Pediatrics</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">Evening</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">5 years</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Scheduled</span>
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
                        MR
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Michael Roberts</div>
                        <div className="text-sm text-gray-500">RN, BSN, CCRN</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">N-2734</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Surgery</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Morning</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">10 years</td>
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
                        LT
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Lisa Thompson</div>
                        <div className="text-sm text-gray-500">RN, MSN</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">N-1567</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">General Ward</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Morning</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">15 years</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">On Duty</span>
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
            <span className="text-sm text-gray-600">Showing 1 to 5 of 148 nurses</span>
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
