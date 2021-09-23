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

import { getDatabase, ref, set } from "firebase/database";
getDatabase;
ref;
set;

export default {
  props: ["title"],

  data() {
    return {
      dialog: false,
      text: this.title,
    };
  },

  //   methods: {
  //   signInWIthGoogle() {
  //     debugger;
  //     this.dialog = true;
  //   },
  // },

  methods: {
    openDialog() {
      this.dialog = true;
    },
    async save() {
      const db = getDatabase();
      const _ref = ref(db, KEY_WORD + "/title");

      // try {
      //   // set(_ref, data).then((res) => {
      //   //   console.log("res: ", res);
      //   // });
      //   const re = await set(_ref, this.text);
      //   re;
      // } finally {
      //   this.dialog = false;
      // }

      // 여기서 서스펜드를 걸어줘야 뷰가 캐치한다
      await this.$firebase.writeObj(KEY_WORD + "/title", this.text);

      // try {
      // } finally {
      //   this.dialog = false;
      // }
    },
  },
};
</script>

<style></style>
