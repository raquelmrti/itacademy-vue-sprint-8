<script setup>
import { ref } from "vue";
import SignUpModal from "../components/SignUpModal.vue"
import LogInModal from "../components/LogInModal.vue"

const showModalLogIn = ref(false);
const showModalSignUp = ref(false);
</script>

<template>

  <header>
    <div class="login-container">
      <a href="#" class="login-link" @click="showModalLogIn = true">Log in</a>
      <a href="#" class="signup-link" @click="showModalSignUp = true">Sign up</a>
    </div>

    <SignUpModal v-if="showModalSignUp" @closeModal="showModalSignUp = false"/>

    <LogInModal v-if="showModalLogIn" @close-modal="showModalLogIn = false"/>

    <RouterLink :to="{ name: 'home' }" class="logo-container">
      <picture>
        <source
          media="(min-width: 760px)"
          srcset="@/assets/img/sw-logo-stacked.png"
          height="80"
        />
        <img
          alt="Star Wars logo"
          src="@/assets/img/sw-logo-horizontal.webp"
          height="32"
        />
      </picture>
    </RouterLink>
  </header>

  <nav>
    <ul class="nav-items-list">
      <li class="nav-item">
        <RouterLink :to="{ name: 'home' }">Home</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink RouterLink :to="{ name: 'starshipList' }">Starships</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
header {
  display: flex;
  gap: 1em;
  align-items: center;
  flex-direction: column;
  padding: 2em 5em;

  @media only screen and (min-width: 760px) {
    justify-content: center;
    flex-direction: row;
    padding: 2em 8em;
  }

  .login-container {
    text-transform: uppercase;
    font-weight: bold;

    a {
      color: #fff;
    }

    @media only screen and (min-width: 760px) {
      order: 2;
    }
  }

  .login-link {
    margin-right: 1em;
  }

  .logo-container {
    display: flex;
    justify-content: center;
    flex-grow: 1;
    align-items: center;

    @media only screen and (min-width: 760px) {
      margin-left: calc(133px + 1em);
    }
  }
}

nav {
  text-align: center;
  text-transform: uppercase;
  border-top: 1px solid $transparent-gray;
  border-bottom: 1px solid $transparent-gray;
  margin-bottom: 2em;

  .nav-items-list {
    list-style: none;
    padding-inline-start: 0;

    .nav-item {
      padding: 0.7em 1em;
      border-right: 1px solid $transparent-gray;
      border-left: 1px solid $transparent-gray;
      height: 45px;
      display: inline-block;
      position: relative;
      font-weight: bold;

      .router-link-active,
      .router-link-exact-active {
        color: #fff;

        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          background-color: $blue-accent;
          bottom: 0;
          left: 0;
        }
      }
    }
  }
}
</style>
