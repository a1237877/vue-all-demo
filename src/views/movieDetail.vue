<template>
  <transition name="fade">
   <div class="movie">
      <!-- 头部 -->
    <!-- 阻止touch的默认事件 因为i标签上有点击事件 点到返回的时候会到上一个页面  -->
    <div class="player-wrapper" @touchmove.prevent>
      <!-- <div ref="player" class="player" /> -->
      <video class="player" :src="movie.video" autoplay></video>
      <!-- 一个箭头表示返回上一个页面 -->
      <i class="iconfont icon-left" @click="$router.back()" />
    </div>

    <!-- 其他内容 -->
    <!-- 用scroll组件 实现better-scroll的方法 -->
    <div class="info-wrapper">
      <ScrollView :data="relativeMovies">
        <section v-if="movie.title" class="info">
          <div class="title">{{ movie.title }}</div>
          <div class="descript">{{ desc }}</div>
          <div class="switch-wrapper" @click="toggleLayer">
            <!-- 点击简介的时候,下面的DOM结构都会被替换掉 -->
            <span @click="goDetail">简介</span>   
            <i class="iconfont icon-right" />
          </div>
        </section>
        <div class="space" style="background-color:#f6f6f6;height:10px"></div>
        <section v-if="relativeMovies" class="relative-movies">
            <h1 class="text">相关推荐</h1>
            <div class="list">
              <div
                v-for="item in relativeMovies"
                :key="item._id"
                class="item"
                @click="goToDetail(item._id)"
              >
                <img v-lazy="item.poster" width="56" height="80">
                <div class="desc">
                  <p class="title">{{ item.title }}</p>
                  <div v-if="item.isPlay === 1" class="rate">
                    <span>豆瓣评分: </span>
                    <span class="text">{{ item.rate || '暂无' }}</span>
                  </div>
                  <p v-else class="pubdate">
                    <span>上映时间: </span>
                    <span>{{ item.pubdate.replace('(中国大陆)', '') }}</span>
                  </p>
                  <p>类型: {{ item.movieTypes.join('/') }}</p>
                </div>
              </div>
            </div>
          </section>
          <div class="loading-wrap" v-if="!relativeMovies">
            <Loading />
          </div>
      </ScrollView>
      <Transition name="layer">
          <div v-show="isShow" class="layer-wrapper">
            <div class="title">
              <span class="text">{{ movie.title }}</span>
              <i class="iconfont icon-down" @click="toNormal"/>
            </div>
            <div v-if="movie.title" class="desc">
              <div class="descript">
                <div v-if="movie.rate !== 0" class="star item">
                  <span class="name">评分: </span>
                  <span class="text">{{ movie.rate }}</span>
                </div>
                <div v-else class="pubdate item">
                  <span class="name">上映时间: </span>
                  <span class="text">{{ pubdate }}</span>
                </div>
                <div class="author item">
                  <span class="name">导演: </span>
                  <span class="text">{{ movie.author }}</span>
                </div>
                <div class="cast item">
                  <span class="name">影人: </span>
                  <span class="text">{{ casts }}</span>
                </div>
                <div class="category item">
                  <span class="name">类型: </span>
                  <span class="text">{{ movie.movieTypes.join('·') }}</span>
                </div>
              </div>
              <div class="casts">
                <div v-for="item in movie.casts" :key="item._id" class="cast">
                  <img v-lazy="item.avatar" class="img">
                  <h3 class="name">{{ item.name }}</h3>
                </div>
              </div>
              <div class="summary">
                <h1 class="title">简介</h1>
                <span class="text">{{ movie.summary }}</span>
              </div>
            </div>
          </div>
      </Transition>

    </div>
   </div>
  </transition>
</template>

