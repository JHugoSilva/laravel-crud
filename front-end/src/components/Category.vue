<script setup>
import { onMounted, ref } from 'vue';
import httpService from '../http';

const categories = ref([])
const isActive = ref(null)

const emit = defineEmits(['filterFood'])

onMounted(() => {
  httpService.get('v1/categories')
    .then((resp) => {
      categories.value = resp.data.data
    }).catch(err => console.log(err))
})

const filter = (id, index) => {
  isActive.value = index
  emit('filterFood', id)
}
</script>
<template>
  <div>
    <div class="bg-white py-6 sm:py-8 lg:py-12">
      <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div class="overflow-x-auto">
          <div class="flex space-x-4 gap-8">
            <a :class="{'bg-slate-300': isActive == index}" v-for="(item, index) in categories" :key="index"  @click="filter(item.id, index)"
              class="group block rounded-lg overflow-hidden flex-shrink-0 w-25 hover:bg-slate-300">
              <img :src="item.icon" alt="Category" class="w-full h-24 sm:h-24 object-cover rounded-lg">
              <div class="mt-2 text-center flex justify-center">
                <h3 class="text-lg text-gray-900 font-medium">{{ item.name }}</h3>
                <svg v-if="isActive == index" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                  stroke="currentColor" class="size-5 text-green-600">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>

              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>