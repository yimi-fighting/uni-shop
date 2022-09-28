export default {
  namespaced: true,
  state: () => ({
    // 存放地址
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    // 存放登入后的字符串
    token: uni.getStorageSync('token') || 'token',
    // 存放用户的信息
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    // 重定向的 object 对象 { openType, from }
    redirectInfo: null
  }),
  mutations: {
    // 更新收货地址
    updateAddress(state, address) {
      state.address = address
      this.commit('m_user/saveAddressToStorage')
    },
    // 持久化存储address
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    // 持久化保存user info
    saveUserinfoToStorage(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
    },
    // 修改state中的user info
    updateUserinfo(state, userinfo) {
      state.userinfo = userinfo
      this.commit('m_user/saveUserinfoToStorage')
    },
    // 更新token字符串
    updateToken(state, token) {
      state.token = token
    },
    // 持久化存储token
    saveTokenToStorage(state) {
      uni.setStorageSync('token', JSON.stringify(state.token))
    },
    // 更新重定向的信息对象
    updateRedirectInfo(state, info) {
      state.redirectInfo = info
    },
  },
  // 数据包装器
  getters: {
    // 收货详细地址的计算属性
    addstr(state) {
      if (!state.address.provinceName) return;

      // 拼接 省，市，区，详细地址 的字符串并返回给用户
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    },
  },
}
