<template>
  <div class="recommend">
    <!-- 首页整个页面都支持better-scroll滚动 -->
    <ScrollView>
      <!-- 父子通信 more方法传参表示点击不同title去到不同页面 -->
      <ListBlock :movies="playingMovies" :title="`正在热映${playingCount}`" @more="goMore(0)" @select="selectItem" />
      <div class="space" style="background-color:#f6f6f6;height:10px"></div>
      <ListBlock :movies="commingMovie" :title="`即将上映${commingCount}`" @more="goMore(1)" @select="selectItem" />
    </ScrollView>
  </div>
</template>

<script>
import axios from 'axios'
import ListBlock from '@/components/ListBlock'
export default {
  data() {
    return {
      playingMovies:[],
      playingCount:0,
      commingMovie:[],
      commingCount:0
    }
  },
  components: {
    ListBlock
  },
  mounted() {
    this.getMovie()
  },
  methods: {
    getMovie() {
      //this.$axios.get('/api/api/movie/get_hot') 前面的api表示在webpack中配置的  后面是服务器地址
      axios.get('https://www.easy-mock.com/mock/5ca45824c4e9a575b66b62d2/example/douban').then(res => {  //easymock 的地址
        console.log(res.data)
        if(res.data.code === 1001){
          const {comming,playing} = res.data.result
          this.playingMovies = playing.movies,
          this.playingCount = playing.count,
          this.commingMovie = comming.movies,
          this.commingCount = comming.count
        }
      })
    },
    selectItem(id){
      //拿到唯一标识的id
      console.log(id)
      this.$router.push(`/movieDetail/${id}`)
    },
    goMore(type){
      console.log(type)
      if(type===0){
        this.$router.push('/movieIntheater')
      }else{
        this.$router.push('/movieComming')
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
  .recommend
    width 100%
</style>
