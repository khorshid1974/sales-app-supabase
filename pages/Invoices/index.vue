<template>
    <div v-if="invoice_read" class="grid grid-cols-5 gap-4">
        <div class=" flex flex-col space-y-1">
           <!-- date filter section -->
        <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">Date Filter {{ firstDay }}</h3>
        <ul class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input @change="onChangeToday($event)"  id="list-radio-license" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="list-radio-license" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Today </label>
                </div>
            </li>
            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input @change="onChangeWeek($event)"  id="list-radio-id" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="list-radio-id" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">This Week</label>
                </div>
            </li>
            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input @change="onChangeMonth" id="list-radio-military" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="list-radio-military" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">This month</label>
                </div>
            </li>
            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input @change="onChangeCustom" id="list-radio-passport" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="list-radio-passport" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Custom</label>
                </div>
                <div v-show="customDateShow" class="flex flex-col m-1 p-1 text-sm rounded-md border border-zinc-100 bg-gray-100 dark:bg-zinc-400">
                    <div class="flex flex-row">
                        <label for="startDate">Start Date </label>
                        <input type="date"  v-model="firstDayinMonth" class=" bg-white dark:bg-zinc-400 text-black dark:text-white">
                       
                    </div>
                    <div class="flex flex-row">
                        <label for="endDate">End Date</label>
                        <input type="date" name="endDate" id="endDate" v-model="lastDayinMonth" class=" bg-white dark:bg-zinc-400 text-black dark:text-white">
                    </div>
                   
                    <button class="p-2 rounded-md bg-gray-100 dark:bg-zinc-950" @click="filterCustomeDate" type="button">Filter</button>
                  
                </div>
            </li>
        </ul>
            <!-- Paid Filter Section -->
        <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">Filter by Status</h3>
        <ul class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <!-- <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input id="vue-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="vue-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">All</label>
                </div>
            </li> -->
            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input  @change="showAll" id="react-checkbox" type="radio" value="" name="payment-list" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="react-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">All</label>
                </div>
            </li>
            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input @change="paidChange" id="react-checkbox" type="radio" value="" name="payment-list" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="react-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Paid</label>
                </div>
            </li>
            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input @change="partialChange" id="angular-checkbox" type="radio" value="" name="payment-list" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="angular-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Partail Paid</label>
                </div>
            </li>
            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input @change="notPaidChange" id="laravel-checkbox" type="radio" value="" name="payment-list" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="laravel-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Not paid</label>
                </div>
            </li>
        </ul>
        <!-- Invoice Type Filters -->
        <h3 class="mb-4 font-semibold text-gray-900 dark:text-white">Filter by Invoice Type</h3>
        <ul class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <!-- <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input id="vue-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="vue-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">All</label>
                </div>
            </li> -->
            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input  @change="showAllInvoiceTypes" id="react-checkbox" type="radio" value="" name="invoice-types" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="react-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">All</label>
                </div>
            </li>
            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input @change="showPurchaseInvoiceOnly" id="react-checkbox" type="radio" value="" name="invoice-types" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="react-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Purchase</label>
                </div>
            </li>
            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input @change="showReturnInvoiceOnly" id="angular-checkbox" type="radio" value="" name="invoice-types" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="angular-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Return</label>
                </div>
            </li>
            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input @change="showRejectedInvoiceOnly" id="laravel-checkbox" type="radio" value="" name="invoice-types" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="laravel-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Rejected</label>
                </div>
            </li>
        </ul>
        <!-- Payment Type Filters -->
        <h3 v-show="showPaymentSetion" class="mb-4 font-semibold text-gray-900 dark:text-white">Filter by Payment Type</h3>
        <ul v-show="showPaymentSetion"  class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <!-- <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input id="vue-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="vue-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">All</label>
                </div>
            </li> -->
            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input  @change="showAllPaymentsType" id="react-checkbox" type="radio" value="" name="payment-types" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="react-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">All</label>
                </div>
            </li>
            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input @change="showCashPaymentsOnly" id="react-checkbox" type="radio" value="" name="payment-types" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="react-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cash</label>
                </div>
            </li>
            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input @change="showLaterPaymentsOnly" id="angular-checkbox" type="radio" value="" name="payment-types" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="angular-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Later</label>
                </div>
            </li>
            <li class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div class="flex items-center ps-3">
                    <input @change="showInstallmentPaymentsOnly" id="laravel-checkbox" type="radio" value="" name="payment-types" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
                    <label for="laravel-checkbox" class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Installment</label>
                </div>
            </li>
        </ul>
        </div>
       
        <!-- Results in table format -->
        <div class=" col-span-4 rounded-md bg-gray-200 dark:bg-zinc-800 mt-6">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-2 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">Id</th>
                    <th scope="col" class="px-6 py-3">Code</th>
                    <th scope="col" class="px-6 py-3">Date</th>
                    <th scope="col" class="px-6 py-3">Amount</th>
                    <th scope="col" class="px-6 py-3">Payment</th>
                    <th scope="col" class="px-6 py-3">Type</th>
                    
                </tr>
            </thead>
            <tbody>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                 v-for="invoice in filterdInvoices" :key="invoice.id">
                    <td class="px-6 py-4">
                        <!-- <nuxt-link to='Invoices/${invoice.id}' > {{ invoice.id }}</nuxt-link> -->
                        {{ invoice.id }}
                       
                    </td>
                    <td class="px-6 py-4">
                       
                        <span v-if="!invoice_edit" > {{ invoice.Code }}</span>
                        <nuxt-link v-else :to="{ name: 'Invoices-id', params: { id: invoice.id }}"> {{ invoice.Code }}</nuxt-link>
                       
                    </td>
                    <td class="px-6 py-4">{{ convertStringToDate(invoice.created_at) }}</td>
                    <td class="px-6 py-4">{{ invoice.total}}</td>
                    <td class="px-6 py-4">{{ invoice.Payment}}</td>
                    <td class="px-6 py-4">
                        <Icon :name="iconName(invoice.invoicetypename)" :color="colorName(invoice.invoicetypename)" size="2em" />
                       
                    </td>
                </tr>
                <tr class=" bg-white text-zinc-800 dark:bg-zinc-700 dark:text-zinc-100">
                 
                    <td class="px-6 py-4"></td>
                    <td class="px-6 py-4 text-lg text-yellow-400">Sum</td>
                    <td colspan="4" class="px-6 py-4 font-bold text-xl">Sales:{{ sum }} $ - Costs:{{ sum_purchase }} = {{ sum-sum_purchase }}$</td>
                  
                </tr>
            </tbody>
        </table>
        </div>
        
    </div>
    <div>
        
    </div>
