import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('globalStore', () => {
  const API_URL = 'https://swapi.dev/api'
  const ASSETS_URL = 'https://starwars-visualguide.com/assets/img'

  function getIdFromUrl(url) {
    return parseInt(url.match(/\d+/)[0])
  }

  return {
    API_URL,
    ASSETS_URL,
    getIdFromUrl
  }
})
