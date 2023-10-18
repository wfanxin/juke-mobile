import Vue from 'vue'
import App from './App'

import server from './utils/server' // 导入服务类
Vue.prototype.$server = server // 注册服务类

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
