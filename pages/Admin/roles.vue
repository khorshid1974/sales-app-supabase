<template>
    <div>
        <!-- {{ uniqueRoles }} -->
        <h1>Roles</h1>
        <RolesAddRoleToUserRoles :isOpen="isOpen" @close="isOpen = false" :roleId="role_id" ></RolesAddRoleToUserRoles>
    <!-- {{ roles }} -->
    <div class="grid grid-cols-1 gap-1 mr-2 md:grid-cols-2 md:gap-2 md:mr-6 lg:grid-cols-3 lg:gap-3 ">
        <div v-for="role in uniqueRoles" :key="role.id" class="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 m-5">
            <div class="flex items-center justify-between mb-4">
                <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white"><span class=" font-normal">Role:</span> {{ role.roleName }}</h5>
                    <button @click="openDailouge(role.roleId)" class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Add
                    </button>
                
        </div>
        <div  class="flow-root">
                <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                    <li v-for="entity in role.entities" :key="entity.id" class="py-3 sm:py-4">
                        <div class="flex items-center">
                            <!-- <div class="flex-shrink-0">
                                <img class="w-8 h-8 rounded-full" src="/profile-picture-3.jpg" alt="Neil image">
                            </div> -->
                            <div class="flex-1 min-w-0 ms-4">
                                <div class="flex flex-row justify-between">
                                    <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {{ entity.re }} -  {{ entity.en }}
                                    </p>
                                    <div class="flex flex-row">
                                        <svg @click="deleteRole(entity.re)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-500 hover:text-red-300 pb-1 cursor-pointer">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                        <svg @click="saveUr(entity)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-5 h-5 hover:text-green-400 cursor-pointer text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                                        </svg>

                                    </div>
                                </div>
                                
                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                        

                                    <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                            <div class="flex items-center ps-3">
                                                <input v-model="entity.read" id="vue-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                                                <label for="vue-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Read</label>
                                            </div>
                                        </li>
                                        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                            <div class="flex items-center ps-3">
                                                <input v-model="entity.add" id="react-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                                                <label for="react-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Add</label>
                                            </div>
                                        </li>
                                        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                            <div class="flex items-center ps-3">
                                                <input v-model="entity.edit" id="angular-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                                                <label for="angular-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Edit</label>
                                            </div>
                                        </li>
                                        <li class="w-full dark:border-gray-600">
                                            <div class="flex items-center ps-3">
                                                <input v-model="entity.delete" id="laravel-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                                                <label for="laravel-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Delete</label>
                                            </div>
                                        </li>
                                    </ul>

                                </p>
                            </div>
                            <!-- <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                $320
                            </div> -->
                        </div>
                    </li>
                   
                    <li class="pt-3 pb-0 sm:pt-4">
                        <div class="flex items-center ">
                            <div class="flex-shrink-0">
                                <img class="w-8 h-8 rounded-full" src="/profile-picture-3.jpg" alt="Thomas image">
                            </div>
                            <div class="flex-1 min-w-0 ms-4">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Thomes Lean
                                </p>
                                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                    email@windster.com
                                </p>
                            </div>
                            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                $2367
                            </div>
                        </div>
                    </li>
                </ul>
        </div>
        </div>
    </div>
      


    </div>
</template>

<script setup>
    const supabase = useSupabaseClient();
    const isOpen = ref(false);
    const role_id= ref(0);
    const {data:roles, error} = await supabase.from('roles_with_entities').select('*');
    if (error) {
        console.log(error);
    } else {
        console.log(roles);
    }
    const openDailouge = (roleId) => {
        isOpen.value = true;
        console.log(roleId), 'role id';
        role_id.value = roleId;
    }
    const uniqueRoles = roles.reduce((acc, role) => {
    const existingRole = acc.find(u => u.roleId === role.role_id);
    console.log('role id');
    console.log(role.role_id);
    if (existingRole) {
        existingRole.entities.push({en:role.entity_name, re:role.entity_id, read:role.read, add:role.add, edit:role.edit, delete:role.delete, urId: role.ur_id}); // Add new user object to existing user object
    } else {
        acc.push({ roleId: role.role_id, roleName: role.role_name, entities: [{en:role.entity_name, re:role.entity_id, read:role.read, add:role.add, edit:role.edit, delete:role.delete, urId: role.ur_id}] }); // Create new user object
    }
    return acc;
    }, []);
    console.log('uniqueRoles');
    console.log(uniqueRoles);
    const saveUr = async (entity) => {
        console.log(entity);
        const {data, error} = await supabase.from('UserRoles').update({
            add: entity.add, edit: entity.edit, delete: entity.delete, read: entity.read
        }).eq('id', entity.urId);
        if (error) {
            console.log(error);
        } else {
            console.log(data);
        }
    }
    const deleteRole = async (re) => {
        console.log(re);
        const {data, error} = await supabase.from('UserRoles').delete().eq('id', re);
        if (error) {
            console.log(error);
        } else {
            console.log(data);
        }
    }
</script>

<style lang="scss" scoped>

</style>