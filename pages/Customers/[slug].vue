<template>
    <div>
        <table v-if="invoice_read" class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-2 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        
                <tr>
                    <th scope="col" class="px-6 py-3">Invoice Id</th>
                    <th scope="col" class="px-6 py-3">Code</th>
                    <th scope="col" class="px-6 py-3">Date</th>
                    <th scope="col" class="px-6 py-3">Total Payments</th>
                    <th scope="col" class="px-6 py-3">Payments</th>
                    <th scope="col" class="px-6 py-3">Invoice Type</th>
                    <th scope="col" class="px-6 py-3">Payment Type</th>
                
                </tr>
            </thead>
            <tbody>
                <tr v-for="invoice in data" :key="invoice.id" class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td class="px-6 py-4">{{ invoice.id }}</td>
                    <td class="px-6 py-4">
                        <span v-if="!invoice_read" > {{ invoice.code }}</span>
                        <nuxt-link v-else :to="{ name: 'Invoices-id', params: { id: invoice.invoice_id }}"> {{ invoice.code }}</nuxt-link>
                       
                    </td>
                    <!-- <td class="px-6 py-4">
                        {{ invoice.code }}
                       
                    </td> -->
                    <td class="px-6 py-4">{{ invoice.date }}</td>
                    <td class="px-6 py-4">{{ invoice.purchase_payment }}</td>
                    <td class="px-6 py-4 cursor-pointer" >
                        {{ invoice.payment }}
                    </td>
                    <td class="px-6 py-4 cursor-pointer" >
                        {{ invoice.invoice_type }}
                    </td>
                    <td class="px-6 py-4 cursor-pointer" >
                        {{ invoice.payment_type }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>

const route = useRoute()
const supabase = useSupabaseClient();
const {getRole} = useAdminUtliltes();

//const customer_read = getRole('Customers', 'read');
const invoice_read = getRole('Invoice', 'read');
    // const invoice_add = getRole('Invoices', 'add') ;
//const invoice_edit = getRole('Invoice', 'edit') ;
const customerId= route.params.slug;
const {data, error}= await supabase.from('customer_status_details').select().eq('id', customerId);
if (error) {
    console.log(error.message);
} else {
    console.log(data, 'customer data');
}
</script>

<style lang="scss" scoped>

</style>