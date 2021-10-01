<template>
  <v-card dark>
    <v-toolbar color="primary">
      <v-toolbar-title>{{ item.title }}</v-toolbar-title>
    </v-toolbar>
    <v-btn @click="$emit('close')" color="success">text {{ content }} zz</v-btn>
    <v-card-text>
      <viewer v-if="content" :initialValue="content"></viewer>

      <v-container v-else grid-list-xs>
        <v-progress-circular :value="20" indeterminate></v-progress-circular>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import urlParser from "url-parse";

import axios from "axios";
export default {
  props: ["item"],
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    this.content = "";
    this.fetch();
  },
  watch: {
    item(ne, ol) {
      this.content = "";
      this.fetch();
    },
  },

  methods: {
    fetch() {
      let url = urlParser(this.item.dUrl, true);

      url =
        url.pathname +
        Object.entries(url.query).reduce(
          (a, b) => a + b[0] + "=" + b[1] + "&",
          "?"
        );
      console.log(this.item.dUrl);
      axios.get("/fb" + url).then(({ data }) => {
        this.content = data;
      });
    },
  },
};
</script>

<style></style>
