import {useUserStore} from "stores/user";
import {RouteLocationNormalized} from "vue-router";

export const isAuth = async (to: RouteLocationNormalized) => {
  if (!to.meta.requiresAuth) return true;

  const userStore = useUserStore();
  if (!userStore.isLogged) {
    return await userStore.getAuthUser();
  }

  return true;
}
