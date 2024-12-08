<script setup>
import httpService from '@/http';
import { userAuthStore } from '@/stores/authStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = userAuthStore()
const router = useRouter()

defineProps({
  dataFood: Object
})

const isVisible = ref(false)
const dataModal = ref('')

const addMenu = async (idMenu, menuPrice) => {
  if (authStore.isLoggin) {
    
    await httpService.post('/v1/carts',{
      food_id: idMenu,
      quantity: 1,
      price: menuPrice
    })
    .then(resp => console.log(resp))
    .catch(err => console.log(err))
    authStore.getTotalCard()
  } else {
    router.push('/login')
  }
}

const close = () => {
  isVisible.value = false
}

const showModal = (food) => {
  isVisible.value = true
  dataModal.value = food
}

const formatMoney = (money) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(money)
}
</script>
<template>
  <div>
    <div class="bg-gray-100 py-6 sm:py-8 lg:py-12">
      <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <!-- Card 1 -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden" v-for="(food, index) in dataFood.data"
            :key="index">
            <img :src="food.image" alt="Menu" class="w-full h-32 sm:h-48 object-cover">
            <div class="p-4">
              <h3 class="text-lg text-gray-900 font-medium">{{ food.name }}</h3>
              <div class="mt-2 text-lg font-semibold text-gray-900">$ {{ formatMoney(food.price) }}</div>
              <div class="mt-4 flex items-center justify-between">
                <button @click="addMenu(food.id, food.price)" class="text-gray-900 bg-gray-200 hover:bg-gray-300 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
                  </svg>
                </button>
                <button @click="showModal(food)" class="text-gray-900 bg-gray-200 hover:bg-gray-300 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 7H7v6h6V7z" />
                    <path fill-rule="evenodd"
                      d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zM2 5a4 4 0 014-4h8a4 4 0 014 4v10a4 4 0 01-4 4H6a4 4 0 01-4-4V5z"
                      clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div @click.self="close" v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <button class="close-button mb-10" @click="close">&times;</button>
        <div class="mx-4">
          <h4 class="text-lg font-bold">{{ dataModal.name }}</h4>
          <span v-html="dataModal.description"></span>
        </div>
      </div>
    </div>
    <!-- End Modal -->
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  max-width: 500px;
  width: 100%;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>