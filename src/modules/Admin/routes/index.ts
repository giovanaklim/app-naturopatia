import {isAuth} from "src/router/route-guard";
import {NavigationGuardNext, RouteLocationNormalized} from "vue-router";

export const adminRoutes = [
  {
    path: '/admin-panel',
    component: () => import('../views/IndexPage.vue'),
    beforeEnter: async (to: RouteLocationNormalized , from: RouteLocationNormalized, next: NavigationGuardNext) => {
      return await isAuth(to) ? next() : next('/login');
    },
    meta: {
      requiresAuth: true,
      role: 'admin'
    },
  }
]
