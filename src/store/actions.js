export default {
  addCart({state, commit} , payload){
    return new Promise((resolve, reject) => {

  // state.cartList.push(payload)
  let oldProduct = state.cartList.find(item => item.iid === payload.iid)
  if (oldProduct){
    // oldProduct.count += 1
    commit('addCounter', oldProduct)
    resolve('当前商品数量加一')
  }else{
    payload.count = 1
    payload.check = true

    // state.cartList.push(payload)
    commit('addToCart', payload)
    resolve('添加了新的商品')

  }
    })
}
}