import Vue from 'vue'
import App from './App'
import api from './http/api.js'
import store from './store'
import top from './components/top/top.vue' //注册全局组件
import uView from "uview-ui"
import utils from './utils/index.js'

Vue.prototype.$utils = utils
Vue.use(uView);
import dayjs from "dayjs"
Vue.prototype.dayjs = dayjs;//可以全局使用dayjs
Vue.prototype.$store = store
Vue.config.productionTip = false
Vue.prototype.$api = api
App.mpType = 'app'
Vue.component('top', top)


//把vuex定义成全局组件



const app = new Vue({
	...App,
	store
})
app.$mount()
