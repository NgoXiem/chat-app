<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import {useUserStore} from "@/stores/users";
import { onMounted } from 'vue'

const store = useUserStore()

onMounted(() => {
  const token = localStorage.getItem('token') ? localStorage.getItem('token') : ''
  if(token) {
    const user = store.getUserInfo(token)
    if(user) localStorage.setItem('user', JSON.stringify(user))
  }
})
</script>

<style scoped>

</style>
