<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/userStore";
import { storeToRefs } from "pinia";

const store = useUserStore();
const { newUserEmail, newUserPassword } = storeToRefs(store);
const { registerUser } = store;

const onSubmit = () => {
  registerUser();
  alert("Sign up complete!")
  newUserEmail.value = "";
  newUserPassword.value = "";
};
</script>

<template>
  <Teleport to="body">
    <div class="modal-overlay" @click="closeModal">
      <form ref="modal" class="modal-body" @submit.prevent="onSubmit">
        <slot></slot>
        <button @click="$emit('closeModal')">X</button>

        <h1 class="modal-title">Sign up</h1>

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
          <input type="password" id="newUserPassword" v-model.trim="newUserPassword"
          required
          />
        </div>

        <button type="submit" id="btnSubmit" class="modal-button">Create account</button>
      </form>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000080;
}

.modal-body {
  padding: 3em;
  box-shadow: 0 5px 10px 0 #0000004d;
  box-sizing: border-box;
  background-color: #181818;
  max-width: 500px;
  margin: 95px auto;
}

.modal-input-group {
  display: flex;
  margin-bottom: 1em;

  label {
    width: 100px;
  }
}
</style>
