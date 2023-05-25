<script setup>
import TheHeader from './components/TheHeader.vue'
</script>

<template>
  <TheHeader />
  <main>
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
main {
  max-width: 900px;
  margin: 0 auto;
  padding: 2em;

  @media only screen and (min-width: 700px) {
    width: 85%;
  }
}
</style>
