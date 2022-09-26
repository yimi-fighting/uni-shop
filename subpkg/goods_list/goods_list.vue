<template>
  <view>
    <view v-for="(item, i) in goodsList" :key="i" @click="gotoDetail(item)">
      <!-- 为 my-goods 组件动态绑定 goods 属性的值 -->
      <my-goods :goods="item"></my-goods>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj: {
          // 查询关键词
          query: '',
          // 商品分类Id
          cid: '',
          // 页码值
          pagenum: 1,
          // 每页显示多少条数据
          pagesize: 10
        },
        // 商品列表数据
        goodsList: [],
        // 商品总数
        total: 0,
        // 设置节流阀
        loading: false
      };
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      // 获取商品列表
      this.getGoodsList()
    },
    // 下拉触底事件
    onReachBottom() {
      // 频繁的触发触底事件，开启节流阀
      if (this.loading) return
      // 判断是否所有数据都已加载完成
      if(this.pagenum*this.pagesize>=this.total){
        // 数据已经加载完成
        uni.$showMsg('数据加载完毕')
        return
      }
      // 页码自增加1
      this.queryObj.pagenum = this.queryObj.pagenum++
      // 重新请求数据
      this.getGoodsList()
    },
    // 下拉刷新
    onPullDownRefresh() {
      // 重置关键数据
      this.pagenum=1
      this.total=0
      this.goodsList=[]
      this.loading=flase
      // 发送请求
      this.getGoodsList(()=>{uni.stopPullDownRefresh()})
    },
    methods: {
      async getGoodsList(cb) {
        this.loading = true
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        // 判断是否有传入cb，关闭下拉刷新的效果
        cb&&cb()
        
        if (res.meta.status != 200) return uni.$showMsg()
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
        this.loading = false
      },
      gotoDetail(goods){
        uni.navigateTo({
          url:'/subpkg/goods_detail/goods_detail?goods_id='+goods.goods_id
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
