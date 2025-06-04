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
      component: HomeView, // Form for wallet address, start block; displays transactions
    },
    {
      path: '/balance',
      name: 'balance',
      component: BalanceView, // Form for wallet address, date; shows ETH balance
    },
    {
      path: '/tokentransactions',
      name: 'tokentransactions',
      component: TokenTransactionsView, // Displays token transactions
    },
  ],
})

export default router
