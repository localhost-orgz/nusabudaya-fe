import apiClient from "../apiClient"
import { endpoints } from "../endpoint"

export const quizService = {
  getByProvince: async (provinceId) => {
    const url = `${endpoints.quizzes.getAll}?province_id=${provinceId}`;
    const { data } = await apiClient.get(url);
    return data.data;
  },
}