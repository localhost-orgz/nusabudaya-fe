import { gameResultService } from "@/services/modules/game-result.service";
import { create } from "zustand";

export const useGameResultStore = create((set) => ({
  totalXp: 0,
  totalBadge: 0,
  loading: false,

  fetch: async () => {
    set({ loading: true });

    try {
      const result = await gameResultService.get();
      set({
        totalXp: result.total_xp,
        totalBadge: result.badge_count,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },
}))