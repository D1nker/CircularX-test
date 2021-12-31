import { defineStore, acceptHMRUpdate } from 'pinia'
import { UserRepository } from '../repositories'

/**
 * Simulate a login
 * @param {string} a
 * @param {string} p
 */
function apiLogin(a, p) {
  if (a === 'ed' && p === 'ed') return Promise.resolve({ isAdmin: true })
  if (p === 'ed') return Promise.resolve({ isAdmin: false })
  return Promise.reject(new Error('invalid credentials'))
}

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    name: 'Q',
    isAdmin: true,
  }),
  actions: {
    logout() {
      this.$patch({
        name: '',
        isAdmin: false,
      })
      // we could do other stuff like redirecting the user
    },
    async create() {
      const response = (await UserRepository.create()).data;
      const { firstName, lastName, email, password } = response;
      this.$patch({
        firstName,
        lastName,
        email,
        password
      })
    },
    async login(user, password) {
      const userData = await apiLogin(user, password)
      this.$patch({
        name: user,
        ...userData,
      })
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
