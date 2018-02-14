import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

global.DEVICEID = null
global.HANDLER = []
global.on = (name, fn) => {
  global.HANDLER[name] = fn
}
global.emit = (name, value) => {
  console.log(`this log is global emit name = ${name}, value = ${value}`);
  if(global.HANDLER[name]){
    global.HANDLER[name](value);
  }
}
global.WINDOW_HEIGHT = 0
global.CANVAS_HEIGHT = 0
global.WINDOW_WIDTH = 500
global.CANVAS_WIDTH = 500

Vue.use(ElementUI)
Vue.use({
  install (Vue, options) {
    Vue.prototype.$remoteApi = global.remoteApi
  }
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
