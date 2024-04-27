<template>
    <div>
        <h1>Cash</h1>

      
        <invoice-toast v-show="showToast"> clearness compeleted sucssefully </invoice-toast>


        <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input id="horizontal-list-radio-license" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="horizontal-list-radio-license" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Today </label>
                </div>
            </li>
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input id="horizontal-list-radio-id" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="horizontal-list-radio-id" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cash</label>
                </div>
            </li>
            <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input id="horizontal-list-radio-military" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="horizontal-list-radio-military" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sales Only</label>
                </div>
            </li>
            <li class="w-full dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input id="horizontal-list-radio-passport" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="horizontal-list-radio-passport" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">US Passport</label>
                </div>
            </li>
        </ul>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Code
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Payment
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Invoice Type
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Payment Type
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Clearnce
                        </th>
                        <th scope="col" class="px-6 py-3">
                           Edit
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="invoice in usersData" :key="invoice.id" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {{ invoice.invoice_id }}
                        </th>
                        <td class="px-6 py-4">
                            {{ invoice.code }}
                        </td>
                        <td class="px-6 py-4">
                           {{ convertStringToDate(invoice.invoice_date) }}
                        </td>
                        <td class="px-6 py-4">
                           {{ invoice.payment }}
                        </td>
                        <td class="px-6 py-4">
                            {{ invoice.type_name }}
                        </td>
                        <td class="px-6 py-4">
                          {{ invoice.payment_type }}
                        </td>
                        <td class="px-6 py-4">
                            {{ invoice.clearness }}
                        </td>
                        <td class="px-6 py-4 text-right">
                            <div class="flex items-center mb-4">
                                <input v-model="invoice.clearness" id="default-checkbox" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                               {{ invoice.clearness }}
                            </div>
                        </td>
                    </tr>
             
                </tbody>
            </table>
            <div class="flex flex-row justify-center items-center py-3 space-x-2 bg-slate-200 dark:bg-slate-600 dark:text-red-50">
                <p class="">Total Amount</p>
                <p class="">{{ usersData.reduce((acc, item) => acc + item.payment, 0) }}</p>
                <p class=" p-2 bg-yellow-300 dark:bg-yellow-800 rounded-md">{{ checkedClearness }}</p>
                <button @click="clearCashier" type="button" :disabled="checkedClearness === 0"
                class="p-2 border shadow bg-slate-100 rounded-md dark:text-red-50 dark:bg-slate-700 disabled:bg-red-100 disabled:text-gray-300 ">
                    Clear Cashier
                </button>
                
            </div>
        </div>

    </div>
</template>

<script setup>
    const { convertStringToDate, generateUuid } = useUtliltes();
    const showToast= ref(false);
    const id = useId();
    const route= useRoute();
    const supabase = useSupabaseClient();
    const usersData = ref([]);
    const {data:users, error} = await supabase.from('users_with_invoices')
    .select('*').eq('user_id', route.params.id).eq('clearness', false);
    if (error) {
        console.error(error);
    } else
    {
        console.log(users, 'users');
        usersData.value = users;
    }
    const checkedClearness= (computed(() => {
        return usersData.value.filter(x=> x.clearness).reduce((acc, item) => acc + item.payment, 0) ;
    }));

    const clearCashier = async () => {
        const userData= useState('user');
        const uuid=await generateUuid();
        console.log(uuid, 'uuid');
        console.log(userData.value, 'userData here');
        const { error:updateError } = await supabase.from('Invoice')
        .update({ Clear: true, ClearUserId : userData.value.id, ClearDate: new Date(), ClearCode: uuid })
        .in('id', usersData.value.filter(x=> x.clearness).map(x=> x.invoice_id));
        //in('id', usersData.value.filter(x=> x.clearness).map(x=> x.user_id_uid))
        
        if (updateError) {
            console.error(updateError.message);
        } else {
            console.log('update success');
            showToast.value= true;
            setTimeout(()=> {
            showToast.value= false;
            }, 3000);
            const {data:users, error} = await supabase.from('users_with_invoices')
            .select('*').eq('user_id', route.params.id).eq('clearness', false);
            if (error) {
                console.error(error);
            } else
            {
                console.log(users, 'users');
                usersData.value = users;
            }
        }
    }
    </script>

    <style lang="scss" scoped>

</style>