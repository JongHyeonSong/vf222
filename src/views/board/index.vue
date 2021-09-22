<template>
  <div>
    <v-card>
      <v-card-title primary-title> title </v-card-title>
      <!-- <v-data-table
        :headers="headers"
        :items="items"
        hide-default-footer
        class="elevation-1"
        show-select
        pagination.sync="pagination"
        item-key="id"
        loading="true"
        search=""
      >
      </v-data-table> -->

      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="this.options.itemsPerPage"
        :server-items-length="serverItemsLength"
        :options.sync="options"
        item-key="id"
        loading="true"
        search=""
        must-sort
      >
        <template slot="item.id" slot-scope="props">
          <v-btn
            class="ml-10"
            @click="openDialog(props.item.id)"
            color="success"
            icon
            ><v-icon>mdi-pen-plus</v-icon></v-btn
          >
          <v-btn
            class="ml-10"
            @click="remove(props.item.id)"
            color="success"
            icon
            ><v-icon>mdi-delete</v-icon></v-btn
          >
        </template>

        <template slot="item.createdAt" slot-scope="props">
          {{ new Date(props.item.createdAt).toLocaleString() }}
        </template>
      </v-data-table>

      <v-card-actions>
        <v-btn @click="read" color="success">read data</v-btn>

        <v-btn @click="openDialog('')" color="success">mdi-hail</v-btn>
      </v-card-actions>

      <v-dialog
        v-model="dialog"
        :overlay="false"
        max-width="500px"
        transition="dialog-transition"
      >
        <v-card>
          <v-form>
            <v-card-text>
              <v-text-field
                filled
                label="label"
                v-model="form.title"
              ></v-text-field>
              <v-text-field label="label" v-model="form.content"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn class="ml-10" @click="update" color="success" icon>
                <v-icon>mdi-content-save </v-icon></v-btn
              >

              <v-btn class="ml-10" @click="dialog = false" color="red" icon>
                <v-icon>mdi-close </v-icon></v-btn
              >
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  limit,
  orderBy,
  endBefore,
  startAfter,
} from "firebase/firestore";
import { head, last } from "lodash";

import { getFirestore } from "firebase/firestore";
const db = getFirestore();
collection;
addDoc;
deleteDoc;
updateDoc;
query;
limit;
where;

export default {
  data() {
    return {
      arrow: 0,
      serverItemsLength: 0,
      options: {
        itemsPerPage: 5,
        sortBy: ["createdAt"],
        sortDesc: [true],
      },
      headers: [
        { value: "createdAt", text: "time" },
        { value: "title", text: "제목" },
        { value: "content", text: "내용" },
        { value: "id", text: "id", sortable: false },
      ],
      selectedId: "",
      unsubscribe: "",
      subscribeCnt: "",
      dialog: false,
      items: [],
      form: {
        title: "",
        content: "",
      },
    };
  },
  watch: {
    // options: {
    //   handler(new_, old_) {
    //     // const arrow = new_.page - old_.page;
    //   deep: true,
    //     // this.subscribe(arrow);
    //     // console.log("old: ", new_);
    //     // console.log("new: ", old_);
    //   },
    // },
    options: {
      deep: true,
      handler(new_, old_) {
        const arrow = new_.page - old_.page;
        this.subscribe(arrow ? arrow : 0);
      },
    },
  },
  created() {
    // this.read();
    // this.subscribe(this.arrow);
  },
  destroyed() {
    if (this.unsubscribe) this.unsubscribe();
  },
  methods: {
    subscribe(arrow) {
      // const q = query(collection(db, "boards"), where("content", "like", "zzzz")); //쿼리

      const _order = head(this.options.sortBy);
      const _sort = head(this.options.sortDesc) ? "desc" : "asc";
      const _orderBy = orderBy(_order, _sort);
      const _limit = limit(this.options.itemsPerPage);

      // debugger;
      // let _target = "";
      // switch
      // arrow === -1 ? endBefore(head(this.docs)) : startAfter(last(this.docs))

      let q = "";
      switch (arrow) {
        case -1:
          q = query(
            collection(db, "boards"),
            _orderBy,
            endBefore(head(this.docs)),
            _limit
          );
          break;
        case 1:
          q = query(
            collection(db, "boards"),
            _orderBy,
            startAfter(last(this.docs)),
            _limit
          );
          break;
        case 0:
          q = query(collection(db, "boards"), _orderBy, _limit);
          break;
      }

      this.unsubscribe = onSnapshot(
        q,
        (sn) => {
          if (sn.empty) return (this.items = []);
          // sn통째 = sn.docs // sn 변경점만 sn.docChanges()
          this.docs = sn.docs;
          this.items = sn.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
          }));
        },
        (err) => {
          console.error(err);
        }
      );

      const qCnt = doc(db, "meta", "boards");
      this.unsubscribeCnt = onSnapshot(
        qCnt,
        (sn) => {
          // const cnt = sn.docs.find((v) => v.id === "boards").data().count;
          if (sn.exists()) this.serverItemsLength = sn.data().count;
        },
        (err) => {
          debugger;
          console.error(err);
        }
      );

      // const q = query(collection(db, "cities"), where("content", "==", "zz"));
      // const unsubscribe = onSnapshot(q, (querySnapshot) => {
      //   const cities = [];
      //   querySnapshot.forEach((doc) => {
      //     cities.push(doc.data().name);
      //   });
      //   console.log("Current cities in CA: ", cities.join(", "));
      // });
    },
    test() {
      console.log(this.items);
    },
    openDialog(id = "") {
      this.selectedId = id;
      this.dialog = true;

      if (id) this.form = [...this.items].find((item) => item.id === id);
    },
    // async save() {
    //   try {
    //     debugger;
    //     const docRef = await addDoc(collection(db, "boards"), {
    //       ...this.form,
    //       createdAt: new Date(),
    //     });
    //     debugger;
    //     console.log("Document written with ID: ", docRef.id);
    //   } catch (e) {
    //     console.error("Error adding document: ", e);
    //   } finally {
    //     this.dialog = false;
    //   }
    // },

    async read() {
      const querySnapshot = await getDocs(collection(db, "boards"));

      this.items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },

    async remove(id) {
      try {
        await deleteDoc(doc(db, "boards", id));
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    clearForm() {
      this.dialog = false;
      this.form = {
        title: "",
        content: "",
      };
    },
    async update() {
      if (this.selectedId) {
        try {
          //firestore 업데이트 https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0

          // const docRef = await addDoc(collection(db, "boards"), this.form);

          // Set the "capital" field of the city 'DC'
          const washingtonRef = doc(db, "boards", this.selectedId);
          await updateDoc(washingtonRef, this.form);
        } catch (e) {
          console.error("Error adding document: ", e);
        } finally {
          this.clearForm();
        }
      } else {
        try {
          const docRef = await addDoc(collection(db, "boards"), {
            ...this.form,
            createdAt: new Date(),
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        } finally {
          this.clearForm();
        }
      }
    },
  },
};
</script>

<style></style>
