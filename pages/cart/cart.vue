<template>
  <view>
    <view class="container" v-if="cart.length!=0">
      <!-- 地址区域 -->
      <my-address class="address"></my-address>
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
          <uni-swipe-action-item :auto-close="autoClose" :right-options="options" @click="swipeActionClickHandler(goods)">
            <!-- 在 radioChangeHandler 事件处理函数中，通过事件对象 e，得到商品的 goods_id 和 goods_state -->
            <my-goods :goods="goods" :show-radio="true" @radio-change="radioChangeHandler" :show-num="true"
              @num-change="numChangeHandler"></my-goods>
          </uni-swipe-action-item>
        </block>
      </uni-swipe-action>
      <!-- 结算区域 -->
      <my-settle></my-settle>
    </view>
    <view class="empty-cart" v-else>
       <image src="../../static/c4.png" class="empty-img"></image>
       <text class="tip-text">空空如也~</text>
     </view>
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
      ...mapGetters('m_cart', ['total', 'checkedCount']),
      ...mapState('m_cart', ['cart'])
    },
    onShow() {
      // 在页面刚显示时，设置图标
      this.setBadge()
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'deleteGoods']),
      // 设置购物车徽标
      setBadge() {
        // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
        if(this.checkedCount!=0){
          uni.setTabBarBadge({
            index: 2,
            // text一定得是字符串
            text: this.checkedCount + ''
          })
        }else{
          uni.removeTabBarBadge({
            index:2,
            text:'',
          })
        }
        
      },
      // 单选框的触发事件，调用update修改goodsstate
      radioChangeHandler(e) {
        this.updateGoodsState(e)
      },
      // 数字框的触发事件，调用store中的方法修改goods_count
      numChangeHandler(e) {
        this.updateGoodsCount(e)
      },
      // 滑动删除的点击事件
      swipeActionClickHandler(goods) {
        this.deleteGoods(goods)
      },
    }
  }
</script>

<style lang="scss">
  .container {
    padding-bottom: 50px;
  }

  .address-choose-box {
    height: 150rpx;

    .btn {}
  }

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
  
  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
  
    .empty-img {
      width: 90px;
      height: 90px;
    }
  
    .tip-text {
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }
</style>
