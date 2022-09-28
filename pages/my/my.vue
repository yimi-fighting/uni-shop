<template>
  <view>
    <my-userinfo v-if="token"></my-userinfo>
    <my-login v-else></my-login>
  </view>
</template>

<script>
  // 导入自己封装的 mixin 模块
  import badgeMix from '@/mixins/tabbar-badge.js'
  import {mapState} from 'vuex'
  export default {
    // 将 badgeMix 混入到当前的页面中进行使用
    mixins: [badgeMix],
    data() {
      return {
        
      };
    },
    computed:{
      ...mapState('m_user',['token'])
    }
  }
</script>

<style lang="scss">

</style>
