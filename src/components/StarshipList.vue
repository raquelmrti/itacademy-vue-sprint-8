<script setup>
import { RouterLink } from "vue-router";
import { onMounted } from "vue";
import { getStarships, getData } from "@/services/StarWarsService";

const starshipsArray = getStarships();

onMounted(async () => {
  await getData();
});
</script>

<template>
  <ul class="starships-list">
    <li v-for="{ name, model } in starshipsArray" :key="name">
      <router-link :to="`/starships/${name}`"> {{ name }} - {{ model }} </router-link>
    </li>
  </ul>
</template>

<style scoped></style>
