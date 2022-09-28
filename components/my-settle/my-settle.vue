<template>
  <view>
    <view class="my-settle-container">
      <!-- 左侧的全选区域 -->
      <view class="left" @click="clickCheck">
        <radio value="" :checked="isFullCheck" color="#c00000" />
        全选
      </view>
      <!-- 中间的合计区域 -->
      <view class="middle">
        <view class="middle-text">
          合计:<text class="amount">￥{{checkedPrice|toFixed}}</text>
        </view>
      </view>
      <!-- 右侧的结算按钮 -->
      <view class="right" @click="settlement">
        结算({{checkedCount}})
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapMutations,
    mapState
  } from "vuex"
  export default {
    name: "my-settle",
    data() {
      return {
        // 设置倒计时秒数
        seconds: 3,
        // 设置定时器
        timer: null
      };
    },
    computed: {
      ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedPrice']),
      ...mapGetters('m_user', ['addstr']),
      ...mapState('m_user', ['token']),
      // 动态渲染全选按钮的选中状态
      isFullCheck() {
        return this.total === this.checkedCount
      }
    },
    methods: {
      ...mapMutations('m_cart', ['updateAllGoodsState']),
      ...mapMutations('m_user',['updateRedirectInfo']),
      clickCheck() {
        this.updateAllGoodsState(!this.isFullCheck)
      },
      // 点击结算按钮
      settlement() {
        if (!this.checkedCount) return uni.$showMsg('请勾选商品')
        // if (!this.addstr) return uni.$showMsg('请选择地址')
        // if (!this.token) return uni.$showMsg('请先登录')
        if (!this.token) return this.delayNavigate()

        // 无以上三种情况时

      },
      // 延迟导航到 my 页面
      delayNavigate() {
        // 把 data 中的秒数重置成 3 秒
        this.seconds = 3
        this.showTips(this.seconds)

        this.timer = setInterval(() => {
          this.seconds--

          if (this.seconds <= 0) {
            // 清除定时器
            clearInterval(this.timer)
            // 跳转到 my 页面
            uni.switchTab({
              url: '/pages/my/my',
              // 页面跳转成功之后的回调函数
              success: () => {
                // 调用 vuex 的 updateRedirectInfo 方法，把跳转信息存储到 Store 中
                this.updateRedirectInfo({
                  // 跳转的方式
                  openType: 'switchTab',
                  // 从哪个页面跳转过去的
                  from: '/pages/cart/cart'
                })
              }
            })

            return
          }

          this.showTips(this.seconds)
        }, 1000)
      },
      // 展示倒计时的提示消息
      showTips(n) {
        // 调用 uni.showToast() 方法，展示提示消息
        uni.showToast({
          // 不展示任何图标
          icon: 'none',
          // 提示的消息
          title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
          // 为页面添加透明遮罩，防止点击穿透
          mask: true,
          // 1.5 秒后自动消失
          duration: 1500
        })
      }
    },
    filters: {
      toFixed(num) {
        return Number(num).toFixed(2)
      }
    },

  }
</script>

<style lang="scss">
  .my-settle-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    z-index: 999;
    background-color: aliceblue;
    display: flex;
    justify-content: space-between;
    line-height: 50px;

    .left {
      margin-left: 10rpx;
    }

    .middle {
      text {
        color: #c00000;
        font-weight: 600;
      }
    }

    .right {
      width: 100px;
      background-color: #c00000;
      text-align: center;
      color: white;
    }
  }
</style>
