import api from './api'

export async function getPatients() {
  const { data } = await api.get('/patients')
  return data
}
