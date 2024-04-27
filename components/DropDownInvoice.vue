<template>
    <Menu as="div" class="relative inline-block text-left" v-if="canAccessInvoicePage">
      <div>
        <MenuButton class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Invoice
          <Icon name="raphael:customer" color="black" />
        </MenuButton>
      </div>
  
      <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div class="py-1">
            <MenuItem v-slot="{ active }">
                <NuxtLink to="/Invoices" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Invoices <Icon name="raphael:customer" color="black" /></NuxtLink>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <NuxtLink to="/Invoices/new" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">New Invoice  <Icon name="raphael:customer" color="black"/>  </NuxtLink>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <NuxtLink to="/other-invoices/NewReturnInvoice" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">New Return  <Icon name="raphael:customer" color="black"/>  </NuxtLink>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <NuxtLink to="/other-invoices/NewDamageInvoice" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">New Damage  <Icon name="raphael:customer" color="black"/>  </NuxtLink>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </template>
  
  <script setup>
  import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
  const myUserState= useUser('user');
    // find if user can access customer page
    const canAccessInvoicePage = computed(() => {
      if (!myUserState.value.roles) return false;
        return myUserState.value.roles.some((role) => role.entity_name === 'Invoice');
    });
//   import { ChevronDownIcon } from '@heroicons/vue/20/solid'
  </script>