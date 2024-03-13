import {LoginForm} from "src/types/Auth/login";
import {api} from "boot/axios";
import {User} from "src/types/user";

export const createUser = async (form: LoginForm) => {
  const {data} = await api.post('/api/v1/user', form)

  return data.data as User
}
