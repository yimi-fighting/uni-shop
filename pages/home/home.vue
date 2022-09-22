<template>
  <view>
    <!-- 首页的轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
          <!-- 循环渲染轮播图的 item 项 -->
          <swiper-item v-for="(item, i) in swiperList" :key="i">
            <view class="swiper-item">
              <!-- 动态绑定图片的 src 属性 -->
              <image :src="item.image_src"></image>
            </view>
          </swiper-item>
        </swiper>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList:[]
      };
    },
    onLoad() {
      this.getSwiperList()
    },
    methods:{
      async getSwiperList(){
        // 发送请求
        const {data:res}= await uni.$http.get('/api/public/v1/home/swiperdata')
        if(res.meta.status!==200){
          // 说明请求失败
          uni.showToast({
            title:'数据请求失败',
            icon:'none'
          })
        }
        // 否则请求成功，修改data中的swiperList
        this.swiperList=res.message
      }
    }
  }
</script>

<style lang="scss">
  swiper{
    height: 300rpx;
    .swiper-item,image{
      width: 100%;
      height: 100%;
    }
  }

</style>
