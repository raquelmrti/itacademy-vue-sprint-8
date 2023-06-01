import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useGlobalStore } from './globalStore'
import axios from 'axios'

export const useCharacterStore = defineStore('characterStore', () => {
  const globalStore = useGlobalStore()
  const { API_URL, ASSETS_URL } = globalStore

  const isLoadingCharacterInfo = ref(false)
  const characterId = ref(0)
  const characterInfo = ref({})
  const filmsArray = ref([])
  const starshipsArray = ref([])
  const characterPortrait = computed(() => {
    return `${ASSETS_URL}/characters/${characterId.value}.jpg`
  })

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

  function $reset() {
    characterInfo.value = {}
    starshipsArray.value = []
    filmsArray.value = []
  }


  return {
    isLoadingCharacterInfo,
    characterId,
    characterInfo,
    characterPortrait,
    filmsArray,
    starshipsArray,
    fetchCharacterById,
    $reset
  }
})

