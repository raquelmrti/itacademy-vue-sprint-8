<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="starships">Starships</router-link>
  </nav>
    <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  gap: 2em;
  margin-bottom: 2em;
}

</style>
