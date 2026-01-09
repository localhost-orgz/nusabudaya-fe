import { GEOGRAPHICAL_ORDER } from "@/utils/provinceOrder";
import apiClient from "../apiClient"
import { endpoints } from "../endpoint"

export const provinceService = {
  getAll: async () => {
    const { data } = await apiClient.get(endpoints.provinces.getAll);

    const sortedProvinces = data.data.sort((a, b) => {
      const indexA = GEOGRAPHICAL_ORDER.indexOf(a.name);
      const indexB = GEOGRAPHICAL_ORDER.indexOf(b.name);
      
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;

      return indexA - indexB;
    });

    return sortedProvinces;
  },
  
  getBySlug: async (slug) => {  
    const { data } = await apiClient.get(endpoints.provinces.getBySlug(slug));
    return data.data;
  }
}