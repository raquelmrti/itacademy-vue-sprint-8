import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useGlobalStore } from './globalStore'
import axios from 'axios'

export const useCharacterStore = defineStore('characterStore', () => {
  const globalStore = useGlobalStore()
  const { API_URL, ASSETS_URL } = globalStore
  const currentPage = ref(1)
  const isLoadingCharacterList = ref(true)
  const isLoadingCharacterInfo = ref(true)
  const isLoadingMoreCharacters = ref(false)
  const characterArray = ref([])
  const characterId = ref(0)
  const characterInfo = ref({})
  const filmsArray = ref([])
  const starshipsArray = ref([])
  const doesThisCharacterNotPilot = computed(() => !starshipsArray.value.length)
  const characterPortrait = computed(() => {
    return `${ASSETS_URL}/characters/${characterId.value}.jpg`
  })

  async function fetchCharacters() {
    isLoadingCharacterList.value = true
    try {
      const { data } = await axios.get(`${API_URL}/people`, {
        params: { page: currentPage.value }
      })
      return data
    } catch (error) {
      console.log('Failed to fetch characters')
    } finally {
      isLoadingCharacterList.value = false
    }
  }

  async function fetchCharacterById(id) {
    isLoadingCharacterInfo.value = true

    try {
      const { data } = await axios.get(`${API_URL}/people/${id}`)
      return data
    } catch (error) {
      console.log('Failed to fetch character data')
    } finally {
      isLoadingCharacterInfo.value = false
    }
  }

  async function loadMoreCharacters() {
    isLoadingMoreCharacters.value = true

    // TODO: try not to hardcode the page limit?
    if (currentPage.value === 9) {
      isLoadingMoreCharacters.value = false
      return
    }

    currentPage.value++
    try {
      const { data } = await axios.get(`${API_URL}/people`, {
        params: { page: currentPage.value }
      })
      data.results.forEach((newCharacter) => {
        characterArray.value.push(newCharacter)
      })
    } catch (error) {
      console.log('Failed to fetch character data')
    } finally {
      isLoadingMoreCharacters.value = false
    }
  }

  function $reset() {
    characterInfo.value = {}
    starshipsArray.value = []
    filmsArray.value = []
  }

  return {
    isLoadingCharacterList,
    isLoadingCharacterInfo,
    currentPage,
    characterArray,
    characterId,
    characterInfo,
    doesThisCharacterNotPilot,
    characterPortrait,
    filmsArray,
    starshipsArray,
    fetchCharacters,
    fetchCharacterById,
    loadMoreCharacters,
    isLoadingMoreCharacters,
    $reset
  }
})
