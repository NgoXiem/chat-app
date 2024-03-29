import { defineStore } from 'pinia'
import { apis } from '@/apis/api'

interface State {
    messages: Message[]
}

export interface Message {
    message: string,
    sender: string,
    to: string,
    created_at: string
}

export const useMessageStore = defineStore('messages', {
  state: (): State => ({
    messages: []
  }),

  actions: {
    async createNewMessage(message: Message) {
      const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
      await apis.createNewMessage(message, token)
    },

    async fetchMessages(from:string, to:string) {
      const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
      const { data } = await apis.fetchMessages(from, to, token)
      if(data) {
        this.messages = data
      }
    },

    setMessages(messages: Message[]) {
      this.messages = messages
    }
  }
})
