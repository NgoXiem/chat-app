import { defineStore } from 'pinia'
import { apis } from '@/apis/api'

interface State {
  token: string | null
  isLogedIn: boolean
  user_info: UserInfo | null
  error_login: string | null
  error_register: string | null
}

interface UserInfo {
  id: number
  user_name: string
  email: string
  disabled: boolean, 
  avatar: string | null
}

export const useUserStore = defineStore('users', {
  state: (): State => ({
    token: null,
    isLogedIn: false,
    user_info: null,
    error_login: null,
    error_register: null
  }),

  actions: {
    async login(user_name: string, password:string) {
      /*
        * TODO:
        * 1. get token from api
        * 2. save token to localstorage
        * 3. save token to store
        * 4. set isLogedIn to true and store it
        * 5. get user data from api and store it
        * 6. redirect to home page
        * 7. show notification
        * 8. handle errors: save login error to store, logout and show notification
      */
     try {
      const { data } = await apis.login(user_name, password)
      if(data) {
        localStorage.setItem('token', data.access_token)
        this.token = data.access_token
        this.isLogedIn = true
        this.getUserInfo()
        this.redirect()
      } else {
        this.logout()
      }
     }     
      catch (error) {
        this.error_login = error?.message
      }
    },
  
    async register(user_name:string, email: string, password:string, confirm:string) {
      try {
        const { data } = await apis.register(user_name, email, password, confirm)
        this.user_info = data
        this.isLogedIn = true
        this.redirect()
      } catch(error) {
        this.error_register = error?.message
      }
    },

    async getUserInfo() {
      const { data } = await apis.getUserInfo()
      this.user_info = data
    },

    redirect() {
      if(this.user_info?.avatar) {
        this.router.push({name: 'chat'})
      } else {  
        this.router.push({name: 'setAvatar'})
      }
    },

    async logout() {
      localStorage.removeItem('token')
      this.token = null
      this.isLogedIn = false
      this.user_info = null
    }
  }
})
