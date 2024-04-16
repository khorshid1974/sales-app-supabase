<template>
    <div class="m-4 p-4">
      <InvoiceToast v-show="saveSuccessed"> Invoice added succesfully </InvoiceToast> 
      <div class="flex flex-row justify-between items-center">  
        <input class="p-2 m-2"  v-on:keyup.enter="searchItems" type="text" v-model="searchQuery" placeholder="Search...">
        <InvoiceInsertItems :isOpen="isOpen" @close="close" @insert="insert">
          <div class="flex flex-row items-center justify-between">
            <input class="p-2 m-2"  v-on:keyup.enter="searchQuickItems" type="text" v-model="searchQuery" placeholder="Search...">
            <button class="p-2 m-2" type="button" @click="searchQuickItems">Search</button>
            <div class="">
              <input v-model="filterEmptyItems" id="vue-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
              <label for="vue-checkbox" class=" py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Show Empty</label>

            </div>

          </div>
               
          <div v-if="filterdItemsForStock.length==0" class="">no data</div>
          <table v-else class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">Name</th>
                    <th scope="col" class="px-6 py-3">Price</th>
                    <th scope="col" class="px-6 py-3">Quantity</th>
                    <th scope="col" class="px-6 py-3">Amount</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" 
                v-for="item in filterdItemsForStock" :key="item.id">
                    <td class="px-6 py-4">{{ item.Name }}</td>
                    <td class="px-6 py-4">{{ item.SalePrice }}</td>
                    <td class="px-6 py-4">
                      <button class=" px-2 rounded-md bg-red-200" type="button" @click="()=> item.Quantity--">-</button>
                      {{ item.Quantity }}
                      <button class="px-2 rounded-md bg-green-200" type="button" @click="()=> item.Quantity++">+</button>
                    </td>
                    <td class="px-6 py-4">{{ item.Quantity * item.SalePrice }}</td>
                    <td class=" cursor-pointer" @click="deleteItem(item.id)">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                       </svg>
                    </td>
                </tr>
                </tbody>
            </table>
        </InvoiceInsertItems>
        <button type="button" @close="close" @click="()=> isOpen = !isOpen">show items</button>
        <!-- <button type="button">Search</button> -->
        <div class="flex flex-row items-center">
          <div class="flex flex-row">
            <input  id="checked-checkbox" type="checkbox" v-model="showCutomer" @change="readCustomers" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="checked-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Customer?</label>
          </div>
          <div v-if="showCutomer" class="">
            <select v-model="selectedCustomer"  id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Choose a Customer</option>
              <option v-for="customer in customers" :key="customer.id" :value="customer.id" value="customerid">{{ customer.Name }}</option>
            
            </select>
          </div>
        </div>  
       
         
       
      </div>
    

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">Name</th>
                    <th scope="col" class="px-6 py-3">Price</th>
                    <th scope="col" class="px-6 py-3">Quantity</th>
                    <th scope="col" class="px-6 py-3">Amount</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" 
                v-for="item in tableData" :key="item.id">
                    <td class="px-6 py-4">{{ item.Name }}</td>
                    <td class="px-6 py-4">{{ item.SalePrice }}</td>
                    <td class="px-6 py-4">
                      <button class=" px-2 rounded-md bg-red-200" type="button" @click="()=> item.Quantity--">-</button>
                      {{ item.Quantity }}
                      <button class="px-2 rounded-md bg-green-200" type="button" @click="()=> item.Quantity++">+</button>
                    </td>
                    <td class="px-6 py-4">{{ item.Quantity * item.SalePrice }}</td>
                    <td class=" cursor-pointer" @click="deleteItem(item.id)"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                       </svg>

                    </td>
                </tr>
                <tr class=" bg-white text-zinc-800 dark:bg-zinc-700 dark:text-zinc-100">
                  <td class="px-6 py-4"></td>
                    <td class="px-6 py-4"></td>
                    <td class="px-6 py-4 text-lg text-yellow-400">Sum</td>
                    <td colspan="2" class="px-6 py-4">{{ sum }} $</td>
                  
                </tr>
            </tbody>
          </table>
        </div>
        
       <div class="flex flex-col justify-end border-gray-500 space-y-2 mt-3">
          <div class="flex flex-row justify-end space-x-2">
            <label for="Amount" class="text-lg text-yellow-800 border rounded-md p-2">Amount</label>
            <input class="border rounded-md p-2" type="number" id="Amount" name="Amount" placeholder="Amount" v-model="sum">
            <label for="payment" class="text-lg text-yellow-800 border rounded-md p-2">Payment</label>
            <input class="border rounded-md p-2" type="number"  id="payment" name="payment" placeholder="Payment" v-model="payment">
          </div>
          <div class="flex flex-row justify-end space-x-2">
            <label for="reminder" class="text-lg text-yellow-800 border rounded-md p-2">{{ sum-payment }} $</label>
            
          </div>
       </div>
       
      <button class="p-3 m-2 text-xl text-yellow-200 rounded-lg border-x-black bg-zinc-500" type="button" @click="saveInvoice">Save</button>
    </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const isOpen = ref(false);
const searchQuery = ref('');
const searchResults = ref([]);
const modelSearchResults = ref([]);
const payment = ref(0);
const showCutomer = ref(false);
const customers = ref([]);
const selectedCustomer = ref(0);
const saveSuccessed = ref(false);
const filterEmptyItems = ref(false);

