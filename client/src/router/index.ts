import { createRouter, createWebHistory } from 'vue-router'
import Chat from '@/views/Chat.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'chat',
      component: Chat
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/setAvatar',
      name: 'setAvatar',
      component: () => import('../components/SetAvatar.vue')
    }
  ]
})

export default router
