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
  // 从 vuex 中按需导出 mapState 辅助方法
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
  export default {
    computed: {
      // 调用 mapState 方法，把 m_cart 模块中的 cart 数组映射到当前页面中，作为计算属性来使用
      // ...mapState('模块的名称', ['要映射的数据名称1', '要映射的数据名称2'])
      // ...mapState('m_cart',[])
      // ...mapGetters计算属性
      ...mapGetters('m_cart', ['total'])
    },
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
          info: 0
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
      // 把 m_cart 模块中的 addToCart 方法映射到当前页面使用
      ...mapMutations('m_cart', ['addToCart']),
      // 获取商品的信息
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
      // 调用previewImage方法预览图片
      preview(i) {
        uni.previewImage({
          current: i,
          urls: this.goods_info.pics.map(x => x.pics_big)
        })
      },
      // 点击商品导航栏的左边按钮
      onClick(e) {
        // 点击购物车跳转页面
        if (e.content.text === '购物车') {
          console.log(111);
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      // 点击商品导航栏的右边按钮
      buttonClick(e) {
        //点击了加入购物车按钮
        if (e.content.text === '加入购物车') {
          // 2. 组织一个商品的信息对象
          const goods = {
            goods_id: this.goods_info.goods_id, // 商品的Id
            goods_name: this.goods_info.goods_name, // 商品的名称
            goods_price: this.goods_info.goods_price, // 商品的价格
            goods_count: 1, // 商品的数量
            goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
            goods_state: true // 商品的勾选状态
          }

          // 3. 通过 this 调用映射过来的 addToCart 方法，把商品信息对象存储到购物车中
          this.addToCart(goods)
        }
      }
    },
    // 监听事件
    watch: {
      // 监听total的数据的改变
      total: {
        handler(newVal) {
          // 修改购物车的徽标
          // 遍历data中的options属性，将其中购物车的info改为指定数值
          var findReault = this.options.find(x => x.text === '购物车')
          if (findReault) {
            findReault.info = newVal
          }
        },
        // 页面初次加载完毕后立即调用
        immediate:true
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
