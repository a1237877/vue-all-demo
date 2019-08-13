<template>
  <div class="scroll">
    <slot></slot>
  </div>
</template>

<script>
import BSscroll from 'better-scroll'
export default {
  props:{
    data:{
      type:Array|Object,
      default:null
    },
    pullUpLoad:{
      type:Boolean|Object,
      default:false
    }
  },
  methods: {
     _initScroll() {  //初始化
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          click: true,
          bounce:false,
          pullUpLoad:this.pullUpLoad
        })
        if(this.pullUpLoad){
          this.initPullUpLoad()
        }
    },
    initPullUpLoad(){   //上拉刷新
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullup')
      })
    },
    refresh(){  //页面卡住的时候重新加载一下
      this.scroll && this.scroll.refresh()
    },
    // 什么时候执行refresh
    forceUpdata(){
      if(this.pullUpLoad){
        this.scroll.finishPullUp()  //自带方法 每次上拉之前结束掉上拉事件
        this.refresh()
      }
    }
  },
  mounted() {
    setTimeout(() => {  //为了异步执行 先让组件加载  再加上效果
        this._initScroll()
      }, 20)
  },
  watch: {
    data(newVal,oldVal){
      setTimeout(()=>{
        this.forceUpdata()
      },20)
    }
  },
}
</script>

<style>

</style>
