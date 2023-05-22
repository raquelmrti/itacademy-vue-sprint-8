import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useStarshipStore = defineStore('starshipStore', () => {
  const starshipArray = ref([])
  const starshipId = ref(0)
  const starshipInfo = ref([])
  const starshipImg = computed(() => {
    return `https://starwars-visualguide.com/assets/img/starships/${starshipId.value}.jpg`
  })
  const starshipPlaceholderImg =
    "https://starwars-visualguide.com/assets/img/big-placeholder.jpg"


  async function fetchAllStarships() {
    try {
      const { data } = await axios.get('https://swapi.dev/api/starships')
      starshipArray.value = data.results
    } catch (error) {
      console.log('Failed to fetch starships data')
    }
  }

  async function fetchStarshipById(id) {
    try {
      const { data } = await axios.get(`https://swapi.dev/api/starships/${id}`)
      starshipInfo.value = data
    } catch (error) {
      console.log('Failed to fetch starship data')
    }
  }

  function showStarshipPlaceholderImg(event) {
    event.target.src = starshipPlaceholderImg
  }

  return {
    starshipArray,
    starshipId,
    starshipInfo,
    starshipImg,
    starshipPlaceholderImg,
    fetchAllStarships,
    fetchStarshipById,
    showStarshipPlaceholderImg
  }
})