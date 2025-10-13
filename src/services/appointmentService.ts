import api from './api'

export async function getAppointments() {
  const { data } = await api.get('/appointments')
  return data
}
