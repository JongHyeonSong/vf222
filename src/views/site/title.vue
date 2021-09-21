<template>
  <!-- <v-toolbar color="primary">tte </v-toolbar> -->
  <v-toolbar-title
    >{{ title }}

    <v-btn icon @click="openDialog" color="success"
      ><v-icon>mdi-pen-plus</v-icon></v-btn
    >
    <v-dialog
      v-model="dialog"
      :overlay="false"
      max-width="400px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>
          title
          <v-spacer></v-spacer>
          <v-btn icon @click="save"><v-icon>mdi-download</v-icon></v-btn>
          <v-btn icon @click="dialog = false"
            ><v-icon>mdi-close-outline</v-icon></v-btn
          >
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="text"
            @keypress.enter="save"
            outlined
            name="name"
            label="label"
            id="id"
            hide-details
            >zzz</v-text-field
          >
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-toolbar-title>
</template>

<script>
const KEY_WORD = "site";
export default {
  props: ["title"],

  data() {
    return {
      dialog: false,
      text: this.title,
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    save() {
      this.$firebase.writeObj(KEY_WORD + "/title", this.text);
      this.dialog = false;
    },
  },
};
</script>

<style></style>
