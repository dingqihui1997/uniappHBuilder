import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
	let num=uni.getStorageSync('Cart').length
const store = new Vuex.Store({
  state: {//共享数据
    badge:num, //
  },
  mutations: { //修改
    setBadge(state, data) {
      state.badge = data
    },
  },
  actions: {
  },
  modules: {
  }
})
export default store



