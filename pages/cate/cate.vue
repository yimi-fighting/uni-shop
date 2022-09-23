<template>
  <view>
    <!-- 顶部的搜索框 -->
    <my-search></my-search>
    <view class="scroll-view-container">
      <!-- 左侧的滚动视图区域 -->
      <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
        <block v-for="(item,index) in cateList" :key="index">
          <view :class="['left-scroll-view-item',index==active?'active':'']" @click="activeChange(index)">
            {{item.cat_name}}
          </view>
        </block>
      </scroll-view>
      <!-- 右侧的滚动视图区域 -->
      <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        <view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
          <!-- 二级标题 -->
          <view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
          <!-- 二级标题对应下面的内容 -->
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="(item3,index3) in item2.children" :key="index3"
              @click="gotoGoodsList(item3)">
              <!-- 图片 -->
              <image src="/static/my-icons/icon1.png" mode=""></image>
              <!-- 文本 -->
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        wh: 0,
        // 分类列表
        cateList: [],
        // 当前选中项
        active: 0,
        // 页面右侧的数据
        cateLevel2: [],
        // 滚动条距离顶部的距离
        scrollTop: 0
      }
    },
    onLoad() {
      // 获取当前系统的信息
      const sysInfo = uni.getSystemInfoSync()
      // 为 wh 窗口可用高度动态赋值
      this.wh = sysInfo.windowHeight-50
      // 获取分类列表
      this.getCateList()
    },
    methods: {
      // 获取cate数据
      async getCateList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories')
        if (res.meta.status != 200) return uni.$showMsg()
        this.cateList = res.message
        this.cateLevel2 = res.message[0].children
      },
      // 修改当前点击的item，更改active
      activeChange(index) {
        // 修改active样式
        this.active = index
        // 修改cateLevel2的数据
        this.cateLevel2 = this.cateList[index].children
        // 切换以及分类时，更改滚动条的位置为0
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      // 跳转到good_list的详情页
      gotoGoodsList(item3) {
        uni.navigateTo({
          url: "/subpkg/goods_list/goods_list?cid=" + item3.cat_id
        })
      }
    }
  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        line-height: 60px;
        background-color: #f7f7f7;
        text-align: center;
        font-size: 12px;

        // 激活项的样式
        &.active {
          background-color: #ffffff;
          position: relative;

          // 渲染激活项左侧的红色指示边线
          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }

    .cate-lv2-title {
      margin-top: 20rpx;
      width: 100%;
      text-align: center;
      font-weight: 600;
      font-size: 30rpx;
    }

    .cate-lv3-list {
      display: flex;
      flex-wrap: wrap;
      margin-top: 40rpx;

      .cate-lv3-item {
        width: 33.33%;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;

        image {
          width: 60px;
          height: 60px;
        }

        text {
          font-size: 12px;
        }
      }
    }
  }
</style>
