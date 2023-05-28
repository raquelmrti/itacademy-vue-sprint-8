<script setup>
import { useUserStore } from "../stores/userStore";
import { storeToRefs } from "pinia";
import BaseModal from "./BaseModal.vue";

const store = useUserStore();
const { newUserEmail, newUserPassword } = storeToRefs(store);
const { registerUser } = store;

const emit = defineEmits(["closeModal"])

const closeSignUpModal = () => {
  emit("closeModal")
}

const onSubmit = () => {
  registerUser();
  closeSignUpModal();
};

</script>

<template>
  <BaseModal @closeModal="closeSignUpModal">
    <template #modal-title>
      <h1 class="modal-title">Sign Up</h1>
    </template>

    <template #modal-body>
      <form @submit.prevent="onSubmit">
        <div class="modal-input-group">
          <label for="newUserEmail">Email:</label>
          <input
            type="email"
            id="newUserEmail"
            ref="newUserEmailInput"
            v-model.trim="newUserEmail"
            required
          />
        </div>

        <div class="modal-input-group">
          <label for="newUserPassword">Password:</label>
          <input
            type="password"
            id="newUserPassword"
            v-model.trim="newUserPassword"
            required
          />
        </div>
      <button type="submit" class="modal-button">Create account</button>
      </form>
    </template>
  </BaseModal>
</template>

<style scoped lang="scss">
@import "../assets/scss/auth-modal";
</style>
