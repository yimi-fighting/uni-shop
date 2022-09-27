export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的state数据
  state: () => ({
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    // 读取持久化存储的内容
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),

  // 模块的mutations方法
  mutations: {
    // 将商品信息添加到购物车
    addToCart(state, goods) {
      // 判断cart中是否存在该商品
      const findCart = state.cart.find((x) => x.goods_id === goods.goods_id)
      console.log(findCart);
      if (!findCart) {
        // cart中不存在该商品
        state.cart.push(goods)
      } else {
        // cart中存在该商品，商品数量加1
        findCart.goods_count++
      }
      // 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
      this.commit('m_cart/saveToStorge')
    },
    // 持久化存储
    saveToStorge(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    // 修改购物车中商品的勾选状态
    updateGoodsState(state,goods){
      let findGoods=state.cart.find(x => x.goods_id === goods.goods_id)
      if(findGoods){
        findGoods.goods_state=goods.goods_state
        // 持久化存储
        this.commit('m_cart/saveToStorge')
      }
    },
    // 修改cart中数据的goods——count属性
    updateGoodsCount(state,goods){
      let findGoods=state.cart.find(x=>x.goods_id===goods.goods_id)
      if(findGoods){
        findGoods.goods_count=goods.goods_count
        this.commit('m_cart/saveToStorge')
      }
    },
    // 删除cart中的数据
    deleteGoods(state,goods){
      state.cart=state.cart.filter(x=>x.goods_id!==goods.goods_id)
      this.commit('m_cart/saveToStorge')
    }
  },

  // 模块的getters属性
  getters: {
    // 计算购物车中一共有多少商品，作为计算属性返回
    total(state) {
      let c = 0
      // 循环统计商品的数量，累加到变量 c 中
      state.cart.forEach(goods => c += goods.goods_count)
      return c
    }
  },

}
