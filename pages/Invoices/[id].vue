<template>
    <div>
        <!-- <h1>Invoice {{ route.params.id }}</h1> -->
        
        <div  class="flex flex-row justify-around border-b-2 border-t-2 py-2 mt-2">
            <p> <span class=" font-semibold">Code:</span> <span class=" text-gray-400 font-mono">{{ invoice.Code}}</span> </p>
            <p v-if="invoice.Customer"> <span class=" font-semibold">Customer:</span> <span class=" text-gray-400 font-mono">{{ invoice.Customer.Name }}</span></p>
            <p><span class=" font-semibold">Created At:</span>  <span class=" text-gray-400 font-mono">{{ convertStringToDate(invoice.created_at) }}</span> </p>  
        </div>
        <InvoiceEditValue :isOpen="isOpen" @close="close" @insert="insert" >
            <div class="flex flex-row justify-end space-x-2">
                <label for="Quantity" class="text-lg text-yellow-800 border rounded-md p-2">Quantity</label>
                <input class="border rounded-md p-2" type="number" id="Quantity" name="Quantity" placeholder="Quantity" v-model="quantity">
            </div>
        </InvoiceEditValue>
        
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th  scope="col" class="px-6 py-3">Item</th>
                    <th  scope="col" class="px-6 py-3">Quantity</th>
                    <th  scope="col" class="px-6 py-3">Price</th>
                    <th  scope="col" class="px-6 py-3">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" 
                v-for="item in invoice.InvoiceItems" :key="item.id">
                    <td  class="px-6 py-4">{{ item.ItemName }}</td>
                    <!-- <td @click="openEdit(item)" class="px-6 py-4">{{ item.Quantity }}</td> -->
                    <td class="px-6 py-4">{{ item.Quantity }}</td>
                    <td class="px-6 py-4">{{ item.SalePrice }}</td>
                    <td class="px-6 py-4">{{ item.Quantity * item.SalePrice }}</td>
                </tr>
                <tr class="  text-gray-500 dark:text-gray-400">
                  <td class="px-6 py-4"></td>
                    <td class="px-6 py-4"></td>
                    <td class="px-6 py-4 text-l text-zinc-500 font-bold">Sum</td>
                    <td colspan="2" class="px-6 py-4 text-zinc-400 text-xl  bg-slate-100 font-semibold"> {{ sum }} $</td>
                  
                </tr>
            </tbody>
        </table>
        <div class="flex flex-col justify-end border-gray-500 space-y-2 mt-3">
          <div class="flex flex-row justify-end space-x-2">
            <!-- <label for="Amount" class="text-lg text-yellow-800 border rounded-md p-2">Amount</label>
            <input class="border rounded-md p-2" type="number" id="Amount" name="Amount" placeholder="Amount" v-model="sum"> -->
            <label for="payment" class="text-lg text-yellow-800 border rounded-md p-2">Payment</label>
             
            <input  v-if="canEditPayment()" class="border rounded-md p-2" type="number"  id="payment" name="payment" placeholder="Payment" v-model="payment">
            <label v-else class="text-lg text-yellow-800 border rounded-md p-2">{{ payment }} $</label>
          </div>
          <div class="flex flex-row justify-end space-x-2">
            <label for="payment" class="text-lg text-yellow-800 border rounded-md p-2">Reminder</label>

            <label for="reminder" class="text-lg text-yellow-800 border rounded-md p-2">{{ sum-payment }} $</label>
            
          </div>
       </div>
       
      <button class=" noprint p-3 m-2 text-xl text-yellow-200 rounded-lg border-x-black bg-zinc-500" type="button" @click="saveInvoice">Save</button>
    </div>
</template>

<script setup>
const route = useRoute()
const isOpen = ref(false);
const invoice= ref(Object);
const sum= ref(0);
const payment = ref(0);
const quantity = ref(0);
const oldQuantity = ref(0);
const currentitem = ref(Object);
const itemStock= ref(0);


onMounted(async () => {
    console.log('mounted');
   await getInvoice();
   
});
const openEdit = (item) => {
  console.log('openEdit');
    currentitem.value = item;
  isOpen.value = true;
}
const close= () => {
  //console.log('close');
  isOpen.value = false;
   sum.value= invoice.value.InvoiceItems.reduce((acc, obj) => acc + (obj.SalePrice * obj.Quantity), 0);
    payment.value=sum.value;
}
const insert= () => {
  console.log('insert');
  const currentitemIndex = invoice.value.InvoiceItems.findIndex(x=>x.id==currentitem.value.id);
  oldQuantity.value=invoice.value.InvoiceItems[currentitemIndex].Quantity;
  invoice.value.InvoiceItems[currentitemIndex].Quantity=quantity.value;
//   console.log(filterdItemsForStock.value);
//   searchResults.value.push(...filterdItemsForStock.value);
//   console.log('insert');
  //isOpen.value = false;
}
const { convertStringToDate } = useUtliltes();
const getInvoice = async () => {
    const supabase = useSupabaseClient();
    const { data, error } = await supabase
        .from('Invoice')
        .select(`Code, CustomerId, created_at, id, InvoiceItems (*), Customer (Name), Payment, PaymentTypeId`)
        .eq('id', route.params.id);
        console.log(data);
    invoice.value = data[0];
    sum.value= data[0].InvoiceItems.reduce((acc, obj) => acc + (obj.SalePrice * obj.Quantity), 0);
    payment.value=sum.value;
    if (error) {
        console.error(error);
        return;
    }
}
const saveInvoice = async () => {  // update invoice item quantity
    const supabase = useSupabaseClient();
    const { data, error } = await supabase
        .from('InvoiceItems')
        .update({ Quantity: currentitem.value.Quantity })
        .eq('id', currentitem.value.id);
    if (error) {
        console.error(error);
        return;
    }
    //console.log(currentitem.value);
   // get item quantity from Item table
    const { data:data2, error:error2 } = await supabase
        .from('Item')
        .select(`Quantity`)
        .eq('id', currentitem.value.Itemid);
    if (error2) {
        console.log('error in get item quantity');
        console.error(error2);
        return;
    } else {
        console.log(data2);
        itemStock.value=data2[0].Quantity;
    }
    // update invoice table payment
    const { data:data1, error:error1 } = await supabase
        .from('Invoice')
        .update({ Payment: payment.value})
        .eq('id', route.params.id);
    if (error1) {
        console.log('error in update invoice');
        console.error(error1);
        return;
    } else {
        console.log(data1);
    }
    // update item table quantity stock
    const { data:data3, error:error3 } = await supabase
        .from('Item')
        .update({  Quantity: itemStock.value+ oldQuantity.value - quantity.value })
        .eq('id', currentitem.value.Itemid);
    if (error3) {
        console.log('error in update Item quantity');
        console.error(error3);
        return;
    }
   
}
const canEditPayment = () => {
  return invoice.value.PaymentTypeId == 2 && invoice.value.Payment == 0;
}
// const sum= computed( () => {
//   //if(invoice.value.InvoiceItems.length==0) return 0;
//   //return searchResults.value.reduce(x=>x.SalePrice).sum();
//   const Invoiceitems = invoice.value.InvoiceItems;
  
//   console.log(Invoiceitems);
// //   const summ= Invoiceitems.reduce((acc, obj) => acc + (obj.SalePrice * obj.Quantity), 0);
 
//   return 100;
// });
</script>

<style scoped>
@media print {
    .noprint {display:none;}
}
</style>