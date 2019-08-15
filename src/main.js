// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import globalComponents from './js/components'
import './common/stylus/reset.styl'
import VueLazyload from 'vue-lazyload'
import './assets/iconfont.css'

Vue.config.productionTip = false
Vue.use(globalComponents)
Vue.use(VueLazyload,{
  loading:require('./common/images/loading.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
