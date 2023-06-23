import { defineStore } from 'pinia'
import { apis } from '@/apis/api'
import { Buffer } from "buffer";

interface State {
  token: string | null
  isLogedIn: boolean
  user_info: UserInfo | null
  error_login: string | null
  error_register: string | null
  avatars: string[],
  contacts: UserInfo[],
  currentChat: UserInfo | null
}

export interface UserInfo {
  _id: string
  user_name: string
  email: string
  disabled: boolean, 
  avatar: string | null,
}

export const useUserStore = defineStore('users', {
  state: (): State => ({
    token: null,
    isLogedIn: false,
    user_info: null,
    error_login: null,
    error_register: null,
    avatars: [], 
    contacts: [],
    currentChat: null
  }),
  
  getters: {
    availableContacts(): UserInfo[] {
      return this.contacts.filter(contact => contact.user_name !== this.user_info?.user_name)
    }
  },

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
        const user = await this.getUserInfo(data.access_token)
        localStorage.setItem('user', JSON.stringify(user))
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
        localStorage.setItem('token', data.access_token)
        this.token = data.access_token
        this.isLogedIn = true
        const user = await this.getUserInfo(data.access_token)
        localStorage.setItem('user', JSON.stringify(user))
        this.redirect()
      } catch(error) {
        this.logout()
        this.error_register = error?.message
      }
    },

    async getUserInfo(token: string) {
      try {
        this.token = localStorage.getItem('token') ? localStorage.getItem('token') : null
        const { data } = await apis.getUserInfo(token)
        this.user_info = data
        return this.user_info
      } catch(error) {
        this.logout()
      }
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
      localStorage.removeItem('user')
      this.token = null
      this.isLogedIn = false
      this.user_info = null
      this.router.push({name: 'login'})
    },

    async fetchAvatars() {
      for(let i = 0; i < 5; i++) {
        const { data } = await apis.fetchAvatars()
        const svgBase64 = Buffer.from(data).toString('base64');
        this.avatars.push(svgBase64)
      }
    },

    async setProfilePicture(avatar: string) {
      const { data } = await apis.setAvatar(avatar, this.token)
      this.user_info.avatar = data?.avatar
      localStorage.setItem('user', JSON.stringify(this.user_info))
      this.router.push({name: 'chat'})
    },

    async fetchUsers() {
      const { data } = await apis.fetchUsers(this.token)
      this.contacts = data
    },

    setCurrentChat(contact: UserInfo) {
      this.currentChat = contact
    }
  }
})
