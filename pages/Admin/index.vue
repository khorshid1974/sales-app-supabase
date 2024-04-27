<template>
    <div>
        <h1>Admin</h1>
        <p>Admin page</p>
        <invoice-insert-items v-show="isOpen" @close="isOpen = false" @insert=" isOpen = false" actionButton="Close" :secondButtonVisibility=false>
            <!-- show user roles as html table -->
            <div class="flex flex-row">
                <select v-model="selectedRole" class="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected value="0">Choose a Role</option>
                <option v-for="role in missingRoles" :key="role.id" :value="role.id">{{ role.role_name }}</option>
                
                </select>
                <button @click="addRoleToUser" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add </button>
            </div>

            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-2 ">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">Id</th>
                        <th scope="col" class="px-6 py-3">Name</th>
                        <th scope="col" class="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    v-for="role in getUserRoles(currentUserId)">
                        <td class="px-6 py-4">{{ role }}</td>
                        <td class="px-6 py-4">{{ role }}</td>
                        <td><button @click="deleteRoleFromUser(role)" class="p-1 m-1 rounded-md border">delete</button></td>
                    </tr>
                </tbody>
            </table>

        </invoice-insert-items>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-2 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">Id</th>
                    <th scope="col" class="px-6 py-3">Username</th>
                    <th scope="col" class="px-6 py-3">Roles</th>
                </tr>
            </thead>
            <tbody>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                v-for="user in uniqueUsers">
                    <td class="px-6 py-4">{{ user.userid }}</td>
                    <td class="px-6 py-4">
                        <nuxt-link :to="{ name: 'Users-id', params: { id: user.userid }}">  {{ user.user_name }}</nuxt-link>

                       
                    </td>
                    <td class="px-6 py-4">
                       [ <span v-for="role in user.role_name" :key="role">{{ role }} , </span>]
                        <button @click="openUserRolesDailogue(user.userid)" class="text-indigo-600 hover:text-indigo-900">Add/Edit</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
    const supabase = useSupabaseClient();
    const isOpen = ref(false);
    const currentUserId = ref(2);
    const selectedRole = ref(0);
    //const acolor= useColor('color');
    //console.log(acolor.value, 'new color');
    const {data:users, error} = await supabase.from('user_with_roles').select('*');
     if (error) {
         console.log(error);
     } else {
         //console.log(users, 'users');
     }
    const emitInsert = () => {
        $emit('insert');
    };
    const emitClose = () => {
        $emit('close');
    };
    const {data: roles} = await supabase.from('Role').select('*');
    console.log(roles);

    const uniqueUsers = users.reduce((acc, user) => {
    const existingUser = acc.find(u => u.userid === user.userid);
    if (existingUser) {
        existingUser.role_name.push(user.role_name); // Add role to existing user
    } else {
        acc.push({ userid: user.userid, user_name: user.UserName, role_name: [user.role_name] }); // Create new user object
    }
    return acc;
    }, []);
    
//console.log(uniqueUsers);
const getUserRoles = (userid) => {
    console.log(userid);
    const oneUser= uniqueUsers.filter(user => user.userid == userid).slice(0, 1);
    console.log(oneUser[0], 'oneUser');
    return oneUser[0].role_name;
};

const missingRoles = ref([]);
const openUserRolesDailogue = (userid) => {
    isOpen.value = true;
    console.log(userid);
    currentUserId.value = userid;
    const SecondUserRoles = getUserRoles(currentUserId.value); 
    missingRoles.value = getUserMissingRoles(roles, SecondUserRoles);
// console.log('SecondUserRoles', SecondUserRoles);
// console.log(missingRoles);
};
function getUserMissingRoles(allRoles, userRoles) {
    console.log('user roles');
    console.log(userRoles);
    console.log('all roles');
  const userRoleNames = userRoles.map(role => role); // Extract user role names
  console.log(userRoleNames, 'userRoleNames');
   return allRoles.filter(role => !userRoleNames.includes(role.role_name));
  //return [];
}
const addRoleToUser = async () => {
        // console.log('role');
        // console.log(selectedRole.value);
        const newRole= roles.filter(role => role.id == selectedRole.value).slice(0, 1);
        // console.log('newRole');
        // console.log(newRole[0]);
        // console.log('currentUserId');
        // console.log(currentUserId.value);
        // get index of current user id

        // console.log('uniqueUsers');
        // console.log(uniqueUsers);
        const {data, error} = await supabase.from('UsersWithRoles').insert({user_id: currentUserId.value, role_id: selectedRole.value});
        if (error) {
            console.log(error);
        } else {
            console.log(data);
            const index = uniqueUsers.findIndex(user => user.userid == currentUserId.value);
            uniqueUsers[index].role_name.push(newRole[0].role_name);
            console.log('uniqueUsers', uniqueUsers);
            selectedRole.value = 0;
            //emitInsert();
        }
    };
const deleteRoleFromUser = async (roleValue) => {
        console.log('delete');
        console.log(roleValue);
        console.log('currentUserId');
        console.log(currentUserId.value);
        console.log('uniqueUsers');
        console.log(uniqueUsers);
       
        // find role id from roles
        const roleId = roles.filter(role => role.role_name == roleValue).slice(0, 1);
        console.log('roleId');
        console.log(roleId[0].id);
        console.log('currentUserId.value');
        console.log(currentUserId.value);
        const {data, error} = await supabase.from('UsersWithRoles').delete().eq('user_id', currentUserId.value).eq('role_id', roleId[0].id);  
        if (error) {
            console.log(error);
        } else {
            console.log('deleted');
            const index = uniqueUsers.findIndex(user => user.userid == currentUserId.value);
            console.log('index');
            console.log(index);
            const roleIndex= uniqueUsers[index].role_name.findIndex(role => role == roleValue);
            console.log('roleIndex');
            console.log(roleIndex);
            const role = uniqueUsers[index].role_name[roleIndex];
            uniqueUsers[index].role_name.splice(roleIndex, 1);
            console.log('uniqueUsers');
            console.log(uniqueUsers);
            selectedRole.value = 0;
            selectedRole.value = 1;
            //emitInsert();
        } 
    };
</script>

<style lang="scss" scoped>

</style>