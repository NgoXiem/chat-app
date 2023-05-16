<template>
    <div class="chat__container">
        <div class="container">
            <Contacts :contacts="contacts" :changeChat="handleChatChange" />
            <Welcome v-if="!currentChat"/>
            <ChatContainer v-else :currentChat="currentChat" :socket="socket" />
        </div>
      </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';

import Contacts from '@/components/Contacts.vue';
import Welcome from '@/components/Welcome.vue';
import ChatContainer from '@/components/ChatContainer.vue';

const contacts = ref([]);
const currentChat = ref(undefined);
const socket = ref(undefined)

const handleChatChange = () => {

}

</script>

<style lang="scss" scoped>
.chat__container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
}

</style>