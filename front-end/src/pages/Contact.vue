<script setup>
import { userAuthStore } from '@/stores/authStore';

const authStore = userAuthStore()

</script>
<template>
    <div>
        <h1>Contact Page</h1>
        <button @click="authStore.changeUser('Admin')">Change</button> {{ authStore.user }}
    </div>
</template>