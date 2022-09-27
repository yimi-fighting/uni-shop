import {
  mapGetters
} from 'vuex'

export default {
  computed: {
    // 映射store中的total，将其设为计算属性
    ...mapGetters('m_cart', ['total'])
  },
  onShow() {
    // 在页面刚展示的时候显示徽标
    this.setBadge()
    console.log(this.total);
  },
  methods: {
    setBadge() {
      // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
      uni.setTabBarBadge({
        index: 2,
        text: this.total + '', // 注意：text 的值必须是字符串，不能是数字
      })
    }
  }
}
