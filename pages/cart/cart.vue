<template>
  <view>
    <!-- 标题部分 -->
    <view class="cart-title">
      <view class="cart-icon">
        <uni-icons type="shop" size="30"></uni-icons>
      </view>
      <view class="cart-title-text">
        购物车
      </view>
    </view>
    <!-- 商品列表区域 -->
    <uni-swipe-action>
      <block v-for="(goods, i) in cart" :key="i">
        <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
          <!-- 在 radioChangeHandler 事件处理函数中，通过事件对象 e，得到商品的 goods_id 和 goods_state -->
          <my-goods :goods="goods" :show-radio="true" @radio-change="radioChangeHandler" :show-num="true"
            @num-change="numChangeHandler"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapState,
    mapMutations
  } from 'vuex'
  // 导入自己封装的 mixin 模块
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
    // 将 badgeMix 混入到当前的页面中进行使用
    mixins: [badgeMix],
    data() {
      return {
        options: [{
          text: '删除', // 显示的文本内容
          style: {
            backgroundColor: '#C00000' // 按钮的背景颜色
          }
        }]
      };
    },
    computed: {
      ...mapGetters('m_cart', ['total']),
      ...mapState('m_cart', ['cart'])
    },
    onShow() {
      // 在页面刚显示时，设置图标
      this.setBadge()
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount','deleteGoods']),
      // 设置购物车徽标
      setBadge() {
        // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
        uni.setTabBarBadge({
          index: 2,
          // text一定得是字符串
          text: this.total + ''
        })
      },
      // 单选框的触发事件，调用update修改goodsstate
      radioChangeHandler(e) {
        // console.log(e);
        this.updateGoodsState(e)
      },
      // 数字框的触发事件，调用store中的方法修改goods_count
      numChangeHandler(e) {
        // console.log(e);
        this.updateGoodsCount(e)
      },
      // 滑动删除的点击事件
      swipeActionClickHandler(goods){
        // console.log(goods);
        this.deleteGoods(goods)
      },
    }
  }
</script>

<style lang="scss">
  .cart-title {
    display: flex;
    margin: 20rpx;
    font-size: 28rpx;
    font-weight: 600;

    .cart-title-text {
      margin-top: 10rpx;
      margin-left: 30rpx;
    }
  }
</style>
