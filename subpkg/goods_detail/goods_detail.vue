<template>
  <view v-if="goods_info.goods_name" class="goods-container">
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in goods_info.pics" :key="i">
        <!-- preview方法是轮播图的预览效果 -->
        <image :src="item.pics_big" @click="preview(i)"></image>
      </swiper-item>
    </swiper>

    <!-- 商品内容 -->
    <view class="goods-content">
      <!-- 价格区域 -->
      <view class="goods-price">
        ￥{{goods_info.goods_price}}
      </view>
      <!-- 商品名称 -->
      <view class="goods-info-body">
        <view class="goods-info-left">
          {{goods_info.goods_name}}
        </view>
        <view class="goods-info-right">
          <view class="icon">
            <uni-icons type="star" size="30"></uni-icons>
          </view>
          <view class="icon-content">
            收藏
          </view>
        </view>
      </view>
      <!-- 快递免运费 -->
      <view class="fare">
        快递：免运费
      </view>
    </view>

    <!-- 商品详情信息 -->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>

    <!-- 底部商品导航 -->
    <!-- click左侧点击的响应，button处理click右侧点击响应 -->
    <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
      @buttonClick="buttonClick" class="goods-nav" />
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 商品的详细信息
        goods_info: {},
        options: [{
          icon: 'shop',
          text: '店铺',
          infoBackgroundColor: '#007aff',
          infoColor: "red"
        }, {
          icon: 'cart',
          text: '购物车',
          info: 2
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    onLoad(options) {
      // 获取传递过来的参数id
      var goods_id = options.goods_id
      // 发送请求获取id对应的商品详情
      this.getGoodsInfo(goods_id)
    },
    methods: {
      async getGoodsInfo(goods_id) {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        // 对获取的数据中的goods_introduce中的img标签进行替换
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ')
          .replace(/webp/g, 'jpg')
        this.goods_info = res.message
      },
      preview(i) {
        // 调用previewImage方法预览图片
        uni.previewImage({
          current: i,
          urls: this.goods_info.pics.map(x => x.pics_big)
        })
      },
      onClick(e){
        // 点击购物车跳转页面
        if(e.content.text==='购物车'){
          console.log(111);
          uni.switchTab({
            url:'/pages/cart/cart'
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .goods-container {
    margin-bottom: 50px;
  }

  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .goods-content {
    .goods-price {
      color: #9d0000;
      font-weight: 600;
      margin: 20rpx 10rpx;
    }

    .goods-info-body {
      margin: 20rpx;
      display: flex;

      .goods-info-left {
        font-size: 28rpx;
        margin-right: 40rpx;
      }

      .goods-info-right {
        display: flex;
        flex-direction: column;
        font-size: 24rpx;
      }


    }

    .fare {
      font-size: 24rpx;
      margin-left: 20rpx;
      margin-top: -20rpx;
      color: darkgrey;
      margin-bottom: 50rpx;
    }

  }

  .goods-nav {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
