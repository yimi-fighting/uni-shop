
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 按需导入$http对象
import {$http} from "@escook/request-miniprogram"
import store from './store/store.js'

// 将对象挂载到uni对象上
uni.$http=$http

// 配置请求的根路径
// $http.baseUrl='https://www.uinav.com'
$http.baseUrl='https://api-ugo-web.itheima.net'

// 请求拦截器
$http.beforeRequest=function(options){
  uni.showLoading({
    title:'数据加载中'
  })
}
// 响应拦截器
$http.afterRequest=function(options){
  uni.hideLoading()
}

// 创建一个全局的showMsg,当数据请求失败时调用
uni.$showMsg=function(title="数据请求失败",duration=1500){
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif