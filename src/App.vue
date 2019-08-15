<template>
  <div id="app">
    <!-- 头部 -->
    <v-header></v-header>
    <div class="content">
      <!-- <keep-alive>   把这个去掉就可以实现boforeRouteUpdata 实现方法 
      对于一个带有动态参数的路径 /good/:id，在 /good/1 和 /good/2 之间跳转的时候 -->
        <router-view></router-view>  
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'App',
  components:{
    "v-header":Header
  }
}
</script>

<style lang="stylus" scoped>
.content
  position absolute
  top 56px
  bottom 0
  width 100%
</style>
