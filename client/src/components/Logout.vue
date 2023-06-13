<template>
    <button class="logout__button" @click="logout">
        Logout
    </button>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/users"

const store = useUserStore()

const logout = () => {
    store.logout()
}
</script>
<style lang="scss" scoped>

.logout__button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #9a86f3;
    border: none;
    cursor: pointer;
    svg {
        font-size: 1.3rem;
        color: #ebe7ff;
    }
}

</style>