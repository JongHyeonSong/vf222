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
    </v-data-table>
    <!-- <h3>{{ items }}</h3> -->
    <!-- <h3>{{ docc }}</h3> -->
    <h3>{{ cnt }}</h3>
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
} from "@firebase/firestore";

import DisplayTime from "../../../components/display-time..vue";
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { DisplayTime },
  props: ["cnt", "docc"],
  data() {
    return {
      headers: [
        { value: "updatedAt", text: "time" },
        { value: "title", text: "제목" },
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
