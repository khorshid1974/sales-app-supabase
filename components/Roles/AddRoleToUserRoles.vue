<template>
    <div v-show="isOpen" class="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 transition-all duration-300 ease-in-out">
      <div class="relative mx-auto p-4 w-full max-w-xl bg-white shadow-md rounded-lg">
        <div class="flex justify-between items-center pb-3 border-b border-gray-200">
          <h3 class="text-xl font-medium tracking-wide text-gray-900">Quick Insert</h3>
          <button type="button" @click="$emit('close')" class="text-gray-400 hover:text-gray-500 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <select v-model="selectedEntity" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected value="0">Choose a Entity</option>
              <option v-for="entity in  entities" :key="entity.id" :value="entity.id">{{ entity.entity_name }}</option>
            
        </select>
        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                        

            <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                        <input v-model="read" id="vue-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                        <label for="vue-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Read</label>
                    </div>
                </li>
                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                        <input v-model="add" id="react-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                        <label for="react-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Add</label>
                    </div>
                </li>
                <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div class="flex items-center ps-3">
                        <input v-model="edit" id="angular-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                        <label for="angular-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Edit</label>
                    </div>
                </li>
                <li class="w-full dark:border-gray-600">
                    <div class="flex items-center ps-3">
                        <input v-model="del" id="laravel-checkbox-list" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                        <label for="laravel-checkbox-list" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Delete</label>
                    </div>
                </li>
            </ul>
    
          </p>
        
        <slot />
        <div class="flex justify-end pt-3 space-x-2">
          <button  type="button" @click="isOpen=false" class="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Cancel
          </button>
          <button @click="addRole" type="button"  class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Insert
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    isOpen: Boolean,
    roleId: Number,

  });
  
 const supabase= useSupabaseClient();
  const selectedEntity = ref(0);
  const read = ref(false);
  const add = ref(false);
  const edit = ref(false);
  const del = ref(false);
  const emit = defineEmits(['close'])
  const { data: entities, error } =await supabase.from('Entity').select('*');
  if (error) {
    console.error('error', error.message);
  } else {
    console.log('entities', entities);
    // const updatedResults = entities.map(obj => ({ ...obj, read: "false" }));
  }
//   const emitInsert = () => {
//     $emit('insert');
//   };
const addRole= async()=>{
  console.log(selectedEntity.value, read.value, add.value, edit.value, del.value, props.roleId);
    const { data, error } = await supabase.from('UserRoles').insert([
        { role_id: props.roleId, entity_id: selectedEntity.value, read: read.value, add: add.value, edit: edit.value, delete: del.value }
      ]);
      if (error) {
        console.error('error', error.message);
      } else {
        console.log('data', data);
        //$emit('close');
        //isOpen=false;
        emit('close')
      }
}
  </script>
  
  <style scoped>
  /* You can add additional styles here for specific needs */
  </style>
  