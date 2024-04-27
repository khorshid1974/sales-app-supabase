<template>
    <div >
       
      
        <div class="p-2 border border-gray-300 m-3" v-if="canEditOrAdd">
            <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        Full Name
                    </label>
                    <input v-model="customer.Name" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Customer Name">
                    <p class="text-gray-600 text-xs italic">Please fill out this field.</p>
                </div>
                <button @click="saveCustomer" type="button">Save</button>
                </div>
            </form>
           
        </div>
        <div v-else class="flex items-center justify-center m-4 font-mono p-6 border border-red-200 rounded-md">
      
            <p v-show="!edit" class=" text-xl text-red-500">  don't have permission to edit</p>
            <p v-show="!add" class="text-xl text-red-500">  don't have permission to add</p>
          
        </div>
       

    </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const customerName = ref('');
const customer=ref({});
const route = useRoute();
const {getRole} = useAdminUtliltes();
const customer_read = getRole('Customers', 'read');
const customer_add = getRole('Customers', 'add') && !route.params.id ;
const customer_edit = getRole('Customers', 'edit') && route.params.id ;
const add= getRole('Customers', 'add');
const edit = getRole('Customers', 'edit');
const customer_del = getRole('Customers', 'delete');
const canEditOrAdd = customer_edit || customer_add;
onMounted(async () => {
    console.log('mounted');
   // check if route id exists, if exisit read customer data
    // if not, create new customer
    console.log('route', route.params.id);
    if (route.params.id) {
        console.log('id exists');
        const { data, error } = await supabase.from('Customer').select().eq('id', route.params.id)
        if (error) {
           console.log(error.message);
        }
        customer.value = data[0];
        console.log(data)
    } else {
        console.log('id does not exist');
    }
        
   
});
const saveCustomer = async () => {
    if (route.params.id) {
        console.log(customer.value.Name);
        const { data, error } = await supabase.from('Customer').update({ Name: customer.value.Name }).eq('id', route.params.id)
        if (error) {
            console.log(error.message);
        }
        console.log('customer updated')
        return
    } else{
        const { data, error } = await supabase.from('Customer').insert([
        { Name: customer.value.Name }
    ])
    if (error) {
        console.log(error.message);
    }
    console.log('customer created')
    }

}
</script>

<style lang="scss" scoped>

</style>