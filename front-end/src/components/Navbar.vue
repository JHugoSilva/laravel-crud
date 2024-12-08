<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { userAuthStore } from '@/stores/authStore';
import http  from '../http';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
const router = useRouter()
const authStore = userAuthStore()
const search = ref('')
const userDropdown = ref(false)
const isMobileMenuVisible = ref(false)
const emit = defineEmits(['search'])
const {addCart} = storeToRefs(authStore)
watch(search, (value) => {
    if (value.length >= 3)
        emit('search', value)
    if (value.length <= 3)
        emit('search', value)
})

const toogleDropdown = (event) => {
    event.stopPropagation()
    userDropdown.value = !userDropdown.value
}

const toogleMobileMenu = (event) => {
    event.stopPropagation()
    isMobileMenuVisible.value = !isMobileMenuVisible.value
}

const handleClickDropdown = () => {
    if (userDropdown.value) {
        userDropdown.value = false
    }
    if (isMobileMenuVisible.value) {
        isMobileMenuVisible.value = false
    }
}

const handleLogout = () => {
    http.delete('/v1/logout',null).then(resp => {
        authStore.cartShopping = 0
        authStore.clearToken()
        router.push('/')
    }).catch(err => console.log(err))
}

onMounted(() => {
    authStore.getUser()
    authStore.getTotalCard()
    document.addEventListener('click', handleClickDropdown)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickDropdown)
})
</script>
<template>
    <div>
        <nav class="bg-blue-400 shadow">
            <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                {{  addCart }}
                <div class="relative flex items-center justify-between h-16">
                    <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <!-- Mobile menu button-->
                        <button @click="toogleMobileMenu" id="mobile-menu-button" ref="mobileMenuButton" type="button"
                            class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu" aria-expanded="false">
                            <span class="sr-only">Open main menu</span>
                            <!-- Icon when menu is closed. -->
                            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <!-- Icon when menu is open. -->
                            <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div class="flex-shrink-0 mt-1">
                            <a href="#" class="text-xl font-bold">Brand</a>
                        </div>
                        <div class="hidden sm:block sm:ml-6">
                            <div class="flex space-x-4">
                                <RouterLink to="/" exactActiveClass="bg-gray-200"
                                    class="text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200">
                                    Home</RouterLink>
                                <RouterLink to="Contact" exactActiveClass="bg-gray-200"
                                    class="text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200">
                                    Contact</RouterLink>
                                <div>
                                    <form action="">
                                        <input type="text" v-model="search"
                                            class="mt-1 p-1 rounded-lg border-gray-300 border-2 bg-blue-300 placeholder-slate-600"
                                            placeholder="Search Menu">
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <RouterLink to="/Cart" class="flex relative hover:cursor-pointer hover:bg-gray-200 hover:rounded-full mr-10">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                              </svg>
                             <div v-if="authStore.cartShopping > 0" class="absolute bottom-2 left-5 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {{ authStore.cartShopping }}
                             </div> 
                        </RouterLink>
                        <div class="relative dropdown">
                            <div v-if="authStore.token">
                                <div class="flex gap-2">
                                    <div class="mt-1 ml-2 mr-2">{{ authStore.user?.name }}</div>
                                    <button type="button" @click="toogleDropdown"
                                        class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                        id="user-menu-button" ref="userMenuButton" aria-expanded="false"
                                        aria-haspopup="true">
                                        <span class="sr-only">Open user menu</span>
                                        <img class="h-8 w-8 rounded-full" :src="authStore.user?.photo_profile" alt="">
                                    </button>
                                </div>
                                <!-- Dropdown menu -->
                                <div v-show="userDropdown" @click.stop
                                    class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dropdown-content"
                                    role="menu" aria-orientation="vertical" ref="dropdownContent"
                                    aria-labelledby="user-menu-button" tabindex="-1">
                                    <div @click="handleLogout" class="block px-4 py-2 text-sm text-gray-700 cursor-pointer" role="menuitem">Logout</div>
                                </div>
                            </div>
                            <div v-else>
                                <RouterLink to="/Login">
                                    <div class="flex gap-2">
                                        <button type="button"
                                            class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                            id="user-menu-button" ref="userMenuButton" aria-expanded="false"
                                            aria-haspopup="true">
                                            <span class="sr-only">Open user menu</span>
                                            <img class="h-8 w-8 rounded-full" src="https://via.placeholder.com/150"
                                                alt="">
                                        </button>

                                        <div class="mt-1 ml-1">Sign In</div>
                                    </div>
                                </RouterLink>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile menu, show/hide based on menu state. -->
            <div v-show="isMobileMenuVisible" ref="mobileMenu" id="mobile-menu">
                <div class="px-2 pt-2 pb-3 space-y-1">
                    <RouterLink to="/"
                        class="text-gray-900 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-200">
                        Home</RouterLink>
                    <RouterLink to="Contact"
                        class="text-gray-900 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-200">
                        Contact</RouterLink>
                </div>
            </div>
        </nav>
    </div>
</template>