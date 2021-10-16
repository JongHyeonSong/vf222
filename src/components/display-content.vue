<template>
  <v-card dark>
    <v-toolbar color="primary">
      <v-toolbar-title>{{ item.title }}</v-toolbar-title>
    </v-toolbar>
    <v-btn @click="$emit('close')" color="success">text {{ content }} zz</v-btn>
    <v-btn @click="remove(1, $event)" color="success">remove</v-btn>
    <v-btn @click="$emit('go', 1)" color="success">goNext</v-btn>
    <v-btn @click="$emit('go', -1)" color="success">goPrev</v-btn>

    <hr />
    <v-card-text>
      <!-- <viewer class="primary" v-if="content" :initialValue="content" /> -->
      <div v-if="content" v-html="content"></div>
      <v-container v-else grid-list-xs>
        <v-progress-circular :value="20" indeterminate></v-progress-circular>
      </v-container>
    </v-card-text>
    <display-comment :docRefItem="[this.$route.params.docc, this.item.id]" />
  </v-card>
</template>

<script>
import urlParser from "url-parse";

import axios from "axios";
import {
  collection,
  deleteDoc,
  doc,
  endBefore,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  limit,
  limitToLast,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  updateDoc,
  writeBatch,
} from "@firebase/firestore";
import useSWRV from "swrv";
import { deleteObject, getStorage, ref } from "@firebase/storage";
import { head, last } from "loadsh";

import DisplayComment from "../../src/components/display-comment.vue";
// import { endBefore, startAfter } from "@firebase/database";
export default {
  props: ["item", "docs"],
  components: { DisplayComment },
  data() {
    return {
      content: "",
      tet: "zz",
    };
  },
  mounted() {
    this.item;
    this.content = "";
    this.fetch();
  },
  watch: {
    item(ne, ol) {
      this.content = "";
      this.fetch();
    },
  },
  // _query = query(collRef, orderBy("updatedAt", "desc"), limit(1));

  reall(...li) {
    console.log(li, "re??");
  },
  computed: {
    docc() {
      return this.$route.params.docc;
    },
  },
  methods: {
    // go(tt) {
    //   tt;
    //   debugger;
    // },
    remove: remove,

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
        // this.content = "" + data;
        console.log(this.item.title);
        this.content = this.item.title;

        const docRef = doc(
          getFirestore(),
          "boards",
          this.$route.params.docc,
          "ww",
          this.item.id
        );
        updateDoc(docRef, { cnt: increment(1) }).then((res) => {
          console.log("cnt UP@@", res);
        });
      });
    },
  },
};

function remove(...li) {
  //  1. 카운트 -1@@ 2. 돜 삭제@@ 3.스토리지 삭제

  const batch = writeBatch(getFirestore());

  const docRef = doc(getFirestore(), "boards", this.$route.params.docc);
  // updateDoc(docRef, { count: increment(-1) }).then((res) => {
  //   console.log("cnt DOWN!!", res);
  // });
  //위 행동을 아래 배치로 실행

  const btResult = batch.update(docRef, { count: increment(-1) });
  console.log("bat resu ", btResult);

  const docRef2 = doc(
    getFirestore(),
    "boards",
    this.$route.params.docc,
    "ww",
    this.item.id
  );
  // deleteDoc(docRef2).then((res) => {
  //   console.log("doc deleted!!!", res);
  // });

  batch.delete(docRef2);

  batch.commit().then((res) => {
    console.log("bach comm@@@", res);
  });

  const storage = getStorage();
  const storageRef = ref(
    getStorage(),
    "boards/" + this.item.id + "some-child.md"
  );

  deleteObject(storageRef).then((res) => {
    console.log("storage dele succ@@ ", res);
  });
}
</script>

<style></style>
