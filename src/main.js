import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'dragula/dist/dragula.css'
import 'ant-design-vue/dist/antd.css'
import antD from 'ant-design-vue'
Vue.config.productionTip = false
Vue.use(antD)
new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app')
