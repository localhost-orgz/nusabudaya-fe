import apiClient from "../apiClient"
import { endpoints } from "../endpoint"

export const imageGuessService = {
  getByProvince: async (provinceId) => {
    const { data } = await apiClient.get(endpoints.imageGuesses.getAll(provinceId));
    return data.data;
  },
}