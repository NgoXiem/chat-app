<template>
    <div v-if="isLoading" class="set-avatar__container">
        <img src="../assets/loader.gif" alt="loader" class="loader" />
    </div>
    <div v-else class="set-avatar__container">
        <div class="title-container">
        <h1>Pick an Avatar as your profile picture</h1>
        </div>
        <div class="avatars">
            <div v-for = "(avatar, index) in store.avatars" :key="index"
                :class="`avatar ${selectedAvatar === index ? 'selected' : ''}`"
            >
                <img
                :src="`data:image/svg+xml;base64,${avatar}`"
                alt="avatar"
                :key="avatar"
                @click="setSelectedAvatar(index)"
                />
            </div>
        </div>
        <button @click="setProfilePicture" class="submit-btn">
        Set as Profile Picture
        </button>
    </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
import {useUserStore} from "@/stores/users";
const store = useUserStore()
const isLoading = ref(false)
const selectedAvatar = ref(0)

onMounted(async() => {
    try {
        isLoading.value = true
        await store.fetchAvatars()
        isLoading.value = false
    } catch (error) {
        isLoading.value = false
        console.error(error)
    }
})

const setProfilePicture = () => {
    isLoading.value = true
    store.setProfilePicture(store.avatars[selectedAvatar.value])
}

const setSelectedAvatar = (index: number) => {
    selectedAvatar.value = index
}

</script>

<style lang="scss" scoped>
.set-avatar__container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;

    .loader {
        max-inline-size: 100%;
    }

    .title-container {
        h1 {
        color: white;
        }
    }
    .avatars {
        display: flex;
        gap: 2rem;

        .avatar {
        border: 0.4rem solid transparent;
        padding: 0.4rem;
        border-radius: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s ease-in-out;
        img {
            height: 6rem;
            transition: 0.5s ease-in-out;
        }
        }
        .selected {
        border: 0.4rem solid #4e0eff;
        }
    }
    .submit-btn {
        background-color: #4e0eff;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        &:hover {
        background-color: #4e0eff;
        }
    }
}
</style>