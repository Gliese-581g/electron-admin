import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      accessToken: ''
    }
  },
  getters: {
    isAuth: (state) => Boolean(state.accessToken)
  },
  actions: {
    setToken(token) {
      this.accessToken = token
    },
    getToken() {
      return this.accessToken
    },
    removeToken() {
      this.accessToken = ''
    }
  },
  persist: true
})
