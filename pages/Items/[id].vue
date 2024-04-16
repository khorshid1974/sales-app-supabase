<template>
    <div>
        <invoice-toast v-show="showToast"> Sussfeull added item </invoice-toast>
        <form>
            <div>
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="item.Name">
            </div>
            <div>
                <label for="salePrice">Sale Price:</label>
                <input type="number" id="salePrice" v-model="item.SalePrice">
            </div>
            <div>
                <label for="code">Code:</label>
                <input type="text" id="code" v-model="item.Code">
            </div>
            <div>
                <label for="purchasePrice">Purchase Price:</label>
                <input type="number" id="purchasePrice" v-model="item.PurchasePrice">
            </div>
            <div>
                <label for="quantity">Quantity:</label>
                <input type="number" id="quantity" v-model="item.Quantity" @change="askForReason">
            </div>
            <button type="button" @click="Save">Add Item</button>
        </form>
      
    
    </div>
</template>

<script setup>
const supabase= useSupabaseClient();
const route = useRoute()
const item= ref(Object);
const id= route.params.id;
//const reason= ref('');
const showToast= ref(false);
const {data, error} = await supabase.from('Item').select().eq('id', id);
if(error) {
    console.log(error);
} else {
    console.log(data);
    if(data.length>0) {
        item.value = data[0];
    }
   
}   
const askForReason= ()=> {
    
        const reason= prompt('Please enter the reason for changing quantity');
        if(reason) {
            item.value.note_for_adjustment= reason;
        }
    
}
const Save= async ()=> {
    const {data, error} = await supabase.from('Item').update(item.value).eq('id', id);
    if(error) {
        console.log(error);
    } else {
        console.log(data);
        showToast.value= true;
        setTimeout(()=> {
            showToast.value= false;
        }, 3000);
        navigateTo('/Items');
    }
}
</script>


<style  scoped>
form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 300px;
}
label {
    font-weight: bold;
}
input {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
}
button {
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #f2f2f2;
}
button:hover {
    background-color: #e2e2e2;
}
div {
    display: flex;
    flex-direction: column;
}
</style>