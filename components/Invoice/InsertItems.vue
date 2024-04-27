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
        <slot />
        
        <div  class="flex justify-end pt-3 space-x-2">
          <button v-show="showHideSecondButton"  @click="$emit('close')" type="button"  class="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Cancel {{ showHideSecondButton }}
          </button>
          <button type="button" @click="$emit('insert')" class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {{ actionButton }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const someCondition= ref(false);
  const props = defineProps({
    isOpen: Boolean,
    actionButton: {
      type:String,
      default: 'Insert'
    },
    secondButtonVisibility: {
      type:Boolean,
      default: true
    }
      
  });
  
 const showHideSecondButton = computed(() => {
    return props.secondButtonVisibility==true ? true : false;
  });
  
  // const emitClose = () => {
  //   $emit('close');
  // };
//   const emitInsert = () => {
//     $emit('insert');
//   };
  </script>
  
  <style scoped>
  /* You can add additional styles here for specific needs */
  </style>
  