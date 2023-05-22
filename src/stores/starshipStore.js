import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useStarshipStore = defineStore('starshipStore', () => {
  const API_URL = "https://swapi.dev/api/starships"
  const currentPage = ref(1)
  const isLoading = ref(false)
  const starshipArray = ref([])
  const starshipId = ref(0)
  const starshipInfo = ref([])
  const starshipImg = computed(() => {
    return `https://starwars-visualguide.com/assets/img/starships/${starshipId.value}.jpg`
  })
  const starshipPlaceholderImg = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg'

  async function fetchStarships() {
    isLoading.value = true
    try {
      const { data } = await axios.get(API_URL, {
        params: { page: currentPage.value }
      })
      starshipArray.value = data.results
    } catch (error) {
      console.log('Failed to fetch starships data')
    } finally {
      isLoading.value = false
    }
  }

  async function fetchStarshipById(id) {
    isLoading.value = true

    try {
      const { data } = await axios.get(`${API_URL}/${id}`)
      starshipInfo.value = data
    } catch (error) {
      console.log('Failed to fetch starship data')
    } finally {
      isLoading.value = false
    }
  }

  async function loadMoreStarships() {
    // TODO: try not to hardcode the page limit?
    if (currentPage.value === 4) return

    currentPage.value++
    try {
      const { data } = await axios.get(API_URL, {
        params: { page: currentPage.value }
      })
      data.results.forEach(newStarship => {
        starshipArray.value.push(newStarship)
      });
    } catch (error) {
      console.log('Failed to fetch starships data')
    }
  }

  function showStarshipPlaceholderImg(event) {
    event.target.src = starshipPlaceholderImg
  }

  return {
    currentPage,
    isLoading,
    starshipArray,
    starshipId,
    starshipInfo,
    starshipImg,
    starshipPlaceholderImg,
    fetchStarships,
    loadMoreStarships,
    fetchStarshipById,
    showStarshipPlaceholderImg
  }
})
