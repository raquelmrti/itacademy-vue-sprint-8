<script setup>
import { onMounted, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useStarshipStore } from "../stores/starshipStore";
import { useGlobalStore } from "../stores/globalStore";
import { storeToRefs } from "pinia";

const starshipStore = useStarshipStore();
const { isLoading, starshipId, starshipInfo, starshipImg, starshipPilots } = storeToRefs(
  starshipStore
);
const { fetchStarshipById, showStarshipPlaceholderImg } = starshipStore;

const globalStore = useGlobalStore();
const { getIdFromUrl } = globalStore;

const getPilotImages = (pilotUrls) => {
  return pilotUrls.map((pilotUrl) => {
    const id = getIdFromUrl(pilotUrl);
    return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
  });
};

onMounted(async () => {
  const route = useRoute();
  starshipId.value = route.params.id;
  starshipInfo.value = await fetchStarshipById(starshipId.value);

  starshipPilots.value = starshipInfo.value.pilots;

  starshipInfo.value.pilots_portraits = getPilotImages(starshipPilots.value);
});

const areThereNoPilots = computed(() => starshipPilots.value.length === 0);

onUnmounted(() => {
  starshipStore.$reset();
});
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else class="info-wrapper">
    <h1 class="name">{{ starshipInfo.name }}</h1>
    <img
      class="starship-img"
      :src="starshipImg"
      :alt="starshipInfo.name"
      :title="starshipInfo.name"
      @error="showStarshipPlaceholderImg"
    />

    <div class="detail-list">
      <dl class="list-1">
        <dt>Model:</dt>
        <dd>{{ starshipInfo.model }}</dd>
        <br />
        <dt>Starship class:</dt>
        <dd>{{ starshipInfo.starship_class }}</dd>
        <br />
        <dt>Manufacturer:</dt>
        <dd>{{ starshipInfo.manufacturer }}</dd>
        <br />
        <dt>Cost:</dt>
        <dd>{{ starshipInfo.cost_in_credits }} credits</dd>
      </dl>

      <dl class="list-2">
        <dt>Crew:</dt>
        <dd>{{ starshipInfo.crew }}</dd>
        <br />
        <dt>Passenger capacity:</dt>
        <dd>{{ starshipInfo.passengers }}</dd>
        <br />
        <dt>Cargo capacity:</dt>
        <dd>{{ starshipInfo.cargo_capacity }} tons</dd>
        <br />
        <dt>Consumables:</dt>
        <dd>{{ starshipInfo.consumables }}</dd>
      </dl>

      <dl class="list-3">
        <dt>Length:</dt>
        <dd>{{ starshipInfo.length }} meters</dd>
        <br />
        <dt>Maximum atmosphering speed:</dt>
        <dd>{{ starshipInfo.max_atmosphering_speed }} km/h</dd>
        <br />
        <dt>Hyperdrive rating:</dt>
        <dd>{{ starshipInfo.hyperdrive_rating }}</dd>
        <br />
        <dt>Maximum speed in realspace:</dt>
        <dd>{{ starshipInfo.MGLT }} MGLT</dd>
      </dl>

      <dl class="list-pilots">
        <dt>Pilots:</dt>
        <dd class="pilots-portraits-container">
          <p v-if="areThereNoPilots">Unavailable</p>
          <div
            v-else
            class="pilots-portraits"
            v-for="(portraitUrl, index) in starshipInfo.pilots_portraits"
            :key="index"
            :style="{ backgroundImage: `url(${portraitUrl})` }"
          >
            <router-link
              :to="{ name: 'characterInfo', params: { id: getIdFromUrl(portraitUrl) } }"
            ></router-link>
          </div>
        </dd>
      </dl>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/scss/_info-list.scss";

.starship-img {
  max-width: 600px;
}
</style>
