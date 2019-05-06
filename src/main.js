import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import Components from './components/_index'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueWangeditor from 'vue-wangeditor-simple'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueWangeditor)

Object.keys(Components).forEach(key => {
  Vue.component(key, Components[key])
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
