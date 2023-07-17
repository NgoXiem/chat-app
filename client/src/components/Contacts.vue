<template>
       <div class="contacts__container">
          <div class="brand">
            <img src="../assets/logo.svg" alt="logo" />
            <h3>chat</h3>
          </div>
          <div class="contacts">
             <div
                v-for="contact, index in store.availableContacts"
                :key="contact.id"
                :class="`contact ${index === currentSelected ? 'selected' : ''}`"
                @click="() => changeCurrentChat(index, contact)"
                >
                  <div class="avatar">
                    <img
                      :src="`data:image/svg+xml;base64,${contact.avatar}`"
                      alt=""
                    />
                  </div>
                  <div class="username">
                    <h3>{{contact.user_name}}</h3>
                  </div>
                </div>
          </div>
          <div class="current-user">
            <div class="avatar">
              <img
                :src="`data:image/svg+xml;base64,${store.user_info?.avatar}`"
                alt="avatar"
              />
            </div>
            <div class="username">
              <h2>{{store.user_info?.user_name}}</h2>
            </div>
          </div>
        </div>
</template>
<script setup lang="ts">
import {ref} from "vue" 
import {useUserStore} from "@/stores/users";
import {useMessageStore} from "@/stores/messages";
import type { UserInfo } from "@/stores/users";
import { socket } from "@/socket";

const store = useUserStore()
const messageStore = useMessageStore()
const currentSelected = ref()
const changeCurrentChat = (index: number, contact: UserInfo) => {
  socket.emit('exit_chat', () => {
  });

  socket.emit('begin_chat', () => {
  });
  
  currentSelected.value = index
  store.setCurrentChat(contact)
  messageStore.fetchMessages(store.user_info._id, contact._id)
}

</script>


<style lang="scss">
.contacts__container {
    display: grid;
    grid-template-rows: 10% 75% 15%;
    overflow: hidden;
    background-color: #080420;
    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        img {
        height: 2rem;
        }
        h3 {
        color: white;
        text-transform: uppercase;
        }
    }
    .contacts {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: auto;
        gap: 0.8rem;
        &::-webkit-scrollbar {
        width: 0.2rem;
        &-thumb {
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
        }
        }
        .contact {
        background-color: #ffffff34;
        min-height: 5rem;
        cursor: pointer;
        width: 90%;
        border-radius: 0.2rem;
        padding: 0.4rem;
        display: flex;
        gap: 1rem;
        align-items: center;
        transition: 0.5s ease-in-out;
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
        .selected {
        background-color: #9a86f3;
        }
    }

    .current-user {
        background-color: #0d0d30;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        .avatar {
        img {
            height: 4rem;
            max-inline-size: 100%;
        }
        }
        .username {
        h2 {
            color: white;
        }
        }
        @media screen and (min-width: 720px) and (max-width: 1080px) {
        gap: 0.5rem;
        .username {
            h2 {
            font-size: 1rem;
            }
        }
        }
    }
}
</style>