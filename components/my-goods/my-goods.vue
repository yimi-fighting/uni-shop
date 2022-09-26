<template>
  <view>
    <view class="goods-item">
      <view class="goods-left-image">
        <image :src="goods.goods_small_logo||defaultPic"></image>
      </view>
      <view class="goods-right-content">
        <view class="goods-name">
          <text>{{goods.goods_name}}</text>
        </view>
        <view class="goods-price">
          <!-- 通过管道符调用过滤器 -->
          <text>￥{{goods.goods_price|tofixed}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-goods",
    // 定义 props 属性，用来接收外界传递到当前组件的数据
    props: {
      // 商品的信息对象
      goods: {
        type: Object,
        defaul: {},
      },
    },
    data() {
      return {
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      };
    },
    filters:{
      tofixed(num){
        return Number(num).toFixed(2)
      }
    }
    
  }
</script>

<style lang="scss">
  .goods-item {
    height: 200rpx;
    width: 100%;
    display: flex;
    box-shadow: 0 2px 5px #e6e6e6;

    image {
      width: 100px;
      height: 100px;
    }

    .goods-right-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin: 10rpx 20rpx;

      .goods-name {
        font-size: 13px;
      }

      .goods-price {
        color: #9a0000;
        font-weight: 600;
      }
    }
  }
</style>
