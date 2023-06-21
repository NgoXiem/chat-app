import { defineStore } from 'pinia'
import { apis } from '@/apis/api'

interface State {
    messages: Message[]
}

interface Message {
    fromSelf: boolean,
    message: string
}

export const useMessageStore = defineStore('users', {
  state: (): State => ({
    messages: []
  }),

  actions: {

  }
})
