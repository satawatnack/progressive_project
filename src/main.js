import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
const fb = require('./firebaseConfig.js')

Vue.config.productionTip = false

let app
Vue.use(Vuetify);
fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})
