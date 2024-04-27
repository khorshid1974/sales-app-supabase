<template>
  <div>
    <h1>Login</h1>


    <form  @submit="login" class="max-w-sm mx-auto">
      <div class="mb-5">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input  v-model="email"  type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
      </div>
      <div class="mb-5">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
        <input v-model="password"  type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
      </div>
      <!-- <div class="flex items-start mb-5">
        <div class="flex items-center h-5">
          <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
        </div>
        <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
      </div> -->
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
    </form>


    <!-- <form @submit="login">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required>
      <button type="submit">Login</button>
    </form> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';


const supabase = useSupabaseClient()


const email = ref('');
const password = ref('');
const myUserData= useUser('user');
console.log(myUserData.value, 'myUserData');
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

    const { data: { user } } = await supabase.auth.getUser();
    console.log(user, 'user');
    //console.log(user?.id, 'user id');
    
    myUserData.value.id=user?.id;
    myUserData.value.email=user?.email;
   
    //console.log(user?.id, 'user id');
    
      const {data: userRoles, error:rolesError} = await supabase.from('users_all_premissoins').select('*').eq('UserId', user?.id);
      if (rolesError) {
        console.log(rolesError);
      } else {
        console.log(userRoles, 'userRoles');
        
        myUserData.value.roles=userRoles;
        console.log(myUserData.value, 'myUserData');
        //console.log(userRoles);
      }
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