<template>
    <div class="welcome__container">
      <img src="../assets/robot.gif" alt="" />
      <h1>
        Welcome, <span>{{userName}}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </div>
</template>

<script setup lang="ts" scoped>
import {ref} from "vue";
const userName = ref("")
</script>

<style lang="scss">
.welcome__container {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction: column;
    img {
    height: 20rem;
    }
    span {
    color: #4e0eff;
    }
}
</style>