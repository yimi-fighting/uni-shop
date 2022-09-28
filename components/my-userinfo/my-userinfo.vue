<template>
  <view>
    <view class="top">
      <view class="avatar">
        <uni-icons type="person-filled" size="100"></uni-icons>
      </view>
    </view>
    <view class="bottom">
      <!-- 第一个模块 -->
      <view class="first">
        <view class="collection-shop">
          <view>8</view>
          <view>收藏的店铺</view>
        </view>
        <view class="collection-goods">
          <view>14</view>
          <view>收藏的商品</view>
        </view>
        <view class="attention-goods">
          <view>18</view>
          <view>关注的商品</view>
        </view>
        <view class="foots">
          <view>84</view>
          <view>足迹</view>
        </view>
      </view>
      <!-- 第二个模块 -->
      <view class="second">
        <view class="second-title">
          我的订单
        </view>
        <view class="second-content">
          <view class="to-be-paid">
            <image src="../../static/my-icons/icon1.png" mode=""></image>
            <view>待付款</view>
          </view>
          <view class="to-be-received">
          <image src="../../static/my-icons/icon2.png" mode=""></image>
          <view>待收货</view>
          </view>
          <view class="return">
            <image src="../../static/my-icons/icon3.png" mode=""></image>
            <view>退款/退货</view>
          </view>
          <view class="all-goods">
            <image src="../../static/my-icons/icon4.png" mode=""></image>
            <view>全部订单</view>
          </view>
        </view>
      </view>
   <!-- 第三个模块 -->
   <view class="third">
     <view class="address">
       <view class="address-text">
         收货地址
       </view>
       <uni-icons type="forward" size="20"></uni-icons>
     </view>
     <view class="customer">
       <view class="customer-text">
         联系客服也
       </view>
       <uni-icons type="forward" size="20"></uni-icons>
     </view>
     <view class="quit" @click="logout">
       <view class="quit-text">
         退出登录
       </view>
       <uni-icons type="forward" size="20"></uni-icons>
     </view>
   </view>
   
    </view>
  </view>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    name: "my-userinfo",
    data() {
      return {

      };
    },
    methods:{
      ...mapMutations('m_user',['updateAddress','updateUserinfo','updateToken']),
      // 点击退出按钮
      async logout(){
        const [err,res]= await uni.showModal({
          title:'提示',
          content:'确定要退出吗?'
        }).catch(err=>err)
        
        if(res){
          this.updateAddress({})
          this.updateToken('')
          this.updateUserinfo({})
        }
      },
      
    }
  }
</script>

<style lang="scss">
  .top {
    position: relative;
    height: 200px;
    background-color: #c00000;
    width: 100%;

    .avatar {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100px;
      height: 100px;
      background-color: white;
      display: block;
      border-radius: 50px;
    }
  }

  .bottom {
    background-color: #f3f3f3;
    position: relative;

    .first {
      position: absolute;
      left: 10px;
      top: -20px;
      right: 10px;
      display: flex;
      padding: 10px 0;
      justify-content: space-around;
      background-color: #fcfefe;
      border-radius: 5px;
      box-shadow: 0 5px 5px #e6e6e6;

      .collection-shop,
      .collection-goods,
      .attention-goods,
      .foots {
        text-align: center;
      }
    }
 
    .second{
      position: absolute;
      top:50px;
      left: 10px;
      right:10px;
      padding-bottom: 10px;
      border-radius: 5px;
      box-shadow: 0 5px 5px #e6e6e6;
      background-color: white;
      display: flex;
      flex-direction: column;
      
      .second-title{
        padding: 10px;
      }
      
      .second-content{
        display: flex;
        justify-content: space-around;
        image{
          width: 50px;
          height: 50px;
        }
      }
    }
  
    .third{
      position: absolute;
      top:185px;
      left: 10px;
      right: 10px;
      background-color: white;
      border-radius: 5px;
      box-shadow: 0 5px 5px #e6e6e6;
      .address,.customer,.quit{
        display: flex;
        justify-content: space-between;
        margin-left: 10px;
        height: 40px;
        line-height: 40px;
        border-bottom: 1rpx solid #e6e6e6;
      }
    }
  }
</style>
