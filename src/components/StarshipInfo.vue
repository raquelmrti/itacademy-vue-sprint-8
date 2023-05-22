<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStarshipStore } from "../stores/starshipStore";
import { storeToRefs } from "pinia";

const store = useStarshipStore();
const { starshipId, starshipInfo, starshipImg } = storeToRefs(store);
const { fetchStarshipById, showStarshipPlaceholderImg } = store;

onMounted(async () => {
  const route = useRoute();
  starshipId.value = route.params.id;
  await fetchStarshipById(starshipId.value);
});
</script>

<template>
  <h1 class="starship-name">{{ starshipInfo.name }}</h1>
  <img
    :src="starshipImg"
    :alt="starshipInfo.name"
    :title="starshipInfo.name"
    @error="showStarshipPlaceholderImg"
  />

  <div class="starship-detail-list">
    <dl>
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

    <dl>
      <dt>Crew:</dt>
      <dd>{{ starshipInfo.crew }}</dd>
      <br />
      <dt>Passenger capacity:</dt>
      <dd>{{ starshipInfo.cargo_capacity }} tons</dd>
      <br />
      <dt>Consumables:</dt>
      <dd>{{ starshipInfo.consumables }}</dd>
    </dl>

    <dl>
      <dt>Length:</dt>
      <dd>{{ starshipInfo.length }} meters</dd>
      <br />
      <dt>Maximum atmosphering speed</dt>
      <dd>{{ starshipInfo.max_atmosphering_speed }} km/h</dd>
      <br />
      <dt>Hyperdrive rating</dt>
      <dd>{{ starshipInfo.hyperdrive_rating }}</dd>
      <br />
      <dt>Maximum speed in realspace</dt>
      <dd>{{ starshipInfo.MGLT }} MGLT</dd>
    </dl>
  </div>

  <RouterLink :to="{ name: 'starshipList' }">
    <button>Go back</button>
  </RouterLink>
</template>

<style scoped lang="scss">
.starship-name,
.starship-detail-list {
  text-transform: uppercase;
}

.starship-name,
dt {
  font-weight: bold;
}

dt,
dd {
  display: inline;
}

dt {
  margin-right: 0.5em;
}
</style>
