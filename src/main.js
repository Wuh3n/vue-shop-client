import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../plugins/vant.js'
// 导入第三方字体图标库
import './assets/font/iconfont.css'

// 导入axios
import axios from 'axios'

Vue.prototype.$http = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
