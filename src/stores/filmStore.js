import { defineStore } from 'pinia'
import { useGlobalStore } from './globalStore'
import axios from 'axios'
import { ref } from 'vue'

export const useFilmStore = defineStore('filmStore', () => {
  const globalStore = useGlobalStore()
  const { API_URL } = globalStore

  const isLoadingFilms = ref(true)

  async function fetchFilmById(id) {
    try {
      isLoadingFilms.value = true
      const { data } = await axios.get(`${API_URL}/films/${id}`)
      return data
    } catch (error) {
      console.log('Failed to fetch film data')
    } finally {
      isLoadingFilms.value = false
    }
  }

  function $reset() {
    isLoadingFilms.value = true
  }

  return {
    isLoadingFilms,
    fetchFilmById,
    $reset
  }
})
