import Vue from 'vue'
import App from './App.vue'
import '@antv/x6-vue-shape'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import "@/style/common.scss";
import '@/assets/font/iconfont.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
