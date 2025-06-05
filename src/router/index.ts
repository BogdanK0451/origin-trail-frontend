import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../view/HomeView.vue'
import BalanceView from '../view/BalanceView.vue'
import TokenTransactionsView from '../view/TokenTransactionsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/balance',
      name: 'balance',
      component: BalanceView,
    },
    {
      path: '/tokentransactions',
      name: 'tokentransactions',
      component: TokenTransactionsView,
    },
  ],
})

export default router
