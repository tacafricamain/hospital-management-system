import { create } from 'zustand'

interface AppState {
  patients: any[]
  setPatients: (data: any[]) => void
}

export const useAppStore = create<AppState>((set) => ({
  patients: [],
  setPatients: (data) => set({ patients: data }),
}))
