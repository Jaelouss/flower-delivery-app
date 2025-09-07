import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SearchData {
  email?: string;
  phone?: string;
  orderId?: string;
}

interface OrderSearchState {
  data: SearchData;
  save: (data: SearchData) => void;
  clear: () => void;
}

export const useOrderSearchStore = create<OrderSearchState>()(
  persist(
    (set) => ({
      data: {},

      save: (data) => set({ data }),

      clear: () => set({ data: {} }),
    }),
    {
      name: 'order-search-storage',
    }
  )
);