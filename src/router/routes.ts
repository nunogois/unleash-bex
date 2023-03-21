import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/IndexPage.vue') },
    ],
  },
  {
    path: '/toggles',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/TogglesPage.vue') },
    ],
  },
  {
    path: '/settings',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/SettingsPage.vue') },
    ],
  },
  {
    path: '/tooltip',
    component: () => import('layouts/MinimalLayout.vue'),
    children: [
      {
        path: 'toggle',
        component: () => import('src/pages/Tooltip/TogglePage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
