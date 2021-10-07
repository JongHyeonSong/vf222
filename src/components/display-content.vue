<template>
  <v-card dark>
    <v-toolbar color="primary">
      <v-toolbar-title>{{ item.title }}</v-toolbar-title>
    </v-toolbar>
    <v-btn @click="$emit('close')" color="success">text {{ content }} zz</v-btn>
    <v-btn @click="remove(1, $event)" color="success">remove</v-btn>
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
import {
  deleteDoc,
  doc,
  getFirestore,
  increment,
  updateDoc,
  writeBatch,
} from "@firebase/firestore";
import useSWRV from "swrv";
import { deleteObject, getStorage, ref } from "@firebase/storage";

export default {
  props: ["item"],
  data() {
    return {
      content: "",
      tet: "zz",
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

  reall(...li) {
    console.log(li, "re??");
  },

  methods: {
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
        this.content = "" + data;
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
