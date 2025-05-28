// src/stores/tenant-store.ts
import { create } from 'zustand';

type Tenant = {
  id: string;
  nome: string;
  plano: string;
  role: 'ADMIN' | 'USER';
  logo:string
  // ... outros campos
};

type TenantStore = {
  tenant: Tenant | null;
  setUser: (tenant: Tenant) => void;
};

export const useTenantStore = create<TenantStore>((set) => ({
  tenant: null,
  setUser: (tenant) => set(() => ({ tenant })),
}));