<template>
    <div>
        <h1>New Customer</h1>
        <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        First Name
                    </label>
                    <input v-model="customer.Name" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane">
                    <p class="text-gray-600 text-xs italic">Please fill out this field.</p>
                </div>
                <button @click="saveCustomer" type="button">Save</button>
            </div>
        </form>

    </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const customerName = ref('');
const customer=ref({});
const route = useRoute();

onMounted(async () => {
    console.log('mounted');
   // check if route id exists, if exisit read customer data
    // if not, create new customer
    console.log('route', route.params.id);
    if (route.params.id) {
        console.log('id exists');
        const { data, error } = await supabase.from('Customer').select().eq('id', route.params.id)
        if (error) {
            throw new Error(error.message);
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
            throw new Error(error.message)
        }
        console.log('customer updated')
        return
    } else{
        const { data, error } = await supabase.from('Customer').insert([
        { Name: customer.value.Name }
    ])
    if (error) {
        throw new Error(error.message)
    }
    console.log('customer created')
    }

}
</script>

<style lang="scss" scoped>

</style>