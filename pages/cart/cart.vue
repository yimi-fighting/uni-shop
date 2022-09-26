<template>
  <view>
    cart
  </view>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        
      };
    },
    computed:{
      ...mapGetters('m_cart',['total'])
    },
    onShow(){
      // 在页面刚显示时，设置图标
      this.setBadge()
    },
    methods:{
      setBadge(){
         // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
         uni.setTabBarBadge({
           index:2,
           // text一定得是字符串
           text:this.total+''
         })
      }
    }
  }
</script>

<style lang="scss">

</style>
