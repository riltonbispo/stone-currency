import { formType } from '@/types/formType'
import { create } from 'zustand'

interface FormStore {
  dolar: string
  rate: string
  type: formType['type']
  resultDolar: string
  setDolar: (dolar: string) => void
  setRate: (rate: string) => void
  setType: (type: formType['type']) => void
  setResultDolar: (resultDolar: string) => void
}

export const useFormStore = create<FormStore>((set) => ({
  dolar: '',
  rate: '',
  type: 'cash',
  resultDolar: '',
  setDolar: (dolar) => set({ dolar }),
  setRate: (rate) => set({ rate }),
  setType: (type) => set({ type }),
  setResultDolar: (resultDolar) => set({ resultDolar }),
}))
