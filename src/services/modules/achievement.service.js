import apiClient from "../apiClient"
import { endpoints } from "../endpoint"

export const achievementService = {
  getByProvince: async () => {
    const { data } = await apiClient.get(endpoints.provinces.getAll);
    return data.data;
  },
  
  getAll: async (provinceId) => {  
    const { data } = await apiClient.get(endpoints.achievements.getAll(provinceId));
    return data.data;
  }
}