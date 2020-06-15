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


import echarts from 'echarts'
Vue.prototype.$echarts = echarts
//引入VCharts
import VCharts from 'v-charts'

Vue.use(VCharts)

//引入vue-amap
import AMap from "vue-amap";
Vue.use(AMap);
AMap.initAMapApiLoader({
  // 高德的key
  key: "24965b103d53b2097a03a4245601ba74",
  // 插件集合
  plugin: [
    "AMap.Autocomplete",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.PolyEditor",
    "AMap.CircleEditor",
    "AMap.DistrictLayer",
    "AMap.DistrictSearch",
    "Map3D",
  ]
});

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
