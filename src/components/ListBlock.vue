<template>
  <section class="list-block">
    <div class="info" @click="$emit('more')">
      <h1 class="title">{{title}}</h1> 
      <i class="iconfont icon-right"></i>
    </div>
    <!-- v-if用来判断是否有数据 -->
    <div class="list" v-if="movies.length">   
      <!-- 点击电影去到相应的页面 用item.id来标识 -->
      <div class="item" v-for="item in movies" :key="item._id" @click="$emit('select',item._id)">
        <div class="image">
          <img v-lazy="item.poster" alt="" width="100%" height="100%">
          <!-- 正在上映的电影有评分 -->
          <em v-if="item.isPlay===1" class="rate">
            {{item.rate}}
          </em>
        </div>
        <p class="title">{{item.title}}</p>
      </div>
    </div>
    <div class="loading-wrap" v-else >
      <!-- loading组件  菊花图 -->
      <Loading></Loading>
    </div>
  </section>
</template>

<script>
export default {
  name:'ListBlock',
  props:{
    title:{
      type:String,
      required:true
    },
    movies:{
      type:Array,
      required:true
    }
  },
  data() {
    return {
      
    }
  },
}
</script>

<style lang="stylus" scoped>
.list-block
  padding 15px
  min-height 100px
  text-align center
  .info
    display flex
    justify-content space-between
    margin-bottom 15px
    font-weight bold
    font-size 20px
    .iconfont
      font-size 20px
  .list
    display flex
    justify-content space-between
    flex-wrap wrap
    .item
      width 24%
      .image
        position relative
        height: 80%;
        .rate
          position absolute
          right 5px
          bottom 2px
          color #ffb400
          font-weight bold
          font-style italic
      .title
        padding: 10px 0
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        font-size 14px
  .loading-wrap
    display flex
    align-items center
    height 200px
</style>

