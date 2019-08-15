import axios from 'axios'
import router from '@/router'
import Cookie from 'js-cookie'

//封装axios
const instance = axios.create({
  timeout: 60000,
  // baseURL: 'https://www.easy-mock.com/mock/5ca45824c4e9a575b66b62d2/example'
  //用webpack代理跨域来解决 ,在index.js下proxy中修改
})
const COOKIE_NAME = 'movie_trailer_user'

instance.interceptors.response.use(res => {
  const { data } = res
  // 登录失效
  if (data.code === 1003) {
    Cookie.remove(COOKIE_NAME)
    router.replace('/login')
    return
  }
  return Promise.resolve(data)
}, () => {
  router.push('/error')
})

export default {
  install: (Vue, option) => {
    Object.defineProperty(Vue.prototype, '$axios', { value: instance })
  }
}
