<template>
  <div>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="comment"
          @keypress.enter="save"
          hide-details=""
          outlined
          label="댓글작성"
        ></v-text-field>
      </v-card-title>
      <template v-for="(item, i) in items">
        <v-list-item :key="item.id">
          <v-list-item-action
            >{{ item.user.displayName }} no - {{ i + 1 }}</v-list-item-action
          >
          <v-list-item-subtitle> {{ item.comment }}</v-list-item-subtitle>
          <v-list-item-subtitle>
            <display-time :time="item.createdAt"></display-time>
          </v-list-item-subtitle>
        </v-list-item>
        <v-divider :key="i"></v-divider>
      </template>
      <v-list-item v-if="moreFlag">
        <v-btn @click="more">see more</v-btn>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  increment,
  limit,
  onSnapshot,
  query,
  writeBatch,
} from "@firebase/firestore";

import DisplayTime from "../components/display-time..vue";
export default {
  props: ["docRefItem"],
  components: { DisplayTime },
  data() {
    return {
      comment: "",
      items: [],
      limit: 2,
      moreFlag: true,
    };
  },

  methods: {
    more() {
      getDoc(this.docRef).then((sn) => {
        const commentCount = sn.data().commentCount;
        this.limit += 2;
        this.subscribe();

        if (this.limit >= commentCount) this.moreFlag = false;
      });
    },
    subscribe() {
      this.unsubscribe?.();

      const collRef = collection(getFirestore(), this.docRef.path, "comments");
      const queryRef = query(collRef, limit(this.limit));
      this.unsubscribe = onSnapshot(
        queryRef,
        (sn) => {
          console.log(sn);
          if (sn.empty) return (this.items = []);

          this.items = sn.docs.map((doc) => {
            const item = doc.data();
            item.id = doc.id;
            item.createdAt = item.createdAt.toDate();
            item.updatedAt = item.updatedAt.toDate();

            return item;
          });
        },
        (err) => {
          console.error(err);
        }
      );
    },
    save() {
      const docForm = {
        createdAt: new Date(),
        updatedAt: new Date(),

        comment: this.comment,
        uid: this.$store.state.fireUser.uid,
        user: {
          email: this.$store.state.fireUser.uid,
          photoURL: this.$store.state.fireUser.photoURL,
          displayName: this.$store.state.fireUser.displayName,
        },
      };
      const id = docForm.createdAt.getTime().toString();
      const batch = writeBatch(getFirestore());

      batch.update(this.docRef, { commentCount: increment(1) });

      const commentDocRef = doc(
        getFirestore(),
        this.docRef.path,
        "comments",
        id
      );
      batch.set(commentDocRef, docForm);

      batch.commit().then((res) => {
        console.log(res, "comment batch@@");
      });
      this.subscribe();
    },
  },
  computed: {
    docRef() {
      return doc(
        getFirestore(),
        "boards",
        this.docRefItem[0],
        "ww",
        this.docRefItem[1]
      );
    },
  },
  created() {
    this.subscribe();
  },
  destroyed() {
    this.unsubscribe?.();
  },
  mounted() {
    console.log(this.docRefItem, this.docRef, "zzz");
  },
};
</script>

<style></style>
