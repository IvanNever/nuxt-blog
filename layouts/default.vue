<template>
  <div>
    <TheHeader @sidenavToggle="displaySidenav = !displaySidenav"/>
    <TheSidenav
      :show="displaySidenav"
      @close="displaySidenav = false"
    />
    <Nuxt />
  </div>
</template>

<script>
import TheHeader from '@/components/Navigation/TheHeader.vue';
import TheSidenav from '@/components/Navigation/TheSidenav.vue'

export default {
 components: {
   TheHeader,
   TheSidenav
 },
 data() {
   return {
     displaySidenav: false
   }
 }
}
</script>

<style>
html {
  font-family: 'Open Sans', sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
