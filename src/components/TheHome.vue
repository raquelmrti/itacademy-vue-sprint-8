<script setup>
  import PrimaryButton from "../components/PrimaryButton.vue"
</script>

<template>
  <h1>Welcome to the Star Wars Universe, where the stars are your guides.</h1>

  <p>
    Explore the legendary starships that have roamed the cosmos, from the famous Millennium Falcon to the powerful Star Destroyers. Immerse yourself in the captivating stories, unforgettable characters, and thrilling battles. Our website is your portal to dive into and discover everything related to the beloved franchise.
  </p>

  <p>Start your adventure now and may the Force be with you!</p>

  <RouterLink RouterLink :to="{ name: 'starshipList' }">
    <PrimaryButton text="Start"/>
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
