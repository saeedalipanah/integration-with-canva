import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
// @ts-ignore
import AuthCallback from '../views/AuthCallback.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    { path: '/auth-callback', component: AuthCallback },
    { path: '/return-navigation', component: () => import('../views/ReturnNavigation.vue' as any) },
  ],
})

export default router
