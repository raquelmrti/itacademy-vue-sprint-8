import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StarshipListView from '../views/StarshipListView.vue'
import StarshipInfoView from '../views/StarshipInfoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/starships',
      name: 'starshipList',
      component: StarshipListView
    },
    {
      path: '/starships/:id',
      name: 'starshipInfo',
      component: StarshipInfoView
    }
  ]
})

export default router
