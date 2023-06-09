import { createRouter, createWebHistory } from 'vue-router'

const useRoutes = async (to, from, next) => {
  if(localStorage.getItem('token')) {
    next({ name: 'chat' })
  } else next()
}

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
      beforeEnter: useRoutes,
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      beforeEnter: useRoutes,
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
  if(!localStorage.getItem('token') && to.name !== 'login' && to.name !== 'register' ) {
    next({ name: 'login' })
  } else {
    next()
  }
})

router.onError((error) => {
  router.push({name: 'login'})
})

export default router
