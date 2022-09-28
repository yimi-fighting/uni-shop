import {
  mapGetters
} from 'vuex'

export default {
  computed: {
    // 映射store中的total，将其设为计算属性
    ...mapGetters('m_cart', ['total', 'checkedCount'])
  },
  onShow() {
    // 在页面刚展示的时候显示徽标
    if (this.checkedCount !== 0) {
      uni.setTabBarBadge({
        index: 2,
        text: this.checkedCount + '', // 注意：text 的值必须是字符串，不能是数字
        // text: this.total + '', // 注意：text 的值必须是字符串，不能是数字
      })
    } else {
      uni.removeTabBarBadge({
        index: 2,
        text: '',
      })
    }
  },
  methods: {},
  watch: {
    checkedCount(newVal) {
      if (newVal !== 0) {
        uni.setTabBarBadge({
          index: 2,
          text: newVal + '', // 注意：text 的值必须是字符串，不能是数字
          // text: this.total + '', // 注意：text 的值必须是字符串，不能是数字
        })
      } else {
        uni.removeTabBarBadge({
          index: 2,
          text: '',
        })
      }
    },
  }
}
