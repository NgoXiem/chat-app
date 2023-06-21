<template>
  <div class="page-chat__container">
    <div v-if="isLoading">
      <img src="../assets/loader.gif" alt="loader" class="loader" />
    </div>
    <div class="container" v-else>
      <Contacts :changeChat="handleChatChange" />
      <Welcome v-if="!store.currentChat"/>
      <ChatContainer v-else :socket="socket" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import {useUserStore} from "@/stores/users";
import Contacts from '@/components/Contacts.vue';
import Welcome from '@/components/Welcome.vue';
import ChatContainer from '@/components/ChatContainer.vue';
import { onMounted } from 'vue';

const store = useUserStore()
const socket = ref(undefined)
let isLoading = ref(false)

const handleChatChange = () => {

}

onMounted(async() => {
  isLoading.value = true
  await store.fetchUsers()
  isLoading.value = false
})

</script>

<style lang="scss" scoped>
.page-chat__container {
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