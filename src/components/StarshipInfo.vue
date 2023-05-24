<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStarshipStore } from "../stores/starshipStore";
import { storeToRefs } from "pinia";

const store = useStarshipStore();
const { isLoading, starshipId, starshipInfo, starshipImg } = storeToRefs(store);
const { fetchStarshipById, showStarshipPlaceholderImg } = store;

onMounted(async () => {
  const route = useRoute();
  starshipId.value = route.params.id;
  await fetchStarshipById(starshipId.value);
});
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else class="starship-info-wrapper">
    <h1 class="starship-name">{{ starshipInfo.name }}</h1>
    <img class="starship-img" :src="starshipImg" :alt="starshipInfo.name" :title="starshipInfo.name"
      @error="showStarshipPlaceholderImg" />

    <div class="starship-detail-list">
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
    </div>
  </div>
</template>

<style scoped lang="scss">
.starship-info-wrapper {
  text-align: center;
  margin-bottom: 5em;
}

.starship-name,
.starship-detail-list {
  text-transform: uppercase;
}

.starship-img {
  margin: 1em 0;
  width: 100%;
  max-width: 600px;
}

.starship-detail-list {
  display: grid;
}

@media only screen and (min-width: 700px) {
  .starship-detail-list {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5em;
  }

  .list-1 {
    grid-column: span 2;
  }

  .list-2, .list-3 {
    text-align: left;
  }
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
