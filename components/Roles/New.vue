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
       
        <div class="text-sm truncate dark:text-gray-400 m-3">
                     
          <label for="roleName" class="block text-sm font-medium text-gray-700 dark:text-gray-400 my-2">Role Name</label>               
          <input v-model="roleName"  type="text"  
          class="w-full bg-slate-100 dark:bg-slate-600 dark:text-slate-50 p-2 rounded-sm shadow-md ">
          
    
        </div>
        
        <slot />
        <div class="flex justify-end pt-3 space-x-2">
          <button  type="button"  class="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Cancel
          </button>
          <button @click="addRole" type="button"  class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Insert
          </button>
        </div>
      </div>
    </div>
</template>

<script  setup>
  const supabase = useSupabaseClient();
  const emit= defineEmits(['inserted', 'close']);
  const roleName=ref('');
  const props = defineProps({
    isOpen: Boolean,
    roleId: Number,

  });
  const addRole= async ()=>{
    console.log('addRole')
    const { data, error } = await supabase.from('Role').insert([
      { role_name: roleName.value }
    ]);
    if (error) {
      console.log('error', error)
    } else {
      // alert('Role added');
      console.log('data', data)
      emit('inserted');
    }
  }
</script>

<style>

</style>