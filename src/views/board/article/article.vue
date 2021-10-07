/* eslint-disable vue/no-unused-components */
<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :server-items-length="cnt"
      :options.sync="options"
      :items-per-page="5"
      :footer-props="{ 'item-per-page-options': [5, 6, 7] }"
      item-key="id"
      loading="true"
    >
      <template v-slot:item.updatedAt="{ item }">
        <display-time :time="item.updatedAt" />
      </template>
      <template v-slot:item.title="{ item }">
        <a @click="openDialog(item)"> {{ item.title }}wow </a>
      </template>
    </v-data-table>
    <!-- <h3>{{ items }}</h3> -->
    <!-- <h3>{{ docc }}</h3> -->
    <h3>{{ cnt }}</h3>

    <v-dialog v-if="selectedItem" v-model="dialog">
      <display-content @close="dialog = false" :item="selectedItem" />
    </v-dialog>
  </div>
</template>

<script>
import { head, last } from "loadsh";

import {
  collection,
  doc,
  endAt,
  endBefore,
  startAfter,
  getFirestore,
  limit,
  onSnapshot,
  query,
  startAt,
} from "firebase/firestore";

import DisplayTime from "../../../components/display-time..vue";
import DisplayContent from "../../../components/display-content.vue";
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { DisplayTime, DisplayContent },
  props: ["cnt", "docc"],
  data() {
    return {
      selectedItem: "",
      dialog: true,
      headers: [
        { value: "updatedAt", text: "time" },
        { value: "title", text: "제목" },
        { value: "cnt", text: "조회수" },
        { value: "id", text: "id", sortable: false },
      ],
      options: {
        // itemsPerPage: 5,
      },
      items: [],
      info: "",
    };
  },

  created() {
    console.log(3);
  },
  watch: {
    options: {
      handler(_new, _old) {
        if (!_old.page) return this.subscribe(0);

        const arrow = _new.page - _old.page;
        this.subscribe(arrow);
      },
    },
  },
  methods: {
    openDialog(item) {
      this.selectedItem = item;
      this.dialog = true;
    },
    subscribe(arrow = 0) {
      this.unsubscribe?.();

      const collRef = collection(getFirestore(), "boards", this.docc, "ww");
      const _this = this;
      const _limit = limit(this.options.itemsPerPage);
      let q = "";
      if (arrow === -1) {
        q = query(
          collection(getFirestore(), "boards", this.docc, "ww"),
          endBefore(head(this.docs)),
          _limit
        );
      } else if (arrow === 1) {
        q = query(
          collection(getFirestore(), "boards", this.docc, "ww"),
          startAfter(last(this.docs)),
          _limit
        );
      } else {
        q = query(
          collection(getFirestore(), "boards", this.docc, "ww"),
          _limit
        );
      }

      _this.unsubscribe = onSnapshot(
        q,
        (collSn) => {
          _this.docs = collSn.docs; //리스트말고 docs객체를 가지고있어야 페이징됨 ㅠ
          _this.items = collSn.docs.map((doc) => ({
            ...doc.data(),
            updatedAt: doc.data().updatedAt.toDate(),
          }));
        },
        (err) => {
          debugger;
        }
      );
    },
  },
};
</script>

<style></style>
