import {api} from "boot/axios";

export const updatePlantLike = async (id: string) => {
  await api.put(`/api/v1/plant/${id}/like`)
}
