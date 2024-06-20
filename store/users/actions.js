export default {
  login({ commit }, data) {
    return this.$axios
      .$post('api/login/user', data)
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  listProducts({ commit }, data) {
    return this.$axios
      .$get('api/filter/listProduct')
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  allAmountSell({ commit }, data) {
    return this.$axios
      .$get('api/filter/allAmountSell')
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  allBill({ commit }, data) {
    return this.$axios
      .$get('api/filter/allBill')
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  listAdmin({ commit }, data) {
    return this.$axios
      .$get('api/filter/listAdmin')
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  sumLimit({ commit }, data) {
    return this.$axios
      .$get('api/filter/sumLimit')
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },

  minusProduct({ commit }, data) {
    return this.$axios
      .$post('api/filter/minusProduct', data)
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  plusProduct({ commit }, data) {
    return this.$axios
      .$post('api/filter/plusProduct', data)
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  slipCheck({ commit }, data) {
    return this.$axios
      .$post('api/filter/slipCheck', data)
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  confirmPayment({ commit }, data) {
    return this.$axios
      .$post('api/filter/confirmPayment', data)
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
}
