import {api} from "boot/axios";
import {SearchPlant} from "src/types/search-plant";

export const getPlants = async (payload: SearchPlant) => {

  const {data} = await api.get(`/api/v1/get-plants`, {params: payload})
  return data
}
