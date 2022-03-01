<template>
  <div>
    <NavBar />
    <Product />
    <Footer />
  </div>
</template>
<script setup>
const nowuser = useFirebaseAuth();
</script>