const { generateProductCode } = useUtliltes();
const readCustomers = async () => {
  if (showCutomer.value && customers.value.length == 0) {
    console.log('readCustomers');
    // read customers from database
    const { data, error } = await supabase
    .from('Customer')
    .select();

    if (error) {
      console.error(error);
      return;
    } else {
      customers.value = data;
      console.log(customers.value);
    }
      return;
  }
 
}
const close= () => {
  console.log('close');
  isOpen.value = false;
}
const insert= () => {
  console.log('insert');
  console.log(filterdItemsForStock.value);
  searchResults.value.push(...filterdItemsForStock.value);
  console.log('insert');
  //isOpen.value = false;
}
const saveInvoice = async () => {
  //console.log((await supabase.auth.getUser()).data.user.id);
  const userId= (await supabase.auth.getUser()).data.user.id;
  const invoice = {
    Code: generateProductCode(),
    CustomerId: selectedCustomer.value==0?null:selectedCustomer.value,
    UserId2: userId,
    UserId: 1,
    Payment: 0,
    PaymentDate: new Date(),
    InvoiceTypeId: 3, // 3 is for damage invoice
  };
  const { data, error } = await supabase
    .from('Invoice')
    .insert(invoice).select('id').single();
  if (error) {
    console.error(error);
    return;
  } else {
    // saveSuccessed.value = true;
    // searchResults.value = [];
    // searchQuery.value = '';
    // modelSearchResults.value = [];
    // setTimeout(() => {
    //   saveSuccessed.value = false;
    // }, 3000);
  }
  //console.log(data);
  //console.log(searchResults.value);
  searchResults.value.forEach(function (element) {
  element.InvoiceId = data.id;
  element.ItemId = element.id;
});
const newListOfItems = searchResults.value.map(item => ({ InvoiceId: item.InvoiceId, Itemid: item.ItemId, Quantity: item.Quantity,  ItemName: item.Name, SalePrice: 0, PurchasePrice: item.PurchasePrice }));

  console.log(searchResults.value);

  
 const {  error:newError } = await supabase
    .from('InvoiceItems')
    .insert(newListOfItems);
  if (error) {
    console.error(newError);
    return;
  }

    console.log('update items');
    console.log(newListOfItems);
   newListOfItems.forEach(async element => {
    console.log(element);
    
    // const q= Number(element.Quantity)-1;
    // console.log(q);
    const {error:rr, data:dd} =await supabase
    .rpc('update_store_quantity', { stock: element.Quantity, row_id: element.Itemid,});
    
   
 
    if (rr) {
      console.error(rr);
      return;
    } else {
      console.log(dd);
    }
  });

  navigateTo('/Invoices');
  // console.log(data);
  // const invoiceId = data[0].id;
  // searchResults.value.forEach(async (item) => {
  //   const { data, error } = await supabase
  //     .from('InvoiceItem')
  //     .insert({ InvoiceId: invoiceId, ItemId: item.id, Quantity: item.Quantity });
  //   if (error) {
  //     console.error(error);
  //     return;
  //   }
  // });
  // searchResults.value = [];
};
const searchItems = async () => {
  //console.log(searchQuery.value);
  if (searchQuery.value.length < 3) {
    return;
  }
 
  const { data, error } = await supabase
    .from('Item')
    .select()
    .eq('Code', `${searchQuery.value}`);
   
  if (error) {
    console.error(error);
    return;
  }

  //console.log(data.at(0).id);
  const existingItem = searchResults.value.find(i => i.id === data[0].id);
  if (existingItem) {
    const index = searchResults.value.findIndex(obj => obj.id == data[0].id);
    //console.log(index);
    searchResults.value[index].Quantity++;
    // console.log(existingItem.id);
    //searchResults.value[existingItem.id].Quantity = searchResults.value[existingItem.id].Quantity + 1;
  } else {
    data[0].Quantity = 1;
    searchResults.value.push(...data);
  }
  

  // tableData.value.concat(searchItems[0]);
  //console.log(searchResults);
};
const tableData= computed(() => {
  return searchResults.value;
});
const filterdItemsForStock= computed(() => {
  if (filterEmptyItems.value) {
    return modelSearchResults.value;
  }
  return modelSearchResults.value.filter(x=>x.Quantity>0);
  
});
const sum= computed(() => {
  if(searchResults.value.length==0) return 0;
  //return searchResults.value.reduce(x=>x.SalePrice).sum();
  const total= searchResults.value.reduce((acc, obj) => acc + (obj.SalePrice * obj.Quantity), 0);
  payment.value=total;
  return total;
});
const deleteItem= (id)=> {
 
  searchResults.value = searchResults.value.filter(x => x.id !== id);
  try {
    modelSearchResults.value = modelSearchResults.value.filter(x => x.id !== id);
  } catch (error) {
    console.error(error);
  }
}

const searchQuickItems = async () => {
  //console.log(searchQuery.value);
  if (searchQuery.value.length < 3) {
    return;
  }
 
  const { data, error } = await supabase
    .from('Item')
    .select()
    .ilike('Name', `%${searchQuery.value}%`);
   
  if (error) {
    console.error(error);
    return;
  }
  // console.log('searchQuickItems');
  // console.log(data);
  console.log('searchQuickItems');
  console.log(modelSearchResults.value);
  modelSearchResults.value.push(...data);
  //console.log(modelSearchResults.value[0]);
  // console.log(data.at(0).id);
  // const existingItem = searchResults.value.find(i => i.id === data[0].id);
  // if (existingItem) {
  //   const index = searchResults.value.findIndex(obj => obj.id == data[0].id);
  //   //console.log(index);
  //   searchResults.value[index].Quantity++;
  //   // console.log(existingItem.id);
  //   //searchResults.value[existingItem.id].Quantity = searchResults.value[existingItem.id].Quantity + 1;
  // } else {
  //   data[0].Quantity = 1;
  //   searchResults.value.push(...data);
  // }
  

  // tableData.value.concat(searchItems[0]);
  //console.log(searchResults);
};
</script>

<style scoped>

</style>