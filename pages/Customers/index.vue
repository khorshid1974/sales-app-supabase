<template>
    <div>
        <h1>Customers</h1>
        <table v-if="role" class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-2 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        
                <tr>
                    <th scope="col" class="px-6 py-3">id</th>
                    <th scope="col" class="px-6 py-3">name</th>
                    <th scope="col" class="px-6 py-3">Total Purchaces</th>
                    <th scope="col" class="px-6 py-3">Total Payments</th>
                    <th scope="col" class="px-6 py-3">Status</th>
                
                </tr>
            </thead>
            <tbody>
                <tr v-for="customer in customers_data" :key="customer.id" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td class="px-6 py-4">{{ customer.id }}</td>
                  
                    <td class="px-6 py-4">
                        <nuxt-link :to="{ name: 'Customers-new-id', params: { id: customer.id }}"> {{ customer.Name }}</nuxt-link>
                       
                    </td>
                    <td class="px-6 py-4">{{ customer.salespaument }}</td>
                    <td class="px-6 py-4">{{ customer.payment }}</td>
                    <td class="px-6 py-4 cursor-pointer" >
                        <nuxt-link :to="{ name: 'Customers-slug', params: { slug: customer.id }}">  <Icon name="arcticons:super-status-bar"  size="2em" color="green" /></nuxt-link>
                       
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
const customers_data = ref([])
const {getRole} = useAdminUtliltes();
const supabase = useSupabaseClient()
const { data, error } = await supabase.from('customer_with_payments').select('*')
    if (error) {
        throw new Error(error.message)
    }
    console.log(data, 'data');
    customers_data.value = data;
    const role = getRole('Customers', 'read');
    console.log(role, 'role');
    //return data

</script>

<style lang="scss" scoped>

</style>