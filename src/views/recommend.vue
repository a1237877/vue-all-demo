<template>
  <div class="recommend">
    <!-- 首页整个页面都支持better-scroll滚动 -->
    <ScrollView>
      <ListBlock :movies="playingMovies" :title="`正在热映${playingCount}`" />
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
      playingCount:0
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
      axios.get('https://www.easy-mock.com/mock/5ca45824c4e9a575b66b62d2/example/douban').then(res => {  //easymock 的地址
        console.log(res.data)
        if(res.data.code === 1001){
          const {coming,playing} = res.data.result
          this.playingMovies = playing.movies,
          this.playingCount = playing.count
        }
      })
    }
  },
}
</script>

<style>

</style>
