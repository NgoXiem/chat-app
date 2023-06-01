import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { apis } from '@/apis/api'
export const useUserStore = defineStore('users', () => {
  function login(email: string, password:string) {
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
    apis.login(email, password)
  }
  
  function register(user_name:string, email: string, password:string, confirm:string) {
    apis.register(user_name, email, password, confirm)
  }

  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { login, register }
})
