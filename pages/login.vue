<template>
  <div>
    <h1>Login</h1>
    <form @submit="login">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';


const supabase = useSupabaseClient()

const email = ref('');
const password = ref('');

const login = async (event:any) => {
  event.preventDefault();
  
  try {
    const {  error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });
    
    if (error) {
      console.error(error);
      // Handle login error
    } else {
      console.log('user');
      navigateTo('/');
      // Redirect or perform other actions on successful login
    }
  } catch (error) {
    console.error(error);
    // Handle login error
  }
};
</script>

<style>
/* Add your custom styles here */
</style>