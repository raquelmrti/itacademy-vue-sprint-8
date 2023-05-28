import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StarshipListView from '../views/StarshipListView.vue'
import StarshipInfoView from '../views/StarshipInfoView.vue'

import { useUserStore } from '../stores/userStore'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requireAuth: false
      }
    },
    {
      path: '/starships',
      name: 'starshipList',
      component: StarshipListView,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/starships/:id',
      name: 'starshipInfo',
      component: StarshipInfoView,
      meta: {
        requireAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useUserStore()
  const { userIsLoggedIn, showModalLogIn, attemptedRoute } = storeToRefs(store)

  const needsAuth = to.meta.requireAuth

  if (needsAuth && !userIsLoggedIn.value) {
    attemptedRoute.value = to.fullPath
    showModalLogIn.value = true
  } else {
    next()
  }
})

export default router
