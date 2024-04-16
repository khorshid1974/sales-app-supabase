<template>
    <div>
        <h1>Customers</h1>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-2 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        
                <tr>
                    <th scope="col" class="px-6 py-3">id</th>
                    <th scope="col" class="px-6 py-3">name</th>
                
                </tr>
            </thead>
            <tbody>
                <tr v-for="customer in customers_data" :key="customer.id" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td class="px-6 py-4">{{ customer.id }}</td>
                  
                    <td class="px-6 py-4">
                        <nuxt-link :to="{ name: 'Customers-new-id', params: { id: customer.id }}"> {{ customer.Name }}</nuxt-link>
                       
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
const customers_data = ref([])
const supabase = useSupabaseClient()
const { data, error } = await supabase.from('Customer').select('*')
    if (error) {
        throw new Error(error.message)
    }
    customers_data.value = data;
    //return data

</script>

<style lang="scss" scoped>

</style>