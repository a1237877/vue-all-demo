import axios from 'axios'
import Cookie from 'js-cookie'
import router from '@/router'

//封装axios
const instance = axios.create({
  timeout:10000,
  baseURL: 'https://www.easy-mock.com/mock/5ca45824c4e9a575b66b62d2/example/douban'

})

const COOKIE_NAME = 'movie_trailer_user'

instance.interceptors.response.use(res => {
  const { data } = res  //const data = res.data
  //登录失败
  if(data.code === 1003){ //登录失效
    Cookie.remove(COOKIE_NAME)
    router.replace('/login')
    return
  }
  return Promise.resolve(data)
},()=>{
  router.push('/error')   //报错的话去到报错页面
}
)

export default{
  install:(Vue,options) => {
    Object.defineProperty(Vue.prototype,'$axios',{value:instance})  //可以在页面上直接用axios请求数据
  } 
}