<template>
  <view>
    <!-- 首页的轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?good_id='+item.goods_id">
          <!-- 动态绑定图片的 src 属性 -->
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item,index) of navList" :key="index" @click="onClickNavItem(item)">
        <image :src="item.image_src" mode=""></image>
      </view>
    </view>
    <!-- 楼层区域-->
    <view class="floor-list">
      <view class="floor-item" v-for="(item,index) in floorList" :key="index">
        <image :src="item.floor_title.image_src" mode="" class="title-image"></image>
       <view class="box">
         <!-- 左侧盒子 -->
         <navigator class="box-left" :url="item.product_list[0].url">
           <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}"
             mode="widthFix"></image>
         </navigator>
         <!-- 右侧盒子 -->
         <view class="box-right">
           <navigator class="right-image" v-for="(item2,index2) in item.product_list" :key="index2" v-if="index2!==0" :url="item2.url">
             <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
           </navigator>
         </view>
       </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 轮播图数据
        swiperList: [],
        // 分类导航区域
        navList: [],
        //楼层数据
        floorList: []
      };
    },
    onLoad() {
      // 页面加载时获取轮播图数据
      this.getSwiperList()
      // 页面加载时获取分类导航区域数据
      this.getNavList()
      // 获取楼层数据
      this.getFloorList()
    },
    methods: {
      async getSwiperList() {
        // 发送请求
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata')
        if (res.meta.status !== 200) {
          // 说明请求失败
          uni.$showMsg()
        }
        // 否则请求成功，修改data中的swiperList
        this.swiperList = res.message
      },
      async getNavList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status != 200) uni.$showMsg()
        // 请求成功之后，修改navlist
        this.navList = res.message
      },
      // nav-item被点击是的处理函数
      onClickNavItem(item) {
        switch (item.name) {
          case '分类':
            wx.switchTab({
              url: '/pages/cate/cate'
            })
            break;
          default:
            break;
        }
      },
      //获取楼层数据
      async getFloorList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status != 200) uni.$showMsg()
        // 对message中的url进行修改，修改为自定义的url
        res.message.forEach(floorList=>{
          floorList.product_list.forEach(item=>{
            item.url='/subpkg/goods_list/goods_list?'+item.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message
      }
    }
  }
</script>

<style lang="scss">
  // 轮播图
  swiper {

    height: 300rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  // 分类导航
  .nav-list {
    display: flex;
    justify-content: space-around;
    margin-top: 20rpx;

    .nav-item image {
      width: 150rpx;
      height: 150rpx;
    }
  }

  // 楼层区域
  .floor-list {
    margin-top: 20rpx;

    .floor-item {
      .title-image {
        height: 60rpx;
        width: 100%;
      }
      .box{
        display: flex;
        .box-right{
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
      }
    }
  }
</style>
