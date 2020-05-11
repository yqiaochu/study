// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//引入axios
import axios from 'axios'
// import qs from 'qs'
Vue.prototype.axios = axios    //全局注册，使用方法为:this.axios
// Vue.prototype.qs = qs           //全局注册，使用方法为:this.qs

// let baseURL = window.location.origin;
// axios.defaults.baseURL = baseURL

// 引用我们的自定义组件
import "./components";

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
