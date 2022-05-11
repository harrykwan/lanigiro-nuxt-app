<template>
  <div class="botnav">
    <a :href="'uniwebview://openar?userid=' + nowuser.uid"
      ><img src="~/assets/boticon.png" style="width: 80px" class="boticon"
    /></a>
  </div>
</template>

<script setup>
const nowuser = useFirebaseAuth();
</script>

<style scoped>
.boticon {
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  z-index: 999;
  opacity: 0.9;
}

.botnav {
  position: fixed;
}
</style>
