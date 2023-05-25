<script setup>
import { onMounted, onUnmounted } from "vue";
import { useStarshipStore } from "../stores/starshipStore";
import { storeToRefs } from "pinia";

const store = useStarshipStore();
const { isLoading, isLoadingMoreStarships, starshipArray, currentPage } = storeToRefs(
  store
);
const { fetchStarships, loadMoreStarships } = store;

const getIdFromUrl = (url) => parseInt(url.match(/\d+/)[0]);

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
  <div v-if="isLoading">
    <p>Loading starships...</p>
  </div>
  <ul v-else class="starship-list-ul">
    <li
      class="starship-list-li"
      v-for="{ name, model, url } in starshipArray"
      :key="name"
    >
      <router-link :to="{ name: 'starshipInfo', params: { id: getIdFromUrl(url) } }">
        <h3 class="starship-name">{{ name }}</h3>
        <h4 class="starship-model">{{ model }}</h4>
      </router-link>
    </li>
  </ul>
  <div v-if="isLoadingMoreStarships">
    <p>Loading more starships...</p>
  </div>
</template>

<style scoped lang="scss">
.starship-list-ul {
  padding-inline-start: 0;

  .starship-list-li {
    padding: 1.3em;
    background-color: #ffffff09;
    margin-bottom: 1.5em;
    list-style-type: none;
    .starship-name {
      text-transform: uppercase;

    }

    .starship-model {
      font-weight: normal;
    }
  }
}
</style>
