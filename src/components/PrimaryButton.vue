<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true
  }
});
</script>

<template>
  <button>
  {{ text }}
  </button>
</template>

<style scoped lang="scss">
button {
  margin-top: 0;
  min-width: 210px;
  height: 48px;
  box-shadow: none;
  background-color: $yellow-accent;
  color: $black;
  font-family: 'Bai Jamjuree', sans-serif;
  font-size: 1em;
  font-weight: bold;
  border-radius: 24px;
  letter-spacing: 0.25px;
  padding: 4px 20px;
  text-transform: uppercase;
  cursor: pointer;
  border: none;
}
</style>
