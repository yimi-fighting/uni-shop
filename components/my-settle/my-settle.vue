<template>
  <view>
    <view class="my-settle-container">
      <!-- 左侧的全选区域 -->
      <view class="left" @click="clickCheck">
        <radio value="" :checked="isFullCheck" color="#c00000"/>
        全选
      </view>
      <!-- 中间的合计区域 -->
      <view class="middle">
        <view class="middle-text">
          合计:<text class="amount">￥{{checkedPrice|toFixed}}</text>
        </view>
      </view>
      <!-- 右侧的结算按钮 -->
      <view class="right">
        结算({{checkedCount}})
      </view>
    </view>
  </view>
</template>

<script>
  import { mapGetters,mapMutations } from "vuex"
  export default {
    name:"my-settle",
    data() {
      return {
        
      };
    },
    computed:{
      ...mapGetters('m_cart',['checkedCount','total','checkedPrice']),
      // 动态渲染全选按钮的选中状态
      isFullCheck(){
        return this.total===this.checkedCount
      }
    },
    methods:{
      ...mapMutations('m_cart',['updateAllGoodsState']),
      clickCheck(){
        this.updateAllGoodsState(!this.isFullCheck)
      }
    },
    filters:{
      toFixed(num){
        return Number(num).toFixed(2)
      }
    },
    
  }
</script>

<style lang="scss">
.my-settle-container{
  position:fixed;
  bottom: 0;
  left:0;
  width: 100%;
  height:50px;
  z-index: 999;
  background-color: aliceblue;
  display: flex;
  justify-content: space-between;
  line-height: 50px;
  .left{
    margin-left: 10rpx;
  }
  .middle{
    text{
      color: #c00000;
      font-weight: 600;
    }
  }
  .right{
    width: 100px;
    background-color: #c00000;
    text-align: center;
    color: white;
  }
}
</style>