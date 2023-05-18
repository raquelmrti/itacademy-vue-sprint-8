import { ref } from 'vue'
import axios from 'axios'

const starships = ref([])

export function getStarships() {
  return starships
}

export async function getData() {
  try {
      const { data } = await axios.get('https://swapi.dev/api/starships')
      starships.value = data.results
    } catch (error) {
      throw new Error('Failed to fetch starships data')
    }
  }

// Can also be built as a class
//
// class StarWarsService {
//   constructor() {
//     this.starships = ref([])
//   }

//   getStarships() {
//     return this.starships
//   }

//   async getData() {
//     try {
//       const { data } = await axios.get('https://swapi.dev/api/starships')
//       this.starships.value = data.results
//     } catch (error) {
//       throw new Error('Failed to fetch starships data')
//     }
//   }
// }

// export default StarWarsService
