import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyCNtXlRX0F3WRdtqTHqkjScvO9Tu-M0d1Q",
  authDomain: "progressiveproj.firebaseapp.com",
  databaseURL: "https://progressiveproj.firebaseio.com",
  projectId: "progressiveproj",
  storageBucket: "progressiveproj.appspot.com",
  messagingSenderId: "741379373687",
  appId: "1:741379373687:web:26d888271dec148f74e472",
  measurementId: "G-F6L64L2FT7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