</template>

<script setup>
    import dayjs from 'dayjs';
    const { getRole } = useAdminUtliltes();
    const invoice_read = getRole('Invoice', 'read');
    // const invoice_add = getRole('Invoices', 'add') ;
    const invoice_edit = getRole('Invoice', 'edit') ;
    const paid = ref(false);
    const  getMonthStartEnd= (date)=> {
        const year = date.getFullYear();
        const month = date.getMonth();
        
        // Create the first day of the month
        const firstDay = new Date(year, month, 1);

        // Get the last day of the month by setting the day to 0 (which overflows to the previous month)
        const lastDay = new Date(year, month + 1, 0);

        return { firstDay, lastDay };
    }
    const invoices= ref([]);
    const filterdInvoices = ref([]);
    // const isFetching = ref(false);
    const customDateShow = ref(false);
    const firstDay = ref(new Date().toLocaleDateString());
    const firstDayinMonth = ref(dayjs(firstDay.value).startOf('month').format('YYYY-MM-DD'));
    // const someDate= dayjs(firstDay.value).format('YYYY-MM-DD');
    const lastDayinMonth= ref(dayjs(firstDay.value).endOf('month').format('YYYY-MM-DD'));
    const showPaymentSetion = ref(true);
    //console.log(lastDayinMonth);
    const iconName=(type)=>{
        if(type=='purchase') return 'arcticons:purchased-apps';
        if(type=='return') return 'tabler:truck-return';
        if (type=='damage')return 'icon-park-twotone:damage-map';
    }
    const colorName=(type)=>{
        if(type=='purchase') return 'green';
        if(type=='return') return 'yellow';
        if (type=='damage')return 'red';
    }
    onMounted(() => {
        console.log('mounted');
        // 
       
    });
    const today = new Date().toISOString().substr(0, 10) // Get today's date string;
    
    const supabase = useSupabaseClient();
    const { convertStringToDate } = useUtliltes();
    const fetchInvoicesToday= async () => {
       
        const todayStart = new Date().toISOString().split('T')[0]; // Get today's date string
        const todayEnd = todayStart + 'T23:59:59.999Z'; // Add time to end of day
        customDateShow.value = false;
        console.log('fetching invoices');
        const { data, error } = await supabase
        .from('view_for_invoice_list2')
        .select('*')
        .gte('created_at', todayStart) // Filter from today's start
        .lte('created_at', todayEnd); // Filter to today's end
        console.log(data);
        filterdInvoices.value = data;
        invoices.value = data;
        if (error) {
            console.error(error);
            return;
        }
            // console.log('fetching invoices');
            // const { data:data2, error:error2 } = await supabase
            //     .from('view_for_invoice_list2')
            //     .select()
            //     .order('created_at', { ascending: false });
            //     console.log(data2);
            // invoices.value = data2;
            // if (error2) {
            //     console.error(error2);
            //     return;
            // }
    }
   const fetchInvoices= async () => {
    const supabase = useSupabaseClient();
    console.log('fetching invoices');
        const { data, error } = await supabase
            .from('view_for_invoice_list2')
            .select()
            .order('created_at', { ascending: false });
            //console.log(data);
        invoices.value = data;
        if (error) {
            console.error(error);
            return;
        }
        // console.log('fetching invoices');
        // const { data:data2, error:error2 } = await supabase
        //     .from('view_for_invoice_list2')
        //     .select()
        //     .order('created_at', { ascending: false });
        //     console.log(data2);
        // invoices.value = data2;
        // if (error2) {
        //     console.error(error2);
        //     return;
        // }
    }
    const onChangeWeek = async () => {
        const today = new Date();
        const lastWeek = dayjs().subtract(7, 'day').format('YYYY-MM-DD'); // Calculate last week's date
        console.log(lastWeek);
        console.log(today.toLocaleDateString());
    //    console.log( dayjs().subtract(7, 'day').format('YYYY-MM-DD'));
        customDateShow.value = false;
        const { data, error } = await supabase
            .from('view_for_invoice_list2')
            .select('*')
            .gte('created_at', lastWeek) // Filter from today's start
            .lte('created_at', today.toLocaleDateString()); // Filter to today's end
        //console.log(data);
        filterdInvoices.value = data;
        invoices.value = data;
        if (error) {
            console.error(error);
            return;
        }
        //const [datePart] = invoices.value[0].created_at.split(",");
        // customDateShow.value = false;
        // if(!isFetching.value){
        //     await fetchInvoices();
        //     isFetching.value = true;
        // }
        
  
        //console.log(convertStringToDate(starDate));
        //console.log(currentDate);
        
       // filterdInvoices.value = invoices.value.filter(invoice => convertStringToDate(invoice.created_at) >= convertStringToDate(starDate) && convertStringToDate(invoice.created_at) <= convertStringToDate(currentDate));
    }
    const onChangeToday = async () => {
        customDateShow.value = false;
        fetchInvoicesToday();
        // //const [datePart] = invoices.value[0].created_at.split(",");
        // customDateShow.value = false;
        // if(!isFetching.value){
        //     await fetchInvoices();
        //     isFetching.value = true;
        // }
        // //console.log(convertStringToDate(invoices.value[0].created_at));
        // const currentDate = new Date();
        
        // //console.log(currentDate);
        // filterdInvoices.value = invoices.value.filter(invoice => convertStringToDate(invoice.created_at) == convertStringToDate(currentDate));
    }
    const onChangeMonth = async () => {
        customDateShow.value = false;
        // const today = new Date().toISOString().split('T')[0];
        // const year = today.split('-')[0];
        // const month = today.split('-')[1];

        // const monthStart = `<span class="math-inline">\{year\}\-</span>{month}-01`; // Format 1st day of month
        // const monthEnd = new Date(year, month, 0).toISOString().split('T')[0]; // Get last day of previous month (adjusted for accurate range)
        // const { data, error } = await supabase
        //     .from('view_for_invoice_list2')
        //     .select('*')
        //     .gte('created_at', monthStart) // Filter from start of month
        //     .lte('created_at', monthEnd); // Filter to end of previous month
        //const [datePart] = invoices.value[0].created_at.split(",");
        // customDateShow.value = false;
        // if(!isFetching.value){
        //     await fetchInvoices();
        //     isFetching.value = true;
        // }

        const currentDate = new Date();

        // Get the first and last day of the current month
        const { firstDay, lastDay } = getMonthStartEnd(currentDate);
        
        console.log("First day of the month:", firstDay.toLocaleDateString());
        console.log("Last day of the month:", lastDay.toLocaleDateString());
        const { data, error } = await supabase
            .from('view_for_invoice_list2')
            .select('*')
            .gte('created_at', firstDay.toLocaleDateString()) // Filter from today's start
            .lte('created_at', lastDay.toLocaleDateString()); // Filter to today's end
        console.log(data);
        filterdInvoices.value = data;
        invoices.value = data;
        if (error) {
            console.error(error);
            return;
        }
        //console.log(convertStringToDate(invoices.value[0].created_at));
     
        //console.log(currentDate);
        // filterdInvoices.value = invoices.value.filter(invoice => convertStringToDate(invoice.created_at) >= firstDay.toLocaleDateString() && convertStringToDate(invoice.created_at) <= lastDay.toLocaleDateString()) ;

    }
   const filterCustomeDate= async()=>  {
        customDateShow.value = true;
        console.log('filtering');
        console.log(firstDayinMonth);
        console.log(lastDayinMonth);
        const { data, error } = await supabase
            .from('view_for_invoice_list2')
            .select('*')
            .gte('created_at', firstDayinMonth.value) // Filter from today's start
            .lte('created_at', lastDayinMonth.value); // Filter to today's end
        console.log(data);
        filterdInvoices.value = data;
        invoices.value = data;
        if (error) {
            console.error(error);
            return;
        }
    }
    const onChangeCustom = async () => {
        customDateShow.value = true;
        
    }
    const sum= computed(() => {
        if(filterdInvoices.value.length==0) return 0;
        //return searchResults.value.reduce(x=>x.SalePrice).sum();
        const total= filterdInvoices.value.reduce((acc, obj) => acc + (obj.total), 0);
       // payment.value=total;
        return total;
    });
    const sum_purchase= computed(() => {
        if(filterdInvoices.value.length==0) return 0;
        //return searchResults.value.reduce(x=>x.SalePrice).sum();
        const total= filterdInvoices.value.reduce((acc, obj) => acc + (obj.total_purchase), 0);
       // payment.value=total;
        return total;
    });
    const partialChange = async () => {
        filterdInvoices.value = invoices.value.filter(invoice => invoice.Payment != 0 && invoice.Payment < invoice.total);  
    }
    const notPaidChange = async () => {
        filterdInvoices.value = invoices.value.filter(invoice => invoice.Payment == 0);  
    }
    const paidChange = async () => {
        filterdInvoices.value = invoices.value.filter(invoice => invoice.Payment != 0);
    }
    const showAll = async () => {
        filterdInvoices.value = invoices.value;
    }
    const showAllInvoiceTypes= async () => {
        filterdInvoices.value = invoices.value;
        showPaymentSetion.value = true;
    }
    const showPurchaseInvoiceOnly= async () => {
        filterdInvoices.value = invoices.value.filter(invoice => invoice.invoicetypename == 'purchase');
        showPaymentSetion.value = true;
    }
    const showReturnInvoiceOnly= async () => {
        filterdInvoices.value = invoices.value.filter(invoice => invoice.invoicetypename == 'return');
        showPaymentSetion.value = false;
    }
    const showRejectedInvoiceOnly= async () => {
        filterdInvoices.value = invoices.value.filter(invoice => invoice.invoicetypename == 'damage');
        showPaymentSetion.value = false;
    }
    const showAllPaymentsType= async () => {
        filterdInvoices.value = invoices.value;
    }
    const showCashPaymentsOnly= async () => {
        filterdInvoices.value = invoices.value.filter(invoice => invoice.paymentname == 'cash');
    }
    const showLaterPaymentsOnly= async () => {
        filterdInvoices.value = invoices.value.filter(invoice => invoice.paymentname == 'later');
    }
    const showInstallmentPaymentsOnly= async () => {
        filterdInvoices.value = invoices.value.filter(invoice => invoice.paymentname == 'installment');
    }
</script>