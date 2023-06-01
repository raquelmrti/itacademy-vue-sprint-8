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

**— Exercise 4**

- Add CSS styling.

##### ✅ Finished: 24/05/2023

**— Exercise 5**

- Add a Welcome page.

##### ✅ Finished: 25/05/2023

**— Exercise 6**

- Implement a user log in and sign up system with local storage. I made another store for the user data and logic, `userStore`.

##### ✅ Finished: 28/05/2023

---

### ⭐⭐ **Level 2** ⭐⭐

**— Exercise 7**

- Guard the `/starships` and `/starships/:id` routes so that only logged in users can access them. I accomplished this by adding a `requireAuth` metadata to all the routes, which is a boolean set to true or false depending on the route. Then, with a `router.beforeEach` function,  it checks if the route selected needs authentication and if the user is logged in. If it needs aunthentication and the user is not logged in, the log in modal shows up.

##### ✅ Finished: 28/05/2023

**— Exercise 8**

- Show pilot info in each starship component.

**✏️ Notes**:

- I moved helper functions and needed URLs to a global store for better access and less repetition.
- I aadded `$reset` functions to some of the stores, which I can invoke on the `onUnmounted` hook to erase data so that a component doesn't render the previous data before it re-fetches.

##### ✅ Finished: 01/06/2023

**— Exercise 9**

- Centralize all data in stores (I've already been doing this as I worked through the Sprint.)

##### ✅ Finished: 01/06/2023

---

### ⭐⭐ **Level 3** ⭐⭐

**— Exercise 10**

- Add a section that lists all the characters.

##### ✅ Finished: 01/05/2023
