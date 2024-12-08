import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue';
import Contact from '../pages/Contact.vue';
import { userAuthStore } from '@/stores/authStore';
import Cart from '@/pages/Cart.vue';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/', 
      name: 'Home',
      component: Home 
    },
    { 
      path: '/contact', 
      name: 'Contact',
      component: Contact,
      meta: { requiresAuth: true }
    },
    { 
      path: '/cart', 
      name: 'Cart',
      component: Cart,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/Auth/Login.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/pages/Auth/Register.vue'),
      meta: { requiresGuest: true }
    }
  ],
})

router.beforeEach((to, from, next)=>{
  const authStore = userAuthStore()
  
  
  if (to.meta.requiresAuth && !authStore.isLoggin) {
      next('/login')
  } 
  else if (to.meta.requiresGuest && authStore.isLoggin) {
    next('/')
  }
  else {
    next()
  }
})

export default router
