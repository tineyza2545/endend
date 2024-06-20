export default {
  checkAuth() {
    return localStorage.getItem('token')
  },

  addProduct({ commit }, data) {
    return this.$axios
      .$post('api/admin/addProduct', data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  updateProduct({ commit }, data) {
    return this.$axios
      .$post('api/admin/updateProduct', data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  getDataPrint({ commit }, data) {
    return this.$axios
      .$post('api/filter/getDataPrint', data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
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
  sumpriceb({ commit }, data) {
    return this.$axios
      .$get('api/filter/sumpriceb')
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  sumForChart({ commit }, data) {
    return this.$axios
      .$get('api/filter/sumForChart')
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  selectBillConfirm({ commit }, data) {
    return this.$axios
      .$get('api/filter/selectBillConfirm')
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  deleteProduct({ commit }, data) {
    return this.$axios
      .$post('api/filter/deleteProduct', data)
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  deleteAdmin({ commit }, data) {
    return this.$axios
      .$post('api/filter/deleteAdmin', data)
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  addAdmin({ commit }, data) {
    return this.$axios
      .$post('api/filter/addAdmin', data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
  udBill({ commit }, data) {
    return this.$axios
      .$post('api/filter/udBill', data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  },
}
