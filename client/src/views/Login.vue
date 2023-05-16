<template>
<div class="login-form__container">
  <form action="" @submit="(event) => submitForm(event)">
    <div class="brand">
      <img src="../assets/logo.svg" alt="logo" />
      <h1>Chat</h1>
    </div>
    <div class="input__wrapper">
      <input
        type="text"
        placeholder="User name"
        name="username"
        v-model="state.user_name"
      />
      <small v-if="v$.user_name.$error"
      >{{ v$.user_name.$errors[0]?.$message }}</small>
    </div>
    <div class="input__wrapper">
      <input
        type="password"
        placeholder="Password"
        name="password"
        v-model="state.password"
      />
      <small v-if="v$.password.$error"
      >{{ v$.password.$errors[0]?.$message }}</small>
    </div>
    <button type="submit">Log In</button>
    <span>
      Don't have an account ? <RouterLink to="/register">Create One.</RouterLink>
    </span>
  </form>
</div>
        
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { reactive, computed} from "vue"
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

const state = reactive({
  user_name: '',
  password: '',
})

const rules = computed(() => { return {
    user_name: { required },
    password: { required }
  }
})

const v$ = useVuelidate(rules, state)

const submitForm = async (e:Event) => {
  e.preventDefault();
  const result = await v$.value.$validate();
  if(result) {
    console.log("success")
  }
}
</script>

<style lang="scss">
.login-form__container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex; 
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  .input__wrapper {
    position: relative;
    small {
      position: absolute; 
      bottom: -25px; 
      left: 0;
    }
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }

  button {
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
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
}
</style>