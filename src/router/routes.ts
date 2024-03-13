import { RouteRecordRaw } from 'vue-router';
import {isAuth} from "src/router/route-guard";

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Auth/Login/IndexPage.vue') },
    ],
  },
  {
    path: '/register',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Auth/Register/IndexPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
  {
    path: '/',
    name: 'Main',
    component: () => import('layouts/Private/IndexPage.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        beforeEnter: async (to, from, next) => {
          return await isAuth(to) ? next() : next('/login');
        },
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/search-results',
        component: () => import('pages/Consultation/SearchResults/IndexPage.vue'),
        meta: {
          requiresAuth: true
        }
      },
    ],
  },
];

export default routes;
