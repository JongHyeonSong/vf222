<template>
  <v-card>
    board form
    <h3>게시판 정보작성</h3>
    <v-form>
      <v-text-field v-model="form.cat" label="label"></v-text-field>
      <v-text-field v-model="form.title" label="label"></v-text-field>
      <v-text-field v-model="form.createdAt" label="label"></v-text-field>
      <!-- <v-text-field
        v-model="form.description"
        label="form.description"
      ></v-text-field> -->
      <v-btn @click="create" color="success">create</v-btn>
    </v-form>
  </v-card>
</template>

<script>
import {
  doc,
  getFire,
  store,
  onSnapshot,
  setDoc,
  onSnapshotsInSync,
  getFirestore,
} from "firebase/firestore";
export default {
  // props: ["doc", "prt"],

  data() {
    return {
      form: {
        cat: "11",
        title: "12",
        description: "c",
      },
      exists: false,
      loading: false,
      ref: null,
    };
  },
  created() {
    this;
    this.subscribe();
  },
  computed: {
    docc() {
      return this.$route.params.docc;
    },
  },
  destroyed() {
    this.unsubscribe?.();
  },

  watch: {
    docc() {
      return this.subscribe();
    },
  },
  methods: {
    subscribe() {
      this.unsubscribe?.();

      console.log("subs start in boards form");
      console.log(this.docc + "@@@@@@@@@@@@@@@");
      const docRef = doc(getFirestore(), "boards", this.docc);

      this.unsubscribe = onSnapshot(
        docRef,
        function (snn) {
          debugger;
          if (snn.exists()) this.form = snn.data();
        }.bind(this),
        (err) => {
          console.error(err);
        }
      );
    },
    async create() {
      const docc = this.docc;
      const form = {
        ...this.form,

        createdAt: new Date(),
        count: 0,
      };

      const docRef = doc(getFirestore(), "boards", docc);
      const sn = await setDoc(docRef, form);
    },
  },
};
</script>

<style></style>
