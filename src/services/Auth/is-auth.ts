import {api} from "boot/axios";
import {User} from "src/types/user";

export const isAuth = async () => {
  try {
    const {data} = await api.get('api/v1/is-auth')

    return data.data as User
  } catch {
    return false
  }
}
