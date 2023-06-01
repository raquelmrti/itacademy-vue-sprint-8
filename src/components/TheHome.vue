<script setup>
import PrimaryButton from "../components/PrimaryButton.vue";
</script>

<template>
  <h1>Welcome to the Star Wars Universe, where the stars are your guides.</h1>

  <p>
    Ever wanted a handy website to check up on every little detail of the Star Wars
    franchise? You're on the right place! Immerse yourself in the captivating stories,
    unforgettable characters, and thrilling battles.
  </p>

  <p>Start your adventure now and may the Force be with you!</p>

  <RouterLink :to="{ name: 'starshipList' }">
    <PrimaryButton text="Start" />
  </RouterLink>
</template>

<style scoped>
h1 {
  line-height: 1.2em;
  font-weight: bold;
}

p {
  margin: 1em 0;
}
</style>
