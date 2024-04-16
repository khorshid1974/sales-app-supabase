<template>
    <div>
        <invoice-toast v-show="showToast"> Sussfeull added item </invoice-toast>
        <form>
            <div>
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="name">
            </div>
            <div>
                <label for="salePrice">Sale Price:</label>
                <input type="number" id="salePrice" v-model="salePrice">
            </div>
            <!-- <div>
                <label for="code">Code:</label>
                <input type="text" id="code" v-model="code">
            </div> -->
            <div>
                <label for="purchasePrice">Purchase Price:</label>
                <input type="number" id="purchasePrice" v-model="purchasePrice">
            </div>
            <div>
                <label for="quantity">Quantity:</label>
                <input type="number" id="quantity" v-model="quantity">
            </div>
            <button type="button" @click="Save">Add Item</button>
        </form>
      
    </div>
</template>

<script setup>
const name= ref('');
const salePrice= ref(0);

const purchasePrice= ref(0);
const quantity= ref(0);
const showToast= ref(false);
const { generateProductCode }= useUtliltes();

const supabase= useSupabaseClient();
const Save= async ()=> {
    const newItem= {
        Name:name.value,
        SalePrice: salePrice.value,
        Code: generateProductCode(),
        PurchasePrice: purchasePrice.value,
        Quantity: quantity.value,
        CategoryId:1,
        CompanyId:1
    }
    //console.log(newItem);
    const {data, error} = await supabase.from('Item').insert(newItem);
    if(error) {
        console.log(error);
    } else {
        showToast.value= true;
        setTimeout(()=> {
            showToast.value= false;
        }, 3000);
        name.value= '';
        salePrice.value= 0;
        purchasePrice.value= 0;
        quantity.value= 0;
        
        console.log(data);
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