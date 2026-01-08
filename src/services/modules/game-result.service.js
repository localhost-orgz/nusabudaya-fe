import apiClient from "../apiClient";
import { endpoints } from "../endpoint";

export const gameResultService = {
  get: async () => {
    const { data } = await apiClient.get(endpoints.gameResults.getAll);
    return data.data;
  },

  /**
   * - province_id: int
   * - type: "MEMORY_CARD | GUESS | QUIZ"
   * - xp: int
   * - time: int (second)
   * - is_completed: bool
   */
  create: async (resultData) => {
    const { data } = await apiClient.post(endpoints.gameResults.create, resultData);
    return data.data;
  }
}