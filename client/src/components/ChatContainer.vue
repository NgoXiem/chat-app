<template>
    <div class="chat__container" v-if="userStore?.currentChat">
      <div class="chat-header">
        <div class="user-details">
          <div class="avatar">
            <img
              :src="`data:image/svg+xml;base64,${userStore?.currentChat?.avatar}`"
              alt="image"
            />
          </div>
          <div class="username">
            <h3>{{userStore?.currentChat?.user_name}}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div class="chat-messages">
        <div ref="scrollTarget" v-for="message in messageStore.messages">
          <div
            :class="`message ${message.fromSelf ? 'sended' : 'received'}`"
          >
            <div class="content">
              <p>{{message.message}}</p>
            </div>
          </div>
        </div>
      </div>
      <ChatInput />
    </div>
</template>

<script setup lang="ts">
import ChatInput from './ChatInput.vue';
import Logout from './Logout.vue';
import {useUserStore} from "@/stores/users";
import {useMessageStore} from "@/stores/messages";
import {socket} from "@/socket";
import {ref, onMounted} from "vue";
import type {Message} from "@/stores/messages";
import {watchEffect} from "vue";
import { watch } from 'vue';
import { computed } from 'vue';


const userStore = useUserStore()
const messageStore = useMessageStore()

const scrollTarget = ref(null);


watchEffect(() => {
  if (messageStore.messages && scrollTarget.value) {
    const target = scrollTarget.value[messageStore.messages.length - 1];
    target?.scrollIntoView({ behavior: 'smooth' });
  }
});


onMounted(() => {
  socket.on('receive_message', async (message: Message) => {
    if(message['to'] == userStore.user_info._id) {
      messageStore.setMessages([...messageStore.messages, {...message, fromSelf: false} ] )
    }
  })
})

</script>


<style lang="scss" scoped>
.chat__container {
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
}

</style>