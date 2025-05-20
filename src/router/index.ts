import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    { path: '/auth-callback', component: () => import('../views/AuthCallback.vue' as any) },
    { path: '/return-navigation', component: () => import('../views/ReturnNavigation.vue' as any) },
  ],
})

export default router
