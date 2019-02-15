import Vue from 'vue'
import Router from 'vue-router'
import Startpage from '@/components/pages/startpage'
import Home from '@/components/pages/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Startpage',
      component: Startpage
    },
    {
      path:'/home',
      name:'Home',
      component: Home,
      props:true,
    }
  ]
})
