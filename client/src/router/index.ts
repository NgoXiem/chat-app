import { createRouter, createWebHistory } from 'vue-router'
import { apis } from '@/apis/api'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'chat',
      component: () => import('../views/Chat.vue')
    },
    {
      path: '/login',
      name: 'login',
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
    }, 
    {
      path: '/*', redirect: '/',
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  if ((to.name === 'login' || to.name === 'register')) {
    next();
    return;
  }
  const { data } = await apis.getUserInfo();
  if (data) next();
  else next({ name: 'login' })
})

router.onError((error) => {
  router.push({name: 'login'})
})

export default router
