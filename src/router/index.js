import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import MeIndex from '@/views/Me/MeIndex.vue'
import Index from '@/views/Index.vue'
import Layout from '@/views/Layout.vue'
import Test from '@/views/testviews/test.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Layout',//布局页面
      component: Layout,
      redirect:'/Index',
      children:[
        {
          path: '/Index',
          name: 'Index',//首页
          component: Index
        },
        {
          path: '/MeIndex',
          name: 'MeIndex',
          component: MeIndex
        },
        {
          path: '/Test',
          name: 'Test',
          component: Test
        },
      ]
    },
  ]
})

export default router
