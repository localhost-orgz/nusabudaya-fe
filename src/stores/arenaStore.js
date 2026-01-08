import { create } from "zustand";
import { persist } from "zustand/middleware";

// Kita pake 'persist' middleware buat nyimpen data ke local storage
export const useArenaStore = create(
  persist(
    (set) => ({
      province: "", // 🏳️ State awal kosong
      setProvince: (slug) => set({ province: slug }), // ✍️ Action buat update province
    }),
    {
      name: "arena-storage", // 📦 Nama key unik buat di localStorage nanti
      // storage: createJSONStorage(() => localStorage), // Defaultnya emang localStorage, jadi ini opsional sebenernya
    }
  )
);
