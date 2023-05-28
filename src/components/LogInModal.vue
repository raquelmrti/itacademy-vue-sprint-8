<script setup>
import { useUserStore } from "../stores/userStore";
import { storeToRefs } from "pinia";
import BaseModal from "./BaseModal.vue";

const store = useUserStore();
const { userEmail, userPassword } = storeToRefs(store);
const { authUser } = store;

const emit = defineEmits(["closeModal"]);

const closeLogInModal = () => {
  emit("closeModal");
};

const onSubmit = () => {
  authUser();
  closeLogInModal();
};
</script>

<template>
  <BaseModal @closeModal="closeLogInModal">
    <template #modal-title>
      <h1 class="modal-title">Log In</h1>
    </template>

    <template #modal-body>
      <form @submit.prevent="onSubmit">
        <div class="modal-input-group">
          <label for="userEmail">Email:</label>
          <input
            type="email"
            id="userEmail"
            ref="userEmailInput"
            v-model.trim="userEmail"
            required
          />
        </div>

        <div class="modal-input-group">
          <label for="userPassword">Password:</label>
          <input type="password" id="userPassword" v-model.trim="userPassword" required />
        </div>
        <button type="submit" class="modal-button">Continue</button>
      </form>
    </template>
  </BaseModal>
</template>

<style scoped lang="scss">
@import "../assets/scss/auth-modal";
</style>
