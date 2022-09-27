<template>
  <view>
    <view class="goods-item">
      <!-- 左侧的勾选区域 -->
      <view class="left-radio">
        <radio value="" :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler" />
      </view>
      <!-- 左侧图片区域 -->
      <view class="goods-left-image">
        <image :src="goods.goods_small_logo||defaultPic"></image>
      </view>
      <!-- 右侧内容价格区域 -->
      <view class="goods-right-content">
        <!-- 内容区域 -->
        <view class="goods-name">
          <text>{{goods.goods_name}}</text>
        </view>
        <!-- 价格,商品数量区域 -->
        <view class="goods-price">
          <!-- 通过管道符调用过滤器 -->
          <text>￥{{goods.goods_price|tofixed}}</text>
          <!-- 商品数量 -->
          <uni-number-box v-if="showNum" :min="1" :value="goods.goods_count" @change="numberChangeHandler"/>
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
      // 是否展示左侧的按钮
      showRadio: {
        type: Boolean,
        // 如果外界不展示show-radio属性，默认不显示按钮
        default: false
      },
      // 是否展示数量按钮
      showNum:{
        type:Boolean,
        // 如果外界不展示show-num属性，默认不展示按钮
        default:false
      }
    },
    data() {
      return {
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      };
    },
    filters: {
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    },
    methods: {
      radioClickHandler() {
        // console.log(1111);
        // 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
        // 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
        this.$emit('radio-change', {
          // 商品的 Id
          goods_id: this.goods.goods_id,
          // 商品最新的勾选状态
          goods_state: !this.goods.goods_state
        })
      },
      numberChangeHandler(val){
        this.$emit('num-change',{
          // 商品的 Id
          goods_id: this.goods.goods_id,
          // 商品的数量
          goods_count:+val
        })
      },
    }

  }
</script>

<style lang="scss">
  .goods-item {
    height: 200rpx;
    width: 100%;
    display: flex;
    box-shadow: 0 2px 5px #e6e6e6;

    .left-radio {
      line-height: 200rpx;
      margin: 0 10rpx;
    }

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
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>
