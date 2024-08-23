import { createRouter, createWebHistory } from 'vue-router'
import InSliderView from '@/views/InSliderView.vue'
import InSplitterView from '@/views/InSplitterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/slider'
    },
    {
      path: '/slider',
      name: 'slider',
      component: InSliderView
    },
    {
      path: '/splitter',
      name: 'splitter',
      component: InSplitterView
    }
  ]
})

export default router
