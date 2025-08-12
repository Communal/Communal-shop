// store/cart.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // now just IDs
      addItem: (id) => {
        if (!get().items.includes(id)) {
          set({ items: [...get().items, id] });
        }
      },
      removeItem: (id) =>
        set({ items: get().items.filter((itemId) => itemId !== id) }),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
