<template>
  <view>
    <!-- 顶部搜索框 -->
    <view class="search-box">
      <uni-search-bar class="uni-mt-10" radius="100" cancelButton="none" @input="input" />
    </view class="search-container">
    <!-- 搜索内容渲染 -->
    <view class="search-list" v-for="(item,index) in searchList" :key="index">
      <!-- 内容 -->
      <view class="search-item" @click="gotoDetail(item.goods_id)">{{item.goods_name}}</view>
      <!-- 后面的箭头 -->
      <uni-icons type="arrowright" size="16"></uni-icons>
    </view>
    <!-- 搜索历史 -->
    <!-- 搜索历史框显示的时机 -->
    <view class="history-box" v-if="searchList.length===0&&searchHistory.length!==0">
      <!-- 标题区域 -->
      <view class="history-title" >
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="deleteHistory"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item, i) in history" :key="i" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 保存关键词
        kw: '',
        // 延时器
        timer: null,
        // 搜索结果列表
        searchList: [],
        // 搜索历史列表
        searchHistory: []
      };
    },
    onLoad() {
      // 在页面首次加载时，拿去本地存储的搜索历史记录
      this.searchHistory=JSON.parse(uni.getStorageSync('kw'||[]))
    },
    computed:{
      // 计算属性，解决历史记录的顺序问题
      history(){
        return this.searchHistory.reverse()
      }
    },
    methods: {
      input(e) {
        // TODO:实现收缩框的防抖
        // 清楚定时器
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          // 如果在0.5秒内没有处罚新的input事件，就将kw置新
          this.kw = e
          // 重新获取searchList并对页面进行更新
          this.getSearchList(this.kw)
        }, 500)
      },
      async getSearchList(kw) {
        // 发送请求获取searchList数据
        // 如果kw为空，则将searchList设置为空
        if(kw===''){
          this.searchList=[]
        }else{
          const {
            data: res
          } = await uni.$http.get('/api/public/v1/goods/qsearch', {
            query: kw
          })
          // 数据请求失败
          if (res.meta.status != 200) return uni.$showMsg()
          // 数据请求成功
          this.searchList = res.message
          // 将请求的关键词放入收缩历史列表
          this.searchHistory.push(this.kw)
          // 对searchHistory进行去重处理
          this.deleteRepeat()
        }
      },
      // 对searchHistory进行去重处理
      deleteRepeat(){
        // 去重
        var set=new Set(this.searchHistory)
        // 去除原本存在的
        set.delete(this.kw)
        // 将其放在最前面
        set.add(this.kw)
        // 将set转为array
        this.searchHistory=Array.from(set)
        // 将历史记录持久化存储到本地
        uni.setStorageSync('kw',JSON.stringify(this.searchHistory))
      },
      //清除历史记录
      deleteHistory(){
        this.searchHistory=[],
        uni.setStorageSync('kw',[])
      },
      //点击历史记录跳转到指定页面
      gotoGoodsList(item){
        uni.navigateTo({
            url: '/subpkg/goods_list/goods_list?query=' + item
          })
      },
      // 跳转到详情页面
      gotoDetail(id) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + id
        })
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    // 设置文本框的吸顶效果
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .search-list {
    display: flex;
    justify-content: space-between;
    padding: 10rpx;
    border-bottom: 1rpx solid #e6e6e6;
    margin: 0 10rpx;

    .search-item {
      font-size: 24rpx;
      height: 80rpx;
      line-height: 80rpx;
      // 文字不允许换行
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后，使用 ... 代替
      text-overflow: ellipsis;
    }

    uni-icons {
      line-height: 80rpx;
    }   
  }
  
  .history-box {
    padding: 0 5px;
  
    .history-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }
  
    .history-list {
      display: flex;
      flex-wrap: wrap;
  
      .uni-tag {
        margin-top: 5px;
        margin-right: 5px;
        background-color: #e6e6e6;
        color: black;
      }
    }
  }
</style>
