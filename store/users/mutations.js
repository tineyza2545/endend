export default {
    SET_LOGIN(state, payload) {
        state.login = payload
    },
    SET_TOKEN(state, payload) {
        state.token = payload
    },
    SET_LOADER(state, payload) {
        state.loading = payload
    }
}