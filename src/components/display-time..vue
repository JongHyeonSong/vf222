<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <span v-on="on">{{ displayTime }}</span>
    </template>
    <span>{{ time.toLocaleString() }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: ["time"],
  computed: {
    displayTime() {
      const bTime = this.$moment(this.time);
      const aTime = this.$moment();

      const diff = aTime.diff(bTime, "days");

      if (diff > 0) return bTime.toDate().toLocaleDateString();
      return bTime.fromNow();
    },
  },
};
</script>

<style></style>
