<template>
  <v-footer app color="primary" dark absolute>
    <v-spacer></v-spacer>
    <div>{{ footer }}</div>
    <div>&copy; {{ new Date().getFullYear() }}</div>
  </v-footer>
</template>

<script>
export default {
  props: ["footer"],
};
</script>

<style></style>
