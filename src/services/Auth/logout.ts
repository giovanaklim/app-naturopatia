import {api} from "boot/axios";

export const logoutUser = async () => {
  const {data} = await api.post('/api/v1/logout')
  return data

}
