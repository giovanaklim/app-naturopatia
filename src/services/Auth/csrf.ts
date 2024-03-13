import {api} from "boot/axios";

export const getCsrfToken = async () => {
  await api.get('/sanctum/csrf-cookie');
}
