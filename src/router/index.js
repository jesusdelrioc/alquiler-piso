import Vue from 'vue'
import Router from 'vue-router'
import calculadora from '@/components/calculadora'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'calculadora',
      component: calculadora
    }
  ]
})