<script>
// import VueDPlayer from 'vue-dplayer'  //引入dplayer
// import 'vue-dplayer/dist/vue-dplayer.css'
import axios from "axios"; //要是封装了就可以不用引入
export default {
  name: "Movie",
  data() {
    return {
      movie: {},
      relativeMovies: [],
      isShow:false
    };
  },
  methods: {
    //获取电影的id来请求数据
    getDetail() {
      console.log(1);
      const id = this.$route.params.id; // = const {id} = this.$route.params
      // this.$axios.get()   封装好的写法
      // axios.get(`/api/api/movie/get_detail/${id}`).then(res => {
      axios
        .get("https://www.easy-mock.com/mock/5ca466ee13e4cf68f04a4308/douban")
        .then(res => {
          console.log(res);
          if (res.data.code === 1001) {
            //表示数据拿到了
            this.movie = res.data.result.movie;
            this.relativeMovies = res.data.result.relativeMovies;
          }
        });
    },
    toggleLayer(){
      
    },
    toNormal(){
      this.isShow = false
    },
    initPlayer(){
      const {DPlayer} = window
      this.player = new DPlayer({
        container:this.$refs.player,
        video:{
          url:this.movie.video,
          pic:this.movie.cover
        }
      })
    },
    goDetail(){
      this.isShow = true
    }
  },
  beforeRouteUpdate(to,from,next) {  // 路由钩子 在路由更新时 因为点击简介后他不会刷新页面,所以一直都是这个页面
    next()
    this.getDetail()
  },
  created() {
    // this.initPlayer()
  },
  mounted() {
    this.getDetail();
  },
  computed: {  //怎么用  直接调用函数 挖坑直接用
    desc(){
      //怎么把数组变成 是/说/3的形式  用join('/')
      const rate = this.movie.rate ? `${this.movie.rate}分` : '即将上映'  //要是没有评分 则显示即将上映
      const duration = this.movie.duration || this.movie.pubdate.replace('中国大陆','')  //正在上映和即将上映显示不同的东西
      return `${rate} · ${this.movie.movieTypes.join('/')} · ${duration}`
    },
    casts(){
      const casts = this.movie.casts
      return casts.map(item => item.name).join('/') //以斜杠拼接
    }
  },
};
</script>

<style lang="stylus" scoped>
.movie
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  z-index: 10000   //把z-index值设的大点  可以让这一页面的头部被覆盖掉
  overflow hidden
  background #fff
  .player-wrapper
    height 210px
    .player
      height 210px
    .icon-left
      position absolute
      top 15px
      left 15px
      font-size 25px
      color #fff
      font-weight bold
  .info-wrapper
    position relative
    height calc(100% - 210px)
    section
      position relative
      padding 15px
      min-height 70px
      background #fff
    .info
      .title
        font-size 20px
        font-weight bold
        padding-right 100px
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
      .descript
        margin-top 20px
        color #777
        font-size 15px
      .switch-wrapper
        position absolute
        top 15px
        right 15px
        color #777
        .text
          font-size 15px
        .icon
          font-weight bold
          vertical-align text-bottom
          line-height 20px
    .relative-movies
      .text
        font-weight bold
        font-size 15px
      .list
        margin-top 15px
        .item
          display flex
          flex-direction row
          // margin-bottom 5px
          padding 10px 0
          line-height 23px
          border-bottom: 1px solid #eee
          .desc
            flex 1
            display flex
            flex-direction column
            justify-content space-between
            margin-left 15px
            overflow hidden
            .title
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
            .rate
              .text
                color #faaf00
    .loading-wrap
      margin-top 150px
    .layer-wrapper
      position absolute
      top: 0
      bottom 0
      width 100%
      background #fff
      .title
        padding 5px 10px
        height 20px
        line-height 20px
        font-size 15px
        font-weight bold
        .icon-down
          float right
      .desc
        position absolute
        top 30px
        bottom 0
        left 0
        right 0
        padding 0 10px
        overflow scroll
        .descript
          margin 10px 0
          font-size 13px
          border-bottom 1px solid #eee
          .item
            display flex
            margin-bottom 10px
            line-height 20px
            .name
              margin-right 8px
              white-space nowrap
        .casts
          font-size 0
          white-space nowrap
          overflow-x scroll
          border-bottom 1px solid #eee
          .cast
            width 70px
            margin-bottom 10px
            overflow hidden
            display inline-block
            font-size 13px
            text-align center
            .img
              width 60px
            .name
              overflow hidden
              margin-top 10px
              text-overflow ellipsis
        .summary
          .title
            font-size 14px
            font-weight bold
            margin 15px 0
            padding 0
          .text
            font-size 12px
            line-height 20px
.layer-enter-active, .layer-leave-active
    transition all .3s
.layer-enter, .layer-leave-to
  transform translateY(100%)
.fade-leave-active
  transition all .5s
.fade-leave-to
  transform translateX(100%)
</style>

