import Vue from 'vue'
import Router from 'vue-router'
import recommend from '@/views/recommend'
import movieDetail from '@/views/movieDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend
    },
    {
      //配置路由id  路由传参
      path:'/movieDetail/:id',
      name:'movieDetail',
      component:movieDetail
    }
  ]
})
