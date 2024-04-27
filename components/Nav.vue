<template>
    <div>
      
       
        <nav class="nav">
            <ul class="flex flex-row justify-between">
               
                <span class="flex flex-row justify-between space-x-2">  
                    <li> 
                        <nuxt-link to="/"> <logo></logo></nuxt-link>
                       
                    </li>
                 

                    </span>
                <span class="flex space-x-2 items-center">
                    <li>
                        <drop-down-customer></drop-down-customer>
                    </li>
                    <li>
                        <drop-down-item></drop-down-item>
                    </li>
                    <li>
                        <drop-down-invoice></drop-down-invoice>
                    </li>
                  <li v-if="admin_show"><nuxt-link to="/Admin">admin</nuxt-link></li>
                    <li  v-if="admin_show"><nuxt-link to="/Admin/roles">role</nuxt-link></li>
                    <li v-if="show_users" ><nuxt-link to="/Users">Users</nuxt-link></li>
                     <!--  <li><nuxt-link to="/Invoices">Invoice</nuxt-link></li>
                    <li><nuxt-link to="/Invoices/new">New Invoice</nuxt-link></li> -->
                    <li><button class="p-2 m-1 rounded-md border" @click="logout">logout</button></li>
                </span>
                
            </ul>
        </nav>
    </div>
</template>

<script setup>
    const supabase = useSupabaseClient()
    const { getRole} = useAdminUtliltes();
    const admin_show =computed(()=> getRole('Admin')); 
    const show_users =computed(()=> getRole('Users', 'read')); 
    const myUser= useUser('user');
    const logout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error(error);
                // Handle logout error
            } else {
                console.log('user', myUser.value);
                myUser.value.id = '';
                myUser.value.email = '';
                myUser.value.roles = [];
                myUser.value.name = '';

                navigateTo('/login');
                // Redirect or perform other actions on successful logout
            }
        } catch (error) {
            console.error(error);
            // Handle logout error
        }
    };
</script>

<style scoped>
.nav {
    display:list-item;
    background-color: #f2f2f2;
    padding: 10px;
    border-radius: 5px;
    list-style-type: none;
}
ul {
    list-style-type: none;
}
</style>