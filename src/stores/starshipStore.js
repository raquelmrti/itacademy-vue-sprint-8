import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useGlobalStore } from './globalStore'
import axios from 'axios'

export const useStarshipStore = defineStore('starshipStore', () => {
  const globalStore = useGlobalStore()
  const { API_URL, ASSETS_URL } = globalStore
  const currentPage = ref(1)
  const isLoadingStarships = ref(true)
  const isLoadingMoreStarships = ref(false)
  const starshipArray = ref([])
  const starshipId = ref(0)
  const starshipInfo = ref({})
  const starshipImg = computed(() => {
    return `${ASSETS_URL}/starships/${starshipId.value}.jpg`
  })
  const starshipPlaceholderImg = `${ASSETS_URL}/big-placeholder.jpg`

  const starshipPilots = ref([])

  async function fetchStarships() {
    isLoadingStarships.value = true
    try {
      const { data } = await axios.get(`${API_URL}/starships`, {
        params: { page: currentPage.value }
      })
      starshipArray.value = data.results
    } catch (error) {
      console.log('Failed to fetch starships data')
    } finally {
      isLoadingStarships.value = false
    }
  }

  async function fetchStarshipById(id) {
    isLoadingStarships.value = true

    try {
      const { data } = await axios.get(`${API_URL}/starships/${id}`)
      return data
    } catch (error) {
      console.log('Failed to fetch starship data')
    } finally {
      isLoadingStarships.value = false
    }
  }

  async function loadMoreStarships() {
    isLoadingMoreStarships.value = true

    // TODO: try not to hardcode the page limit
    if (currentPage.value === 4) {
      isLoadingMoreStarships.value = false
      return
    }

    currentPage.value++
    try {
      const { data } = await axios.get(`${API_URL}/starships`, {
        params: { page: currentPage.value }
      })
      data.results.forEach((newStarship) => {
        starshipArray.value.push(newStarship)
      })
    } catch (error) {
      console.log('Failed to fetch starships data')
    } finally {
      isLoadingMoreStarships.value = false
    }
  }

  function showStarshipPlaceholderImg(event) {
    event.target.src = starshipPlaceholderImg
  }

  function $reset() {
    isLoadingStarships.value = true
    starshipArray.value = []
    starshipId.value = 0
    starshipInfo.value = {}
    starshipPilots.value = []
  }

  return {
    currentPage,
    isLoadingStarships,
    starshipArray,
    starshipId,
    starshipInfo,
    starshipImg,
    starshipPlaceholderImg,
    starshipPilots,
    fetchStarships,
    loadMoreStarships,
    isLoadingMoreStarships,
    fetchStarshipById,
    showStarshipPlaceholderImg,
    $reset
  }
})
