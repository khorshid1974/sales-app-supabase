<template>
    <div>
        <h1>Profile</h1>


        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                           Invoice Date
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Invoice Code
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Amount
                        </th>
                     
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="invoice in invoices" :key="invoice.clear_code" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ invoice.clear_date }}
                        </th>
                        <td class="px-6 py-4">
                            {{ invoice.clear_code }}
                        </td>
                        <td class="px-6 py-4">
                            {{ invoice.payments }}
                        </td>
                     
                    </tr>
                
                </tbody>
            </table>
        </div>

        
    </div>
</template>

<script setup>
    const supabase = useSupabaseClient();
    const route= useRoute();
    const user_id= route.params.id;
    const invoices= ref([]);
    console.log(route.params.id, 'route.params.id');
    const {data, error} = await supabase.rpc('get_clear_code_group', {user_id: user_id}).select('*') ;
    if (error) {
        console.error(error);
    } else
    {
        console.log(data, 'data data');
        invoices.value=data;
    }




</script>

<style lang="scss" scoped>

</style>