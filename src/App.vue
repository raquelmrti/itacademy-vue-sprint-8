<template>
  <nav>
    <RouterLink :to="{name: 'home'}">Home</RouterLink>
    <RouterLink :to="{name: 'starshipList'}">Starships</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped lang="scss">
nav {
  display: flex;
  gap: 2em;
  margin-bottom: 2em;
}
</style>
