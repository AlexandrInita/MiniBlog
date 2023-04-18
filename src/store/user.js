import { User } from "../models";

export default {
  namespaced: true,

  state: {
    user: new User()
  },

  getters: {
    userId: state => state.user.userId,
    userName: state => state.user.userName,
    roles: state => state.user.roles,

    isAdmin: state => state.user.roles.includes('Админ'), 
    isModerator: state => state.user.roles.includes('Модератор'),
    isReader: state => state.user.roles.includes('Читатель')
  },

  mutations: {
    setUser(state, data) {
      state.user = User.generateUser(data)
    }
  },

  actions: {
  }
}