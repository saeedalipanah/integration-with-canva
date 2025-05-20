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
    { path: '/auth-callback', component: () => import('../views/AuthCallback.vue') },
    { path: '/return-navigation', component: () => import('../views/ReturnNavigation.vue') },
  ],
})

export default router
