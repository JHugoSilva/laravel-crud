<script setup>
import { inject, onMounted, ref, watch } from 'vue';
import httpService from '../http';
import Category from '../components/Category.vue';
import ListFoods from './ListFoods.vue';


const foods = ref([])
const navbarData = inject('navbarSearch')

watch(navbarData, (value)=>{
    console.log(value);
})

onMounted(async()=>{
 await httpService.get('v1/foods')
  .then((resp) =>{
    foods.value = resp.data.data
    }).catch(err => console.log(err))
})

const isFilter = async (id) => {
    await httpService.get('v1/foods?category_id='+id)
    .then((resp) =>{
        foods.value = resp.data.data
        }).catch(err => console.log(err))
}

watch(navbarData, async(value)=>{
    await httpService.get('v1/foods?search='+value)
    .then((resp) =>{
        foods.value = resp.data.data
        }).catch(err => console.log(err))
})

</script>

<template>
    <div>
        <Category @filterFood="isFilter"/>
        <ListFoods :dataFood="foods"/>
    </div>
</template>