// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'  //引用jq
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueLazyload from 'vue-lazyload'

import './../static/js/validator'
import './http.js'
import layer from './../static/js/layer_mobile/layer.js'
import './../static/js/layer_mobile/need/layer.css'
Vue.prototype.$layer = layer;
import axios from 'axios'
import VueAxios from 'vue-axios' //引入axios
Vue.use(VueAxios, axios)

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.use(VueLazyload)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'dist/loading.gif',
  attempt: 1
});
//loading: 'assets/Android/drawable-xhdpi/loading.gif',
/* eslint-disable no-new */


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
