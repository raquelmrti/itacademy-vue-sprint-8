<script setup>
import { onMounted, onUnmounted } from "vue";
import { useStarshipStore } from "../stores/starshipStore";
import { useGlobalStore } from "../stores/globalStore";
import { storeToRefs } from "pinia";

const globalStore = useGlobalStore();
const { getIdFromUrl } = globalStore;

const starshipStore = useStarshipStore();
const {
  isLoadingStarships,
  isLoadingMoreStarships,
  starshipArray,
  currentPage,
} = storeToRefs(starshipStore);
const { fetchStarships, loadMoreStarships } = starshipStore;

// infinite scrolling
const handleScroll = () => {
  const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
  if (endOfPage) loadMoreStarships();
};

onMounted(async () => {
  await fetchStarships();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  currentPage.value = 1;
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div v-if="isLoadingStarships">
    <p>Loading starships...</p>
  </div>
  <ul v-else class="starship-list-ul">
    <li class="list-view-li" v-for="{ name, model, url } in starshipArray" :key="name">
      <router-link :to="{ name: 'starshipInfo', params: { id: getIdFromUrl(url) } }">
        <h3 class="name">{{ name }}</h3>
        <h4 class="starship-model">{{ model }}</h4>
      </router-link>
    </li>
  </ul>
  <div v-if="isLoadingMoreStarships">
    <p>Loading more starships...</p>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/scss/list-views.scss";
.starship-model {
  font-weight: normal;
}
</style>
