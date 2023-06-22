import { defineStore } from 'pinia'
import { apis } from '@/apis/api'

interface State {
    messages: Message[]
}

interface Message {
    fromSelf: boolean,
    message: string,
    to: string,
    created_at: string
}

export const useMessageStore = defineStore('users', {
  state: (): State => ({
    messages: []
  }),

  actions: {
    async createNewMessage (message: Message) {
      const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
      await apis.createNewMessage(message, token)
    }
  }
})
