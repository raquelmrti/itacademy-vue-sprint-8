<script setup>
import { onMounted } from "vue";
import { useStarshipStore } from "../stores/starshipStore";
import { storeToRefs } from "pinia";

const store = useStarshipStore();
const { starshipArray } = storeToRefs(store);
const { fetchAllStarships } = store;

onMounted(async () => {
  await fetchAllStarships();
});

function getIdFromUrl(url) {
  return parseInt(url.match(/\d+/)[0]);
}
</script>

<template>
  <ul>
    <li v-for="{ name, model, url } in starshipArray" :key="name">
      <router-link :to="{ name: 'starshipInfo', params: { id: getIdFromUrl(url) } }">
        {{ name }} - {{ model }}
      </router-link>
    </li>
  </ul>
</template>
