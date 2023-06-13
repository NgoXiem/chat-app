<template>
    <div class="welcome__container">
      <img src="../assets/robot.gif" alt="" />
      <h2>Welcome, <span>{{store?.user_info?.user_name}}</span> !</h2>
      <h3>Please select a chat to start messaging.</h3>
    </div>
</template>

<script setup lang="ts" scoped>
import {useUserStore} from "@/stores/users";

const store = useUserStore()

</script>

<style lang="scss">
.welcome__container {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction: column;
    h3 {
      text-align: center;
    }
    img {
    height: 20rem;
    }
    span {
    color: #4e0eff;
    }
}
</style>