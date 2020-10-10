import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 第三方模块mavonEditor引入
import 'font-awesome/css/font-awesome.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
