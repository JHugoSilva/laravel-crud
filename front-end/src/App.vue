<script setup>
  import Navbar from './components/Navbar.vue';
  import Footer from './components/Footer.vue';
  import { provide, ref } from 'vue';

  const emitData = ref('')

  const handleSearch = (data) => {
    emitData.value = data
  }

  provide('navbarSearch', emitData)
</script>
<template>
  <div>
    <!--Navbar-->
    <Navbar @search="handleSearch"/>
    <!--end Navbar-->
 
    <!-- Content Section -->
    <RouterView />
    <!-- End Content-->

    <!-- Footer Section -->
    <Footer />
    <!--End Footer-->
  </div>
</template>