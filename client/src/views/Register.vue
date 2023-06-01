<template>
    <div class="register-form__container">
        <form action="" @submit="(event) => submitForm(event)">
          <div class="brand">
            <img src="../assets/logo.svg" alt="logo" />
            <h1>Chat</h1>
          </div>
          <div class="input__wrapper">
            <input
            type="text"
            placeholder="Username"
            name="username"
            v-model="state.user_name"
          />
          <small v-if="v$.user_name.$error"
          >{{ v$.user_name.$errors[0]?.$message }}</small>
          </div>
          <div class="input__wrapper">
            <input
            type="email"
            placeholder="Email"
            name="email"
            v-model="state.email"
          />
          <small v-if="v$.email.$error"
          >{{ v$.email.$errors[0]?.$message }}</small>
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
          
          <div class="input__wrapper">
            <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            v-model="state.confirm"
          />
          <small v-if="v$.confirm.$error"
          >{{ v$.confirm.$errors[0]?.$message }}</small>
          </div>
          
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <RouterLink to="/login">Login.</RouterLink>
          </span>
        </form>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { reactive, computed} from "vue"
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useUserStore } from "@/stores/users"

const state = reactive({
  user_name: '',
  email: '',
  password: '',
  confirm: '',
})

const store = useUserStore()

const rules = computed(() => { return {
    user_name: {required},
    email: { required, email },
    password: { required, minLength: minLength(6) },
    confirm: { required, sameAs: sameAs(state.password) },
  }
})

const v$ = useVuelidate(rules, state)

const submitForm = async (e:Event) => {
  e.preventDefault();
  try {
    const result = await v$.value.$validate();
    if(result) {
      store.register(state.user_name, state.email, state.password, state.confirm);
    }
  } catch (error) {
    console.error(error);
  }
  
}

</script>

<style lang="scss">
.register-form__container {
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
    padding: 3rem 5rem;
  }
  .input__wrapper {
    position: relative;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      position: relative;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    small {
      position: absolute; 
      bottom: -25px; 
      left: 0;
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