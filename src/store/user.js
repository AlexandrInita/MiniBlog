export default {
  namespaced: true,

  state: {
    userId: 1,
    username: 'admin'
  },

  getters: {
    userId: state => state.userId,
    username: state => state.username
  },

  mutations: {
  },

  actions: {
  }
}