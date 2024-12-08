<script setup>
import { computed, onMounted, ref } from 'vue';
import httpService from '@/http';
import { userAuthStore } from '@/stores/authStore';

const data = ref([])
const useStore = userAuthStore()

const getData = () => {
    httpService.get('/v1/carts')
        .then(resp => data.value = resp.data.data)
        .catch(err => console.log(err))
}

const totalPrice = computed(()=>{
    return data.value.reduce((acc, item) => {
        return acc += (parseInt(item.price) * item.quantity)
    },0)
})

const decrement = (index) => {
    if (data.value[index].quantity > 1) {
        data.value[index].quantity--
    }
    updateMenu(data.value[index])
}

const increment = (index) => {
    data.value[index].quantity++
    updateMenu(data.value[index])
}

const updateMenu = (product) => {
    httpService.put('/v1/carts/'+product.id, {
        food_id: product.food.id,
        quantity: product.quantity,
        price: product.price,
    }).then(resp => console.log(resp)).catch(err => console.log(err))
}

const validateQuantity = (index) => {
    if (data.value[index].quantity < 1 || isNaN(data.value[index].quantity)) {
        data.value[index].quantity = 0
    }
    updateMenu(data.value[index])
}

const deleteMenu = (idCart, index) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this items?')

    if (isConfirmed) {
        httpService.delete('/v1/carts/'+idCart).then(resp => {
            if (resp.data.success) {
                data.value.splice(index, 1)
                useStore.getTotalCard()
            }
        }).catch(err => console.log(err))
    } else {
        alert('Delete canceled')
    }
}

onMounted(async ()=>{
    await getData();
})


</script>
<template>
    <div class="bg-gray-100 flex items-center justify-center md:min-h-screen pt-8">
        <div class="lg:w-1/2 w-full bg-white shadow-md rounded-lg p-6">
            <h2 class="text-xl font-bold mb-4">Your Cart</h2>
        <div>
            <div v-for="(item,index) in data" :key="index" class="flex items-center justify-between mb-4">
                <div @click="deleteMenu(item.id, index)" class="text-red-500 pr-2 hover:cursor-pointer">
                    X
                </div>
                <img :src="item.food.image" alt="" class="w-16 h-16 rounded-full">
            
                <div class="ml-4 flex-grow">
                    <h3 class="text-lg font-semibold">{{ item.food.name }}</h3>
                    <div class="text-sm">{{ item.price }}</div>
                </div>
                <div class="flex items-center space-x-2">
                    <button @click="decrement(index)" class="bg-red-500 text-white px-2 py-1 rounded">-</button>
                    <input type="text" @input="validateQuantity(index)" v-model.number="item.quantity" class="px-4 py-1 border border-gray-300 rounded w-20 text-center">
                    <button @click="increment(index)" class="bg-green-500 text-white px-2 py-1 rounded">+</button>
                </div>
               <div class="ml-2 font-bold">
                Rp. {{ item.price * item.quantity }}
               </div>
            </div>
        </div>
        <div class="flex justify-between mt-6">
            <span class="text-lg font-bold">Total</span>
            <span class="text-lg font-bold">Rp. {{ totalPrice }}</span>
        </div>
        <div class="flex justify-between mx-2 mt-4">
            <button class="p-2 rounded-lg bg-fuchsia-500 text-white">Buy Cash</button>
            <button class="p-2 rounded-lg bg-green-500 text-white">Transfer</button>
        </div>
    </div>
</div>

</template>