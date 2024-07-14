import {api} from "boot/axios";

export const getAllPlants = async () => {
  const {data} = await api.get(`/api/v1/get-all-plants`)
  return data
}
