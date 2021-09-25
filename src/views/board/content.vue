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
  props: ["docc"],
  data() {
    return {
      unsubscribe: null,
      info: {
        title: "info-title",
        createdAt: new Date("2020-01-01"),
        updatedAt: new Date("2020-01-01"),
      },
      loading: false,
      prt: "zzzz",
    };
  },
  watch: {
    docc() {
      this.subscribe();
    },
  },
  created() {
    console.log("this is board + " + this.docc);
    this.subscribe();
  },
  destroyed() {
    this.unsubscribe?.();
  },

  methods: {
    subscribe() {
      this.unsubscribe?.();
      const _this = this;
      const docRef = doc(getFirestore(), "boards", this.docc);
      this.unsubscribe = onSnapshot(
        docRef,
        (doc) => {
          if (!doc.exists()) return this.write();
          _this.info = doc.data();
          _this.info.createdAt = _this.info.createdAt.toDate();
        },
        (err) => {}
      );
    },
    write() {
      this.$router.push(this.$route.path + "/write");
    },
  },
};
</script>

<style></style>
