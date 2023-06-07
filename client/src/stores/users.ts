import { defineStore } from 'pinia'
import { apis } from '@/apis/api'
import { useRouter } from 'vue-router'

interface State {
  token: string | null
  isLogedIn: boolean
  user_info: UserInfo | null
  error_login: string | null
}

interface UserInfo {
  id: number
  user_name: string
  email: string
  disabled: boolean, 
  avatar: string | null
}

const router = useRouter()

export const useUserStore = defineStore('users', {
  state: (): State => ({
    token: null,
    isLogedIn: false,
    user_info: null,
    error_login: null
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
        console.log(data)
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
      const { data } = await apis.register(user_name, email, password, confirm)
      console.log(data)
    },

    async getUserInfo() {
      const { data } = await apis.getUserInfo(this.token)
      this.user_info = data
    },

    redirect() {
      if(this.user_info?.avatar === null) {
        router.push({name: 'setAvatar'})
      } else {  
        router.push({name: 'chat'})
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
