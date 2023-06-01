<script setup>
import { onMounted, onUnmounted } from "vue";
import { useCharacterStore } from "../stores/characterStore";
import { useGlobalStore } from "../stores/globalStore";
import { storeToRefs } from "pinia";

const globalStore = useGlobalStore();
const { getIdFromUrl } = globalStore;

const characterStore = useCharacterStore();
const {
  isLoadingCharacterList,
  isLoadingMoreCharacters,
  characterArray,
  currentPage,
} = storeToRefs(characterStore);
const { fetchCharacters, loadMoreCharacters } = characterStore;

// infinite scrolling
const handleScroll = () => {
  const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
  if (endOfPage) loadMoreCharacters();
};

onMounted(async () => {
  const data = await fetchCharacters();
  characterArray.value = data.results;
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  currentPage.value = 1;
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div v-if="isLoadingCharacterList">
    <p>Loading characters...</p>
  </div>
  <ul v-else>
    <li class="list-view-li" v-for="{ name, url } in characterArray" :key="name">
      <router-link :to="{ name: 'characterInfo', params: { id: getIdFromUrl(url) } }">
        <h3 class="name">{{ name }}</h3>
      </router-link>
    </li>
  </ul>
  <div v-if="isLoadingMoreCharacters">
    <p>Loading more characters...</p>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/scss/list-views";
</style>
