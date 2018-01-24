// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { sync } from 'vuex-router-sync'

import store from './store'
import router from './router'

import App from './App'

import fontawesome from '@fortawesome/fontawesome'
import proLight from '@fortawesome/fontawesome-pro-light'

sync(store, router)

fontawesome.library.add(proLight)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
}).$mount('#app')
