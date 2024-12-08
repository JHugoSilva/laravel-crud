<script setup>
import { ref } from 'vue';
import { userAuthStore } from '@/stores/authStore';
import httpService from '@/http';
import { useRouter } from 'vue-router';
const authStore = userAuthStore()
const form = ref({
    email: 'h@email.com',
    password: '123456789'
})

const submit = async () => {
        httpService
        .post("/v1/login", form.value)
        .then((resp) => {
          
           authStore.saveToken(resp.data.data.access_token)
           authStore.user = resp.data.data.user
        window.location.href = '/'
        })
        .catch((err) => console.log(err));
}
</script>
<template>
    <div class="mt-10 mx-20">
        <form @submit.prevent="submit" class="border rounded-lg p-4 w-1/2 flex flex-col gap-4">
            <label for="">Email</label>
            <input type="email" class="p-4 border" v-model="form.email">
            <label for="">Password</label>
            <input type="password" class="p-4 border" v-model="form.password">
            <button type="submit" class="mt-2 bg-green-400 p-4">Login</button>
        </form>
    </div>
</template>