import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import Habitos from '@/views/Habitos.vue';
import Trading from '@/views/Trading.vue';
import Bitacora from '@/views/Bitacora.vue';
import Cartera from '@/views/Cartera.vue';
import Sesiones from '@/views/Sesiones.vue';
import Alertas from '@/views/Alertas.vue';
import Calendario from '@/views/Calendario.vue';
import CalendarioTrading from '@/views/CalendarioTrading.vue';
import Metricas from '@/views/Metricas.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  },
  { path: '/habitos', name: 'home', component: Habitos },
  { path: '/trading', name: 'trading', component: Trading },
  { path: '/bitacora', name: 'bitacora', component: Bitacora },
  { path: '/cartera', name: 'cartera', component: Cartera },
  { path: '/sesiones', name: 'sesiones', component: Sesiones },
  { path: '/alertas', name: 'alertas', component: Alertas },
  { path: '/calendario', name: 'calendario', component: Calendario },
  { path: '/calendario-trading', name: 'caltrading', component: CalendarioTrading },
  { path: '/metricas', name: 'metricas', component: Metricas },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
