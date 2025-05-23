import { create } from 'zustand'

interface BusinessData {
  basicInfo: {
    businessName: string
    tradingName?: string
    cnpj: string
    industry: string
    description?: string
  }
  contactInfo: {
    address: string
    phone: string
    whatsapp?: string
    email: string
    socialMedia?: Array<{ platform: string; url: string }>
  }
  // ... outros tipos
}

interface BusinessStore {
  businessData: BusinessData | null
  setBusinessData: (data: BusinessData) => void
  clearBusinessData: () => void
}

export const useStore = create<BusinessStore>((set) => ({
  businessData: null,
  setBusinessData: (data) => set({ businessData: data }),
  clearBusinessData: () => set({ businessData: null }),
}))