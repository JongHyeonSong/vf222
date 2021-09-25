<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="primary">
        <v-toolbar-title>{{ info.title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon color="success"><v-icon>mdi-pen-plus</v-icon></v-btn>
      </v-toolbar>
    </v-card>
    <v-card-text v-if="info.createdAt">
      <v-alert color="primary" outlined dismissible>
        <div class="text-right font-italic caption">
          작성일 : {{ info.createdAt }}
        </div>
        <div class="text-right font-italic caption">
          수정일 : {{ info.updatedAt }}
        </div>
      </v-alert>
    </v-card-text>
  </v-container>
</template>

<script>
import { doc, getFirestore, onSnapshot } from "@firebase/firestore";
export default {
  props: ["doc"],
  data() {
    return {
      unsubscribe: null,
      info: {
        title: "info-title",
        createdAt: new Date("2020-01-01"),
        updatedAt: new Date("2020-01-01"),
      },
      loading: false,
    };
  },
  // watch: {
  //   doc() {
  //     // this.subscribe();
  //   },
  // },
  created() {
    // this.subscribe();
  },
  destroyed() {
    if (this.unsubscribe) this.unsubscribe();
  },

  methods: {
    subscribe() {
      if (this.unsubscribe) this.unsubscribe();

      const docRef = doc(getFirestore(), "page", this.doc);
      const _this = this;
      this.unsubscribe = onSnapshot(
        docRef,
        (doc) => {
          _this;
          console.log("really?????????");
          if (!doc.exists()) return this.write();
          this.info = doc.data();
        },
        (err) => {
          debugger;
        }
      );
    },
    write() {
      this.$router.push(this.$route.path + "/write");
    },
  },
};
</script>

<style></style>
