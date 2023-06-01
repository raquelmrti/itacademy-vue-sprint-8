<script setup>
import { onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useCharacterStore } from "../stores/characterStore";
import { useFilmStore } from "../stores/filmStore";
import { useStarshipStore } from "../stores/starshipStore";
import { useGlobalStore } from "../stores/globalStore";
import { storeToRefs } from "pinia";

const globalStore = useGlobalStore();
const { getIdFromUrl } = globalStore;

const characterStore = useCharacterStore();
const {
  isLoadingCharacterInfo,
  doesThisCharacterNotPilot,
  characterId,
  characterInfo,
  characterPortrait,
  starshipsArray,
  filmsArray,
} = storeToRefs(characterStore);
const { fetchCharacterById } = characterStore;

const filmStore = useFilmStore();
const { isLoadingFilms } = storeToRefs(filmStore);
const { fetchFilmById } = filmStore;

const starshipStore = useStarshipStore();
const { isLoadingStarships } = storeToRefs(starshipStore);
const { fetchStarshipById } = starshipStore;

onMounted(async () => {
  const route = useRoute();
  characterId.value = route.params.id;
  characterInfo.value = await fetchCharacterById(characterId.value);

  const starshipUrls = characterInfo.value.starships;

  if (starshipUrls.length) {
    starshipsArray.value = await Promise.all(
      starshipUrls.map(async (starship) => {
        return await fetchStarshipById(getIdFromUrl(starship));
      })
    );
  } else {
    isLoadingStarships.value = false;
  }

  const filmUrls = characterInfo.value.films;

  filmsArray.value = await Promise.all(
    filmUrls.map(async (film) => {
      return await fetchFilmById(getIdFromUrl(film));
    })
  );
});

onUnmounted(() => {
  characterStore.$reset();
  filmStore.$reset();
});
</script>

<template>
  <div v-if="isLoadingCharacterInfo">Loading character...</div>
  <div v-else class="info-wrapper">
    <h1 class="name">{{ characterInfo.name }}</h1>
    <div class="portrait-and-info-wrapper">
      <img
        class="character-portrait"
        :src="characterPortrait"
        :alt="characterInfo.name"
        :title="characterInfo.name"
      />
      <div class="detail-list">
        <dl class="list-1">
          <dt>Gender:</dt>
          <dd>{{ characterInfo.gender }}</dd>
          <br />
          <dt>Height:</dt>
          <dd>{{ characterInfo.height }} cm</dd>
          <br />
          <dt>Weight:</dt>
          <dd>{{ characterInfo.mass }} kg</dd>
          <br />
          <dt>Hair color:</dt>
          <dd>{{ characterInfo.hair_color }}</dd>
          <br />
          <dt>Skin color:</dt>
          <dd>{{ characterInfo.skin_color }}</dd>
          <br />
          <dt>Eye color:</dt>
          <dd>{{ characterInfo.eye_color }}</dd>
          <br />
          <dt>Birth year:</dt>
          <dd>{{ characterInfo.birth_year }}</dd>
          <br />
          <dt>Starships:</dt>
          <dd>
            <ul>
              <p v-if="isLoadingStarships">Loading starships...</p>
              <li v-else-if="doesThisCharacterNotPilot">— None</li>
              <li v-else v-for="starship in starshipsArray" :key="starship.name">
                — {{ starship.name }}
              </li>
            </ul>
          </dd>
          <dt>Appears in:</dt>
          <dd>
            <ul>
              <p v-if="isLoadingFilms">Loading films...</p>
              <li v-else v-for="film in filmsArray" :key="film.title">
                — {{ film.title }} ({{ film.release_date }})
              </li>
            </ul>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/scss/info-list.scss";

.character-portrait {
  max-width: 300px;
}

.portrait-and-info-wrapper {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  gap: 1em;

  @media only screen and (min-width: 679px) {
    align-items: center;
  }
}

.detail-list {
  @media only screen and (min-width: 830px) {
    text-align: left;
  }
}
</style>
