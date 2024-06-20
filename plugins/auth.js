export default  ({ store, next, redirect, error }, inject) => {
  inject('checkAuth', () => {
    try {
      // if (!localStorage.getItem('token')) return error({ statusCode: 404, massage: 'Page not found'})
      if (!localStorage.getItem('token')) return redirect('/')
    } catch (error) {
      return error({ statusCode: 404, massage: 'Page not found'})
    }
  })
}
