# Front End Development with Vue.js - IT Academy

## **Sprint 8 - Vue III**

The third part of my Vue learning journey. This sprint's objective is to practice the usage of components, services and routing, as well as API consumption. I will also learn about Vuex.

The project consists in building a website that shows information about the starships in Star Wars, for which I will have to use [swapi.](https://swapi.dev/)

### ⭐ **Level 1** ⭐

**— Exercise 1**

- Make an API call to swapi and gather an array of starships. This array is rendered as a list, showing the name and model of each starship.

**✏️ Notes**:

- I used Axios to make the API call. Axios makes it even easier to consume APIs since it automatically transforms the data received to JSON.
- I stored the logic for the API call in a separate service file, `StarWarsService.js`. I learned this from [this video by GOGODEV](https://www.youtube.com/watch?v=tTRICbkGHoU&list=PLDllzmccetSNgykILXnHMeuO-y-gRcF-i&index=9), although he wrote a class while I decided to go for a functional approach (Edit: later I ended up switching to a class, too). It's good practice to keep the presentation layer (components, views) and data access layer (APIs, databases) separate!

##### ✅ Finished: 17/05/2023

**— Exercise 2**

- Show individual starship information when the user clicks on one of the starships from the list. For this, I had to take the id of the starship from the URL and make an API call that retrieves information of the starship with the corresponding id.

**✏️ Notes**:

- Since I'm using Pinia, I removed the service file and instead moved the API call functions to a store, as well as other data.
- Some starships don't have an image and it caused the `img src` not to work. To solve this, I used the `@error` event handler which triggers when an external file doesn't load. I passed it a function that sets the source to that of a placeholder image.

##### ✅ Finished: 22/05/2023

**— Exercise 3**

- Add infinite scrolling so that the list of starships loads more ships as the user scrolls down. For this, I added an event listener to the window which fires a function that fetches the next page of starships when the user reaches the bottom of the window. Then, the newly fetched starship array gets pushed to the main array.
##### ✅ Finished: 22/05/2023


---

### ⭐⭐ **Level 2** ⭐⭐

---

### ⭐⭐ **Level 3** ⭐⭐
